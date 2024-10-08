"use client";
import { useEffect } from "react";
import Link from "next/link";
import { SiRobinhood } from "react-icons/si";
import { TopBarPropsItem } from "./interfaces";
import { TopBarItem } from "./TopBarItem";

export const TopBar = ({ items }: { items: TopBarPropsItem[] }) => {
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
        } else {
          console.log("Permiso de notificaciones denegado");
        }
      });
    } else {
      console.log("Permiso de notificaciones ya concedido");
    }
  }, []);

  return (
    <nav className="flex items-center py-3 px-12 flex-wrap">
      <Link href="#" className="p-2 mr-4 inline-flex items-center">
        <SiRobinhood className="text-3xl dark:text-white text-slate-800" />
      </Link>
      <div
        className="top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto mt-5 lg:mt-0"
        id="navigation"
      >
        <div className="flex-row ml-auto lg:w-auto w-full lg:items-center items-start flex h-auto">
          {items.map((item, index) => {
            return <TopBarItem key={index} name={item.name} path={item.path} />;
          })}
        </div>
      </div>
    </nav>
  );
};
