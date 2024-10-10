"use client";
import { useEffect, useRef } from "react";
import { useAppSelector } from "@/Store";
import { SelectComponentItem } from "../Select/interfaces";
import FinnhubWebSocket from "@/app/hooks/useWebSocketFinnhub";

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

export const NotificationsComponent = () => {
  const itemsList = useAppSelector((state) => state.notification.items);
  const itemsListRef = useRef(itemsList);
  const webSocket = FinnhubWebSocket.getInstance();

  const subscribeToSymbol = (symbol: string) => {
    webSocket.subscribe(symbol);
  };

  const sendPushNotification = (
    trade: Trade,
    notification: NotificationStateItem
  ) => {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration
          .showNotification(`Alert for ${notification.companyName.label}`, {
            body: `Symbol: ${trade.s}, Price: ${trade.p} is ${notification.situation.label} than ${notification.price}`,
            icon: "/logo.png",
          })
          .catch((error) => {
            console.error("Error mostrando la notificación:", error);
          });
      });
    }
  };

  const checkPriceAlert = (trade: Trade) => {
    const notificationList = itemsListRef.current;
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

      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registrado con éxito:", registration);
        })
        .catch((error) => {
          console.log("Error en el registro del Service Worker:", error);
        });
    }

    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Permiso de notificaciones concedido");
        } else {
          console.log("Permiso de notificaciones denegado");
        }
      });
    }
  }, []);

  useEffect(() => {
    itemsListRef.current = itemsList;
  }, [itemsList]);

  useEffect(() => {
    const lastUpdateTimestamps: Record<string, number> = {};

    itemsList.forEach((item) => {
      subscribeToSymbol(item.companySymbol);
    });

    const messageHandler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      if (data.type === "trade" && data.data.length > 0) {
        const trade = data.data[0];
        const symbol = trade.s;
        const currentTime = Date.now();

        if (
          !lastUpdateTimestamps[symbol] ||
          currentTime - lastUpdateTimestamps[symbol] >= 5000
        ) {
          lastUpdateTimestamps[symbol] = currentTime;
          checkPriceAlert(trade);
        }
      }
    };

    if (itemsList.length > 0) {
      webSocket.setOnMessageHandler(messageHandler);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsList]);

  return null;
};
