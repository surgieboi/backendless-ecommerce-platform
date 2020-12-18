# Dola Buy Now

This is Dola's Buy Now button, tentatively called "Now", transforms any HTML element into a shoppable product, or storefront (i.e multiple Buy Now buttons on a single page), with a 1-click checkout. This is done through an on-click function, this repository holds the code, and below is documentation for integrating with your static site.

## How to use

- Navigate to [Dola](https:dola.me)'s website to set up your account and retrieve your API keys from the developers section of your profile.
- install Dola's Buy Now from npm.
- import and initialize an instance of dola as shown below. simply pass your `dola_key` into Dola's `initialize` function. The result is a validated Dola instance or an error in cases of invalid keys.

```js
import DolaBuyNow from 'DolaBuyNow';

let dola_key = `dola_key_test4849uj493jr3j4843`;

const DolaInstance = DolaBuyNow.initialize(dola_key);
```

- Once initialised, Buy Now Buttons can now be created with that instance of Dola. To turn an element into a Buy now 1-click checkout, add your iniated Dola instance to the element as well as specific custom data attributes to pass producte details to the Buy now button.

An implementation example is attached below for reference.

```html
<div>
  <button
    data-dola-title="Sony Playstation 5"
    data-dola-image="https://cdn.mos.cms.futurecdn.net/ufhiDineW3zJGv3hnr8GTA-320-80.jpg"
    data-dola-price="35000"
    data-dola-weight="3000"
    data-dola-sku="sony playstation 5 white"
    data-dola-id="sonyPlaystation122"
    data-dola-discount="0"
    data-dola-currency="USD"
    id="{Dola?.id}"
  >
    Buy Now
  </button>
</div>
```
