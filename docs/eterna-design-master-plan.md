# Eterna Design - Website Development Plan

## 1. Project Overview & Vision

**Project:** `eternadesign.com` - An e-commerce website to showcase and sell unique, handcrafted woodworking and metalworking projects.

**Vision:** To create a modern, visually appealing, and user-friendly online store that reflects the quality, craftsmanship, and timeless appeal of Eterna Design products. The site will serve as the primary platform for sales, brand building, and handling custom commission inquiries.

**Tagline (Examples):**
* Eterna Design - Timeless Appeal
* Eterna Design - Crafted by Hand, Built to Last.

## 2. Goals

**MVP (Minimum Viable Product) Goals:**
* Establish a functional development environment using Nix Flakes.
* Build a basic Next.js application structure.
* Display a curated list of products with images, descriptions, and prices (initially mock data).
* Integrate Stripe Checkout for secure, single-item purchases (using Test Mode).
* Provide basic success and cancellation pages post-checkout attempt.
* Deploy a live version of the MVP.

**Long-Term Goals:**
* Replace mock data with a persistent data source (e.g., database, headless CMS).
* Implement a full shopping cart experience.
* Set up Stripe Webhooks for reliable order fulfillment processing (inventory updates, email confirmations).
* Develop user account functionality.
* Build out additional content pages (Detailed About/Process, Contact, Policies).
* Implement features for custom order inquiries (if applicable).
* Optimize for SEO and performance.
* Establish a content strategy (blog, project stories).

## 3. Target Audience

* Homeowners seeking unique, high-quality decor and furniture.
* Individuals looking for distinctive, handcrafted gifts.
* Collectors of artisanal wood and metal work.
* Potentially interior designers or businesses seeking statement pieces.

## 4. Technology Stack

* **Frontend Framework:** Next.js (App Router, TypeScript)
* **Backend Runtime:** Node.js (via Next.js API routes in `/app/api` or standalone server if needed later)
* **UI Styling:** Tailwind CSS (manual setup)
* **Payments:** Stripe (Stripe Checkout, potentially Stripe Elements later, Webhooks)
* **Package Manager:** PNPM
* **Development Environment:** Nix Flakes (`flake.nix`) and direnv
* **Version Control:** Git
* **Hosting:** (To be determined - e.g., Vercel, Netlify, AWS, Self-hosted)
* **Directory Structure:** `/app`, `/app/api`, `/components`, `/lib`, `/public` (no `/pages`)

## 5. Development Environment Setup

The development environment is managed by Nix Flakes and direnv for consistency and reproducibility.

1.  **Prerequisites:** Install Nix with Flakes support enabled and set up direnv.
2.  **Clone Repository:** `git clone <your-repo-url>`
3.  **Enter Environment:** Navigate to the project root directory and allow direnv to load the environment (`direnv allow`). This will provision a shell with all necessary dependencies (Node.js, PNPM, Stripe CLI, etc.) as defined in `flake.nix`.
4.  **Install Dependencies:** Run `pnpm install` to install project-specific Node modules.
5.  **Environment Variables:** Create a `.env.local` file in the root directory and add your Stripe **Test** API keys and other necessary environment variables (refer to `.env.example` if provided). **Do not commit `.env.local` to Git.**
    ```
    STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
    NEXT_PUBLIC_STORE_URL=http://localhost:3000 # Or your production URL
    ```
6.  **Run Development Server:** `pnpm run dev`
7.  **Access:** Open `http://localhost:3000` in your browser.

## 6. MVP Feature List

* **Homepage:** Display a grid of products.
* **Product Display:** Show product image, name, description, price.
* **Checkout:** "Buy Now" button per product initiating Stripe Checkout for a single item.
* **API Route:** Serverless function (`/app/api/checkout_sessions/route.ts`) to create Stripe Checkout sessions.
* **Stripe Integration:** Client-side code to redirect to Stripe Checkout using `@stripe/stripe-js`.
* **Redirect Pages:** Simple `/success` and `/cancel` pages after Stripe Checkout attempts.
* **Basic Styling:** Clean layout using Tailwind CSS.
* **Nix Flake:** Functional `flake.nix` for environment setup (used with direnv).

## 7. Development Phases (Post-Setup)

