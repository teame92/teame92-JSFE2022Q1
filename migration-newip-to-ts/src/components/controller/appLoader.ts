import Loader from './loader';

export interface IAPI {
    apiKey?: string;
}
class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
