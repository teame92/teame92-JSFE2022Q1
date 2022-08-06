import { MAX_CARS_PER_PAGE, MAX_WINNERS_PER_PAGE } from "./constants";
import { ICarBody, ICarWinner, ICarWinnerUpdate } from "./components/interfaces";
import { stopDriving } from "./animation";

const url = 'http://127.0.0.1:3000';
const garage = `${url}/garage`;
const winners = `${url}/winners`;
const engine = `${url}/engine`;

export const getCar = async (id: number) => {
  const response = await fetch (`${garage}?id=${id}`);
  return await response.json();
}

export const getWinner = async (id: number) => {
  const response = await fetch (`${winners}?id=${id}`);
  return await response.json();
}

export const getCars = async (page: number) => {
  const response = await fetch (`${garage}?_page=${page}&_limit=${MAX_CARS_PER_PAGE}`);
  return {
    item: await response.json(),
    count: response.headers.get('X-Total-Count')
  }
};

export const getWinners = async (page: number, sort: string, order: string) => {
  const response = await fetch (`${winners}?_page=${page}&_limit=${MAX_WINNERS_PER_PAGE}&_sort=${sort}&_order=${order}`);
  return {
    winners: await response.json(),
    count: response.headers.get('X-Total-Count')
  }
};

export const getAllWinners = async () => {
  const response = await fetch (`${winners}`);
  return {
    winners: await response.json(),
    count: response.headers.get('X-Total-Count')
  }
};


export const removeCar = async (id: number) => {
  const response = await fetch (`${garage}/${id}`, {
    method: 'DELETE'
  });
  return await response.json();
}

export const removeWinner = async (id: number) => {
  const response = await fetch (`${winners}/${id}`, {
    method: 'DELETE'
  });
  return await response.json();
}

export const addCar = async (body: ICarBody) => {
  const response = await fetch (`${garage}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return await response.json();
}

export const updateCar = async (id:number, body: ICarBody) => {
  const response = await fetch (`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return await response.json();
}

export const startEngine = async (id: number) => {
  const response = await fetch (`${engine}?id=${id}&status=started`, {
    method: 'PATCH'
  });
  return response.json();
}

export const stopEngine = async (id: number) => {
  const response = await fetch (`${engine}?id=${id}&status=stopped`, {
    method: 'PATCH'
  });
  return response.json();
}

export const drive = async (id: number) => {
  const response = await fetch (`${engine}?id=${id}&status=drive`, {
    method: 'PATCH'
  });
  if (response.status === 500) {
    stopDriving(id);
  }
  return response.status !== 200 ? { 'success': false } : response.json();
}

export const createWinner = async (body: ICarWinner) => {
  const response = await fetch (`${winners}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return await response.json();
}

export const updateWinner = async (id: number, body: ICarWinnerUpdate) => {
  const response = await fetch (`${winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return await response.json();
}