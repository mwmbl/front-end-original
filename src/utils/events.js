class Bus {
  constructor() {
    this.element = document.createElement('div');
  }

  on(eventName, callback) {
    this.element.addEventListener(eventName, callback);
  }

  dispatch(event) {
    this.element.dispatchEvent(event);
  }
}

const globalBus = new Bus();

export {
  Bus,
  globalBus,
}