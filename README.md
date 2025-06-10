# Eterna Design

A promotional site for a design studio built with Next.js and TypeScript. Visitors can commission work directly or purchase small design offerings via Stripe.

## Development

- Install dependencies with `pnpm install`.
- Run the development server with `pnpm dev`.

### Environment variables

Create a `.env.local` file with the following keys to enable Stripe checkout:

```
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Other features (like OpenAI chat) may require additional keys.
