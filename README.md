# Apero Cafe: Micro-SaaS for QR Digital Menus & Ordering – React + TypeScript + Tailwind + NodeJs for Small Cafes Worldwide.

![Vercel](https://vercelbadge.vercel.app/api/ryanzam/apero-cafe)

[LiveDemo](https://apero-cafe.vercel.app/)

<img width="150" height="150" alt="qrcode_apero-cafe vercel app" src="https://github.com/user-attachments/assets/ab063990-866c-479f-bfb5-036d15ff3cdb" />

## Features

- QR-Code-Based Digital Menu: A customer-facing menu page listing items with prices and images. Generate a QR code linking to the menu page.

- Order Management: Allow customers to add items to a cart and submit orders (name, phone, table number). 

- Payment Integration: Add a "Pay Now" button that initiate payment.

- Feedback Collection: Post-order, prompt customers for a star rating (1–5) and optional comment and displayed in a restaurant dashboard.

- Language Support: Toggle between Local language and English.

## Technologies used
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
  ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
  ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)

## Overview

Apero Cafe is a micro-SaaS for small restaurants and cafes to create digital menus accessible via QR codes, with optional online ordering and table booking. Focuses on simplicity for non-tech-savvy owners.

## Getting Started

### Prerequisites

Ensure the following are installed on your system:

- **Node.js**: v18.x or later
- **npm**: v9.x or later
- **MongoDB**: v6.x or later
- **Git**: For cloning the repository

### Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ryanzam/apero-cafe.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd apero-cafe
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   - Create a `.env` file in the root directory and add your MongoDB connection string (refer to `.env.example`).

5. **Start the application**:
   ```bash
   npm start
   ```

## Usage

Access the application at `http://localhost:3000` after starting the server. Users can browse the menu, make reservations, and submit feedback. Detailed guides are available in the [wiki](https://github.com/ryanzam/apero-cafe/wiki).

## Development

- **Code Style**: Adheres to ESLint and Prettier standards for consistency.
- **Build**: Run `npm run build` to create a production build.
- **Server**: Uses Express.js for API routing and MongoDB for data storage.

## Testing

Run tests using the included test suite:
```bash
npm test
```

## Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request. Ensure code follows project standards and includes tests. See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.
