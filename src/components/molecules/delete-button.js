import define from "../../utils/define.js";
import {globalBus} from "../../utils/events.js";


export default define('delete-button', class extends HTMLButtonElement {
  constructor() {
    super();
    this.__setup();
  }

  __setup() {
    this.__events();
  }

  __events() {
    this.addEventListener('click', (e) => {
      console.log("Delete button");

      const result = this.closest('.result');
      const parent = result.parentNode;

      const index = Array.prototype.indexOf.call(parent.children, result);
      console.log("Delete index", index);
      parent.removeChild(result);

      const beginCuratingEvent = new CustomEvent('begin-curating-results');
      globalBus.dispatch(beginCuratingEvent);

      const curationDeleteEvent = new CustomEvent('save-curation', {
        detail: {
          type: 'delete',
          data: {
            delete_index: index
          }
        }
      });
      globalBus.dispatch(curationDeleteEvent);
    })
  }
}, { extends: 'button' });
