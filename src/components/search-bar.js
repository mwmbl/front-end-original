import define from '../utils/define.js';
import debounce from '../utils/debounce.js';
import config from '../../config.js';
import { globalBus } from '../utils/events.js';

const template = ({ data }) => /*html*/`
  <input type='search' class='text-input'>
`;

export default define('search-bar', class extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.__setup(shadow);
  }

  async __setup(shadow) {
    shadow.innerHTML = template({ data: this.dataset });
    this.__events();
  }

  __events() {
    const searchInput = this.shadowRoot.querySelector('input');
    searchInput.addEventListener('input', debounce(async (e) => {
      // Getting results from API
      const search = await (await fetch(`${config.publicApiURL}search?s=${searchInput.value}`)).json();
      // Creating a custom event to send search results
      const searchEvent = new CustomEvent('search', {
        detail: search,
      });
      // Dispatch search event throught the global event bus
      globalBus.dispatch(searchEvent);
    }));
  }
});