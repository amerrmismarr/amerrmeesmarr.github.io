'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "6fc6d94c239678df1acb72af0d7c023b",
"assets/AssetManifest.json": "4c747e25e46d6d63e8fa6006787f1672",
"assets/assets/1.JPG": "838061b45e5a5adeb24edc04f671f37e",
"assets/assets/10.jpg": "6d440c3222f288e96944d6509efd37ed",
"assets/assets/11.jpg": "9e69605b0cd0dd81637c85c5211bcb38",
"assets/assets/2.JPG": "97db9d1240e0178f5c86e1df28bf9ed9",
"assets/assets/22.jpg": "365829eba322a349e46162ed5e1d0e26",
"assets/assets/3.JPG": "119f34ef6a2b1cdd48192e1a1371c375",
"assets/assets/4.JPG": "28956b3b7fd47ec880e1b7703bffd76e",
"assets/assets/44.jpg": "4d134e9e9898fdcb19d13f192d1d252b",
"assets/assets/5.JPG": "dca51ce45303dce70c7badcc74e828db",
"assets/assets/55.jpg": "1ae406d5abd9c76d9f8e759b8fe159dd",
"assets/assets/6.JPG": "4b24f69b73008960c9e0deec7c7b6fc9",
"assets/assets/66.jpg": "1bfd9602eafd56ce84928223a0373009",
"assets/assets/7.jpg": "93016e7c537a162680cdd4a62c652a4b",
"assets/assets/8.jpg": "8d8e326616e54e22bdfee1b941c32a4a",
"assets/assets/9.jpg": "14421ca8572e3b914e1b07d3c4bffa63",
"assets/assets/all-services.jpg": "2953561421843671cc48af644a39e0ad",
"assets/assets/botox.jpg": "5b5d7eddd22cefecc0166996a0b10f07",
"assets/assets/dentistry.jpg": "5bc4fc1a36b452d86ff434ec5b220f52",
"assets/assets/eleven.jpg": "0d48f98266778b2147a256db3658629e",
"assets/assets/facebook.jpg": "adb25360cd36b773b6ebc35e92df116c",
"assets/assets/fourteen.jpg": "91f241ae17f5a145d38eefc04cf4e278",
"assets/assets/hydra.jpg": "f6aa84302b4e59f15109febd6d8dfeb8",
"assets/assets/instagram.jpg": "6dd136ffd3d3aa068ddde477935a2a0a",
"assets/assets/logo.JPG": "2440f016caa845204bdac856901acaa9",
"assets/assets/logo2.jpg": "da494636a261f442d66c34df1738018d",
"assets/assets/services.jpg": "73d9ce36505c6b6c40d4c2527e1ea702",
"assets/assets/skin.jpg": "7a3f19ffa600fa442cd6a97909be1bea",
"assets/assets/skincare2.jpg": "5daaee2834dd830ebcb7110dffa5aab9",
"assets/assets/snapchat.png": "a04fda4c06bf440e4f144283654192d0",
"assets/assets/tajmeel.jpg": "a40037438c063d6b51243a9b38be81cd",
"assets/assets/thirteen.jpg": "39c81f05e97fef384d70835064218d44",
"assets/assets/three.jpg": "9378c39cc8b533cb641c25f04e196048",
"assets/assets/twelve.jpg": "8a6d418fa9b403d01e9e79cc0a1c3804",
"assets/assets/whatsapp.jpg": "aaecbfccb229f19bd8905c6311be7539",
"assets/assets/youtube.jpg": "2f074b91aff38359b11cda912f7b83a1",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "62ec8220af1fb03e1c20cfa38781e17e",
"assets/NOTICES": "fab4e0b87514a1fc9c865762e0030f8c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "45bec3a754fba62b2d8f23c38895f029",
"canvaskit/canvaskit.wasm": "1d5d2573e0bd9472b22426ea90cef22d",
"canvaskit/chromium/canvaskit.js": "0447cabd24385be0436ab8429d76621c",
"canvaskit/chromium/canvaskit.wasm": "6b171c8bd81b20ad5e747a465e52711b",
"canvaskit/skwasm.js": "831c0eebc8462d12790b0fadf3ab6a8a",
"canvaskit/skwasm.wasm": "2844ba91f5521d1b0349f01265ac1f92",
"canvaskit/skwasm.worker.js": "7ec8c65402d6cd2a341a5d66aa3d021f",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/logo.JPG": "2440f016caa845204bdac856901acaa9",
"index.html": "c51e2084f05d645755e6ce00faacc5a1",
"/": "c51e2084f05d645755e6ce00faacc5a1",
"logo.JPG": "2440f016caa845204bdac856901acaa9",
"main.dart.js": "2831341b53cd08044c36b855c08497c4",
"manifest.json": "b63a4ab12e8c31eb2a9a6926cf318117",
"version.json": "9ddeedb73299cef25e181777600e680d"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
