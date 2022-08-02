import { IAnimations } from "./interfaces"
export let store = {
  page: 1,
  winnersPage: 1,
  winnersSortType: 'id',
  winnersOrder: 'ASC',
  selectedCarID: 0,
  animations: <IAnimations>{},
  isRaceStoped: false
}
