import './css/main.css';
import { createBasicStructure } from './components/basicStructure';
import { renderGaragePage, renderWinnersPage } from './renderPage';
createBasicStructure();
await renderGaragePage();
await renderWinnersPage();