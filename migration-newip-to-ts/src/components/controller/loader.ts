import { IAPI } from "./appLoader";
import { IDarw } from "../view/appView";
class Loader {
    baseLink: string;
    options: IAPI;
    constructor(baseLink: string, options: IAPI) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint = 'string', options = {} },
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: IAPI, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        (Object.keys(urlOptions) as Array<keyof typeof urlOptions>).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: IDarw) => void, options: IAPI) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: IDarw) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
