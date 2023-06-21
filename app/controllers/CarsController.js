import { AppState } from "../AppState.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawCars() {
  const cars = AppState.cars
  let template = ''

  cars.forEach(car => template += car.CardTemplate)

  setHTML('carListings', template)
}


export class CarsController {
  constructor () {
    // SECTION page load
    console.log('Cars Controller is loaded, here are the cars', AppState.cars);
    _drawCars()


    // SECTION state changes
    AppState.on('cars', _drawCars)
  }


  createCar(event) {
    // NOTE don't refresh!
    event.preventDefault()


    console.log('Did the form submit?');

    // NOTE grab the form that just sumbitted
    const form = event.target

    // NOTE creates an object with each named input field from our form
    const carData = getFormData(form)

    // NOTE booleans are weird, have to format this here
    // NOTE ternary operator (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator)
    carData.ownedByGrandma = carData.ownedByGrandma == 'on' ? true : false

    console.log('car data!', carData);


    carsService.createCar(carData)

    // NOTE clear all fields on our form
    form.reset()

  }

  // NOTE we made this method async so that we can use await below. More on this next week....
  async deleteCar(carId) {
    // NOTE becasue this method is labeled as async, it awaits for Pop.confirm() to resolve before running any other code in this method
    const wantsToDelete = await Pop.confirm('Do you really want to delete this car?')

    // Pop.confirm returns true or false based on which button they click
    if (!wantsToDelete) {
      // NOTE stop running function
      return
    }

    carsService.deleteCar(carId)

  }
}