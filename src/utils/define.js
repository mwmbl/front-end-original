import config from '../../config.js';

/** Define a web component
 * @function define 
 * @param {string} name
 * @param {CustomElementConstructor} constructor
 * @param {ElementDefinitionOptions} [options]
 * @returns {string} Returns the element name ready for the DOM (.e.g `<search-bar></search-bar>`)
 */
 export default (name, constructor, options) => { 
  const componentName = `${config.componentPrefix}-${name}`;
  if (!customElements.get(componentName)) customElements.define(componentName, constructor, options); 
  return componentName;
}