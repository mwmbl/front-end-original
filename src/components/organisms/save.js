import define from '../../utils/define.js';
import {globalBus} from "../../utils/events.js";
import config from "../../../config.js";


const CURATION_KEY_PREFIX = "curation-";
const CURATION_URL = config.publicApiURL + "user/curation/";


const template = () => /*html*/`
  <span>🖫</span>
`;


export default define('save', class extends HTMLLIElement {
  constructor() {
    super();
    this.classList.add('save');
    this.__setup();
  }

  __setup() {
    this.innerHTML = template();
    this.__events();
    // TODO: figure out when to call __sendToApi()
    // setInterval(this.__sendToApi.bind(this), 1000);
  }

  __events() {
    globalBus.on('curation', (e) => {
      // We might not be online, or logged in, so save the curation in local storage in case:
      this.__setCuration(e.detail);
    });
  }

  __setCuration(curation) {
    const key = CURATION_KEY_PREFIX + Date.now()
    localStorage.setItem(key, JSON.stringify(curation));
  }

  __getOldestCurationKey() {
    let oldestTimestamp = Number.MAX_SAFE_INTEGER;
    let oldestKey = null;
    for (let i=0; i<localStorage.length; ++i) {
      const key = localStorage.key(i);
      if (key.startsWith(CURATION_KEY_PREFIX)) {
        const timestamp = parseInt(key.substring(CURATION_KEY_PREFIX.length));
        if (timestamp < oldestTimestamp) {
          oldestKey = key;
          oldestTimestamp = timestamp;
        }
      }
    }
    return oldestKey;
  }

  async __sendToApi() {
    while (localStorage.length > 0) {
      const key = this.__getOldestCurationKey();
      const value = localStorage.getItem(key);
      const url = CURATION_URL + value['type'];

      const response = await fetch(url, {
          method: 'POST',
          cache: 'no-cache',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(value),
        });
    }

  }
}, { extends: 'li' });

