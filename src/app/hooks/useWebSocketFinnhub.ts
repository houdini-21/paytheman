type Subscription = {
  type: string;
  symbol: string;
};

class FinnhubWebSocket {
  private static instance: FinnhubWebSocket | null = null; // Singleton instance
  private messageHandlers: ((event: MessageEvent) => void)[] = [];
  private socket: WebSocket | null = null;
  private activeSubscriptions: Set<string>;
  private messageQueue: Subscription[];
  private isSocketOpen: boolean;
  private reconnectAttempts: number;
  private maxReconnectAttempts: number;
  private reconnectDelay: number;
  private isReconnecting: boolean;

  private constructor() {
    this.activeSubscriptions = new Set();
    this.messageQueue = [];
    this.isSocketOpen = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.isReconnecting = false;

    this.connect();
  }

  // Método estático para obtener la instancia singleton
  public static getInstance(): FinnhubWebSocket {
    if (!FinnhubWebSocket.instance) {
      FinnhubWebSocket.instance = new FinnhubWebSocket();
    }
    return FinnhubWebSocket.instance;
  }

  private connect() {
    if (
      this.socket &&
      (this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING)
    ) {
      console.log("WebSocket is already open or connecting. Skipping connect.");
      return;
    }

    this.socket = new WebSocket(
      `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY_WS}`
    );

    this.socket.onopen = () => {
      this.isSocketOpen = true;
      this.isReconnecting = false;
      this.reconnectAttempts = 0;
      console.log("WebSocket connected.");
      this.flushMessageQueue(); // Enviar los mensajes encolados
    };

    this.socket.onclose = () => {
      this.isSocketOpen = false;
      console.log("WebSocket closed.");
      if (!this.isReconnecting) {
        this.reconnect();
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.isSocketOpen = false;
      if (this.socket) {
        this.socket.close(); // Cerrar explícitamente el socket en caso de error
      }
    };
  }

  public subscribe(symbol: string) {
    if (!this.activeSubscriptions.has(symbol)) {
      const subscriptionMessage: Subscription = {
        type: "subscribe",
        symbol: symbol,
      };

      if (this.isSocketOpen && this.socket) {
        this.socket.send(JSON.stringify(subscriptionMessage));
        console.log(`Subscribed to ${symbol}`);
      } else {
        this.messageQueue.push(subscriptionMessage);
        console.log(`Queued subscription for ${symbol}`);
      }

      this.activeSubscriptions.add(symbol);
    } else {
      console.log(`Already subscribed to ${symbol}`);
    }
  }

  public unsubscribe(symbol: string) {
    if (this.activeSubscriptions.has(symbol)) {
      const unsubscriptionMessage: Subscription = {
        type: "unsubscribe",
        symbol: symbol,
      };

      if (this.isSocketOpen && this.socket) {
        this.socket.send(JSON.stringify(unsubscriptionMessage));
        console.log(`Unsubscribed from ${symbol}`);
      } else {
        this.messageQueue.push(unsubscriptionMessage);
        console.log(`Queued unsubscription for ${symbol}`);
      }

      this.activeSubscriptions.delete(symbol);
    } else {
      console.log(`Not subscribed to ${symbol}`);
    }
  }

  // public setOnMessageHandler(handler: (event: MessageEvent) => void) {
  //   if (this.socket) {
  //     this.socket.onmessage = handler;
  //   }
  // }

  public setOnMessageHandler(handler: (event: MessageEvent) => void) {
    this.messageHandlers.push(handler);
    if (this.socket) {
      this.socket.onmessage = (event: MessageEvent) => {
        this.messageHandlers.forEach((h) => h(event));
      };
    }
  }

  private reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * this.reconnectAttempts;
      console.log(`Attempting to reconnect in ${delay / 1000} seconds...`);

      this.isReconnecting = true;

      setTimeout(() => {
        if (!this.isSocketOpen) {
          this.connect();
        }
      }, delay);
    } else {
      console.error("Max reconnect attempts reached. Could not reconnect.");
    }
  }

  private flushMessageQueue() {
    while (this.messageQueue.length > 0 && this.isSocketOpen && this.socket) {
      const message = this.messageQueue.shift();
      if (message) {
        this.socket.send(JSON.stringify(message));
        console.log(`Flushed message: ${message.type} ${message.symbol}`);
      }
    }
  }
}

export default FinnhubWebSocket;
