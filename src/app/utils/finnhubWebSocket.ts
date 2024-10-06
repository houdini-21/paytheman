import { useEffect, useState } from "react";

interface Trade {
  s: string; // Símbolo
  p: number; // Precio
}

const useFinnhubWebSocket = (symbol: string) => {
  const [message, setMessage] = useState<Trade[] | null>(null);

  useEffect(() => {
    const socket = new WebSocket(
      `wss://ws.finnhub.io?token=crvgfehr01qkji45k8tgcrvgfehr01qkji45k8u0`
    );

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send(
        JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      socket.close();

      if (data && data.data) {
        setMessage(data.data);
        data.data.forEach((trade: Trade) => {
          sendPushNotification(trade);
          return;
        });
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, [symbol]);

  const sendPushNotification = (trade: Trade) => {
    if (Notification.permission === "granted") {
      new Notification("New trade alert", {
        body: `${trade.s} is now at $${trade.p}`,
        icon: "/logo.png",
      });
    }
  };

  return message;
};

export default useFinnhubWebSocket;
