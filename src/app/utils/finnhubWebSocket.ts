"use client";
import { useEffect } from "react";
import { messaging, getToken } from "./firebaseConfig";

interface Trade {
  s: string;
  p: number;
}

const useFinnhubWebSocket = (symbol: string) => {
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

    // const socket = new WebSocket(
    //   `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`
    // );

    // socket.onopen = () => {
    //   socket.send(JSON.stringify({ type: "subscribe", symbol }));
    // };

    // socket.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   if (data && data.data && data.type === "trade") {
    //     data.data.forEach((trade: Trade) => {
    //       sendPushNotification(trade);
    //       return;
    //     });
    //     // socket.close();
    //   }
    // };

    // socket.onclose = () => {
    //   console.log("WebSocket disconnected");
    // };
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

  const sendPushNotification = (trade: Trade) => {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration
          .showNotification("Nuevo trade", {
            body: `Symbol: ${trade.s}, Price: ${trade.p}`,
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
