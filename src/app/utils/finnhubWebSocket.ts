"use client";
import { useEffect } from "react";
import { SelectComponentItem } from "../Components/Select/interfaces";
import { messaging, getToken } from "./firebaseConfig";

interface Trade {
  s: string;
  p: number;
}

interface NotificationStateItem {
  id: number;
  companyName: SelectComponentItem;
  companySymbol: string;
  situation: SelectComponentItem;
  price: number;
}

const useFinnhubWebSocket = (
  symbol: string,
  notificationList: NotificationStateItem[]
) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registrado correctamente:", registration);
        })
        .catch((error) => {
          console.error("Error registrando Service Worker:", error);
        });
    }

    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Permiso de notificaciones concedido");
          getFirebaseToken();
        } else {
          console.log("Permiso de notificaciones denegado");
        }
      });
    } else {
      getFirebaseToken();
    }

    const socket = new WebSocket(
      `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
    );

    socket.onopen = () => {
      notificationList.forEach((notification) => {
        socket.send(
          JSON.stringify({
            type: "subscribe",
            symbol: notification.companySymbol,
          })
        );
      });
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data && data.data && data.type === "trade") {
        data.data.forEach((trade: Trade) => {
          checkPriceAlert(trade, notificationList);
        });
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol]);

  const getFirebaseToken = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey:
          "BNxJhM0SD6JzSBWgn7k-GgYRMKIJl3VtHhPhC2sCtIiZOOPjnki9dGqSMSsEQYh2GntDOxYRrfOzgQAz0eNfqls",
      });
      if (token) {
        console.log("FCM Token:", token);
      } else {
        console.log("No se pudo obtener el token FCM.");
      }
    } catch (error) {
      console.error("Error obteniendo el token FCM:", error);
    }
  };

  const checkPriceAlert = (
    trade: Trade,
    notificationList: NotificationStateItem[]
  ) => {
    notificationList.forEach((notification) => {
      if (
        notification.companySymbol === trade.s &&
        ((notification.situation.value === "up" &&
          trade.p >= notification.price) ||
          (notification.situation.value === "down" &&
            trade.p <= notification.price))
      ) {
        sendPushNotification(trade, notification);
      }
    });
  };

  const sendPushNotification = (
    trade: Trade,
    notification: NotificationStateItem
  ) => {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration
          .showNotification(`Alert for ${notification.companyName.label}`, {
            body: `Symbol: ${trade.s}, Price: ${trade.p} reached your target of ${notification.price}`,
            icon: "/logo.png",
          })
          .catch((error) => {
            console.error("Error mostrando la notificación:", error);
          });
      });
    }
  };
};

export default useFinnhubWebSocket;
