"use client";
import { messaging, getToken } from "@/app/utils/firebaseConfig";

const getFirebaseToken = async () => {
  if (typeof window !== "undefined") {
    try {
      const token = await getToken(messaging, {
        vapidKey:
          "BNxJhM0SD6JzSBWgn7k-GgYRMKIJl3VtHhPhC2sCtIiZOOPjnki9dGqSMSsEQYh2GntDOxYRrfOzgQAz0eNfqls",
      });
      return token;
    } catch (error) {
      console.error("Error getting Firebase token:", error);
    }
  }
};

export { getFirebaseToken };
