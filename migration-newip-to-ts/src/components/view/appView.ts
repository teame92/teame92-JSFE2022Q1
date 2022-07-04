import News from './news/news';
import Sources from './sources/sources';
import { ISource, IData, IDarw, IAppData } from '../interfaces/interface';

export class AppView {
  news: News;

  sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: IAppData) {
    const values: Array<IData> = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: IDarw) {
    const values: Array<ISource> = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
