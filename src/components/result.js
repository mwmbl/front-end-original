import define from '../utils/define.js';

const template = ({ data }) => /*html*/`
<a href='${data.url}'>
  <p class='link'>${data.url}</p>
  <p class='title'>${data.title}</p>
  <p class='extract'>${data.extract}</p>
</a>
`;

export default define('result', class extends HTMLLIElement {
  constructor() {
    super();
    this.classList.add('result');
    this.__setup();
  }

  async __setup() {
    this.innerHTML = template({ data: this.dataset });
  }
}, { extends: 'li' });