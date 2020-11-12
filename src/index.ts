import { Cart, IframeExtended } from './types';

const DolaBuyNow = (() => {
  const initialize = (key: string) => {
    let merchantId = key;
    loadIframe(merchantId);
    attachCloseDolaEventListener();
    return { attachDolaToCart: attachDolaToCart };
  };

  const attachCloseDolaEventListener = () => {
    window.addEventListener('message', async event => {
      if (event.origin !== 'https://dola-embedded-app-develop.vercel.app')
        return;
      const target = document.getElementById('dolapayIframe');

      if (target && event.data['action'] === 'close-dola') {
        target.style.zIndex = '-9999';
      }
    });
  };

  const attachDolaToCart = (cart: Cart) => {
    showIframe(cart);
  };

  const showIframe = (cart: Cart) => {
    const iframe: HTMLIFrameElement = document?.getElementById(
      'dolapayIframe'
    ) as HTMLIFrameElement;

    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { cart },
        process.env.CHECKOUT_APP_URL as string
      );
      iframe.style.zIndex = '9999';
    }
  };

  const loadIframe = (merchantId: string) => {
    let dolaIframe: IframeExtended = document.createElement('iframe');

    dolaIframe.src = `https://dola-embedded-app-develop.vercel.app/${merchantId}`;
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

  return {
    initialize: initialize,
    attachDolaToCart: attachDolaToCart,
  };
})();

export default DolaBuyNow;
