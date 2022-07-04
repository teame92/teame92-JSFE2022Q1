import Loader from './loader';

export interface IAPI {
  apiKey?: string;
}
class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.herokuapp.com/', {
      apiKey: 'e4f9d42a800b4da29d0f18c70c73006e',
    });
  }
}

export default AppLoader;
