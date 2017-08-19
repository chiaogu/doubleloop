/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["assets/bricks.json","37faef6cf120b6e103c9c91e7f993838"],["assets/config.json","13d1faff44ad94e4c5929c2c1132977c"],["assets/images/ic_board.svg","8a76abefe66b589bdb9010f885dba8d3"],["assets/images/ic_delete.svg","3692f35f78a81ca903f1c3ea5ede00e2"],["assets/images/ic_explore.svg","1a9876c6c7adf78b6fb31e58048699cd"],["assets/images/ic_pause.svg","761606c8d6293bffe2ad879f7ebe4c05"],["assets/images/ic_play.svg","b4fb5809fd751aa2322bd2c8122c85de"],["assets/images/ic_recording.svg","a23ea919a4f3cbb15d511368524bf769"],["assets/images/ic_settings.svg","4cd9ca115bfcac41c23791fdc95baa4b"],["assets/images/ic_share.svg","4768a65e0a3ec0cbd7fa8ab029309020"],["assets/images/ic_stop.svg","7dd541fbf794789a5fafd210120c9564"],["assets/images/ic_upload.svg","440794628eaaa1960b45930e38fda650"],["assets/sounds/acoustic-snare.mp3","3df05e19b82b4f3ca173b01cebaa9053"],["assets/sounds/bass-drum-1.mp3","4e14a4fb0e65c2765fd27c8829991759"],["assets/sounds/chinese-cymbal.mp3","2bd530862ee73c6e2f85939ab0f3706c"],["assets/sounds/closed-hihat.mp3","d835484c9185dcde989c71068025575e"],["assets/sounds/crash-cymbal-1.mp3","dcf130acd3a2426d03f4db815080493b"],["assets/sounds/crash-cymbal-2.mp3","052b2561738ca9a700339f235ffbdab1"],["assets/sounds/electric-snare.mp3","38968da65321c1afe877b55c19193dc1"],["assets/sounds/hi-mid-tom.mp3","72a37f3b7431eebed37d568ba512f7e0"],["assets/sounds/high-floor-tom.mp3","afa8d51c18bddc1eaa17863d28971877"],["assets/sounds/high-tom.mp3","a755881c3c0521b1fa19b5f5a17a1600"],["assets/sounds/low-floor-tom.mp3","a000c00926a2d5af094b3f467d3606fd"],["assets/sounds/low-mid-tom.mp3","caea3613c5bc79da17610134cf064ead"],["assets/sounds/low-tom.mp3","68536ec29a20bc3076aa91bb54d67833"],["assets/sounds/open-hihat.mp3","58818c911bc8835721dc19b8480c104e"],["assets/sounds/pedal-hihat.mp3","f5195f122f430eadecc52e7e4b3434a9"],["assets/sounds/ride-bell.mp3","538d0139ac7d5907135b30ad6176b1d8"],["assets/sounds/ride-cymbal-1.mp3","ec46f0f6e688e5130840b5c10d9d543f"],["assets/sounds/side-stick.mp3","521b134205186d738bbd0705e0ffe4bd"],["assets/sounds/splash-cymbal.mp3","c8fe30daf7d46a451d70e9be32a43f70"],["index.html","bb960d6d5e029074e5528e077bb9cd8c"],["inline.ce99fbd1affb4cd51869.bundle.js","9601934d27d7da699cc8e5eb0664e504"],["main.0f2b65973b22b2c2742a.bundle.js","285fa6c3a74a8922a37ee497b87d61ab"],["manifest.json","683294379345fec2c799f64511ad0ae4"],["polyfills.f77454f386e1728adda2.bundle.js","72735c82aec0afdc8e84dcfdbc5208e2"],["scripts.17ce4e8dcf9ccf7ee80f.bundle.js","59ec4a67837ccf10ca5e83ed4e2d069f"],["styles.b4cda1c17a8e4758af28.bundle.css","b4cda1c17a8e4758af2893ecad4c02fd"],["vendor.cd885c759c35501515bd.bundle.js","8dc9024c849aea75d21e14a2b31fa031"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







