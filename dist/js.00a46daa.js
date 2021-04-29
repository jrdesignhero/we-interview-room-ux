// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"css/styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

require("./../css/styles.scss");

//hijack target ux
var PageExperience = function () {
  var target = document.querySelector(".big-sur-square-leather-sofa-collection");
  var targetAnchors = target.querySelectorAll("a");

  var modifyProductGrid = function modifyProductGrid() {
    target.style.border = "solid 3px red";
    return true;
  };

  var hijackTarget = function hijackTarget(func) {
    targetAnchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        func();
        e.preventDefault();
        e.stopPropagation();
      });
    });
  };

  var init = function init(func) {
    modifyProductGrid();
    hijackTarget(func);
  };

  return {
    init: init
  };
}();

var TryBeforeYouBuy = function () {
  var createDOMElement = function createDOMElement(element, attributes, children) {
    var temp = document.createElement(element);
    attributes.forEach(function (attribute) {
      temp[attribute.name] = attribute.val;
    });

    if (children) {
      children.forEach(function (child) {
        temp.appendChild(child);
      });
    }

    return temp;
  };

  var overlay = createDOMElement('div', [{
    name: "id",
    val: "overlay-bg"
  }]);
  var buyNow = createDOMElement('a', [{
    name: "className",
    val: "add2cart"
  }, {
    name: "href",
    val: "https://www.potterybarn.com/products/big-sur-square-leather-sofa-collection/?pkey=cbig-sur-square-sofas"
  }, {
    name: "innerHTML",
    val: "Buy Now"
  }]);
  var modalCloseBtn = createDOMElement('a', [{
    name: "id",
    val: "closemodal"
  }, {
    name: "href",
    val: "#"
  }, {
    name: "innerHTML",
    val: "Close Modal"
  }]);
  var tryBtn_1 = createDOMElement('li', [{
    name: "className",
    val: "try-title"
  }, {
    name: "innerHTML",
    val: "Room 1"
  }]);
  tryBtn_1.dataset.bg = "room_1";
  var tryBtn_2 = createDOMElement('li', [{
    name: "className",
    val: "try-title"
  }, {
    name: "innerHTML",
    val: "Room 2"
  }]);
  tryBtn_2.dataset.bg = "room_2";
  var tryBtn_3 = createDOMElement('li', [{
    name: "className",
    val: "try-title"
  }, {
    name: "innerHTML",
    val: "Room 3"
  }]);
  tryBtn_3.dataset.bg = "room_3";
  var tryBtn_4 = createDOMElement('li', [{
    name: "className",
    val: "try-title"
  }, {
    name: "innerHTML",
    val: "Room 4"
  }]);
  tryBtn_4.dataset.bg = "room_4";
  var tryBtn_5 = createDOMElement('li', [{
    name: "className",
    val: "try-title"
  }, {
    name: "innerHTML",
    val: "Room 5"
  }]);
  tryBtn_5.dataset.bg = "room_5";
  var roomBtns = [tryBtn_1, tryBtn_2, tryBtn_3, tryBtn_4, tryBtn_5];
  var tryBtns = createDOMElement('ul', [{
    name: "className",
    val: "try-btn"
  }], roomBtns);
  var header = createDOMElement('h3', [{
    name: "className",
    val: "try-before"
  }]);
  header.innerHTML = "Try Before<br />You Buy";
  var jrDisclaimer = createDOMElement('p', [{
    name: "className",
    val: "jr-disclaimer"
  }]);
  jrDisclaimer.innerHTML = "As low as $272/month or 0% APR";
  var jrPrice = createDOMElement('p', [{
    name: "className",
    val: "jr-price"
  }]);
  jrPrice.innerHTML = "$2,999 - $3,399";
  var jrTitle = createDOMElement('h1', [{
    name: "className",
    val: "jr-title"
  }]);
  jrTitle.innerHTML = "Big Sur Square Arm Leather Sofa";
  var info = createDOMElement('div', [{
    name: "id",
    val: "info-container"
  }], [jrTitle, jrPrice, jrDisclaimer]);
  var roomWindoImg = createDOMElement('img', [{
    name: "className",
    val: "w-100"
  }, {
    name: "src",
    val: "https://raw.githubusercontent.com/jrdesignhero/we-interview-room-ux/main/src/img/couch.png"
  }]);
  var roomWindow = createDOMElement('div', [{
    name: "id",
    val: "room-window"
  }, {
    name: "className",
    val: "room_1"
  }], [roomWindoImg]);
  var col_1 = createDOMElement('div', [{
    name: "className",
    val: "jr-col_1"
  }], [roomWindow, info]);
  var col_2 = createDOMElement('div', [{
    name: "className",
    val: "jr-col_2"
  }], [header, tryBtns, buyNow, modalCloseBtn]);
  var row = createDOMElement('div', [{
    name: "className",
    val: "jr-row"
  }], [col_1, col_2]);
  var modal = createDOMElement('div', [{
    name: "id",
    val: "jr-modal"
  }], [row]); // let tag = document.querySelector('#tag');

  var showOverlay = function showOverlay() {
    overlay.style.display = "block";
    modal.style.display = "block";
  };

  var hideOverlay = function hideOverlay() {
    overlay.style.display = "none";
    modal.style.display = "none";
  };

  var switchBg = function switchBg(newBg) {
    roomWindow.className = newBg;
    tag.innerHTML = newBg;
  };

  var bindRoomBtnUI = function bindRoomBtnUI() {
    document.querySelector('body').appendChild(overlay);
    document.querySelector('body').appendChild(modal);
  };

  var init = function init() {
    bindRoomBtnUI();
    overlay.addEventListener("click", function () {
      hideOverlay();
    });
    roomBtns.forEach(function (roomBtn) {
      roomBtn.addEventListener('click', function (e) {
        switchBg(e.target.dataset.bg);
      });
    });
    modalCloseBtn.addEventListener("click", function (e) {
      hideOverlay();
      e.preventDefault();
      e.stopPropagation();
    });
  };

  return {
    init: init,
    showOverlay: showOverlay
  };
}(); //kickoff


TryBeforeYouBuy.init();
PageExperience.init(TryBeforeYouBuy.showOverlay);
},{"./../css/styles.scss":"css/styles.scss"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55098" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map