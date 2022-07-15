import { StoreContent } from './content';
import { StoreFilter } from './filter';
import { SortValue } from './filterElements/select';
import { NodeElement, INodeProps } from '../utils/nodeElement';
import { FilterProp, StoreController } from '../controller/storeController';
import { state } from '../state/state';
import { CheckboxCbValue } from './filterElements/checkbox';
import { cart } from './cart';
import { FilterStorage } from '../controller/filterStorage';
import { defaultControls, engineRadioControls } from '../config/filterConfig';

export class Store extends NodeElement {
  public storeContent: StoreContent;
  public storeFilter: StoreFilter;
  private filterStorage: FilterStorage;
  private controller: StoreController;

  constructor(nodeProps: INodeProps) {
    super(nodeProps);

    this.storeContent = new StoreContent(
      {
        parentNode: this.node,
        classNames: 'store__content',
        content: 'Content',
      },
      this.clickOnCardCb.bind(this)
    );

    this.storeFilter = new StoreFilter({
      parentNode: this.node,
      classNames: 'store__filter',
      content: 'Filter',
    });

    this.filterStorage = new FilterStorage(defaultControls);
    this.controller = new StoreController(state, this.filterStorage);

    this.init();
  }

  clickOnCardCb(id: string) {
    const res: string = cart.clickCb(id);
    if (res === 'ok') {
      console.log('click on id: ', id);
      this.controller.setFav(id);
    }
    return res;
  }

  private init() {
    // console.log(engineRadioControls);
    this.storeFilter.init(
      {
        sortCb: this.sortCallback.bind(this),
        titleCb: this.filterByTitleCb.bind(this),
        priceCb: this.filterByPriceCb.bind(this),
        powerCb: this.filterByPowerCb.bind(this),
        engineTypeCb: this.filterByEngineTypeCb.bind(this),
        conditionCb: this.filterByConditionCb.bind(this),
        motoTypeCb: this.filterByMotoType.bind(this),
        checkboxCb: this.filterByColor.bind(this),
        favCb: this.filterByFav.bind(this),
        resetFilterCb: this.resetFilter.bind(this),
      },
      this.filterStorage.sort,
      this.filterStorage.filters
    );

    this.storeContent.render(this.controller.state);
  }

  private sortCallback(selectValue: SortValue) {
    this.controller.sortByValue(selectValue);
    this.storeContent.render(this.controller.state);
  }

  private filterByTitleCb(value: string) {
    this.controller.filterBy(FilterProp.Title, value);
    this.storeContent.render(this.controller.state);
  }

  private filterByPriceCb(value: [number, number]) {
    this.controller.filterBy(FilterProp.Price, value);
    this.storeContent.render(this.controller.state);
  }

  private filterByPowerCb(value: [number, number]) {
    this.controller.filterBy(FilterProp.EnginePower, value);
    this.storeContent.render(this.controller.state);
  }

  private filterByEngineTypeCb(value: string) {
    this.controller.filterBy(FilterProp.EngineType, value);
    this.storeContent.render(this.controller.state);
  }

  private filterByConditionCb(value: string) {
    this.controller.filterBy(FilterProp.Condition, value);
    this.storeContent.render(this.controller.state);
  }

  private filterByMotoType(value: string) {
    this.controller.filterBy(FilterProp.MotoType, value);
    this.storeContent.render(this.controller.state);
  }

  private filterByColor(value: CheckboxCbValue) {
    this.controller.filterBy(FilterProp.Colors, value);
    this.storeContent.render(this.controller.state);
  }

  private filterByFav(value: string) {
    this.controller.filterBy(FilterProp.Fav, value);
    this.storeContent.render(this.controller.state);
  }

  private resetFilter() {
    this.controller.resetFilter();
    this.storeFilter.reset(this.filterStorage.filters);
    this.storeContent.render(this.controller.state);
  }
}
