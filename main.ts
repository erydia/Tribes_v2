document.addEventListener('DOMContentLoaded', () => {

    // Zmienne które zajmują się przechowywaniem wartości czasu.
    let time: number = 0;
    let seconds: number = 0;
    let minutes: number = 0;
    let hours: number = 0;

    // Pobieranie elementów reprezentujących wyniki z drzewa DOM. 
    const secondEl: HTMLElement = document.querySelector('.second');
    const minuteEl: HTMLElement = document.querySelector('.minute');
    const hourEl: HTMLElement = document.querySelector('.hour');

    // Zegar który tyka co 1000ms. 
    const clock: NodeJS.Timeout = setInterval(() => { 
        // Zwiększanie się ilości czasu.
        time = time + 1;
        // Wyliczanie sekund poprzez dzielenie modulo.
        seconds = time % 60;
        // Wyliczanie minut poprzez dzielenie modulo.
        minutes = Math.floor(time / 60) % 60;
        // Wyliczanie godzin poprzez dzielenie modulo.
        hours = Math.floor(time / 3600);

        // If - wykona się wtedy gdy ilość sekund będzie mniejsza niż 10.
        if (seconds < 10) {
            secondEl.innerText = String(`0${seconds}`)
        };
        // If - wykona się wtedy gdy ilość minut będzie mniejsza niż 10.
        if (minutes < 10) {
            minuteEl.innerText = String(`0${minutes}`);
        }; 
        // If - wykona się wtedy gdy ilość godzin będzie mniejsza niż 10.
        if (hours < 10) {
            hourEl.innerText = String(`0${hours}`);
        }; 
        // Aktualizacja czasu w htmlu.
        secondEl.innerText = String(seconds); 
        minuteEl.innerText = String(minutes);
        hourEl.innerText = String(hours);
    },1000);

    interface IMaterialsObject {
        wood: number;
        stone: number;
        gold: number;
    };

    //Ilość surowców.
    const materials: IMaterialsObject= {
        wood: 0,
        stone: 0,
        gold: 0,
    };

    //Przychód poszczególnych surowców.
    const incomeMaterials: IMaterialsObject  = {
        wood: 1,
        stone: 1,
        gold: 1,
    };

    interface IStorageCapacity {
        wood: number;
        stone: number;
    };

    // Pojemnośc magazynów.
    const storageCapacity: IStorageCapacity  = {
        wood: 20,
        stone: 20,
    };

    // Zmienne, które przechowuje ilość robotników.
    let worker: number = 5;
    // Zmienne, które przechowują maksymalną ilość robotników.
    const maxWorker: number = 10;

    // Pobieranie elementów reprezentujących wyniki z drzewa DOM.
    const woodEl: HTMLElement = document.querySelector('.wood');
    const stoneEl: HTMLElement = document.querySelector('.stone');
    const goldEl: HTMLElement = document.querySelector('.gold');
    const workerEl: HTMLElement = document.querySelector('.worker');
    const maxWoodEl: HTMLElement = document.querySelector('.max-wood');
    const maxStoneEl: HTMLElement = document.querySelector('.max-stone');

    // Zwiększanie się ilości drewna i kamienia co 1000ms.
    const intervalWoodStoneIncome: NodeJS.Timeout = setInterval(() => {
        // Zatrzymanie przychodu drewna i kamienia na koniec gry.
        if (endOfTheGame) {
            clearInterval(intervalWoodStoneIncome);
        };
        // Zwiększenie ilości drewna gdy jest możliwe jego wyprodukowanie.  
        if (materials.wood < storageCapacity.wood) {
            materials.wood = materials.wood + incomeMaterials.wood;
            // Ilość drewna równa jego maksymalnej ilości.
            if (materials.wood >= storageCapacity.wood) { 
                materials.wood = storageCapacity.wood;
            };
            woodEl.innerText = String(materials.wood); 
        }    
        // Zwiększenie ilości kamienia gdy jest możliwe jego wyprodukowanie.
        if (materials.stone < storageCapacity.stone) {
            materials.stone = materials.stone + incomeMaterials.stone;
            // Ilość kamienia równa jego maksymalnej ilości.
            if (materials.stone >= storageCapacity.stone) { 
                materials.stone = storageCapacity.stone;
            }; 
            stoneEl.innerText  = String(materials.stone);
        };
    },1000);

    // Zwiększanie ilość złota co 3000ms.
    const intervalGoldIncome: NodeJS.Timeout = setInterval(() => { 
        // Zatrzymanie przychodu złota.
        if (endOfTheGame) {            
            clearInterval(intervalGoldIncome);
        };
        // Zwiększenie się ilości złota.
        materials.gold = materials.gold + incomeMaterials.gold;
        goldEl.innerText = String(materials.gold); 
    },3000);

    // Dodawanie określonych bonusów po wybudowaniu budynków.
    const addBonus: Function = (value: string) => {
        // Zwiększenie przychodu drewna.
        if (value === 'woodIncome') {   
            incomeMaterials.wood += 2;
        // Zwiększenie przychodu kamienia.   
        } else if (value === 'stoneIncome') {   
            incomeMaterials.stone += 2;
        // Zwiększenie przychodu złota.    
        } else if (value === 'goldIncome') {   
            incomeMaterials.gold +=2;
        // Nowy robotnik.    
        } else if (value === 'newWorker') {
            if (worker < maxWorker) {
                worker += 1;
                workerEl.innerText = String(worker);
            };
        // Powiększenie magazynu drewna.    
        } else if (value === 'enlargingTheWarehouseWood') {
            storageCapacity.wood += 10;
            maxWoodEl.innerText = String(storageCapacity.wood);
        // Powiększenie magazynu kamienia.    
        } else if (value === 'enlargingTheWarehouseStone') {
            storageCapacity.stone += 10;
            maxStoneEl.innerText = String(storageCapacity.stone);
        // Zwycięstwo.    
        } else if (value === 'victory') {
            victory();
        };    
    }; 

    // Zmienna, która określa czy licznik budowy jest włączony; domyślnie - false.
    let setConstructionTimer:boolean = false;
    // Zmienna, która określa czy skończyła się gra; domyślnie - false.
    let endOfTheGame:boolean = false;

    // Pobieranie elementu reprezentującego wynik z drzewa DOM. 
    const boardEl: HTMLElement = document.querySelector('.board');

    // Fukcja, która wyświetla nowy budynek w htmlu.
    const construction = (type: string) => {
        // Tworzenie nowego diva, który stanie się budynkiem.
        const newBuilding: HTMLElement = document.createElement('div');
        // Przypisanie mu odpowiednich klas.
        newBuilding.classList.add(type);
        newBuilding.classList.add('new-building');
        // Dodanie budynku do htmla. 
        boardEl.appendChild(newBuilding);
    };

    // Pobieranie elementów reprezentujących wyniki z drzewa DOM. 
    const timerEl: HTMLElement = document.querySelector('.timer');
    const buildingBoxEl: HTMLElement  = document.querySelector('.building-box');

    // Wybuduj budynek.
    const constructionBuilding: Function = (object) => {
        // Nastąpi rozpoczęcie budowy.
        if ( materials.wood >= object.wood && materials.stone >= object.stone && materials.gold >= object.gold && setConstructionTimer === false && endOfTheGame === false) {
            // Włączenie licznika budowy.
            setConstructionTimer = true;
            // Pobranie surowców.
            materials.wood -= object.wood;
            materials.stone -= object.stone;
            materials.gold -= object.gold;
            // Pojawienie się budynku w htmlu.
            construction(object.name);
            // Funkcja powoduje pojawienie się licznika budowy w htmlu; aktywuje bonus związany ze zbudowanym budynkiem.
            constructionOfTheBuilding( timerInProgress(object.time), object.bonus );
        };
    };

    // Funkcja, która zwraca czas budowy poszczególnych budynków.
    const timerInProgress: Function = (time: number) => {
        // Zmienna która przechowuje czas budowy.
        const constructionTime: number = Math.floor(time / worker);
        // Pojawienie się komunikatu o czasie budowy w htmlu.
        timerEl.innerText = `Czas budowy: ${constructionTime}`;  
        buildingBoxEl.classList.add('opacity-05');
        // Zwrócenie zmiennej.
        return constructionTime;
    };

    // Funkcja, która wyświetla czas budowy budynku w htmlu.
    const constructionOfTheBuilding: Function = (constructionTime: number,  value: string) => {
        const contructionInProgress: NodeJS.Timeout = setInterval(() => {
            // Zmniejszanie się czasu budowy co 1000ms.
            constructionTime--;
            // Aktualizacja czasu budowy w htmlu.
            timerEl.innerText = `Czas budowy: ${constructionTime}`;
            // Wyłączenie licznika i aktywacja bonusów za wybudowany budynek.
            if (constructionTime < 1) {
                // Zmiana wartości zmiennej na 0, gdyż skończył się czas budowy.
                constructionTime = 0;
                setConstructionTimer = false;
                // Wyczyszczenie htmla.
                timerEl.innerText = '';
                buildingBoxEl.classList.remove('opacity-05');
                buildingBoxEl.classList.add('opacity-1');
                // Wyłączenie licznika.
                clearInterval(contructionInProgress);
                // Wywołanie bonusu jaki się dostaje za wybudowanie budynu. 
                addBonus(value);
            };
        },1000);
    };

    // Pobieranie elementów reprezentujących wyniki z drzewa DOM. 
    const winBoxEl: HTMLElement = document.querySelector('.win-box');
    const infoBoxEl: HTMLElement  = document.querySelector('.info-box');

    // Funkcja, która informuje gracza o wygraniu gry.
    const victory: Function = () => {
        // Zmiana wartości zmiennej, która przechowuje informacje o tym czy gra została wygrana.
        endOfTheGame = true;
        // Zatrzymanie czasu.
        clearInterval(clock);
        // Wyświetlenie się boxa z napisem 'wygrałeś'.
        winBoxEl.classList.add('opacity-1');
        // Dodanie przeźroczystości na poszczególne sekcja planszy.
        infoBoxEl.classList.add('opacity-05');
  
        // Pobieranie elementu reprezentującego wynik z drzewa DOM. 
        const newBuildingEls: NodeListOf<Element> = document.querySelectorAll('.new-building');
        // Dodanie do każdego elementu stylu poprzez pętle. 
        newBuildingEls.forEach((el) => {
            el.classList.add('opacity-05');
        });
    };
 
    interface IBuilding {                               
        name: string;
        wood: number;
        stone: number;
        gold: number;
        time: number;
        bonus: string;
    };

    // Zbiór informacji na temat budynków.                    
    // const buildings: Buildings  = [{                
    const buildings: IBuilding[]  = [{                    
        name: 'sawmill',                                 
        wood: 20,                                        
        stone: 0,                                           
        gold: 3,
        time: 120,
        bonus: 'woodIncome',
    },{
        name: 'quarry', 
        wood: 5,
        stone: 5,
        gold: 3,
        time: 120,
        bonus: 'stoneIncome',
    },{
        name: 'gold-mine', 
        wood: 0,
        stone: 20,
        gold: 5,
        time: 200,
        bonus: 'goldIncome',
    },{
        name: 'farm', 
        wood: 6,
        stone: 0,
        gold: 0,
        time: 80,
        bonus: 'newWorker',
    },{
        name: 'castle', 
        wood: 30,
        stone: 100,
        gold: 50,
        time: 300,
        bonus: 'victory',
    },{
        name: 'wood-warehouse', 
        wood: 20,
        stone: 0,
        gold: 0,
        time: 100,
        bonus: 'enlargingTheWarehouseWood',
    },{
        name: 'stone-warehouse', 
        wood: 0,
        stone: 20,
        gold: 0,
        time: 100,
        bonus: 'enlargingTheWarehouseStone',
    }];

    // Pobieranie elementów reprezentujących wyniki z drzewa DOM.
    const buttonSawmillEl: HTMLElement = document.querySelector('.button-sawmill');
    const buttonQuarryEl: HTMLElement = document.querySelector('.button-quarry');
    const buttonGoldMineEl: HTMLElement = document.querySelector('.button-gold-mine');
    const buttonFarmEl: HTMLElement = document.querySelector('.button-farm');
    const buttonWoodWarehouseEl: HTMLElement = document.querySelector('.button-wood-warehouse');
    const buttonStoneWarehouseEl: HTMLElement = document.querySelector('.button-stone-warehouse');
    const buttonCastleEl: HTMLElement = document.querySelector('.button-castle');

    // Wybuduj TARTAK.  
    buttonSawmillEl.addEventListener('click', () => {
        constructionBuilding(buildings[0]);
    });

    // Wybuduj KAMIENIOŁOM. 
    buttonQuarryEl.addEventListener('click', () =>  {
        constructionBuilding(buildings[1]);
    });

    // Wybuduj KOPALNIE ZŁOTA. 
    buttonGoldMineEl.addEventListener('click', () => {
        constructionBuilding(buildings[2]);
    });

    // Wybuduj FARME. 
    buttonFarmEl.addEventListener('click', () => {
        constructionBuilding(buildings[3]);
    });
    
    // Wybuduj ZAMEK. 
    buttonCastleEl.addEventListener('click', () => {
        constructionBuilding(buildings[4]);
    }); 

    // Wybuduj MAGAZYN DREWNA. 
    buttonWoodWarehouseEl.addEventListener('click', () => {
        constructionBuilding(buildings[5]);
    });

    // Wybuduj MAGAZYN KAMIENIA. 
    buttonStoneWarehouseEl.addEventListener('click', () => {
        constructionBuilding(buildings[6]);
    });

});
