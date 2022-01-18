import define from '../utils/define.js';
import debounce from '../utils/debounce.js';
import config from '../../config.js';
import { globalBus } from '../utils/events.js';

const template = ({ data }) => /*html*/`
  <div class="search-bar">
    <i class="ph-magnifying-glass-bold"></i>
    <input type='search' class='search-bar-input' placeholder="Search on mwmbl...">
  </div>
`;

export default define('search-bar', class extends HTMLElement {
  constructor() {
    super();
    this.searchInput = null;
    this.__setup();
  }

  async __setup() {
    this.innerHTML = template({ data: this.dataset });
    this.searchInput = this.querySelector('input');
    this.__events();
  }

  __events() {
    this.searchInput.addEventListener('input', debounce(async (e) => {
      // Getting results from API
      const search = await (await fetch(`${config.publicApiURL}search?s=${this.searchInput.value}`)).json();
      // Creating a custom event to send search results
      const searchEvent = new CustomEvent('search', {
        detail: this.searchInput.value ? search : null,
      });
      // Dispatch search event throught the global event bus
      globalBus.dispatch(searchEvent);

      // Update page title on search input
      document.title = `MWMBL - ${this.searchInput.value || "Search"}`;

      // Update body padding if search value is empty
      if (this.searchInput.value) document.body.style.paddingTop = '25px';
      else document.body.style.paddingTop = '30vh';
    }));
  }

  connectedCallback() {
    // Focus search input when component is connected
    this.searchInput.focus();
  }
});