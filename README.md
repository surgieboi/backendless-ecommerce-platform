# Dola Buy Now
This is Dola's Buy Now button, tentatively called "Now", transforms any HTML element into a shoppable product, or storefront (i.e multiple Buy Now buttons on a single page), with a 1-click checkout. This is done through an on-click function, this repository holds the code, and below is documentation for integrating with your static site.

## How to use
- Navigate to [Dola](https:dola.me)'s website to set up your account and retrieve your API keys. Make sure to use them in the appropriate environments. key prefixed with `dola_key_test` are for development mode and would not result in real life charges. while keys prefixed sith `dola_key_live` are to be used in deployments as this in a real live order being created and shipped.
- import and initialize an instance of dola as shown below. simply pass your `dola_key` into Dola's `initialize` function. The result is a validated Dola instance or an error in cases of invalid keys.

```js
import DolaBuyNow from 'DolaBuyNow';

let dola_key = `dola_key_test4849uj493jr3j4843`

const DolaInstance = DolaBuyNow.initialize(dola_key);
```
- Dola can be used different ways and different methods are provided for this different use cases and integrations. they are detailed below.
    - attaching it to your cart checkout button. This flow assumes your static site has a cart and now we can attach Dola to your checkout button. All you need is to pass your cart object into the `attachDolaToCart` method and call it in the `onClick` event on that checkout button and we'll take it from there. To enable Dola be able to process your cart though, it needs to have this structure.
    
    ```ts
    interface Cart {
        totalPrice: number,
        totalWeight: number,
        currency: string,
        discount: number,
        items: CartItem[],
    }

    interface CartItem {
        id: string;
        image: string;
        quantity: number;
        title: string;
        price: number;
        grams: number;
        variantInfo?: VariantInfo[];
    }

    interface VariantInfo {
        id: string;
        name: string;
        value: string;
    }
    ```

    ```js
    const checkoutTriggeringElement = document.getElementById("elementID");
    checkoutTriggeringElement.addEventListener("click", (e) => {
        e.preventDefault();

        DolaInstance.attachDolaToCart(Cart)
    })
    ```