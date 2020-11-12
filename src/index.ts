import { Cart, CartItem, IframeExtended } from './types';

const DolaBuyNow = (() => {
  const loadIframe = (merchantId: string) => {
    let dolaIframe: IframeExtended = document.createElement('iframe');

    dolaIframe.src = `${process.env.CHECKOUT_APP_URL}/${merchantId}`;
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
  };

  const attachCloseDolaEventListener = () => {
    window.addEventListener('message', async event => {
      if (event.origin !== process.env.CHECKOUT_APP_URL) return;
      const target = document.getElementById('dolapayIframe');

      if (target && event.data['action'] === 'close-dola') {
        target.style.zIndex = '-9999';
      }
    });
  };

  const initialize = (key: string) => {
    let merchantId = key;
    loadIframe(merchantId);
    attachCloseDolaEventListener();
    return {
      attachDolaToCart: attachDolaToCart,
      attachDolaToItem: attachDolaToItem,
    };
  };

  const attachDolaToCart = (cart: Cart) => {
    showIframe(cart);
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
        { cart, secret: process.env.DOLA_IFRAME_SECRET as string },
        process.env.CHECKOUT_APP_URL as string
      );
      iframe.style.zIndex = '9999';
    }
  };

  return {
    initialize: initialize,
  };
})();

export default DolaBuyNow;
