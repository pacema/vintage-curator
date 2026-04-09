This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Airtable listings order

Listings are returned in **view order** when you set **`AIRTABLE_LISTINGS_VIEW`** in `.env.local` (and in your host’s env for production).

**Recommended (action 1):** use the **view ID** from the Airtable URL when you have the correct grid open. The URL looks like `airtable.com/app…/tbl…/viwXXXXXXXX`, where the segment starting with `viw` is the view ID. Example:

```bash
AIRTABLE_LISTINGS_VIEW=viwXXXXXXXXXXXXXX
```

Use your own view’s `viw…` segment from the browser URL so the API matches the row order you see in that grid. Without this variable, record order is not guaranteed to match the grid.

You also need `AIRTABLE_API_KEY` and `AIRTABLE_BASE_ID` for `/api/listings` to work.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
