import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IDarw, IAppData } from '../interfaces/interface';

class App {
  controller: AppController;

  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    (document.querySelector('.sources') as HTMLLIElement).addEventListener('click', (e) =>
      this.controller.getNews(e, (data: IAppData) => this.view.drawNews(data))
    );
    this.controller.getSources((data: IDarw) => this.view.drawSources(data));
  }
}

export default App;
