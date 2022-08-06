import { addCar, updateCar, removeCar, removeWinner, getAllWinners, stopEngine, getCar, getWinner, createWinner, updateWinner } from "./api";
import { ICarBody, ICar, ICarWinner, IWinner, ICarWinnerUpdate, ICarResult } from "./components/interfaces";
import { store } from "./components/store";
import { createWinnersHeaders, renderWinnersPage, updateGarage, updateWinnersPagination, updateWinnersTable } from "./renderPage";
import { generateRandomCars, changeDisableButtons  } from "./secondaryFunctions";
import { CARS_TO_GENERATE } from "./constants";
import { startDriving, stopDriving, backCar } from "./animation";
import { raceWinner, noWinners } from "./components/winnres";

export const handler = async () => {
  const garageSection = document.querySelector('.garage-section');
  const winnersSection = document.querySelector('.winners-section');
  
  const goToGarage = (e: Event) => {
    if ((e.target as Element ).classList.contains('switch-buttons__garage')) {
      garageSection?.classList.remove('visability--hidden');
      winnersSection?.classList.add('visability--hidden');
    }
    const newWinner = document.querySelector('.new-winner');
    if (newWinner) {
      newWinner.classList.remove('visability--hidden');
    }
  }

  const goToWinners = (e: Event) => {
    if ((e.target as Element ).classList.contains('switch-buttons__winners')) {
      garageSection?.classList.add('visability--hidden');
      winnersSection?.classList.remove('visability--hidden');
    }

    const newWinner = document.querySelector('.new-winner');
    if (newWinner) {
      newWinner.classList.add('visability--hidden');
    }
  }

  const toGarage = document.querySelectorAll('.switch-buttons__garage');
  const toWinners = document.querySelectorAll('.switch-buttons__winners');

  toGarage.forEach(item => {
    item.addEventListener('click', goToGarage);
  });

  toWinners.forEach(item => {
    item.addEventListener('click', goToWinners);
  });

  const createCar = async (e: Event) => {
    e.preventDefault();
    const carName = document.getElementById('add-name') as HTMLInputElement;
    const carColor = document.getElementById('add-color') as HTMLInputElement;
    const body: ICarBody = {
      name: carName.value,
      color: carColor.value
    };
    if (carName.value && carColor.value) {
      await addCar(body);
      await updateGarage();
    }
  }

  const createCarButton = document.getElementById('create-car');
  createCarButton?.addEventListener('click', createCar);

  const nextCarPage = async (e: Event) => {
    if ((e.target as HTMLTemplateElement).closest('.garage__next')) {
      store.page++;
      await updateGarage();
    }
  }

  const prevCarPage = async (e: Event) => {
    if ((e.target as HTMLTemplateElement).closest('.garage__prev')) {
      store.page--;
      await updateGarage();
    }
  }
  const updateWinnresTablePage = async () => {
    const tabelBody = document.querySelector('.winners-table__body') as HTMLElement;
    tabelBody.textContent = '';
    const pagination = document.querySelector('.winners-pagination') as HTMLElement;
    pagination.remove();
    const winnersHeaders = document.querySelector('.winners-headers') as HTMLElement;
    winnersHeaders.textContent = '';
    await createWinnersHeaders(winnersHeaders);
    await updateWinnersTable();
    await updateWinnersPagination();
  }

  const nextWinnersPage = async (e: Event) => {
    if ((e.target as HTMLTemplateElement).closest('.winners__next')) {
      store.winnersPage++;
      await updateWinnresTablePage();
    }
  }

  const prevWinnersPage = async (e: Event) => {
    if ((e.target as HTMLTemplateElement).closest('.winners__prev')) {
      store.winnersPage--;
      await updateWinnresTablePage();
    }
  }

  const removeCurrentCar = async (e: Event) => {
    const currentButton = (e.target as HTMLTemplateElement).closest('.car-remove');
    if (currentButton) {
      const winnersTableBody = document.querySelector('.winners-table__body') as HTMLElement;
      const allWinnewrs = await getAllWinners();
      const currentCarID = currentButton.closest('.cars-block')?.id; 
      allWinnewrs.winners.includes(Number(currentCarID));
      removeCar(Number(currentCarID));
      if (Number(currentCarID)) {
        removeWinner(Number(currentCarID));
      }
      updateGarage();
      winnersTableBody.textContent = '';
      updateWinnersTable();
    }
  }

  const updateCurrentCar = async (e: Event) => {
    e.preventDefault();
    if (store.selectedCarID !== 0) {
      const newCarName = document.getElementById('update-name') as HTMLInputElement;
      const newCarColor = document.getElementById('update-color') as HTMLInputElement;
      const body: ICarBody = {
        name: newCarName.value,
        color: newCarColor.value
      };
      
      if (newCarName.value && newCarColor.value) {
        const tabelHead = document.querySelector('.winners-table__body') as HTMLElement;
        await updateCar(store.selectedCarID, body);
        await updateGarage();
        tabelHead.textContent = '';
        await updateWinnersTable();
        store.selectedCarID = 0;
      }
    }
  }

  const updateCurrentCarID = async (e: Event) => {
    const selectedCar = (e.target as HTMLTemplateElement).closest('.car-select');
    if (selectedCar) {
      const currentCarID = selectedCar.closest('.cars-block')?.id;
      store.selectedCarID = Number(currentCarID);
    }
  }

  const startAnimation = async (e: Event) => {
    const startButton = (e.target as HTMLTemplateElement).closest('.car-controls__start');
    if (startButton) {
      const currentCarID = startButton.closest('.cars-block')?.id;
      await startDriving(Number(currentCarID));
    }
  } 

  const stopAnimation = async (e:Event) => {
    const stopButton = (e.target as HTMLTemplateElement).closest('.car-controls__back');
    if (stopButton) {
      const currentCarID = stopButton.closest('.cars-block')?.id;
      await stopEngine(Number(currentCarID));
      await stopDriving(Number(currentCarID));
      await backCar(Number(currentCarID));
    }
  }

  const removePrevWinner = () => {
    const newWinner = document.querySelector('.new-winner') as HTMLElement;
    if (newWinner) newWinner.remove();
  }

  const addRaceResult = async (successCars: {carResult: ICarResult}[]) => {
    const main = document.querySelector('main') as HTMLElement;
    const noWinnerCar = document.createRange().createContextualFragment(noWinners());


    if (successCars.length === 0) {
      main.append(noWinnerCar);
    } else {
      const sortedByTimeCars = successCars.sort((a,b) => (a.carResult.time + a.carResult.delay) - (b.carResult.time + b.carResult.delay));
      const winner: IWinner = {
        id: sortedByTimeCars[0].carResult.id,
        time: sortedByTimeCars[0].carResult.time + sortedByTimeCars[0].carResult.delay
      }
      const timeInSeconds = Number((winner.time / 1000).toFixed(2));
      const carWinnerName: ICar[] = await getCar(winner.id);
      const carWinnerInfo: ICarWinner[] = await getWinner(winner.id);
      
      const updateTable = async () => {
        const winnersTableBody = document.querySelector('.winners-table__body') as HTMLElement;
        winnersTableBody.textContent = '';
        await updateWinnersTable();
      }

      if (carWinnerInfo.length === 0) {
        const infoToWinnersTable: ICarWinner = {
          id: winner.id,
          wins: 1,
          time: timeInSeconds
        }
        await createWinner(infoToWinnersTable);
        await updateTable()
      } else {
        const infoToWinnersTable: ICarWinnerUpdate = {
          wins: carWinnerInfo[0].wins + 1,
          time: Number(`${(carWinnerInfo[0].time < timeInSeconds) ? carWinnerInfo[0].time : timeInSeconds}`)
        }
        await updateWinner(winner.id, infoToWinnersTable);
        await updateTable();
      }
      const raceWinnerCar = document.createRange().createContextualFragment(raceWinner(carWinnerName[0].name, timeInSeconds));
      main.append(raceWinnerCar);
    }
  }

  const changeRaceState = () => {
    if (store.isRaceStoped === true) {
      store.isRaceStoped = false;
    }
  }

  const race = async () => {

    changeDisableButtons(true);
    removePrevWinner();
    changeRaceState();
    const cars = document.querySelectorAll('.cars-block');
    const carsID: number[] = [];
    cars.forEach(item => carsID.push(Number(item.id)));
    let raceCars = carsID.map(item => startDriving(item));
    const raceResult = await Promise.all(raceCars);
    const successCars = raceResult.filter(item => item.carResult.success === true);
    if (store.isRaceStoped === true) return;
    addRaceResult(successCars);  
  }

  const backRace = async () => {
    store.isRaceStoped = true;
    changeDisableButtons(false);
    removePrevWinner();

    const allCars = document.querySelectorAll('.cars-block');

    allCars.forEach(async item => {
      await stopEngine(Number((item as HTMLElement).id));
      await stopDriving(Number((item as HTMLElement).id));
      await backCar(Number((item as HTMLElement).id));
    });
  }

  const sortByWins = async (e: Event) => {
    const winsTableCol = (e.target as HTMLTemplateElement).closest('.winners-table__wins');
    const bestTimeTableCol = document.querySelector('.winners-table__best-time');

    if (winsTableCol) {
      bestTimeTableCol?.classList.remove('winners-table__best-time--sort-asc', 'winners-table__best-time--sort-desc');
      store.winnersSortType = 'wins';
      if (winsTableCol.classList.contains('winners-table__wins--sort-asc')) {
        winsTableCol.classList.add('winners-table__wins--sort-desc');
        winsTableCol.classList.remove('winners-table__wins--sort-asc');
        store.winnersOrder = 'desc';
      } else {
        winsTableCol.classList.add('winners-table__wins--sort-asc');
        winsTableCol.classList.remove('winners-table__wins--sort-desc');
        store.winnersOrder = 'asc';
      }
      await updateWinnresTablePage();
    }
  }

  const sortByBestTime = async (e: Event) => {
    const bestTimeTableCol = (e.target as HTMLTemplateElement).closest('.winners-table__best-time');
    const winsTableCol = document.querySelector('.winners-table__wins');
    if (bestTimeTableCol) {
      winsTableCol?.classList.remove('winners-table__wins--sort-asc', 'winners-table__wins--sort-desc');
      store.winnersSortType = 'time';
      if (bestTimeTableCol.classList.contains('winners-table__best-time--sort-asc')) {
        bestTimeTableCol.classList.add('winners-table__best-time--sort-desc');
        bestTimeTableCol.classList.remove('winners-table__best-time--sort-asc');
        store.winnersOrder = 'desc';
      } else {
        bestTimeTableCol.classList.add('winners-table__best-time--sort-asc');
        bestTimeTableCol.classList.remove('winners-table__best-time--sort-desc');
        store.winnersOrder = 'asc';
      }
      await updateWinnresTablePage();
    }
  }

  garageSection?.addEventListener('click', nextCarPage);
  garageSection?.addEventListener('click', prevCarPage);
  garageSection?.addEventListener('click', nextWinnersPage);
  garageSection?.addEventListener('click', prevWinnersPage);
  garageSection?.addEventListener('click', removeCurrentCar);
  garageSection?.addEventListener('click', updateCurrentCarID);
  garageSection?.addEventListener('click', startAnimation);
  garageSection?.addEventListener('click', stopAnimation);

  const updateButton = document.getElementById('update-car') as HTMLElement;
  updateButton.addEventListener('click', updateCurrentCar);

  const addRandomCars = document.getElementById('generate-random-cars') as HTMLElement;
  addRandomCars?.addEventListener('click', () => generateRandomCars(CARS_TO_GENERATE));

  const raceButton = document.getElementById('race');
  raceButton?.addEventListener('click', race);

  const backRaceButton = document.getElementById('back');
  backRaceButton?.addEventListener('click', backRace);

  winnersSection?.addEventListener('click', nextWinnersPage);
  winnersSection?.addEventListener('click', prevWinnersPage);
  
  winnersSection?.addEventListener('click', sortByWins);
  winnersSection?.addEventListener('click', sortByBestTime);

} 