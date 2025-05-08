# Creador Ventures Landing Page

This is the official landing site for Creador Ventures, a venture capital firm that blends AI insight with local intuition to fund and accelerate bold founders in LATAM, Africa, Eastern Europe, and the Hispanic USA.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Logging**: Pino
- **Validation**: Zod
- **Testing**: Jest (Unit), Playwright (E2E)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/creadorventures/landing.git
   cd landing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then update the values in `.env.local` as needed.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `app/` - Next.js App Router components and routes
- `components/` - Reusable React components
- `core/` - Business logic, utilities, and pure functions
- `e2e/` - End-to-end tests with Playwright
- `__tests__/` - Unit tests with Jest
- `public/` - Static assets

## Commands

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run test` - Run all Playwright tests
- `npm run test:unit` - Run all Jest unit tests
- `npm run test:ci` - Run all tests and linting (used in CI)

## Environment Variables

- `NODE_ENV` - Environment mode (development, production, test)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 Measurement ID
- `CALENDLY_BASE_URL` - Base URL for Calendly (defaults to https://calendly.com)

## License

Proprietary. All rights reserved.
