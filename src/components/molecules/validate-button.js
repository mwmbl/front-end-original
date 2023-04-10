import define from "../../utils/define.js";
import {globalBus} from "../../utils/events.js";


export default define('validate-button', class extends HTMLButtonElement {
  constructor() {
    super();
    this.__setup();
    this.validated = false;
  }

  __setup() {
    this.__events();
  }

  __events() {
    this.addEventListener('click', (e) => {
      console.log("Validate button");

      const result = this.closest('.result');
      const parent = result.parentNode;

      const index = Array.prototype.indexOf.call(parent.children, result);
      console.log("Validate index", index);

      this.validated = !this.validated

      const curationValidateEvent = new CustomEvent('curate-validate-result', {
        detail: {
          data: {
            validate_index: index,
            is_validated: this.validated
          }
        }
      });
      globalBus.dispatch(curationValidateEvent);

      if (this.validated) {
        this.classList.add("validated");
      } else {
        this.classList.remove("validated");
      }
    })
  }
}, { extends: 'button' });
