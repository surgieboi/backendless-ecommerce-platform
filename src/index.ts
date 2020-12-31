import { Cart, CartItem, IframeExtended, VariantInfo } from './types';
import axios from 'axios';
import { nanoid } from 'nanoid';

const DolaBuyNow = (() => {
  let tempId: string;
  const loadIframe = (merchantId: string) => {
    try {
      const dolaIframeExixting = document.getElementById('dolapayIframe');

      if (dolaIframeExixting) return;
      let dolaIframe: IframeExtended = document.createElement('iframe');

      dolaIframe.src = `https://dev.checkout.dola.me/${merchantId}`;
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
    } catch (error) {
      throw new Error(error.toString());
    }
  };

  const attachCloseDolaEventListener = () => {
    window.addEventListener('message', async event => {
      if (event.origin !== 'https://dev.checkout.dola.me') return;
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
          setTimeout(() => {
            attachActionToBuyNow(id);
          });
          return {
            id: id,
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

  const attachActionToBuyNow = (id: string) => {
    try {
      const buyNowInstances = document.getElementsByClassName(id) as HTMLCollectionOf<
        HTMLDivElement
      >;

      for (let index = 0; index < buyNowInstances.length; index++) {
        const buyNowInstance = buyNowInstances[index];

        buyNowInstance?.addEventListener('click', () => {
          if (buyNowInstance.dataset?.dolaCartaction === 'true') {
            handleCartFlow(buyNowInstance, buyNowInstances);
          } else {
            handleBuyNowFlow(buyNowInstance);
          }
        });
      }
    } catch (error) {
      console.log(error.toString());
    }
  };

  const composeVariantsIntoItem = (buyNowInstance: HTMLDivElement, item: CartItem) => {
    const tempvariants = Object.keys(buyNowInstance?.dataset).filter(e =>
      e.includes('dolaVariant')
    );

    const variants = tempvariants.map(e => e.slice(11, e.length));

    if (tempvariants.length > 0) {
      tempvariants.map((each, index) => {
        if (variants[index].toLowerCase() === 'quantity') {
          item.quantity = parseInt(buyNowInstance.dataset[each] as string, 10);
          item.subTotal = item.price * item.quantity;
          return item;
        }

        const tempObj = {
          id: nanoid(),
          name: variants[index] as string,
          value: buyNowInstance.dataset[each] as string,
        };

        item.variantInfo?.push(tempObj as VariantInfo);
        return item;
      });
    }

    return item;
  };

  const composeItemObject = (currentInstance: HTMLDivElement) => {
    const item: CartItem = {
      id: currentInstance.dataset.dolaId as string,
      image: currentInstance.dataset.dolaImage as string,
      quantity: parseInt(currentInstance.dataset?.dolaQuantity as string, 10) as number,
      title: currentInstance.dataset.dolaTitle as string,
      price: parseInt(currentInstance.dataset.dolaPrice as string, 10) as number,
      grams: parseInt(currentInstance.dataset.dolaWeight as string, 10) as number,
      sku: currentInstance.dataset.dolaSku as string,
      variantInfo: [],
      subTotal: ((parseInt(currentInstance.dataset.dolaPrice as string, 10) as number) *
        parseInt(currentInstance.dataset?.dolaQuantity as string, 10)) as number,
    };

    return item;
  };

  const handleCartFlow = (
    instance: HTMLDivElement,
    instances: string | any[] | HTMLCollectionOf<HTMLDivElement>
  ) => {
    const cart: Cart = {
      totalPrice: parseInt(instance.dataset.dolaTotalprice as string, 10),
      totalWeight: parseInt(instance.dataset.dolaTotalweight as string, 10),
      currency: instance.dataset.dolaCurrency as string,
      discount: parseInt(instance.dataset.dolaDiscount as string, 10),
      items: [],
    };

    for (let index = 0; index < instances.length; index++) {
      const itemInstance = instances[index];

      if (itemInstance.dataset?.dolaCart === 'true') {
        const itemObject = composeItemObject(itemInstance);
        const composedItem = composeVariantsIntoItem(itemInstance, itemObject);
        cart.items.push(composedItem);
      }
    }

    setTimeout(() => {
      showIframe(cart);
    }, 450);
  };

  const handleBuyNowFlow = (currentInstance: HTMLDivElement) => {
    const item = composeItemObject(currentInstance);

    // check for variants, if variants exist, parse variants and recompose item object.
    const composedItem = composeVariantsIntoItem(currentInstance, item);

    return attachDolaToItem(
      composedItem,
      parseInt(currentInstance?.dataset?.dolaDiscount as string, 10) as number,
      currentInstance?.dataset?.dolaCurrency as string
    );
  };

  const attachDolaToCart = (cart: Cart) => {
    if (cart.items.length > 0) {
      return showIframe(cart);
    }
  };

  const attachDolaToItem = (item: CartItem, discount: number, currency: string) => {
    const buildSingleItemCart = {
      totalPrice: item.subTotal,
      totalWeight: item.grams,
      currency: currency,
      discount: discount,
      items: [item],
    };

    setTimeout(() => {
      showIframe(buildSingleItemCart);
    }, 350);
  };

  const showIframe = (cart: Cart) => {
    const iframe: HTMLIFrameElement = document?.getElementById(
      'dolapayIframe'
    ) as HTMLIFrameElement;

    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { cart, secret: `dola_${tempId}` },
        'https://dev.checkout.dola.me' as string
      );
      iframe.style.zIndex = '9999';
    }
  };

  return {
    initialize: initialize,
  };
})();

export default DolaBuyNow;
