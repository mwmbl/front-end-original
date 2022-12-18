import define from '../../utils/define.js';
import {globalBus} from '../../utils/events.js';

// Components
import result from '../molecules/result.js';
import emptyResult from '../molecules/empty-result.js';
import home from './home.js';
import escapeString from '../../utils/escapeString.js';

const template = () => /*html*/`
  <ul class='results'>
    <li is='${home}'></li>
  </ul>
`;

export default define('results', class extends HTMLElement {
  constructor() {
    super();
    this.results = null;
    this.oldIndex = null;
    this.curating = false;
    this.resultsData = null;
    this.__setup();
  }

  __setup() {
    this.innerHTML = template();
    this.results = this.querySelector('.results');
    this.__events();
  }

  __events() {
    globalBus.on('search', (e) => {
      this.resultsData = null;
      this.results.innerHTML = '';
      let resultsHTML = '';
      if (!e.detail.error) {
        // If there is no details the input is empty 
        if (!e.detail.results) {
          resultsHTML = /*html*/`
            <li is='${home}'></li>
          `;
        }
        // If the details array has results display them
        else if (e.detail.results.length > 0) {
          this.resultsData = e.detail.results;
          for(const resultData of e.detail.results) {
            resultsHTML += /*html*/`
              <li
                is='${result}'
                data-url='${escapeString(resultData.url)}'
                data-title='${escapeString(JSON.stringify(resultData.title))}'
                data-extract='${escapeString(JSON.stringify(resultData.extract))}'
              ></li>
            `;
          }
        }
        // If the details array is empty there is no result
        else {
          resultsHTML = /*html*/`
            <li is='${emptyResult}'></li>
          `;
        }
      }
      else {
        // If there is an error display an empty result
        resultsHTML = /*html*/`
          <li is='${emptyResult}'></li>
        `;
      }
      // Bind HTML to the DOM
      this.results.innerHTML = resultsHTML;

      // Allow the user to re-order search results
      $(".results").sortable({
        "activate": this.__sortableActivate.bind(this),
        "deactivate": this.__sortableDeactivate.bind(this),
      });

      this.curating = false;
    });

    // Focus first element when coming from the search bar
    globalBus.on('focus-result', () => {
      this.results.firstElementChild.firstElementChild.focus();
    })
  }

  __sortableActivate(event, ui) {
    console.log("Sortable activate", ui);
    this.__startCurating();
    this.oldIndex = ui.item.index();
  }

  __startCurating() {
    if (!this.curating) {
      const curationStartEvent = new CustomEvent("curation", {
        detail: {
          type: "start",
          data: {
            results: this.resultsData,
          }
        }
      });
      globalBus.dispatch(curationStartEvent);
      this.curating = true;
    }
  }

  __sortableDeactivate(event, ui) {
    const newIndex = ui.item.index();
    console.log("Sortable deactivate", ui, this.oldIndex, newIndex);
    const curationMoveEvent = new CustomEvent("curation", {
      detail: {
        type: "move",
        data: {
          old_index: this.oldIndex,
          new_index: newIndex,
        }
      }
    });
    globalBus.dispatch(curationMoveEvent);
  }
});