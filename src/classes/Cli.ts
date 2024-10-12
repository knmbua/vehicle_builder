// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// define the Cli class
class Cli {
  // TODO: update the vehicles property to accept Truck and Motorbike objects as well
  // TODO: You will need to use the Union operator to define additional types for the array
  // TODO: See the AbleToTow interface for an example of how to use the Union operator
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  // TODO: Update the constructor to accept Truck and Motorbike objects as well
  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
  }
  //   inquirer.prompt([
  //       {
  //         type: 'list',
  //         name: 'selectedVehicleVin',
  //         message: 'Select a vehicle to perform an action on',
  //         choices: this.vehicles.map((vehicle) => {
  //           return {
  //             name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
  //             value: vehicle.vin,
  //           };
  //         }),
  //       },
  //     ])
  //     .then((answers) => {
  //       // set the selectedVehicleVin to the vin of the selected vehicle
  //       this.selectedVehicleVin = answers.selectedVehicleVin;
  //       // perform actions on the selected vehicle
  //       this.performActions();
  //     });
  // }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          this.createCar();
        } else if (answers.vehicleType === 'Truck') {
          this.createTruck();
        } else if (answers.vehicleType === 'Motorbike') {
          this.createMotorbike();
        }
      });
  }
  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'number',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'number',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'number',
          name: 'towingCapacity',
          message: 'Enter Towing Capacity',
        },
      ])
      .then((answers) => {
        const wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          wheels,
          parseInt(answers.towingCapacity)
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  // method to create a motorbike
  createMotorbike(): void {
    inquirer.prompt([
      {
        type: 'input',
        name: 'color',
        message: 'Enter Color',
      },
      {
        type: 'input',
        name: 'make',
        message: 'Enter Make',
      },
      {
        type: 'input',
        name: 'model',
        message: 'Enter Model',
      },
      {
        type: 'input',
        name: 'year',
        message: 'Enter Year',
      },
      {
        type: 'input',
        name: 'weight',
        message: 'Enter Weight',
      },
      {
        type: 'input',
        name: 'topSpeed',
        message: 'Enter Top Speed',
      },
    ])
      .then((answers) => {
        const wheels = [new Wheel(), new Wheel()];
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          wheels
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  // method to find a vehicle to tow
  findVehicleToTow(truck: Truck): void {
    // implementation here
  }

  // method to perform actions on a vehicle
  performActions(): void {
    inquirer
      .prompt([
        {
          type: 'list', name: 'action',
          message: 'Select an action',
          choices: [
            'Print details',
            'Start vehicle',
            'Accelerate 5 MPH',
            'Decelerate 5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            'Tow',
            'Wheelie',
            'Select or create another vehicle',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        const selectedVehicle = this.vehicles.find(
          (vehicle) => vehicle.vin === this.selectedVehicleVin
        );

        if (!selectedVehicle) {
          console.log('No vehicle selected.');
          return;
        }
        switch (answers.action) {
          case 'Print details':
            selectedVehicle.printDetails();
            break;
          case 'Start vehicle':
            selectedVehicle.start();
            break;
          case 'Accelerate 5 MPH':
            selectedVehicle.accelerate(5);
            break;
          case 'Decelerate 5 MPH':
            selectedVehicle.decelerate(5);
            break;
          case 'Stop vehicle':
            selectedVehicle.stop();
            break;
          case 'Turn right':
            selectedVehicle.turn('right');
            break;
          case 'Turn left': selectedVehicle.turn('left');
            break;
          case 'Reverse':
            selectedVehicle.reverse();
            break;
          case 'Tow':
            if (selectedVehicle instanceof Truck) {
              this.findVehicleToTow(selectedVehicle);
              return;
            } else {
              console.log('Only trucks can tow.');
            }
            break;
          case 'Wheelie':
            if (selectedVehicle instanceof Motorbike) {
              selectedVehicle.wheelie();
            } else {
              console.log('Only motorbikes can do a wheelie.');
            }
            break;
          case 'Select or create another vehicle':
            this.startCli();
            return;
          case 'Exit':
            this.exit = true;
            break;
        }

        if (!this.exit) {
          this.performActions();
        }
      });
  }

  // method to start the cli
  startCli(): void {
    this.createVehicle();
  }
}

// export the Cli class
export default Cli;