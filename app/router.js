import { AboutController } from "./controllers/AboutController.js";
import { CarsController } from "./controllers/CarsController.js";
import { HomeController } from "./controllers/HomeController.js";
import { ValuesController } from "./controllers/ValuesController.js";
import { AboutView } from "./views/AboutView.js";
import { CarView } from "./views/CarView.js";


export const router = [
  {
    path: '',
    controller: HomeController,
    view: /*html*/`
    <div class="p-4">
      <h1>Welcome to Gregslist!</h1>
      <h2>Please select a category from the navbar!</h2>  
    </div>
    `
  },
  {
    path: '#/about',
    controller: [AboutController, ValuesController],
    view: AboutView
  },
  {
    // NOTE when our url reads "http://localhost:8080/#/cars", it loads our specified controller and injects our view into the HTML
    path: '#/cars',
    controller: CarsController,
    // NOTE CarView returns a string of HTML that is injected into the #router-view in the index.html
    view: CarView
  }

  // FIXME write a new object that will load a housescontroller when you navigate to it
]