if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>n(e,i),o={module:{uri:i},exports:c,require:r};s[i]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"afab99f61c96317f7943f59bf6460984"},{url:"/_next/static/chunks/117-704022bfea3e63f2.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/13b76428-dd7517559418935c.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/30a37ab2-9d4a193ab3775048.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/369.7f6cac2643723a71.js",revision:"7f6cac2643723a71"},{url:"/_next/static/chunks/371-9ba08a8ff3506a90.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/3975359d.0e50344425380de0.js",revision:"0e50344425380de0"},{url:"/_next/static/chunks/47-f016d479fd2ad9d8.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/748-b77ff993d143269b.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/880-fe6bae33df80166f.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/8e1d74a4-1c2eb721ee7586bc.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/app/_not-found/page-d3f816d2b08e81b8.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/app/dashboard/layout-f64ff07af9bb11bb.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/app/dashboard/notification/page-b0681680d670d2f4.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/app/dashboard/settings/page-a58ec34ca855d0f3.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/app/dashboard/stocks/page-9efacb48db0121e5.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/app/layout-5e37516e5bec073d.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/app/page-0a8b9a7b052e6eac.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/fd9d1056-ff2457685aea6a43.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/main-a255588d160cd888.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/main-app-e55033f8636055fc.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-6ace1d49bb446f7e.js",revision:"oDUVf5lkfWr8llMu1E0AE"},{url:"/_next/static/css/1b5d19eeadf69a6f.css",revision:"1b5d19eeadf69a6f"},{url:"/_next/static/css/5a56e3c1761e58ad.css",revision:"5a56e3c1761e58ad"},{url:"/_next/static/css/786f498a02edeeaa.css",revision:"786f498a02edeeaa"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/_next/static/oDUVf5lkfWr8llMu1E0AE/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/oDUVf5lkfWr8llMu1E0AE/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/firebase-messaging-sw.js",revision:"8dd872fb1e3782a90f7f35d53ef4506d"},{url:"/icons/icon-192x192.png",revision:"5727640ae959e75f04980f4312bad49d"},{url:"/icons/icon-512x512.png",revision:"181c505340a06fc30aad5ff7b3e54bc2"},{url:"/logo.png",revision:"b3ffb8d850db728f4de468e047c38c95"},{url:"/manifest.json",revision:"e3b6e5e1e93634465ccc3c4200d0adbe"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
