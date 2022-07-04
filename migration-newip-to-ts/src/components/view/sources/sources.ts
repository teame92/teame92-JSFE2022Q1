import './sources.css';
import { ISource } from '../../interfaces/interface';

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
