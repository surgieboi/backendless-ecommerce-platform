import { Cart } from './types';
import {
  loadIframe,
  showIframe,
  attachDolaEventListeners,
  dolaCheckoutEventHandler,
  addListenerToInstances,
  Dolapay,
  fetchDolaInstances,
} from './utils/helpers';
import { isNil } from './utils/typeCheck';

const Dola = (() => {
  const attachDola = (cart: Cart, callback: () => void) => {
    try {
      showIframe(cart, Dolapay.id);

      window.addEventListener('message', (event) => dolaCheckoutEventHandler(event, callback));
    } catch (error) {
      console.error(error.toString());
    }
  };

  return {
    initialize: () => {
      try {
        if (isNil(Dolapay.id)) throw new Error('invalid merchant id');

        Dolapay.orderCompleted = false;
        attachDolaEventListeners(loadIframe(Dolapay.id));

        if (Dolapay.type === 'sdk') {
          Dolapay.attachDola = attachDola;
        } else if (Dolapay.type === 'basic') {
          setInterval(() => addListenerToInstances(fetchDolaInstances()), 1000);
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
