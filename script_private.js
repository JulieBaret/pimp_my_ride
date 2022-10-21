//Etape 1 -> Parsing = transformer la string correspondant à un voyage en un objet
let tripToParse = "Perdita 8 10 8";

class Trip {
    #client
    #start
    #duration
    #end
    #price
    
    constructor(name, start, duration, price) {
        this.#client = name
        this.#start = start
        this.#duration = duration
        //Etape 3 -> End Trip
        this.#end = this.#start + this.#duration
        this.#price = price
    }
    
    getPrice(){
        return this.#price;
    }

    getName(){
        return this.#client;
    }

    //Etape 4 -> Compatibility = compare deux objets de la class Trip et retourne un booléen si compatibles
    isCompatible(trip){
        if(trip.#start > this.#end || trip.#end < this.#start){
            return true;
        } else {
            return false;
        }
    }
}

//instancie un objet de la class Trip, à partir d'une string
function parseTrip(trip){
    let arr = trip.split(' ');
    return new Trip(arr[0], parseInt(arr[1]), parseInt(arr[2]), parseInt(arr[3]));
}

console.log(parseTrip(tripToParse));


//Etape 2 -> Loop Parsing = même chose pour plusieurs voyages réunis dans un tableau
let tripsToParse = [
	"Roger 0 5 10",
	"Pongo 3 7 14",
	"Perdita 8 10 8",
	"Anita 16 3 7"
];

//compose un tableau d'objets, à partir d'un tableau
function parseTrips(trips){
    let arr = [];
    for(let trip of trips){
        arr.push(parseTrip(trip));
    }
    return arr;
}

console.log(parseTrips(tripsToParse));

//retourne le prix total pour plusieurs voyages, à partir d'un tableau
function getTripsPrice(trips){
    let price = 0;
    for(let trip of trips){
        price += trip.getPrice();
    }
    return price;
}

console.log(getTripsPrice(parseTrips(tripsToParse)));


//Etape 4 -> exécution
let firstTrip = parseTrip("Clémentine 0 5 10");
let secondTrip = parseTrip("Assetou 8 10 8");
let thirdTrip = parseTrip("Mehmet 3 7 14");

console.log(`Les voyages de Clémentine et Assetou sont-ils compatibles ? ${firstTrip.isCompatible(secondTrip)}`);
console.log(`Les voyages de Clémentine et Mehmet sont-ils compatibles ? ${firstTrip.isCompatible(thirdTrip)}`);


//Etape 5 -> Possibilities = retourne les combos de voyages compatibles
allTrips = parseTrips(tripsToParse);

function findCompatibilities(trips){
    let result = [];
    for(let i = 0; i < trips.length-1; i++){
        for(let j = 1; j < trips.length; j++){
            let combo = [];
            if(trips[i].isCompatible(trips[j])){
                combo.push(trips[i]);
                combo.push(trips[j]);
                // let comboPrice = getTripsPrice(combo);
                // combo.push(comboPrice);
                result.push(combo);
            }
        }
    }
    return result;
}

allCombos = findCompatibilities(allTrips);
console.log("Voici les combinaisons de voyages compatibles :");
console.log(allCombos);


//Etape 6 -> Final Choice = retourne le combo qui rapporte le plus
function findBestPrice(trips){
    let bestCombo;
    let bestComboPrice = 0; 
    for(let trip of trips){
        let currentComboPrice = getTripsPrice(trip);
        if(currentComboPrice > bestComboPrice){
            bestComboPrice = currentComboPrice;
            bestCombo = trip;
        }
    }
    return bestCombo;
}

let bestComboTrip = findBestPrice(allCombos);
console.log(`On obtient le prix le plus élevé avec la combinaison : ${bestComboTrip[0].getName()} et ${bestComboTrip[1].getName()}.`);