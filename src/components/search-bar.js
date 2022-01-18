import define from '../utils/define.js';
import debounce from '../utils/debounce.js';
import config from '../../config.js';
import { globalBus } from '../utils/events.js';

const template = ({ data }) => /*html*/`
  <div class="search-bar">
    <i class="ph-magnifying-glass-bold"></i>
    <input type='search' class='search-bar-input' placeholder='Search on mwmbl...' title='Use "CTRL+K" or "/" to focus.'>
  </div>
`;

export default define('search-bar', class extends HTMLElement {
  constructor() {
    super();
    this.searchInput = null;
    this.__setup();
  }

  __setup() {
    this.innerHTML = template({ data: this.dataset });
    this.searchInput = this.querySelector('input');
    this.__events();
  }

  __events() {
    this.searchInput.addEventListener('input', debounce(async (e) => {
      // Update page title
      document.title = `MWMBL - ${this.searchInput.value || "Search"}`;

      // Update query params
      const queryParams = new URLSearchParams(document.location.search);
      // Sets query param if search value is not empty
      if (this.searchInput.value) queryParams.set(config.searchQueryParam, this.searchInput.value);
      else queryParams.delete(config.searchQueryParam);
      // New URL with query params
      const newURL = 
        document.location.protocol 
        + "//" 
        + document.location.host 
        + document.location.pathname 
        + (this.searchInput.value ? '?' : '')
        + queryParams.toString();
      // Replace history state
      window.history.pushState({ path: newURL }, '', newURL);

      // Update body padding if search value is empty
      if (this.searchInput.value) document.body.style.paddingTop = '25px';
      else document.body.style.paddingTop = '30vh';
      // Getting results from API
      const search = await (await fetch(`${config.publicApiURL}search?s=${this.searchInput.value}`)).json();
      // Creating a custom event to send search results
      const searchEvent = new CustomEvent('search', {
        detail: this.searchInput.value ? search : null,
      });
      // Dispatch search event throught the global event bus
      globalBus.dispatch(searchEvent);
    }));

    // Focus search bar when pressing `ctrl + k` or `/`
    document.addEventListener('keydown', (e) => {
      if ((e.key === 'k' && e.ctrlKey) || e.key === '/') {
        e.preventDefault();
        this.searchInput.focus();
      }
    });

    // Focus first result when pressing down arrow
    this.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' && this.searchInput.value) {
        e.preventDefault();
        const focusResultEvent = new CustomEvent('focus-result');
        globalBus.dispatch(focusResultEvent);
      }
    })
  }

  connectedCallback() {
    // Focus search input when component is connected
    this.searchInput.focus();

    const searchQuery = new URLSearchParams(document.location.search).get(config.searchQueryParam);
    this.searchInput.value = searchQuery;
    this.searchInput.dispatchEvent(new Event('input'));
  }
});