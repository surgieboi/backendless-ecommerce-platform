import { nanoid } from 'nanoid';
import {
  Cart,
  CartItem,
  IframeExtended,
  DolaExtendedWindow,
  IDola,
  VariantInfo,
  IDataset,
} from '../types';
import { isNil } from './typeCheck';

export const Dolapay: IDola = ((window as unknown) as DolaExtendedWindow).Dolapay;

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

    dolaIframe.src = `https://dev.checkout.dola.me/${merchantId}?url=${location.host}`;
    dolaIframe.style.width = '100%';
    dolaIframe.title = 'dola-bep-checkout';
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
      if (event.origin !== 'https://dev.checkout.dola.me') return;

      if (event.data['action'] === 'close-dola') {
        dolaIframe.style.zIndex = '-99999';
      }

      if (event.data === 'opened-dola') {
        dolaIframe.style.zIndex = '99999';
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
      const iframe = document?.getElementById('dolapayIframe') as HTMLIFrameElement;

      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          { cart, secret: `dola_${merchantId}` },
          'https://dev.checkout.dola.me'
        );
      }
    }, 350);
  } catch (error) {
    throw new Error(error.toString());
  }
};

export const dolaCheckoutEventHandler = (event: any, callback: () => void) => {
  if (event.origin !== 'https://dev.checkout.dola.me') return;

  Dolapay.orderCompleted = true;
  if (event.data === 'order-complete') {
    callback();
  }
};

export const addListenerToInstances = (buyNowInstances: HTMLCollectionOf<HTMLDivElement>) => {
  try {
    for (let index = 0; index < buyNowInstances.length; index++) {
      const currentInstance = buyNowInstances[index];
      if (currentInstance?.id) return;

      if (currentInstance.dataset?.dolaCartaction === 'true') {
        currentInstance.id = nanoid();
        currentInstance.addEventListener('click', () => {
          return attachDolaToCart(currentInstance.dataset, buyNowInstances);
        });
      } else if (currentInstance.dataset?.dolaBuynow === 'true') {
        currentInstance.id = nanoid();
        currentInstance.addEventListener('click', () => {
          return attachDolaToOne(currentInstance.dataset);
        });
      }

      currentInstance.classList.remove('dola-bep-loading');
    }
  } catch (error) {
    throw new Error('error attaching dola action to instance');
  }
};

export const fetchDolaInstances = () => {
  try {
    const buyNowInstances = document.getElementsByClassName(
      'dola-dola-bills-yall'
    ) as HTMLCollectionOf<HTMLDivElement>;
    return buyNowInstances;
  } catch (error) {
    throw new Error(error.toString());
  }
};

const attachDolaToOne = (dataset: IDataset) => {
  try {
    const parsedItem = parseVariantsIntoItem(dataset, composeItemObject(dataset));
    const cartObject: Cart = {
      currency: validateField(dataset.dolaCurrency, 'Invalid currency'),
      items: [parsedItem],
    };

    showIframe(cartObject, Dolapay.id);
    window.addEventListener('message', (event) =>
      dolaCheckoutEventHandler(event, () => {
        // plug in various no code integrations for basic implementation
      })
    );
  } catch (error) {
    console.error('Error attaching Dola to product: ', error.toString());
  }
};

const attachDolaToCart = (dataset: IDataset, instances: HTMLCollectionOf<HTMLDivElement>) => {
  try {
    const items = parseItems(instances);

    const cartObject: Cart = {
      currency: validateField(dataset.dolaCurrency, 'Invalid currency'),
      items: items,
    };

    showIframe(cartObject, Dolapay.id);

    window.addEventListener('message', (event) =>
      dolaCheckoutEventHandler(event, () => {
        // plug in various no code integrations for basic implementation
      })
    );
  } catch (error) {
    console.error('Error attaching Dola to cart: ', error.toString());
  }
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

const validateField = (field: string | undefined, error: string) => {
  if (isNil(field)) throw new Error(error);
  else {
    return field;
  }
};

const composeItemObject = (dataset: IDataset): CartItem => {
  const item: CartItem = {
    id: validateField(dataset.dolaId, 'Invalid product Id'),
    image: validateField(dataset.dolaImage, 'Invalid product Image'),
    quantity: parseInt(validateField(dataset.dolaQuantity, 'Invalid quantity'), 10),
    title: validateField(dataset.dolaTitle, 'Invalid title'),
    price: parseInt(validateField(dataset.dolaPrice, 'Invalid price'), 10),
    grams: parseInt(validateField(dataset.dolaWeight, 'Invalid weight'), 10),
    sku: validateField(dataset.dolaSku, 'Invalid sku'),
    variantInfo: [],
    subTotal:
      parseInt(validateField(dataset.dolaPrice, 'Invalid price'), 10) *
      parseInt(validateField(dataset.dolaQuantity, 'Invalid quantity'), 10),
  };

  return item;
};

const parseVariantsIntoItem = (dataset: IDataset, item: CartItem) => {
  const variantPrefix = 'dolaVariant';
  const variants = Object.keys(dataset).filter((e) => e.includes(variantPrefix));

  const variantInfo = variants.map((key, index) => {
    const tempObj: VariantInfo = {
      id: nanoid(),
      name: variants[index].slice(variantPrefix.length, key.length),
      value: dataset[key] as string,
    };
    return tempObj;
  });

  return {
    ...item,
    variantInfo,
  };
};
