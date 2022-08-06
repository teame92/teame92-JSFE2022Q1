import './css/main.css';
import { createBasicStructure } from './components/basicStructure';
import { renderGaragePage, renderWinnersPage } from './renderPage';
import { handler } from './handler';
createBasicStructure();
await renderGaragePage();
await renderWinnersPage();
await handler();