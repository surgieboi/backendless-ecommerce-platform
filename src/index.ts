import { Cart } from './types';

const DolaBuyNow = (() => {
  // let DolaDataObject:DolaObject;

  const initialize = (key: string) => {
    let merchantId = key;
    // DolaDataObject.merchantId = merchantId;
    loadIframe(merchantId);
    return DolaBuyNow;
  }

  const attachDolaToCart = (cart: Cart) => {
    // DolaDataObject.cart = cart;
    showIframe(cart);
  }

  const showIframe = (cart: Cart) => {
    const iframe  = document.getElementById('dolapayIframe') as HTMLIFrameElement;

    if (iframe) {
      iframe.style.zIndex = '9999';

      let dd = {cart};
      console.log('+++++++++++++++++', dd);
      if (iframe?.contentWindow) {
        return iframe?.contentWindow.postMessage(
          dd,
          process.env.CHECKOUT_APP_URL as string
        );
      }
    }
	  
  }

  const loadIframe = (merchantId: string) => {
    let dolaIframe:HTMLIFrameElement = document.createElement('iframe');

    dolaIframe.src = `${process.env.CHECKOUT_APP_URL}/${merchantId}`;
    dolaIframe.style.width = '100%';
    dolaIframe.style.height = '100%';
    dolaIframe.style.border = 'none';
    // dolaIframe.loading = 'lazy';
    dolaIframe.id = 'dolapayIframe';
    dolaIframe.style.position = 'fixed';
    dolaIframe.style.top = '0';
    dolaIframe.style.zIndex = '-9999';
    dolaIframe.style.overflow= 'hidden';

    document.body.prepend(dolaIframe);
  }

  return {
    initialize: initialize,
    attachDolaToCart: attachDolaToCart,
    loadIframe: loadIframe
  }
})()

export default DolaBuyNow;
