# Dola Buy Now

This is Dola's Buy Now button, tentatively called "Now", transforms any HTML element into a shoppable product, or storefront (i.e multiple Buy Now buttons on a single page), with a 1-click checkout. This is done through an on-click function, this repository holds the code, and below is documentation for integrating with your static site. For a demo of the buy now in action, checkout the [Buy now example site](https://buy-now-examples.vercel.app/).

## How to use

- A Dola merchant account is required to use the Buy now, so navigate to [Dola](https:dola.me)'s website to set up your merchant account. and retrieve a `Javascript` script snippet, make sure to confirm the `merchantId` field is appropriately set.
- This script helps initialize Dola in 1 of 2 different ways depending your use case and platform.

  - First method requires setting the `type` field in the initial Dolapay object in your script to basic, like so. `type:'basic'`. This method is intended to be used by Developers building static websites and are familiar with javascript.
    A sample of a basic script is referenced below. remember to swap in your `merchantId`.

    ```js
    !(function () {
      var merchantId = 'randomMerchantId',
        a = window,
        e = document;
      a.Dolapay = { id: merchantId, type: 'basic' };
      var n = function () {
        var a = e.createElement('script');
        (a.type = 'text/javascript'),
          (a.async = !0),
          (a.id = 'doladolabillsyall'),
          (a.dataset.dolaMerchantId = merchantId),
          (a.src = 'https://dola-buy-now.vercel.app');
        var n = e.getElementsByTagName('script')[0];
        n.parentNode.insertBefore(a, n);
      };
      'complete' === document.readyState
        ? n()
        : a.attachEvent
        ? a.attachEvent('onload', n)
        : a.addEventListener('load', n, !1);
    })();
    ```

    - With this method, The buy now is assessible via the global Dolapay object. this object exposes an `attachDola` method, which accepts a `cart` object. The shape of this object is described below.

      ```ts
      interface Cart {
        totalPrice: number;
        totalWeight: number;
        currency: string;
        discount: number;
        items: CartItem[];
      }

      interface CartItem {
        id: string;
        image: string;
        quantity: number;
        title: string;
        price: number;
        grams: number;
        variantInfo?: VariantInfo[];
        sku?: string;
        subTotal: number;
      }

      interface VariantInfo {
        id: string;
        name: string;
        value: string;
      }
      ```

    - The `attachDola` method is intended to be called inside of an onClick method. This triggers an the Dola Checkout app on your website. Please note that the url of your site has to match the url provided as the site of your store during the onboarding, a discrepancy will result in dola failing silently to display on your website. Below is an example of how to access and use the `attachDola` method.

      ```js
      const cart = {
        totalPrice: 35000,
        totalWeight: 543,
        currency: 'USD',
        discount: 0,
        items: [
          {
            id: 'randomId',
            image: 'https://linkToproductimage',
            quantity: 1,
            title: 'sample product',
            price: 35000,
            grams: 543,
            sku: 'randomproductsku',
            subTotal: 35000,
            variantInfo: [],
          },
        ],
      };

      window.Dolapay.attachDola(cart);
      ```

    - Depending on the structure of your product, the cart and its elements need to be described in the above shape for the Buy now. The above example is for a `Simple product`, a product without variants.

    - If your product has variants, a `Complex product`, then a variantInfo object will need to be described when a product's variant is selected. below is an example of a cart including a selected product variant.

      ```js
      const cart = {
        totalPrice: 35000,
        totalWeight: 543,
        currency: 'USD',
        discount: 0,
        items: [
          {
            id: 'randomId',
            image: 'https://linkToproductimage',
            quantity: 1,
            title: 'sample product',
            price: 35000,
            grams: 543,
            sku: 'randomproductsku',
            subTotal: 35000,
            variantInfo: [{ id: 'uniqueIDForVariant', name: 'color', valur: 'green' }],
          },
        ],
      };

      window.Dolapay.attachDola(cart);
      ```

  - This method is designed primarily for no-code platforms and platforms that allow for minimal javascript. For this method, you are requiresd to set the `type` field in the initial Dolapay object in your script to custom, like so. `type:'custom'`. A sample of a basic script is referenced below. remember to swap in your `merchantId`.

    ```js
    !(function () {
      var merchantId = 'randomMerchantId',
        a = window,
        e = document;
      a.Dolapay = { id: merchantId, type: 'custom' };
      var n = function () {
        var a = e.createElement('script');
        (a.type = 'text/javascript'),
          (a.async = !0),
          (a.id = 'doladolabillsyall'),
          (a.dataset.dolaMerchantId = merchantId),
          (a.src = 'https://dola-buy-now.vercel.app');
        var n = e.getElementsByTagName('script')[0];
        n.parentNode.insertBefore(a, n);
      };
      'complete' === document.readyState
        ? n()
        : a.attachEvent
        ? a.attachEvent('onload', n)
        : a.addEventListener('load', n, !1);
    })();
    ```

    - Unlike the first method where you have a method and you apply your cart to it. For this method, The product is described to dola via custom data attributes on the element with the onClick event attached.

      Dola is attached differently to cart than it is to a single product for immediate checkout. For how to attach Dola to a single product for immediate checkout, see below for an example of a `Simple product` with no variants, notice that the `data-dola-buynow` attribute is set to true to trigger an immediate checkout scenario on the selected single product.

      ```html
      <div>
        <button
          data-dola-buynow="true"
          data-dola-quantity="1"
          data-dola-title="productName"
          data-dola-image="imageURL"
          data-dola-price="35000"
          data-dola-weight="3000"
          data-dola-sku="productsku"
          data-dola-id="uniqueProductId"
          data-dola-discount="0"
          data-dola-currency="USD"
          className="window.Dolapay.id"
        >
          Buy Now
        </button>
      </div>
      ```

    - For a single `Complex product`, variants can be added like this, `data-dola-variant-*nameOfVariant*="variant value"`

      ```html
      <div>
        <button
          data-dola-buynow="true"
          data-dola-quantity="1"
          data-dola-title="productName"
          data-dola-image="imageURL"
          data-dola-price="35000"
          data-dola-weight="3000"
          data-dola-sku="productsku"
          data-dola-id="uniqueProductId"
          data-dola-discount="0"
          data-dola-currency="USD"
          data-dola-variant-color="red"
          className="window.Dolapay.id"
        >
          Buy Now
        </button>
      </div>
      ```

    - For how to attach Dola to a cart and trigger it checkout on cart, First, attach the following custom data attributes to the cart element with the onClick event. note that in this case, the `data-dola-cartAction` custom data attribute is set to true.

      ```html
      <div>
        <button
          data-dola-totalprice="totalCartTotal"
          data-dola-totalweight="totalCartWeight"
          data-dola-discount="totalApplicableDiscount"
          data-dola-currency="MerchantPrimaryCurrency e.g| USD"
          data-dola-cartaction="true"
          className="window.Dolapay.id"
        >
          Checkout
        </button>
      </div>
      ```

    - As cart details are displayed on your custom cart designs, append these custom data attributes to each of the products in the cart. if the product has any variants, specify it with the same convention described above, `data-dola-variant-*nameOfVariant*="variant value"`.

      ```html
      <div
        className="window.Dolapay.id"
        data-dola-title="currentProductTitle"
        data-dola-title="productName"
        data-dola-image="imageURL"
        data-dola-price="35000"
        data-dola-weight="3000"
        data-dola-sku="productsku"
        data-dola-id="uniqueProductId"
        data-dola-discount="0"
        data-dola-currency="USD"
        data-dola-cart="true"
        data-dola-quantity="2"
        data-dola-variant-color="red"
      >
        Checkout
      </div>
      ```
