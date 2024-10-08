"use client";
import { useEffect } from "react";
import { useAppSelector } from "@/Store";
// import { SelectComponentItem } from "../Components/Select/interfaces";
import { messaging, getToken } from "./firebaseConfig";

// interface Trade {
//   s: string;
//   p: number;
// }

// interface NotificationStateItem {
//   id: number;
//   companyName: SelectComponentItem;
//   companySymbol: string;
//   situation: SelectComponentItem;
//   price: number;
// }

const useWebSocket = () => {
  const notificationList = useAppSelector((state) => state.notification.items);



    // const socket = new WebSocket(
    //   `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY_WS}`
    // );

    // socket.onopen = () => {
    //   if (notificationList.length === 0) {
    //     console.log("No notifications to subscribe");
    //     socket.close();
    //     return;
    //   }
    //   notificationList.forEach((notification) => {
    //     socket.send(
    //       JSON.stringify({
    //         type: "subscribe",
    //         symbol: notification.companySymbol,
    //       })
    //     );
    //   });
    // };

    // socket.onmessage = (event) => {
    //   const data = JSON.parse(event.data);

    //   if (data && data.data && data.type === "trade") {
    //     data.data.forEach((trade: Trade) => {
    //       checkPriceAlert(trade, notificationList);
    //     });
    //   }
    // };

    // socket.onclose = () => {
    //   console.log("WebSocket disconnected");
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationList]);


  // const checkPriceAlert = (
  //   trade: Trade,
  //   notificationList: NotificationStateItem[]
  // ) => {
  //   notificationList.forEach((notification) => {
  //     if (
  //       notification.companySymbol === trade.s &&
  //       ((notification.situation.value === "up" &&
  //         trade.p >= notification.price) ||
  //         (notification.situation.value === "down" &&
  //           trade.p <= notification.price))
  //     ) {
  //       sendPushNotification(trade, notification);
  //     }
  //   });
  // };

  // const sendPushNotification = (
  //   trade: Trade,
  //   notification: NotificationStateItem
  // ) => {
  //   if (Notification.permission === "granted") {
  //     navigator.serviceWorker.ready.then((registration) => {
  //       registration
  //         .showNotification(`Alert for ${notification.companyName.label}`, {
  //           body: `Symbol: ${trade.s}, Price: ${trade.p} reached your target of ${notification.price}`,
  //           icon: "/logo.png",
  //         })
  //         .catch((error) => {
  //           console.error("Error mostrando la notificación:", error);
  //         });
  //     });
  //   }
  // };
};

export default useWebSocket;
