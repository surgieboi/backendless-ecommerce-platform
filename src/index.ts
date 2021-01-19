import { Cart, DolaExtendedWindow } from './types';
import {
  loadIframe,
  showIframe,
  attachDolaEventListeners,
  dolaCheckoutEventHandler,
  addListenerToInstances,
  retrieveGlobalObject,
} from './utils/helpers';
import { isNil } from './utils/typeCheck';

const Dola = (() => {
  const attachDola = (cart: Cart, callback: () => void) => {
    try {
      const dolaWindowObject = retrieveGlobalObject();
      showIframe(cart, dolaWindowObject.id);

      window.addEventListener('message', (event) => dolaCheckoutEventHandler(event, callback));
    } catch (error) {
      console.error(error.toString());
    }
  };

  return {
    initialize: () => {
      try {
        let dolaWindowObject = retrieveGlobalObject();
        if (isNil(dolaWindowObject.id)) throw new Error('invalid merchant id');

        attachDolaEventListeners(loadIframe(dolaWindowObject.id));
        ((window as unknown) as DolaExtendedWindow).Dolapay.orderCompleted = false;

        if (dolaWindowObject.type === 'basic') {
          ((window as unknown) as DolaExtendedWindow).Dolapay.attachDola = attachDola;
        } else if (dolaWindowObject.type === 'custom') {
          setInterval(() => addListenerToInstances(dolaWindowObject.id), 1000);
        } else {
          throw new Error('invalid buy now implementation type');
        }
      } catch (err) {
        console.error(err.toString());
      }
    },
  };
})();

Dola.initialize();
