/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};


self.fallback = async request => {
  // https://developer.mozilla.org/en-US/docs/Web/API/RequestDestination
  switch (request.destination) {
    case 'document':
      if (true) return caches.match("/public/manifest.webmanifest", {
        ignoreSearch: true
      });
    case 'image':
      if (true) return caches.match("/public/male.svg", {
        ignoreSearch: true
      });
    case 'audio':
      if (false) {}
    case 'video':
      if (false) {}
    case 'font':
      if (true) return caches.match("/font.woff2", {
        ignoreSearch: true
      });
    case '':
      if (false) {}
    default:
      return Response.error();
  }
};
/******/ })()
;