**Phase 1: Core Structure & Product Display (MVP)**
* Initialize Next.js project (App Router, TypeScript, manual Tailwind setup).
* Set up basic layout (Header, Footer, Main content area) in `/app`.
* Implement mock product data structure (`lib/products.ts`).
* Create product card component in `/components`.
* Display products on the homepage using mock data.
* Basic Tailwind CSS styling.

**Phase 2: Stripe Checkout Integration (MVP)**
* Set up Stripe account and retrieve **Test** API keys.
* Create products and prices in the Stripe Test Dashboard (or plan to use `price_data`).
* Implement the `/api/checkout_sessions` API route.
* Add client-side logic (`handleCheckout`) to call the API route and redirect to Stripe.
* Add "Buy Now" buttons to product cards.
* Create basic `/success` and `/cancel` pages.
* Configure environment variables (`.env.local`).

**Phase 3: Testing, Refinement & Initial Deploy (MVP)**
* Thoroughly test the checkout flow using Stripe test cards.
* Test responsive design on different screen sizes.
* Basic accessibility checks.
* Code cleanup and commenting.
* Choose a hosting provider (e.g., Vercel) and deploy the MVP.

**Phase 4: Post-MVP Enhancements (Iterative)**
* **Data Persistence:** Integrate a database (e.g., PostgreSQL, MongoDB with Prisma) or Headless CMS (e.g., Sanity, Strapi) to manage products.
* **Stripe Webhooks:** Implement an API route (`/api/webhooks/stripe`) to handle `checkout.session.completed` events for order fulfillment logic (updating DB, sending emails). Use `stripe-cli` for local webhook testing (`stripe listen --forward-to localhost:3000/api/webhooks/stripe`).
* **Shopping Cart:** Implement state management (e.g., Zustand, React Context) for a multi-item cart. Update checkout logic to handle cart contents.
* **User Authentication:** Add user accounts (e.g., NextAuth.js) for order history, saved addresses.
* **Content Pages:** Create About, Contact, FAQ, Shipping/Return Policy pages.
* **SEO & Performance:** Optimize images, implement metadata, improve Lighthouse scores.
* **Advanced Features:** Custom order forms, Blog, Search functionality.

## 8. Key Considerations

* **Test-Driven Development (TDD):** All new features and components must have a test written first. Only the minimal code necessary to pass the test should be implemented. No code is merged without corresponding tests. TDD is enforced throughout development.

* **High-Quality Imagery:** Professional photography/videography is crucial for showcasing handcrafted items. Budget time and resources for this.
* **Compelling Descriptions:** Clearly articulate the materials, dimensions, process, and unique value of each piece.
* **Shipping & Logistics:** Define shipping zones, costs, and methods early on. Clearly state policies.
* **Security:** Always handle API keys securely (use `.env.local`, never commit keys). Rely on Stripe for PCI compliance regarding payment details. Keep dependencies updated.

## 9. Future Roadmap Ideas

* Customer reviews/testimonials.
* Integration with social media feeds (Instagram).
* Wishlist functionality.
* Gift card options.
* Detailed "Process" section with photos/videos.
* International shipping options.
* Analytics integration (e.g., Google Analytics 4).

## 10. Git Commit Message Best Practices

To ensure a clear and maintainable project history, follow these guidelines when authoring git commit messages:

1. **Use the imperative mood in the subject line**
   - Example: "Add user authentication" (not "Added" or "Adds")
2. **Limit the subject line to 50 characters or less**
   - Be concise and descriptive.
3. **Capitalize the subject line**
   - Example: "Update documentation for API endpoints"
4. **Do not end the subject line with a period**
5. **Separate the subject from the body with a blank line**
6. **Use the body to explain _what_ and _why_ vs. _how_**
   - Focus on the reasoning and context for the change.
7. **Wrap the body at 72 characters**
   - Improves readability in various git tools.
8. **Reference relevant issues or tickets when applicable**
   - Example: "Fix race condition in data loader (#42)"

**Example commit message:**

```
Add product search endpoint

Implements a new /api/products/search endpoint to allow users to filter
products by name and category. This addresses customer feedback and
improves the overall UX. Related to #101.
```

Adhering to these practices helps keep the project history clean, understandable, and useful for all contributors.