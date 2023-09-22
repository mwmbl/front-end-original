import define from '../../utils/define.js';

const template = () => /*html*/`
  <h1>
    A free, open-source, and non-profit search engine.
  </h1>
`;

export default define('home', class extends HTMLLIElement {
  constructor() {
    super();
    this.classList.add('home');
    this.__setup();
  }

  __setup() {
    this.innerHTML = template();
  }
}, { extends: 'li' });