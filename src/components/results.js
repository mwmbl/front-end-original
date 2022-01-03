import define from '../utils/define.js';
import { globalBus } from '../utils/events.js';
import result from './result.js';

const template = () => /*html*/`
  <ul class='results'></ul>
`;

export default define('results', class extends HTMLElement {
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
    globalBus.on('search', (e) => {
      this.shadowRoot.querySelector('.results').innerHTML = '';
      for(const resultData of e.detail) {
        this.shadowRoot.querySelector('.results').innerHTML += /*html*/`
          <li 
            is='${result}' 
            data-url='${resultData.url}'
            data-title='${this.#handleBold(resultData.title)}'
            data-extract='${this.#handleBold(resultData.extract)}'
          ></li>
        `;
      }
    });
  }

  #handleBold(input) {
    let text = '';
    for (const part of input) {
      if (part.is_bold) text += `<strong>${part.value}</strong>`;
      else text += part.value;
    }
    return text;
  }
});