import { Cart, CartItem, IframeExtended } from './types';
import axios from 'axios';

const DolaBuyNow = (() => {
  let tempId: string;
  const loadIframe = (merchantId: string) => {
    let dolaIframe: IframeExtended = document.createElement('iframe');

    dolaIframe.src = `https://dola-embedded-app-4f54yn4s1.vercel.app/${merchantId}`;
    dolaIframe.style.width = '100%';
    dolaIframe.style.height = '100%';
    dolaIframe.style.border = 'none';
    dolaIframe.loading = 'lazy';
    dolaIframe.id = 'dolapayIframe';
    dolaIframe.style.position = 'fixed';
    dolaIframe.style.top = '0';
    dolaIframe.style.zIndex = '-9999';
    dolaIframe.style.overflow = 'hidden';

    document.body.prepend(dolaIframe);
    return dolaIframe;
  };

  const attachCloseDolaEventListener = () => {
    window.addEventListener('message', async event => {
      if (event.origin !== 'https://dola-embedded-app-4f54yn4s1.vercel.app')
        return;
      const target = document.getElementById('dolapayIframe');

      if (target && event.data['action'] === 'close-dola') {
        target.style.zIndex = '-9999';
      }
    });
  };

  const initialize = async (key: string) => {
    try {
      const initializeDolaSercice = await axios.get(
        `https://apidev.dola.me/pubmerchant?key=${key}`
      );

      const {
        data: {
          data: { id, websiteURL },
        },
      } = initializeDolaSercice;

      if (id && window.location.origin === websiteURL) {
        tempId = id;
        const createIframe = loadIframe(id);
        if (createIframe) {
          attachCloseDolaEventListener();

          return {
            attachDolaToCart: attachDolaToCart,
            attachDolaToItem: attachDolaToItem,
          };
        }
        throw new Error('error attaching Dola');
      } else {
        throw new Error('invalid Dola API key');
      }
    } catch (error) {
      console.log(error.toString());
      return;
    }
  };

  const attachDolaToCart = (cart: Cart) => {
    if (cart.items.length > 0) {
      return showIframe(cart);
    }
  };

  const attachDolaToItem = (
    item: CartItem,
    discount: number,
    currency: string
  ) => {
    const buildSingleItemCart = {
      totalPrice: item.price,
      totalWeight: item.grams,
      currency: currency,
      discount: discount,
      items: [item],
    };

    showIframe(buildSingleItemCart);
  };

  const showIframe = (cart: Cart) => {
    const iframe: HTMLIFrameElement = document?.getElementById(
      'dolapayIframe'
    ) as HTMLIFrameElement;

    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { cart, secret: `dola_${tempId}` },
        'https://dola-embedded-app-4f54yn4s1.vercel.app' as string
      );
      iframe.style.zIndex = '9999';
    }
  };

  return {
    initialize: initialize,
  };
})();

export default DolaBuyNow;
