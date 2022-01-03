import define from '../utils/define.js';
import config from '../../config.js';
import { globalBus } from '../utils/events.js';

const template = ({ data }) => /*html*/`
<a href='${data.url}' class='result'>
  <p class='link'>${data.url}</p>
  <p class='title'>${data.title}</p>
  <p class='extract'>${data.extract}</p>
</a>
`;

export default define('result', class extends HTMLLIElement {
  constructor() {
    super();
    this.#setup();
  }

  async #setup() {
    // DOM Template
    this.innerHTML = template({ data: this.dataset });
  }
}, { extends: 'li' });