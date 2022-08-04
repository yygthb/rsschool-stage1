import { ICar } from '../../../model/model';
import { INodeProps, NodeElement } from '../../../utils/nodeElement';
import Car from './units/Car';
import ContentSection from './ContentSection';

class Garage extends ContentSection {
  private garage: NodeElement[] = [];

  constructor(nodeProps: INodeProps) {
    super(
      {
        ...nodeProps,
        tagName: 'section',
        classNames: 'content__garage',
      },
      'GARAGE',
    );
  }

  renderCars(data: ICar[] = []) {
    data.forEach((car) => {
      console.log('car: ', car);

      const carItem = new Car({
        parentNode: this.node,
      });
      carItem.setColor(car.color);

      this.garage.push(carItem);
    });

    this.showTotalCount(data.length);
  }
}

export default Garage;
