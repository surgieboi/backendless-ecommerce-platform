# BEP + TypeScript + Next.js example

This is a base project bootstrapping a Next.js TypeScript project with BEP preinstalled.

## Pre-requisites

- `MERCHANT_ID`: If you do not know how to find your `MERCHANT_ID`, refer to the [How to use it](#How-to-use-it) section.

## How to use it?

- Navigate to [Dola's website](https://dola.me/) and sign up, then complete the merchant onboarding.
- Now navigate to the Business Details section of the merchant services and copy your `MERCHANT_ID`. If you will be deploying vercel, You now have the necessary pre-requisites to deploy to Vercel. For manual/local installation, proceed to the next step.
- Clone the repo to your current working directory with this command

  ```bash
  npx degit dolapay/backendless-ecommerce-platform/examples/nextjs-example nextjs-example
  ```

- Upon cloning this starter project, run `cd nextjs-example` to change directory into the project.
- create a `.env.local` file and paste your `MERCHANT_ID` from earlier into the `NEXT_PUBLIC_MERCHANT_ID` field.
- Then run `npm install` to get the dependencies installed.
- Start the dev server with `npm run dev`.
