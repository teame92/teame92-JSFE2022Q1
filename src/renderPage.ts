import { createGarageSettingBlock } from "./components/garage";
import { createCarsSection } from "./components/garage";
import { getCars } from "./api";
import { getWinners } from "./api";
import { store } from "./components/store";
import { createCarBlock } from "./components/garage";
import { getCar } from "./api";
import { createPagitation } from "./components/garage";
import { createWinnersSwitchButtons } from "./components/winnres";
import { createWinnersTable } from "./components/winnres";
import { createWinnersSection } from "./components/winnres";
import { createWinners } from "./components/winnres";
import { MAX_WINNERS_PER_PAGE, MAX_CARS_PER_PAGE } from "./constants";

export const createPageCars = async (parent: HTMLElement) => {
  const cars = await getCars(store.page);
  const carsParent = document.createElement('div');
  carsParent.classList.add('page-cars')
  parent.append(carsParent);

  for (let i = 0; i < Number(cars.item.length); i++) {
    const carsBlock = document.createRange().createContextualFragment(await createCarBlock(cars.item[i].name, cars.item[i].color, cars.item[i].id));
    carsParent.append(carsBlock);
  }
}

export const createHeaders = async (parent: HTMLElement) => {
  const cars = await getCars(store.page);
  const garageHeaders = document.createRange().createContextualFragment(await createCarsSection(Number(cars.count), store.page));
  parent.append(garageHeaders);
}

export const createWinnersHeaders = async (parent: HTMLElement) => {
  const winners = await getWinners(store.winnersPage, store.winnersSortType, store.winnersOrder);
  const winnersSectionBlock = document.createRange().createContextualFragment(await createWinnersSection(Number(winners.count), store.winnersPage));
  parent.append(winnersSectionBlock);
}

export const updateGaragePagination = async () => {
  const cars = await getCars(store.page);
  const garageSection = document.querySelector('.garage-section') as HTMLElement;  
  const totalCarsPages = Math.ceil(Number(cars.count) / MAX_CARS_PER_PAGE);
  const garagePaginationBlock = document.createRange().createContextualFragment(createPagitation('garage', totalCarsPages, store.page));
  garageSection.append(garagePaginationBlock)
}

export const updateWinnersPagination = async () => {
  const winners = await getWinners(store.winnersPage, store.winnersSortType, store.winnersOrder);
  const totalWinnersPage = Math.ceil(Number(winners.count) / MAX_WINNERS_PER_PAGE);
  const winnerSection = document.querySelector('.winners-section') as HTMLElement;  
  const winnersPaginationBlock = document.createRange().createContextualFragment(createPagitation('winners', totalWinnersPage, store.winnersPage));
  winnerSection.append(winnersPaginationBlock);
}

export const updateGarage = async () => {
  const carsHeaders = document.querySelector('.cars-headers') as HTMLElement;
  const pageCars = document.querySelector('.page-cars') as HTMLElement;
  const garagePagination = document.querySelector('.garage-pagination') as HTMLElement;
  carsHeaders.textContent = '';
  pageCars.textContent = '';
  garagePagination.remove();
  await createHeaders(carsHeaders);
  await createPageCars(pageCars);
  await updateGaragePagination();
}


export const renderGaragePage = async () => {
  const garageSettingsBlock = document.createRange().createContextualFragment(createGarageSettingBlock());
  const garageSection = document.querySelector('.garage-section');  
  const carsSection = document.createElement('section');
  carsSection.classList.add('cars-section');
  
  if (garageSection !== null) {
    garageSection.append(garageSettingsBlock);
    garageSection.append(carsSection);
    await updateGaragePagination();
  }
  
  if (carsSection !== null) {
    await createHeaders(carsSection);
    await createPageCars(carsSection);
  }
}

export const renderWinnersPage = async () => {
  const winnersSection = document.querySelector('.winners-section') as HTMLElement;
  const winnersSwitchButtonsBlock = document.createRange().createContextualFragment(createWinnersSwitchButtons());
  const winnersTable = document.createRange().createContextualFragment(createWinnersTable());

  if (winnersSection !== null) {
    winnersSection?.append(winnersSwitchButtonsBlock);
    await createWinnersHeaders(winnersSection);
    winnersSection?.append(winnersTable);
    await updateWinnersPagination();
  }
  await updateWinnersTable();
}

export const updateWinnersTable = async () => {
  const winners = await getWinners(store.winnersPage, store.winnersSortType, store.winnersOrder);
  const winnersTable = document.querySelector('.winners-table') as HTMLElement;
  const tabelBody = document.querySelector('.winners-table__body') as HTMLElement;
  const winnersHeaders = document.querySelector('.winners-headers') as HTMLElement;
  let carsPerPage = 0;
  winnersTable.style.opacity = '0';
  store.winnersPage === 1 ? carsPerPage = Math.min(Number(winners.count), 10) : carsPerPage = (Number(winners.count)) - store.winnersPage * 10 + 10;
  for (let i = 0; i < carsPerPage; i++) {
    const currentCar = await getCar(winners.winners[i].id);
    tabelBody?.insertAdjacentHTML('beforeend', createWinners(i + 1 + (store.winnersPage * 10 - 10), currentCar[0].name, currentCar[0].color, Number(winners.winners[i].wins), winners.winners[i].time));
  }
  winnersHeaders.textContent = '';
  winnersTable.style.opacity = '1';
  await createWinnersHeaders(winnersHeaders);
}