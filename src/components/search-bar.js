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
    this.#setup(shadow);
  }

  async #setup(shadow) {
    // DOM Template
    shadow.innerHTML = template({ data: this.dataset });

    this.#events();
  }

  #events() {
    const searchInput = this.shadowRoot.querySelector('input');

    searchInput.addEventListener('input', debounce(async (e) => {
      const search = await (await fetch(`${config.publicApiURL}search?s=${searchInput.value}`)).json();
      console.log(search);

      const searchEvent = new CustomEvent('search', {
        detail: search,
      });

      globalBus.dispatch(searchEvent);
    }));
  }
});