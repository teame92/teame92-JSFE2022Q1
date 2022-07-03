import './sources.css';

export interface ISource {
    category: string,
    country: string,
    description: string,
    id: string,
    language: string,
    name: string,
    url: string
}

class Sources {
    draw(data: Array<ISource>) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: ISource) => {
            const sourceClone: Node = <HTMLElement>sourceItemTemp.content.cloneNode(true);

            (<HTMLElement>sourceClone).querySelector('.source__item-name').textContent = item.name;
            (<HTMLElement>sourceClone).querySelector('.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources').append(fragment);
    }
}

export default Sources;
