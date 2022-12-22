import define from '../../utils/define.js';

const template = () => /*html*/`
  <input type="url" placeholder="Enter a URL">
`;

export default define('add-result', class extends HTMLLIElement {
  constructor() {
    super();
    this.classList.add('add-result');
    this.__setup();
  }

  __setup() {
    this.innerHTML = template();
  }
}, { extends: 'li' });