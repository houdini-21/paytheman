type Subscription = {
  /** Type of message, either "subscribe" or "unsubscribe" */
  type: string;
  /** The stock symbol to subscribe/unsubscribe to/from */
  symbol: string;
};

/**
 * Class representing a WebSocket connection to the Finnhub API.
 * Implements a singleton pattern to ensure only one instance is used.
 */
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

  /**
   * Private constructor for the singleton instance.
   * Initializes state and establishes the WebSocket connection.
   */
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

  /**
   * Static method to retrieve the singleton instance.
   * @returns The singleton instance of `FinnhubWebSocket`.
   */
  public static getInstance(): FinnhubWebSocket {
    if (!FinnhubWebSocket.instance) {
      FinnhubWebSocket.instance = new FinnhubWebSocket();
    }
    return FinnhubWebSocket.instance;
  }

  /**
   * Establishes the WebSocket connection to Finnhub. Handles reconnections
   * and ensures only one active connection.
   */
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
      this.flushMessageQueue(); // Send any queued messages
    };

    this.socket.onclose = () => {
      this.isSocketOpen = false;
      if (!this.isReconnecting) {
        this.reconnect();
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.isSocketOpen = false;
      if (this.socket) {
        this.socket.close(); // Explicitly close the socket on error
      }
    };
  }

  /**
   * Subscribes to a stock symbol on the WebSocket.
   * If the WebSocket is not open, queues the subscription request.
   *
   * @param symbol - The stock symbol to subscribe to.
   */
  public subscribe(symbol: string) {
    if (!this.activeSubscriptions.has(symbol)) {
      const subscriptionMessage: Subscription = {
        type: "subscribe",
        symbol: symbol,
      };

      if (this.isSocketOpen && this.socket) {
        this.socket.send(JSON.stringify(subscriptionMessage));
      } else {
        this.messageQueue.push(subscriptionMessage);
      }

      this.activeSubscriptions.add(symbol);
    } else {
      console.log(`Already subscribed to ${symbol}`);
    }
  }

  /**
   * Unsubscribes from a stock symbol on the WebSocket.
   * If the WebSocket is not open, queues the unsubscription request.
   *
   * @param symbol - The stock symbol to unsubscribe from.
   */
  public unsubscribe(symbol: string) {
    if (this.activeSubscriptions.has(symbol)) {
      const unsubscriptionMessage: Subscription = {
        type: "unsubscribe",
        symbol: symbol,
      };

      if (this.isSocketOpen && this.socket) {
        this.socket.send(JSON.stringify(unsubscriptionMessage));
      } else {
        this.messageQueue.push(unsubscriptionMessage);
      }

      this.activeSubscriptions.delete(symbol);
    } else {
      console.log(`Not subscribed to ${symbol}`);
    }
  }

  /**
   * Registers a message handler for incoming WebSocket messages.
   * Allows multiple handlers to be registered.
   *
   * @param handler - Function to handle incoming WebSocket messages.
   */
  public setOnMessageHandler(handler: (event: MessageEvent) => void) {
    this.messageHandlers.push(handler);
    if (this.socket) {
      this.socket.onmessage = (event: MessageEvent) => {
        this.messageHandlers.forEach((h) => h(event));
      };
    }
  }

  /**
   * Handles reconnection logic if the WebSocket connection is lost.
   * Retries up to the configured number of reconnection attempts.
   */
  private reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * this.reconnectAttempts;

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

  /**
   * Flushes the message queue, sending any queued subscription/unsubscription requests.
   * This is called once the WebSocket connection is open.
   */
  private flushMessageQueue() {
    while (this.messageQueue.length > 0 && this.isSocketOpen && this.socket) {
      const message = this.messageQueue.shift();
      if (message) {
        this.socket.send(JSON.stringify(message));
      }
    }
  }
}

export default FinnhubWebSocket;
