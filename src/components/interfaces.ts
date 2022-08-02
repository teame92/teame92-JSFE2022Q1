export interface ICarBody {
  name: string,
  color: string
};
export interface ICar{
  name: string,
  color: string
  id: number
};
export interface IAnimations {
  [id: number]: number
}

export interface ICarResult {
  success: boolean,
  id: number,
  time: number,
  delay: number
}

export interface IWinner {
  id: number,
  time: number
}

export interface ICarWinner {
  id: number,
  wins: number,
  time: number
}

export interface ICarWinnerUpdate {
  wins: number,
  time: number
}