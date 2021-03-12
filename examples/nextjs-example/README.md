# Next.JS Example

This BEP example uses Next.JS, in addition to Typescript.


[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fdolapay%2Fbackendless-ecommerce-platform%2Ftree%2Fmaster%2Fexamples%2Fnextjs-example&env=NEXT_PUBLIC_MERCHANT_ID&envDescription=Your%20merchant%20ID&envLink=https%3A%2F%2Fgithub.com%2Fdolapay%2Fbackendless-ecommerce-platform%2Ftree%2Fmaster%2Fexamples%2Fnextjs-example%23pre-requisites&project-name=bep-next-typescript-starter&repo-name=bep-next-typescript)

## Prerequisite

- `MERCHANT_ID`: Refer to the [Getting Started](#Getting-Started) section to find your `MERCHANT_ID`

## Getting Started

- Go to [Dola's website](https://dola.me/), sign up, and complete your merchant on-boarding
- Once completed, proceed to your Wallet's `Settings > Business Details` to copy and paste your  `MERCHANT_ID`


## Download Manually

- Clone:

  ```bash
  npx degit dolapay/backendless-ecommerce-platform/examples/nextjs-example nextjs-example
  ```

- Run command `cd nextjs-example`
- Create a `.env.local` file and paste your `MERCHANT_ID` into the `NEXT_PUBLIC_MERCHANT_ID` field
- Run command `npm install`
- Start your server `npm run dev`