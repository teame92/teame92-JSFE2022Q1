import { CAR_BRANDS, CAR_MODELS, CARS_TO_GENERATE } from "./constants";
import { addCar } from "./api";
import { updateGarage } from "./renderPage";

export const generateColor = () => {
  return `#${Math.random().toString(16).slice(2,8)}`;
}

export const generateCarName = () => {
  const model = CAR_MODELS[Math.floor(Math.random() * CAR_MODELS.length)];
  const brand = CAR_BRANDS[Math.floor(Math.random() * CAR_BRANDS.length)];
  return `${brand} ${model}`;
}

export const generateRandomCars = async (count: number) => {
  let promisesArr = [];
  for (let i = 0; i < count; i++) { 
    const body = {
      name: generateCarName(),
      color: generateColor() 
    }
    promisesArr.push(body);
    await addCar(body);
  }
  await updateGarage();
}

export const disableButton = (id: number, selector: string) => {
  const button = document.getElementById(`${selector}${id}`) as HTMLInputElement;
  button.disabled = false;
}

export const activateButton = (id: number, selector: string) => {
  const button = document.getElementById(`${selector}${id}`) as HTMLInputElement;
  button.disabled = true;
}

export const changeDisableButtons = (disable: boolean) => {
  const raceButton = document.querySelector('.race-button-block__button') as HTMLInputElement;
  raceButton.disabled = disable;
  const removeButtons = document.querySelectorAll('.car-remove');
  removeButtons.forEach((item) => (item as HTMLInputElement).disabled = disable);
}