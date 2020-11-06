import { Cart } from './types';

const DolaBuyNow = (() => {
  const initialize = (key: string) => {
    let merchantId = key;
    loadIframe(merchantId);
    attachCloseDolaEventListener();
    return DolaBuyNow;
  }

  const attachCloseDolaEventListener = () => {
    window.addEventListener("message", async (event) => {
      if (event.origin !== "https://dola-embedded-app-2i1wi5ggu.vercel.app") return;
      const target = document.getElementById("dolapayIframe");
  
      if (target && event.data['action'] === "close-dola") {
        target.style.zIndex = "-9999";
      }
    });
  }

  const attachDolaToCart = (cart: Cart) => {
    showIframe(cart);
  }

  const showIframe = (cart: Cart) => {
    const iframe  = document.getElementById('dolapayIframe') as any;
    iframe.style.zIndex = '9999';

    if (iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { cart },
        "https://dola-embedded-app-2i1wi5ggu.vercel.app"
      );
    }	  
  }

  const loadIframe = (merchantId: string) => {
    let dolaIframe: any = document.createElement('iframe');

    dolaIframe.src = `https://dola-embedded-app-2i1wi5ggu.vercel.app/${merchantId}`;
    dolaIframe.style.width = '100%';
    dolaIframe.style.height = '100%';
    dolaIframe.style.border = 'none';
    dolaIframe.loading = 'lazy';
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
  }
})()

export default DolaBuyNow;
