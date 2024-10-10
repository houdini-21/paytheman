self.addEventListener("install", (event) => {
  console.log("Service Worker: Instalado");
  event.waitUntil(
    caches.open("static-cache-v1").then((cache) => {
      return cache.addAll([
        "/",
        "/manifest.json",
        "/icons/icon-192x192.png",
        "/icons/icon-512x512.png",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activado");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== "static-cache-v1") {
            console.log("Service Worker: Limpiando caches antiguos");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Service Worker: Interceptando request", event.request.url);
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

self.addEventListener("push", function (event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Notificación Push";
  const options = {
    body: data.body || "Mensaje de la notificación",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
