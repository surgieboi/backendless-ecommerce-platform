# Backendless Ecommerce Platform

![BEP Demo site](images/BEP.jpg)

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Setup](#setup)
  - [Javascript SDK](#javascript-sdk)
  - [Basic Installation](#basic-installation)
    - [data-dola-buynow](#data-dola-buynow)
    - [data-dola-cart](#data-dola-cart)
    - [data-dola-cartaction](#data-dola-cartaction)
- [Zapier Integration](#zapier-integration)
  - [Triggers](#triggers)
  - [Actions](#actions)
- [Reference](#reference)
- [Browser Compatibility](#browser-compatibility)
- [Contribute](#contribute)
- [License](#license)

## Overview

BEP is short for “Backendless Ecommerce Platform,” and it turns any website into a shop with just one line of code.

The best part?

BEP doesn't require a backend or CMS! Just add our snippet and you're in business _- literally!_

With BEP, you can instantly accept payments from 195 countries, ship globally, get paid, and it's free _- standard 2.9% + $0.30 processing fees apply._

Whether you're building a direct-to-consumer site, a landing page for your latest drop, or a side hustle with friends and family, BEP does it all.

Also, as orders come in, BEP provides you with everything you need to fulfill, including pre-paid duties, shipping, taxes, and more. BEP also comes with an API, accessible via API keys and a Zapier app, enabling you to build automations and sync data that's relevant to your business.

For now, BEP is available for merchants in the U.S. and U.K.; but, consumers everywhere can purchase from a BEP store.

To get started, reference the documentation below to add BEP to any static site.

[Demo Site](https://bep-example.dola.me/)

## Getting Started

1. Login to [Dola](https://dola.me).

2. Navigate to settings and click on `Become a merchant` and go through the onboarding process. Make sure that the `Website URL` field matches your website.

3. When setting up, depending on your use case, you can select the `Basic Installation` or `Javascript SDK` option. Paste the copied snippet in the `<head>` section of your base html file.

## Setup

### Basic Installation

There are 3 HTML data attributes that trigger actions. Each action attribute is used alongside other attributes that describe the product/cart details.

#### `data-dola-buynow`

When set to `"true"`, the element, when clicked, will trigger a checkout with the product information on that element.

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
    data-dola-currency="USD"
    class="dola-dola-bills-yall"
  >
    Buy Now
  </button>
</div>
```

#### `data-dola-cart`

When set to `"true"`, this indicates that the product (represented by the other data attributes on that element) has been added to a shopping cart.

```html
<div
  class="dola-dola-bills-yall"
  data-dola-title="currentProductTitle"
  data-dola-title="productName"
  data-dola-image="imageURL"
  data-dola-price="35000"
  data-dola-weight="3000"
  data-dola-sku="productsku"
  data-dola-id="uniqueProductId"
  data-dola-currency="USD"
  data-dola-cart="true"
  data-dola-quantity="2"
>
  Checkout
</div>
```

#### `data-dola-cartaction`

When set to `"true"`, the element, when clicked, will trigger a checkout with all products that have been added to the cart (by having their `data-dola-cart` attribute set to `"true"`).

```html
<div>
  <button data-dola-currency="USD" data-dola-cartaction="true" class="dola-dola-bills-yall">
    Checkout
  </button>
</div>
```

Only 1 action type should be used on an element at a given time.

While BEP is loading, `dola-bep-loading` is added as a class to actionable HTML elements. This can be leveraged to implement styles and other behavior for the loading state.

### JavaScript SDK

Here's a basic example:

```js
const cart = {
  currency: 'USD',
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
    },
  ],
};

window.Dolapay.attachDola(cart, cb);
```

The `attachDola` method triggers an instance of Dola's 1-click Checkout. It accepts a cart object and a callback which fires in the case of a successful execution. Note, errors are handled by Dola.

## Zapier Integration

In order to automate post-purchase activities such as customer support, fulfillment, marketing, and more, we've integrated Dola with Zapier.

> To get started with setting up this integration, all you'll require is a [Zapier account](https://zapier.com/).

After setting up your account, navigate to [Dola's Zapier Integration page](https://zapier.com/apps/dola/integrations). Here, you can select from Dola's existing workflows or choose to build a custom workflow zap for yourself.

Dola's Zapier integration includes:

### Triggers

`New Order`: This trigger fires when a new order has been created for the merchant. It returns details about newly created order that are necessary to create fulfilment details.

### Actions

`Update Order`: This is an action that is fired to update a specific order's details.

## Order API

Manage orders using Dola's REST API. [View specification](#order-api-specification).

## Reference

### Basic Installation

These are the custom data attributes supported by BEP, these attributes are used to describe product/cart details depending on the attached action attribute.

| Attribute               | Description                                                                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-dola-title`       | Required. It captures the name of the product.                                                                                                             |
| `data-dola-quantity`    | Required. It captures the quantity of the product being purchased.                                                                                         |
| `data-dola-image`       | Required. It refers to a the image for the product. It accepts a url string.                                                                               |
| `data-dola-price`       | Required. It captures the price of the product.                                                                                                            |
| `data-dola-weight`      | Required. It captures the weight of the product. Adjust for the quantity of product being purchased.                                                       |
| `data-dola-totalprice`  | Optional. It captures the total price of cart items, it is only used in a `cartaction` to describe the price total of all products in the cart.            |
| `data-dola-totalweight` | Optional. It captures the total weight of cart items, it is only used in a `cartaction` to describe the total weight of all products in the cart in grams. |
| `data-dola-id`          | Required. It refers to the unique id of this product.                                                                                                      |
| `data-dola-sku`         | Required. It refers to your sku for the product.                                                                                                           |
| `data-dola-currency`    | Required. It sets the currency you want payments in.                                                                                                       |
| `data-dola-variant-*`   | Optional. It is used to set variants, where `*` is replaced by the name of the variant.                                                                    |

There is support for `Simple` and `Complex` type products.

- `Simple`: This is a product that has no variants. Below is an example of a simple product.

  ```html
  <div>
    <button
      class="window.Dolapay.id"
      data-dola-buynow="true"
      data-dola-quantity="1"
      data-dola-title="productName"
      data-dola-image="imageURL"
      data-dola-price="35000"
      data-dola-weight="3000"
      data-dola-sku="productsku"
      data-dola-id="uniqueProductId"
      data-dola-currency="USD"
    >
      Buy Now
    </button>
  </div>
  ```

- `Complex`: This refers to a product that has variants. Custom variants can be added with the `data-dola-variant-*` attribute. Below is an example of a complex product.

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
      data-dola-currency="USD"
      data-dola-variant-color="red"
      class="window.Dolapay.id"
    >
      Buy Now
    </button>
  </div>
  ```

### JavaScript SDK

The script snippet initialises Dola and attaches a global `Dolapay` object to the global `Window` object. The global Dolapay object can be accessed via `window.Dolapay`.

```ts
interface IDolapay {
  id: string;
  attachDola?: (cart: Cart, callback: () => void) => void;
  type?: string;
  orderCompleted: boolean;
}


window.Dolapay:IDolapay
```

- `type`: This property refers to the initialization method of the BEP instance.

  - `basic`: means the BEP instance was created as a `JavaScript SDK` instance.
  - `custom`: means the BEP instance was created as an `Basic Installation` instance.

- `orderCompleted`: This property exposes the state of the current order.

- `id`: This property refers to your `merchantId` it is included in the script snippet copied from the developers section of your profile settings.

- `attachDola`: This method triggers an instance of Dola's 1-click Checkout. It accepts a `Cart` object and a callback which fires in the case of a successful execution. Errors are visually handled by Dola's 1-click Checkout.

  ```ts
  interface Cart {
    currency: string;
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

### Order API Specification

#### Authorization

Provide your Dola API Key in the following header:

`DOLA-API-KEY: {Your dola API Key}`

#### Get All Orders

`GET /order`

This returns all your orders.

Sample response:

`Status: 200`

`Body:`

```json
{
  "message": "Success",
  "data": [
    {
      "id": "ID",
      "product": "Anything, something",
      "chargeId": "STRIPE_CHARGE_ID",
      "address": {
        "name": "Daniel James",
        "firstName": "Daniel",
        "created": {
          "_seconds": 1608817978,
          "_nanoseconds": 277000000
        },
        "address1": "333 Fremont St",
        "insured": false,
        "lastName": "James",
        "country": "US",
        "zipCode": "94105",
        "state": "CA",
        "id": "ID",
        "isResidential": true,
        "updated": {
          "_seconds": 1612032137,
          "_nanoseconds": 543000000
        },
        "defaultAddress": true,
        "city": "SF"
      },
      "update": {
        "_seconds": 1612457523,
        "_nanoseconds": 806000000
      },
      "shopperId": "SHOPPER_ID",
      "currency": "NGN",
      "shipping": 334400.05544,
      "shopId": "SHOP_ID",
      "totalValue": 375820.06230700004,
      "weight": 0.3,
      "created": {
        "_seconds": 1612457520,
        "_nanoseconds": 741000000
      },
      "func": false,
      "date": {
        "_seconds": 1612457520,
        "_nanoseconds": 741000000
      },
      "shop": "javascript",
      "tax": 3420.000567,
      "name": "Daniel James",
      "orderId": "ORDER_ID",
      "cart": [
        {
          "sku": "anythingsomethingskku",
          "name": "Anything, something",
          "productImage": "imageURL",
          "quantity": 1,
          "price": 38000.0063,
          "attributes": {},
          "variantId": "1231"
        }
      ],
      "courier": "USPS - Priority Mail",
      "tracking_url": "URL.TRACK",
      "businessName": "Joygate Ventures",
      "productCount": 1,
      "isInternational": false,
      "email": "customer@email.com",
      "merchantId": "MERCHANT_ID",
      "status": "fulfilled",
      "customerSupportEmail": "customerSupport@company.com",
      "dutiesAndImportFees": 0
    },
    {
      "id": "ID",
      "businessName": "Joygate Ventures",
      "orderId": "ORDER_ID",
      "tax": 3424.5335430000005,
      "courier": "USPS - Priority Mail",
      "func": false,
      "tracking_url": "URL.TRACK",
      "address": {
        "created": {
          "_seconds": 1608817978,
          "_nanoseconds": 277000000
        },
        "isResidential": true,
        "updated": {
          "_seconds": 1612032137,
          "_nanoseconds": 543000000
        },
        "insured": false,
        "name": "Daniel James",
        "lastName": "James",
        "city": "SF",
        "id": "ID",
        "zipCode": "94105",
        "state": "CA",
        "firstName": "Daniel",
        "defaultAddress": true,
        "country": "US",
        "address1": "333 Fremont St"
      },
      "shipping": 334843.27976000006,
      "isInternational": false,
      "weight": 0.3,
      "product": "Anything, something",
      "shopperId": "SHOPPER_ID",
      "status": "fulfilled",
      "created": {
        "_seconds": 1612040474,
        "_nanoseconds": 142000000
      },
      "email": "customer@email.com",
      "update": {
        "_seconds": 1612452714,
        "_nanoseconds": 497000000
      },
      "customerSupportEmail": "customerSupport@company.com",
      "shop": "javascript",
      "name": "Daniel James",
      "merchantId": "MERCHANT_ID",
      "shopId": "SHOP_ID",
      "date": {
        "_seconds": 1612040474,
        "_nanoseconds": 142000000
      },
      "chargeId": "STRIPE_CHARGE_ID",
      "dutiesAndImportFees": 0,
      "totalValue": 376318.18600300007,
      "currency": "NGN",
      "productCount": 1,
      "cart": [
        {
          "sku": "anythingsomethingskku",
          "name": "Anything, something",
          "variantId": "VARIANT_ID",
          "quantity": 1,
          "productImage": "imageURL",
          "price": 38050.3727
        }
      ]
    },
    {
      "id": "ID",
      "address": {
        "id": "ID",
        "address1": "333 Fremont St",
        "city": "SF",
        "insured": false,
        "firstName": "Daniel",
        "lastName": "James",
        "zipCode": "94105",
        "name": "Daniel James",
        "defaultAddress": true,
        "created": {
          "_seconds": 1608817978,
          "_nanoseconds": 277000000
        },
        "state": "CA",
        "isResidential": true,
        "updated": {
          "_seconds": 1612032137,
          "_nanoseconds": 543000000
        },
        "country": "US"
      },
      "product": "Anything, something",
      "shipping": 334843.27976000006,
      "chargeId": "STRIPE_CHARGE_ID",
      "businessName": "Joygate Ventures",
      "weight": 0.3,
      "currency": "NGN",
      "func": false,
      "shopId": "SHOP_ID",
      "status": "fulfilled",
      "productCount": 1,
      "isInternational": false,
      "update": {
        "_seconds": 1612039160,
        "_nanoseconds": 468000000
      },
      "customerSupportEmail": "customerSupport@company.com",
      "tracking_url": "track.track",
      "created": {
        "_seconds": 1612039158,
        "_nanoseconds": 301000000
      },
      "tax": 3424.5335430000005,
      "email": "customer@email.com",
      "courier": "USPS - Priority Mail",
      "name": "Daniel James",
      "date": {
        "_seconds": 1612039158,
        "_nanoseconds": 301000000
      },
      "merchantId": "MERCHANT_ID",
      "cart": [
        {
          "name": "Anything, something",
          "variantId": "VARIANT_ID",
          "productImage": "imageURL",
          "sku": "anythingsomethingskku",
          "quantity": 1,
          "price": 38050.3727
        }
      ],
      "totalValue": 376318.18600300007,
      "shop": "javascript",
      "shopperId": "SHOPPER_ID",
      "orderId": "ORDER_ID",
      "dutiesAndImportFees": 0
    }
  ]
}
```

#### Get Order

`GET /order/{order id}`

This returns a single order given the order id is provided in the URL.

Sample response:

`Status: 200`

`Body:`

```json
{
  "message": "Success",
  "data": {
    "exists": true,
    "status": "fulfilled",
    "isInternational": false,
    "dutiesAndImportFees": "0",
    "shopperId": "SHOPPER_ID",
    "currency": "NGN",
    "businessName": "Joygate Ventures",
    "productCount": "1",
    "shopId": "SHOP_ID",
    "chargeId": "STRIPE_CHARGE_ID",
    "created": 1612457520,
    "totalValue": 375820.06230700004,
    "merchantId": "YOUR_MERCHANT_ID",
    "address": {
      "exists": true,
      "zipCode": "94105",
      "insured": false,
      "lastName": "James",
      "name": "Daniel James",
      "updated": 1612032137,
      "state": "CA",
      "city": "SF",
      "country": "US",
      "id": "id",
      "created": 1608817978,
      "defaultAddress": true,
      "isResidential": true,
      "address1": "333 Fremont St",
      "firstName": "Daniel"
    },
    "tax": 3420.000567,
    "name": "Daniel James",
    "update": 1612457523,
    "courier": "USPS - Priority Mail",
    "shipping": 334400.05544,
    "customerSupportEmail": "customerSupport@company.com",
    "shop": "javascript",
    "orderId": "ORDER_ID",
    "tracking_url": "URL.TRACK",
    "cart": [
      {
        "exists": true,
        "name": "Anything, something",
        "price": 38000.0063,
        "sku": "anythingsomethingskku",
        "quantity": "1",
        "variantId": "1231",
        "attributes": {
          "exists": true
        },
        "productImage": "imageURL"
      }
    ],
    "func": false,
    "product": "Anything, something",
    "email": "customer@email.com",
    "date": 1612457520,
    "weight": 0.3
  }
}
```

#### Update Order

`PATCH /order/{orderId}`

This marks an order as fulfilled, given the tracking url is in the request body.

`tracking_url: orderlocation.net`

Sample response:

`Status: 200`

#### Delete Order

`DELETE /order/{orderId}`

This cancels and refunds an order.

Sample response:

`Status: 200`

## Browser Compatibility

- last 2 Chrome versions
- last 2 Firefox versions
- last 2 Edge versions
- modern browsers

## Contribute

If you like the idea behind BEP and want to become a contributor - do not hesitate and check our list of the active issues or contact us directly via bep@dola.me.

If you have discovered a :ant: or have a feature suggestion, feel free to create an issue on Github.

## License

BEP source code is completely free and released under the [MIT License](LICENSE).
