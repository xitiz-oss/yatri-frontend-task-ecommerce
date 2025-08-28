# E-commerce Web Application

An e-commerce application built with Next.js, featuring authentication, product browsing, cart management, and checkout flow. This project is designed as a starter template for modern e-commerce solutions with a clean and minimal UI.

[Ecommerce Live Demo](https://yatri-frontend-task-ecommerce.vercel.app/)

## Features

Authentication: OAuth login with Google/GitHub (via NextAuth.js)

Product Listing: Fetch and display products from a mock API (FakestoreAPI / static JSON)

Product Details Page: Dynamic routes for individual product pages

Cart Management: Add/remove products, adjust quantities, view total

Protected Routes: Only logged-in users can access cart & checkout pages

Responsive Design: Fully mobile-friendly with Tailwind CSS

## Getting Started
### Clone the Repository

```bash
git clone https://github.com/xitiz-oss/yatri-frontend-task-ecommerce.git
cd yatri-frontend-task-ecommerce
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Set Up Environment Variables
Create a .env.local file in the root of your project:

```bash
AUTH_SECRET=your-auth-secret
AUTH_GOOGLE_CLIENT=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

```

### Run Development Server

```bash
npm run dev
# or
yarn dev
```

Then open [http://localhost:3000]()
 in your browser.

## Usage
Homepage → View all products

Product Page → Click on a product to view details

Cart → Add/remove products, update quantity

Checkout → (Protected route) requires login

Authentication → Sign in with Google/GitHub


