import News from './news/news';
import Sources from './sources/sources';
import { IData } from './news/news';
import {ISource} from './sources/sources';
export interface IAppData {
    status: string,
    totalResults: string,
    articles: Array<IData>
}

export interface IDarw {
    sources: Array<ISource>,
    status: string
}

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
