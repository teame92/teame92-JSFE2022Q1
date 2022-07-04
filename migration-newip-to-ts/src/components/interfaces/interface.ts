export interface ISource {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
  }
  
  export interface IAppData {
    status: string;
    totalResults: string;
    articles: Array<IData>;
  }
  
  export interface IDarw {
    sources: Array<ISource>;
    status: string;
  }
  
  export interface ISourceNews {
    id: string;
    name: string;
  }
  
  export interface IData {
    author: string | null;
    content: string;
    description: string;
    publishedAt: string;
    source: ISourceNews;
    title: string;
    url: string;
    urlToImage: string;
  }