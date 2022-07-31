import { Navigation } from '../model/model';
import { NodeElement } from '../utils/nodeElement';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import { ClickNavCb } from './ui/Button';

class App extends NodeElement {
  private header: Header;
  private main: Main;

  constructor(selector: string) {
    super({});

    this.node = <HTMLElement>document.querySelector(selector);

    this.header = new Header({
      parentNode: this.node,
    });

    this.main = new Main({
      parentNode: this.node,
    });

    new Footer({
      parentNode: this.node,
    });
  }

  initNav(navTitles: Navigation[], clickNavCb: ClickNavCb) {
    this.header.initNav(navTitles, clickNavCb);
  }

  initContent(garage, winners) {
    this.main.renderGarage(garage);
    this.main.renderWinners(winners);
  }

  setActiveNavItem(val: Navigation) {
    this.header.setActiveNavItem(val);
    this.main.setContentSection(val);
  }
}

export default App;
