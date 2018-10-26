// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"main.ts":[function(require,module,exports) {
document.addEventListener('DOMContentLoaded', function () {
  // Zmienne które zajmują się przechowywaniem wartości czasu.
  var time = 0;
  var seconds = 0;
  var minutes = 0;
  var hours = 0; // Pobieranie elementów reprezentujących wyniki z drzewa DOM. 

  var secondEl = document.querySelector('.second');
  var minuteEl = document.querySelector('.minute');
  var hourEl = document.querySelector('.hour'); // Zegar który tyka co 1000ms. 

  var clock = setInterval(function () {
    // Zwiększanie się ilości czasu.
    time = time + 1; // Wyliczanie sekund poprzez dzielenie modulo.

    seconds = time % 60; // Wyliczanie minut poprzez dzielenie modulo.

    minutes = Math.floor(time / 60) % 60; // Wyliczanie godzin poprzez dzielenie modulo.

    hours = Math.floor(time / 3600); // If - wykona się wtedy gdy ilość sekund będzie mniejsza niż 10.

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    ; // If - wykona się wtedy gdy ilość minut będzie mniejsza niż 10.

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    ; // If - wykona się wtedy gdy ilość godzin będzie mniejsza niż 10.

    if (hours < 10) {
      hours = "0" + hours;
    }

    ; // Aktualizacja czasu w htmlu.

    secondEl.innerText = seconds;
    minuteEl.innerText = minutes;
    hourEl.innerText = hours;
  }, 1000); //Ilość surowców.

  var materials = {
    wood: 0,
    stone: 0,
    gold: 0
  }; //Przychód poszczególnych surowców.

  var incomeMaterials = {
    wood: 1,
    stone: 1,
    gold: 1
  }; // Pojemnośc magazynów.

  var storageCapacity = {
    wood: 20,
    stone: 20
  }; // Zmienne, które przechowuje ilość robotników.

  var worker = 5; // Zmienne, które przechowują maksymalną ilość robotników.

  var maxWorker = 10; // Pobieranie elementów reprezentujących wyniki z drzewa DOM.

  var woodEl = document.querySelector('.wood');
  var stoneEl = document.querySelector('.stone');
  var goldEl = document.querySelector('.gold');
  var workerEl = document.querySelector('.worker');
  var maxWoodEl = document.querySelector('.max-wood');
  var maxStoneEl = document.querySelector('.max-stone'); // Zwiększanie się ilości drewna i kamienia co 1000ms.

  var intervalWoodStoneIncome = setInterval(function () {
    // Zatrzymanie przychodu drewna i kamienia na koniec gry.
    if (endOfTheGame) {
      clearInterval(intervalWoodStoneIncome);
    }

    ; // Zwiększenie ilości drewna gdy jest możliwe jego wyprodukowanie.  

    if (materials.wood < storageCapacity.wood) {
      materials.wood = materials.wood + incomeMaterials.wood; // Ilość drewna równa jego maksymalnej ilości.

      if (materials.wood >= storageCapacity.wood) {
        materials.wood = storageCapacity.wood;
      }

      ;
      woodEl.innerText = materials.wood;
    } // Zwiększenie ilości kamienia gdy jest możliwe jego wyprodukowanie.


    if (materials.stone < storageCapacity.stone) {
      materials.stone = materials.stone + incomeMaterials.stone; // Ilość kamienia równa jego maksymalnej ilości.

      if (materials.stone >= storageCapacity.stone) {
        materials.stone = storageCapacity.stone;
      }

      ;
      stoneEl.innerText = materials.stone;
    }

    ;
  }, 1000); // Zwiększanie ilość złota co 3000ms.

  var intervalGoldIncome = setInterval(function () {
    // Zatrzymanie przychodu złota.
    if (endOfTheGame) {
      clearInterval(intervalGoldIncome);
    }

    ; // Zwiększenie się ilości złota.

    materials.gold = materials.gold + incomeMaterials.gold;
    goldEl.innerText = materials.gold;
  }, 3000); // Dodawanie określonych bonusów po wybudowaniu budynków.

  var addBonus = function addBonus(value) {
    // Zwiększenie przychodu drewna.
    if (value === 'woodIncome') {
      incomeMaterials.wood += 2; // Zwiększenie przychodu kamienia.   
    } else if (value === 'stoneIncome') {
      incomeMaterials.stone += 2; // Zwiększenie przychodu złota.    
    } else if (value === 'goldIncome') {
      incomeMaterials.gold += 2; // Nowy robotnik.    
    } else if (value === 'newWorker') {
      if (worker < maxWorker) {
        worker += 1;
        workerEl.innerText = worker;
      }

      ; // Powiększenie magazynu drewna.    
    } else if (value === 'enlargingTheWarehouseWood') {
      storageCapacity.wood += 10;
      maxWoodEl.innerText = storageCapacity.wood; // Powiększenie magazynu kamienia.    
    } else if (value === 'enlargingTheWarehouseStone') {
      storageCapacity.stone += 10;
      maxStoneEl.innerText = storageCapacity.stone; // Zwycięstwo.    
    } else if (value === 'victory') {
      victory();
    }

    ;
  }; // Zmienna, która określa czy licznik budowy jest włączony; domyślnie - false.


  var setConstructionTimer = false; // Zmienna, która określa czy skończyła się gra; domyślnie - false.

  var endOfTheGame = false; // Pobieranie elementu reprezentującego wynik z drzewa DOM. 

  var boardEl = document.querySelector('.board'); // Fukcja, która wyświetla nowy budynek w htmlu.

  var construction = function construction(type) {
    // Tworzenie nowego diva, który stanie się budynkiem.
    var newBuilding = document.createElement('div'); // Przypisanie mu odpowiednich klas.

    newBuilding.classList.add(type);
    newBuilding.classList.add('new-building'); // Dodanie budynku do htmla. 

    boardEl.appendChild(newBuilding);
  }; // Pobieranie elementów reprezentujących wyniki z drzewa DOM. 


  var timerEl = document.querySelector('.timer');
  var buildingBoxEl = document.querySelector('.building-box'); // Wybuduj budynek.

  var constructionBuilding = function constructionBuilding(object) {
    // Nastąpi rozpoczęcie budowy.
    if (materials.wood >= object.wood && materials.stone >= object.stone && materials.gold >= object.gold && setConstructionTimer === false && endOfTheGame === false) {
      // Włączenie licznika budowy.
      setConstructionTimer = true; // Pobranie surowców.

      materials.wood -= object.wood;
      materials.stone -= object.stone;
      materials.gold -= object.gold; // Pojawienie się budynku w htmlu.

      construction(object.name); // Funkcja powoduje pojawienie się licznika budowy w htmlu; aktywuje bonus związany ze zbudowanym budynkiem.

      constructionOfTheBuilding(timerInProgress(object.time), object.bonus);
    }

    ;
  }; // Funkcja, która zwraca czas budowy poszczególnych budynków.


  var timerInProgress = function timerInProgress(time) {
    // Zmienna która przechowuje czas budowy.
    var constructionTime = Math.floor(time / worker); // Pojawienie się komunikatu o czasie budowy w htmlu.

    timerEl.innerText = "Czas budowy: " + constructionTime;
    buildingBoxEl.classList.add('opacity-05'); // Zwrócenie zmiennej.

    return constructionTime;
  }; // Funkcja, która wyświetla czas budowy budynku w htmlu.


  var constructionOfTheBuilding = function constructionOfTheBuilding(constructionTime, value) {
    var contructionInProgress = setInterval(function () {
      // Zmniejszanie się czasu budowy co 1000ms.
      constructionTime--; // Aktualizacja czasu budowy w htmlu.

      timerEl.innerText = "Czas budowy: " + constructionTime; // Wyłączenie licznika i aktywacja bonusów za wybudowany budynek.

      if (constructionTime < 1) {
        // Zmiana wartości zmiennej na 0, gdyż skończył się czas budowy.
        constructionTime = 0;
        setConstructionTimer = false; // Wyczyszczenie htmla.

        timerEl.innerText = '';
        buildingBoxEl.classList.remove('opacity-05');
        buildingBoxEl.classList.add('opacity-1'); // Wyłączenie licznika.

        clearInterval(contructionInProgress); // Wywołanie bonusu jaki się dostaje za wybudowanie budynu. 

        addBonus(value);
      }

      ;
    }, 1000);
  }; // Pobieranie elementów reprezentujących wyniki z drzewa DOM. 


  var winBoxEl = document.querySelector('.win-box');
  var infoBoxEl = document.querySelector('.info-box'); // Funkcja, która informuje gracza o wygraniu gry.

  var victory = function victory() {
    // Zmiana wartości zmiennej, która przechowuje informacje o tym czy gra została wygrana.
    endOfTheGame = true; // Zatrzymanie czasu.

    clearInterval(clock); // Wyświetlenie się boxa z napisem 'wygrałeś'.

    winBoxEl.classList.add('opacity-1'); // Dodanie przeźroczystości na poszczególne sekcja planszy.

    infoBoxEl.classList.add('opacity-05'); // Pobieranie elementu reprezentującego wynik z drzewa DOM. 

    var newBuildingEls = document.querySelectorAll('.new-building'); /// <---- co tutaj? Array nie pasuje
    // Dodanie do każdego elementu stylu poprzez pętle. 

    newBuildingEls.forEach(function (el) {
      el.classList.add('opacity-05');
    });
  }; // Zbiór informacji na temat budynków.                    


  var buildings = [{
    name: 'sawmill',
    wood: 20,
    stone: 0,
    gold: 3,
    time: 120,
    bonus: 'woodIncome'
  }, {
    name: 'quarry',
    wood: 5,
    stone: 5,
    gold: 3,
    time: 120,
    bonus: 'stoneIncome'
  }, {
    name: 'gold-mine',
    wood: 0,
    stone: 20,
    gold: 5,
    time: 200,
    bonus: 'goldIncome'
  }, {
    name: 'farm',
    wood: 6,
    stone: 0,
    gold: 0,
    time: 80,
    bonus: 'newWorker'
  }, {
    name: 'castle',
    wood: 30,
    stone: 100,
    gold: 50,
    time: 300,
    bonus: 'victory'
  }, {
    name: 'wood-warehouse',
    wood: 20,
    stone: 0,
    gold: 0,
    time: 100,
    bonus: 'enlargingTheWarehouseWood'
  }, {
    name: 'stone-warehouse',
    wood: 0,
    stone: 20,
    gold: 0,
    time: 100,
    bonus: 'enlargingTheWarehouseStone'
  }]; // Pobieranie elementów reprezentujących wyniki z drzewa DOM.

  var buttonSawmillEl = document.querySelector('.button-sawmill');
  var buttonQuarryEl = document.querySelector('.button-quarry');
  var buttonGoldMineEl = document.querySelector('.button-gold-mine');
  var buttonFarmEl = document.querySelector('.button-farm');
  var buttonWoodWarehouseEl = document.querySelector('.button-wood-warehouse');
  var buttonStoneWarehouseEl = document.querySelector('.button-stone-warehouse');
  var buttonCastleEl = document.querySelector('.button-castle'); // Wybuduj TARTAK.  

  buttonSawmillEl.addEventListener('click', function () {
    constructionBuilding(buildings[0]);
  }); // Wybuduj KAMIENIOŁOM. 

  buttonQuarryEl.addEventListener('click', function () {
    constructionBuilding(buildings[1]);
  }); // Wybuduj KOPALNIE ZŁOTA. 

  buttonGoldMineEl.addEventListener('click', function () {
    constructionBuilding(buildings[2]);
  }); // Wybuduj FARME. 

  buttonFarmEl.addEventListener('click', function () {
    constructionBuilding(buildings[3]);
  }); // Wybuduj ZAMEK. 

  buttonCastleEl.addEventListener('click', function () {
    constructionBuilding(buildings[4]);
  }); // Wybuduj MAGAZYN DREWNA. 

  buttonWoodWarehouseEl.addEventListener('click', function () {
    constructionBuilding(buildings[5]);
  }); // Wybuduj MAGAZYN KAMIENIA. 

  buttonStoneWarehouseEl.addEventListener('click', function () {
    constructionBuilding(buildings[6]);
  });
}); // :Element ?
},{}],"node_modules/parcel-bundler/lib/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59666" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/lib/builtins/hmr-runtime.js","main.ts"], null)
//# sourceMappingURL=/main.c39d6dcf.map