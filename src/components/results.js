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
    this.results = null;
    this.__setup();
  }

  __setup() {
    this.innerHTML = template({ data: this.dataset });
    this.results = this.querySelector('.results');
    this.__events();
  }

  __events() {
    globalBus.on('search', (e) => {
      this.results.innerHTML = '';
      // If there is no details the input is empty 
      if (!e.detail) {
        this.results.innerHTML = /*html*/`
          <li class="empty-result">
            Welcome to mwmbl, the free, open-source and non-profit search engine.
            <br> 
            You can start searching by using the search bar above!
          </li>
        `;
      }
      // If the details array has results display them
      else if (e.detail.length > 0) {
        for(const resultData of e.detail) {
          this.results.innerHTML += /*html*/`
            <li
              is='${result}' 
              data-url='${this.__escapeString(resultData.url)}'
              data-title='${this.__escapeString(this.__handleBold(resultData.title))}'
              data-extract='${this.__escapeString(this.__handleBold(resultData.extract))}'
            ></li>
          `;
        }
      }
      // If the details array is empty there is no result
      else {
        this.results.innerHTML = /*html*/`
          <li 
            class="empty-result"
          >We could not find anything for your search...</li>
        `;
      }
    });

    // Focus first element when coming from the search bar
    globalBus.on('focus-result', () => {
      this.results.firstElementChild.firstElementChild.focus();
    })
  }

  __handleBold(input) {
    let text = '';
    for (const part of input) {
      if (part.is_bold) text += `<strong>${part.value}</strong>`;
      else text += part.value;
    }
    return text;
  }

  __escapeString(input) {
    return input
      .replace(/\"/g,'&#34;')
      .replace(/\'/g,'&#39;')
  }
});