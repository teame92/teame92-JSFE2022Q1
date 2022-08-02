import { createCar } from "./garage";
export const createWinnersSwitchButtons = () => `
    <div class="switch-buttons-block">
      <button class="switch-buttons switch-buttons__garage">To garage</button>
      <button class="switch-buttons switch-buttons__winners">To winners</button>
    </div>
`;

export const createWinnersSection = async (winnersCount: number, winnersPage: number) => `
  <div class="winners-headers">
    <h2>Winners (<span id="winners-count"> ${winnersCount} </span>) </h2>
    <h3>Page #<span id="page-number"> ${winnersPage} </span> </h3>
  </div>
`;

export const createWinnersTable = () => `
  <table class="winners-table">
    <thead class="winners-table__head">
      <tr> 
        <th class="winners-table__number">Number</th>
        <th class="winners-table__car">Car</th>
        <th class="winners-table__name">Name</th>
        <th class="winners-table__wins">Wins</th>
        <th class="winners-table__best-time">Best time (seconds)</th>
      </tr>
    </thead>
    <tbody class="winners-table__body"
    </tbody>
  </table>
`;

export const createWinners = (carNumber: number, carName: string, carColor: string, carWins: number, carBestTime: number) => `
  <tr> 
    <th class="winners-table__number">${carNumber}</th>
    <th class="winners-table__car">${createCar(carColor)}</th>
    <th class="winners-table__name">${carName}</th>
    <th class="winners-table__wins">${carWins}</th>
    <th class="winners-table__best-time">${carBestTime}</th>
  </tr>
`;

export const raceWinner = (winnerName: string, winnerTime: number) => `
  <div class="new-winner">
    <p class="new-winner__text">
      <span class="new-winner__name">${winnerName}</span> 
      <span> came first with the result </span>
      <span class="new-winner__time">[${winnerTime}s]</span>
    </p>
  </div>
`;

export const noWinners = () => `
  <div class="new-winner">
    <p class="new-winner__text">
      <span> All cars were broken! </span>
    </p>
  </div>
`;