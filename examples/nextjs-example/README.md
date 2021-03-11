# BEP + TypeScript + Next.js example

This is a base project bootstrapping a Next.js TypeScript project with BEP preinstalled.

## Deploy your own

Deploy this example using [Vercel](https://vercel.com)

> But first make sure to have the necessary [pre-requisites](#pre-requisites).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fdolapay%2Fbackendless-ecommerce-platform%2Ftree%2Fdevelop%2Fexamples%2Fnextjs-example&env=NEXT_PUBLIC_MERCHANT_ID&envDescription=Your%20merchant%20ID&envLink=https%3A%2F%2Fgithub.com%2Fdolapay%2Fbackendless-ecommerce-platform%2Ftree%2Fdevelop%2Fexamples%2Fnextjs-example%23pre-requisites&project-name=bep-next-typescript-starter&repo-name=bep-next-typescript)

## Pre-requisites

- `MERCHANT_ID`: If you do not know how to find your `MERCHANT_ID`, refer to the [How to use it](#How-to-use-it) section.

## How to use it?

- Navigate to [Dola's website](https://dola.me/) and sign up, then complete the merchant onboarding.
- Now navigate to the Business Details section of the merchant services and copy your `MERCHANT_ID`. If you will be deploying vercel, You now have the necessary pre-requisites to deploy to Vercel. For manual/local installation, proceed to the next step.
- Clone the repo to your current working directory with this command

  ```bash
  npx degit dolapay/backendless-ecommerce-platform/examples/nextjs-example#develop nextjs-example
  ```

- Upon cloning this starter project, run `cd nextjs-example` to change directory into the project.
- create a `.env.local` file and paste your `MERCHANT_ID` from earlier into the `NEXT_PUBLIC_MERCHANT_ID` field.
- Then run `npm install` to get the dependencies installed.
- Start the dev server with `npm run dev`.
