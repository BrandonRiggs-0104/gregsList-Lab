import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js"
import { saveState } from "../utils/Store.js";

function _saveCars() {
  saveState('cars', AppState.cars)
}

class CarsService {
  deleteCar(carId) {

    // NOTE find index works like find, but instead of returning the first item, it returns the index of that item (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
    const carIndex = AppState.cars.findIndex(car => car.id == carId)

    console.log('car index', carIndex);

    // NOTE splice is an array method, it can be used to take items out of an array at a certain index, put items into an array at a certain index, or both (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
    // NOTE our first argument is which index do we want to start splicing at, and our second argument is how many items we want tot remove from the array
    AppState.cars.splice(carIndex, 1)

    // NOTE save to local storage
    _saveCars()

    // NOTE trigger the listener that was set up by the constructor in the cars controller
    AppState.emit('cars')
  }
  createCar(carData) {

    // NOTE create a class object
    const newCar = new Car(carData)

    console.log('🚗 constructed', newCar);

    // NOTE store the new car in our appstate
    AppState.cars.push(newCar)

    // NOTE save to local storage
    _saveCars()

    // NOTE trigger the listener that was set up by the constructor in the cars controller
    AppState.emit('cars')


  }

}

export const carsService = new CarsService()