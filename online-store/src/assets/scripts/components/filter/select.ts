import { INodeProps, NodeElement } from '../../utils/nodeElement';

export enum FilterTitle {
  Sort = 'sort',
}

export enum SortValue {
  TitleUp = 'title-up',
  TitleDown = 'title-down',
  PriceUp = 'price-up',
  PriceDown = 'price-down',
}

enum SortContent {
  TitleUp = 'By title (A-Z)',
  TitleDown = 'By title (Z-A)',
  PriceUp = 'By price (🡥)',
  PriceDown = 'By price (🡦)',
}

type SelectOptionType = {
  value: SortValue;
  content: string;
};

const sortOptions: SelectOptionType[] = [
  {
    value: SortValue.TitleUp,
    content: SortContent.TitleUp,
  },
  {
    value: SortValue.TitleDown,
    content: SortContent.TitleDown,
  },
  {
    value: SortValue.PriceUp,
    content: SortContent.PriceUp,
  },
  {
    value: SortValue.PriceDown,
    content: SortContent.PriceDown,
  },
];

export type ISelectCb = (selectValue: SortValue) => void;

export class Select extends NodeElement {
  constructor(nodeProps: INodeProps) {
    super({
      ...nodeProps,
      classNames: `select ${nodeProps.classNames || null}`,
    });
  }

  init(cb: ISelectCb) {
    sortOptions.forEach((option) => {
      new NodeElement({
        parentNode: this.node,
        tagName: 'option',
        content: option.content,
        attributes: [['value', option.value]],
      });
    });

    const n = this.node as HTMLSelectElement;
    n.onchange = () => {
      cb(n.options[n.selectedIndex].value as SortValue);
    };
  }
}
