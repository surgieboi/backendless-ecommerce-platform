import { nanoid } from 'nanoid';
import { Cart, CartItem, IframeExtended, DolaExtendedWindow, IDola, VariantInfo } from '../types';
import { isNil } from './typeCheck';

export const retrieveGlobalObject = (): IDola =>
  ((window as unknown) as DolaExtendedWindow).Dolapay;

export const loadIframe = (merchantId: string) => {
  try {
    if (document.getElementById('dolapayIframe')) throw new Error('Iframe already exists');
    return createDolaIframe(merchantId);
  } catch (error) {
    throw new Error(error.toString());
  }
};

export const createDolaIframe = (merchantId: string) => {
  try {
    let dolaIframe: IframeExtended = document.createElement('iframe');

    dolaIframe.src = `https://buy-now-examples.vercel.app/${merchantId}`;
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
    throw new Error(`error creating dola iframe: ${error.toString()}`);
  }
};

export const attachDolaEventListeners = (dolaIframe: IframeExtended) => {
  try {
    window.addEventListener('message', (event) => {
      if (event.origin !== 'https://buy-now-examples.vercel.app') return;

      if (event.data['action'] === 'close-dola') {
        dolaIframe.style.zIndex = '-999999';
      }
    });
  } catch (error) {
    throw new Error(`error attaching listeners: ${error.toString()}`);
  }
};

export const showIframe = (cart: Cart, merchantId: string) => {
  try {
    if (isNil(merchantId)) throw new Error('missing merchant id');

    setTimeout(() => {
      const iframe: HTMLIFrameElement = document?.getElementById(
        'dolapayIframe'
      ) as HTMLIFrameElement;

      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          { cart, secret: `dola_${merchantId}` },
          'https://buy-now-examples.vercel.app' as string
        );
        iframe.style.zIndex = '9999';
      }
    }, 350);
  } catch (error) {
    throw new Error(error.toString());
  }
};

export const dolaCheckoutEventHandler = (event: any, callback: () => void) => {
  if (event.origin !== 'https://buy-now-examples.vercel.app') return;

  const dolaWindowObject = ((window as unknown) as DolaExtendedWindow).Dolapay;
  dolaWindowObject.orderCompleted = true;
  callback();
  if (event.data === 'order-complete') {
    console.log('hureka');
    return {
      status: 'success',
      message: 'successfully placed your order',
    };
  }
  throw new Error("couldn't complete order");
};

export const addListenerToInstances = (id: string) => {
  try {
    const buyNowInstances: HTMLCollectionOf<HTMLDivElement> = fetchDolaInstances(id);

    for (let index = 0; index < buyNowInstances.length; index++) {
      const currentInstance = buyNowInstances[index];
      if (currentInstance?.id) return;

      if (currentInstance.dataset?.dolaCartaction === 'true') {
        currentInstance.id = nanoid();
        currentInstance.addEventListener('click', () => {
          attachDolaToCart(currentInstance.dataset, buyNowInstances);
        });
      } else if (currentInstance.dataset?.dolaBuynow === 'true') {
        currentInstance.id = nanoid();
        currentInstance.addEventListener('click', () => {
          return attachDolaToOne(currentInstance.dataset);
        });
      }
    }
  } catch (error) {
    throw new Error('error attaching dola action to instance');
  }
};

const fetchDolaInstances = (id: string) => {
  try {
    const buyNowInstances = document.getElementsByClassName(id) as HTMLCollectionOf<HTMLDivElement>;
    return buyNowInstances;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const attachDolaToOne = (dataset: { [key: string]: any }) => {
  try {
    const parsedItem = parseVariantsIntoItem(dataset, composeItemObject(dataset));
    const cartObject: Cart = {
      totalPrice: parsedItem.subTotal,
      totalWeight: parsedItem.grams * parsedItem.quantity,
      currency: dataset.dolaCurrency,
      discount: dataset.dolaDiscount,
      items: [parsedItem],
    };

    showIframe(cartObject, retrieveGlobalObject().id);
  } catch (error) {}
};

const attachDolaToCart = (
  cartDataset: { [key: string]: any },
  instances: HTMLCollectionOf<HTMLDivElement>
) => {
  const items = parseItems(instances);

  const cartObject: Cart = {
    totalPrice: parseInt(cartDataset.dolaTotalprice as string, 10) as number,
    totalWeight: parseInt(cartDataset.dolaTotalweight as string, 10) as number,
    currency: cartDataset.dolaCurrency as string,
    discount: cartDataset.dolaDiscount as number,
    items: items,
  };

  showIframe(cartObject, retrieveGlobalObject().id);
};

const parseItems = (instances: HTMLCollectionOf<HTMLDivElement>) => {
  const rawCartDatasets: CartItem[] = [];

  for (let index = 0; index < instances.length; index++) {
    const currentInstance = instances[index];

    if (currentInstance.dataset?.dolaCart === 'true') {
      const parsedItem = parseVariantsIntoItem(
        currentInstance.dataset,
        composeItemObject(currentInstance.dataset)
      );
      rawCartDatasets.push(parsedItem);
    }
  }
  return rawCartDatasets;
};

const composeItemObject = (dataset: { [key: string]: any }): CartItem => {
  const item: CartItem = {
    id: dataset.dolaId,
    image: dataset.dolaImage,
    quantity: parseInt(dataset.dolaQuantity as string, 10) as number,
    title: dataset.dolaTitle,
    price: parseInt(dataset.dolaPrice as string, 10) as number,
    grams: parseInt(dataset.dolaWeight as string, 10) as number,
    sku: dataset.dolaSku,
    variantInfo: [],
    subTotal: ((parseInt(dataset.dolaPrice as string, 10) as number) *
      parseInt(dataset.dolaQuantity as string, 10)) as number,
  };

  return item;
};

const parseVariantsIntoItem = (dataset: { [key: string]: any }, item: CartItem) => {
  const variantPrefix = 'dolaVariant';
  const variants = Object.keys(dataset)
    .filter((e) => e.includes(variantPrefix))
    .map((e) => e.slice(variantPrefix.length, e.length));

  if (variants.length > 0) {
    variants.map((each, index) => {
      const tempObj = {
        id: nanoid(),
        name: variants[index],
        value: dataset[`${variantPrefix}${each}`],
      };

      item.variantInfo?.push(tempObj as VariantInfo);
      return item;
    });
  }

  return item;
};

export const confirmDolaEventIsAttached = () => {};
