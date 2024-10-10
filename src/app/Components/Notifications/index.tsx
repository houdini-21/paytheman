"use client";
import { useEffect, useRef } from "react";
import { useAppSelector } from "@/Store";
import { SelectComponentItem } from "../Select/interfaces";
import FinnhubWebSocket from "@/app/hooks/useWebSocketFinnhub";

interface Trade {
  /** Symbol of the stock being traded */
  s: string;
  /** Price of the stock */
  p: number;
}

interface NotificationStateItem {
  /** Unique identifier for the notification */
  id: number;
  /** Company name associated with the notification */
  companyName: SelectComponentItem;
  /** Company symbol associated with the notification */
  companySymbol: string;
  /** The situation ('up' or 'down') determining the alert trigger */
  situation: SelectComponentItem;
  /** Price at which the alert should trigger */
  price: number;
}

/**
 * Component responsible for handling notifications when price thresholds are met.
 * It subscribes to stock symbols and sends notifications based on price conditions.
 *
 * @returns `null` - This component renders nothing to the DOM.
 */
export const NotificationsComponent = () => {
  /** List of notification items from Redux store */
  const itemsList = useAppSelector((state) => state.notification.items);
  /** Mutable reference for itemsList */
  const itemsListRef = useRef(itemsList);
  /** Instance of the Finnhub WebSocket for subscribing to stock symbols */
  const webSocket = FinnhubWebSocket.getInstance();

  /**
   * Subscribes to a stock symbol through the WebSocket.
   *
   * @param symbol - The stock symbol to subscribe to.
   */
  const subscribeToSymbol = (symbol: string) => {
    webSocket.subscribe(symbol);
  };

  /**
   * Sends a push notification to the user when a price threshold is met.
   *
   * @param trade - The trade data containing stock symbol and price.
   * @param notification - The notification configuration with threshold and conditions.
   */
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
            console.error("Error showing notification:", error);
          });
      });
    }
  };

  /**
   * Checks whether the current trade price matches the alert conditions.
   * Sends a notification if the condition is met.
   *
   * @param trade - The trade data containing stock symbol and price.
   */
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

  /**
   * Registers service workers and requests notification permission on component mount.
   * Logs the registration status or any errors encountered.
   */
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered successfully:", registration);
        })
        .catch((error) => {
          console.error("Error registering Service Worker:", error);
        });

      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered successfully:", registration);
        })
        .catch((error) => {
          console.log("Error registering Service Worker:", error);
        });
    }

    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted");
        } else {
          console.log("Notification permission denied");
        }
      });
    }
  }, []);

  /**
   * Updates the `itemsListRef` whenever the `itemsList` changes.
   */
  useEffect(() => {
    itemsListRef.current = itemsList;
  }, [itemsList]);

  /**
   * Sets up WebSocket subscriptions for each company symbol and processes incoming messages.
   * Checks price alerts for trades that meet the conditions.
   */
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
