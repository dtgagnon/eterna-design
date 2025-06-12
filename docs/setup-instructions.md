# Local Setup & Content Management

Follow these steps to run the project locally and update the website content.

## 1. Install Dependencies
1. Install packages with `pnpm install`.
2. Start the development server using `pnpm dev`.

## 2. Environment Variables
The site uses Stripe for checkout. Add your secret key to a file named `.env.local` in the project root:

```bash
STRIPE_SECRET_KEY=sk_test_your_key_here
```

`.env.local` is ignored by Git so your key stays private.

## 3. Editing Products
Product listings are defined in `data/products.json` as an array of objects:

```json
{
  "id": "logo-design",
  "name": "Custom Logo Design",
  "price": 5000,
  "imageUrl": "/images/logo-ani-0.jpeg",
  "description": "Professional logo tailored to your brand"
}
```

- **id**: unique string for Stripe checkout.
- **price**: amount in cents.
- **imageUrl**: path under `/public/images/`.

Add new products or modify existing ones by editing this file.

## 4. Adding Product Images
1. Place image files in `public/images/`.
2. Reference the file from `imageUrl` in `data/products.json` using the `/images/` prefix.
3. Restart the dev server to load new assets.

## 5. Updating Page Content
Page layouts live in `components/pages/`. Edit these React components to change text, headings or section order. Saving a file will hot‑reload the development server.

## 6. Commission Requests
Submitted commission forms are stored in a SQLite database at `data/app.db`. The database is created automatically on first run.

## 7. Querying Commission Requests
You can review all commission submissions through the API or by opening the SQLite file directly.

1. **API endpoint** – fetch `GET /api/commissions` to receive a JSON payload of all entries. Example:

   ```bash
   curl http://localhost:3000/api/commissions
   ```

   The response looks like:

   ```json
   { "commissions": [/*...*/], "success": true }
   ```

2. **Direct access** – open `data/app.db` with any SQLite client. Requests are stored in the `commissions` table. The schema is defined in `lib/database/dbClient.ts`.

That's it! After editing content or images, run `pnpm dev` and open `http://localhost:3000` to preview your changes.
