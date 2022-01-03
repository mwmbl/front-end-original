/**
 * A debounce function to reduce input spam
 * @param {*} callback 
 * @param {*} timeout 
 * @returns 
 */
export default (callback, timeout = 100) => {
  let timer;
  return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { callback.apply(this, args); }, timeout);
  };
}