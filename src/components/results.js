import define from '../utils/define.js';
import { globalBus } from '../utils/events.js';
import result from './result.js';

const template = () => /*html*/`
  <ul class='results'>
    <li class="empty-result">
      Welcome to mwmbl, the free, open-source and non-profit search engine.
      <br> 
      You can start searching by using the search bar above!
    </li>
  </ul>
`;

export default define('results', class extends HTMLElement {
  constructor() {
    super();
    this.__setup();
  }

  async __setup() {
    this.innerHTML = template({ data: this.dataset });
    this.__events();
  }

  __events() {
    globalBus.on('search', (e) => {
      this.querySelector('.results').innerHTML = '';
      if (!e.detail) {
        this.querySelector('.results').innerHTML = /*html*/`
          <li class="empty-result">
            Welcome to mwmbl, the free, open-source and non-profit search engine.
            <br> 
            You can start searching by using the search bar above!
          </li>
        `;
      }
      else if (e.detail.length > 0) {
        for(const resultData of e.detail) {
          this.querySelector('.results').innerHTML += /*html*/`
            <li 
              is='${result}' 
              data-url='${resultData.url}'
              data-title='${this.__handleBold(resultData.title)}'
              data-extract='${this.__handleBold(resultData.extract)}'
            ></li>
          `;
        }
      }
      else {
        this.querySelector('.results').innerHTML = /*html*/`
          <li 
            class="empty-result"
          >We could not find anything for your search...</li>
        `;
      }
      
    });
  }

  __handleBold(input) {
    let text = '';
    for (const part of input) {
      if (part.is_bold) text += `<strong>${part.value}</strong>`;
      else text += part.value;
    }
    return text;
  }
});