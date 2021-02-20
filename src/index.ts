import { Cart } from './types';
import {
  loadIframe,
  showIframe,
  attachDolaEventListeners,
  dolaCheckoutEventHandler,
  addListenerToInstances,
  Dolapay,
  fetchDolaInstances,
  validateCart,
} from './utils/helpers';
import { isNil } from './utils/typeCheck';

const Dola = (() => {
  const attachDola = (cart: Cart, callback: () => void) => {
    try {
      showIframe(validateCart(cart), Dolapay.id);

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

        if (Dolapay.type === 'sdk') {
          attachDolaEventListeners(loadIframe(Dolapay.id));
          Dolapay.attachDola = attachDola;
        } else if (Dolapay.type === 'basic') {
          attachDolaEventListeners(loadIframe(Dolapay.id));
          setInterval(() => addListenerToInstances(fetchDolaInstances()), 1000);
        } else {
          throw new Error('invalid BEP instance');
        }
      } catch (err) {
        console.error(err.toString());
      }
    },
  };
})();

Dola.initialize();
