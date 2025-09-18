# PetLab Products App

A modern Next.js 14 application built with TypeScript, Tailwind CSS, and Redux Toolkit for browsing and filtering pet products.

## 🚀 Features

- **Modern Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **State Management**: Redux Toolkit with persistence
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Advanced Filtering**: Search, price range, and subscription filters
- **Pagination**: Client-side pagination with URL state
- **Performance**: Debounced search, optimized re-renders
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit + Redux Persist
- **Image Optimization**: Next.js Image component
- **Development**: ESLint, TypeScript compiler

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd petlab-products-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── products/          # Products routes
│   │   ├── page.tsx       # Products listing page
│   │   └── loading.tsx    # Loading UI
│   ├── globals.css        # Global styles
│   └── StoreProvider.tsx  # Redux provider wrapper
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── LoadingSpinner.tsx
│   ├── Header.tsx
│   ├── FiltersSidebar.tsx
│   ├── ProductTable.tsx
│   ├── ProductCard.tsx
│   └── Pagination.tsx
├── hooks/                # Custom React hooks
│   ├── useDebounce.ts
│   └── useAppRedux.ts
├── lib/                  # Core logic and utilities
│   ├── features/         # Redux slices
│   │   └── products/
│   │       └── productsSlice.ts
│   ├── store.ts          # Redux store configuration
│   ├── api.ts            # API simulation
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Utility functions
└── config/               # Configuration files
```

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project dependencies and scripts

## 🎯 Key Features Implemented

### Filtering System

- **Search**: Debounced search through product tags (300ms delay)
- **Price Filter**: Min/max price range filtering
- **Subscription Filter**: Filter by subscription availability
- **Clear Filters**: Reset all filters with one click

### Responsive Design

- **Desktop**: Full table view with all product details
- **Tablet**: Card-based grid layout
- **Mobile**: Vertical card stack with essential info

### Performance Optimizations

- **Debounced Search**: Prevents excessive API calls
- **Memoization**: Optimized component re-renders
- **Image Optimization**: Next.js Image component with proper sizing
- **Code Splitting**: Automatic route-based code splitting

### State Management

- **Redux Toolkit**: Modern Redux with simplified syntax
- **Redux Persist**: Maintains filter state across sessions
- **Typed Hooks**: Fully typed Redux hooks for better DX

## 📱 Responsive Breakpoints

- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up

## 🧪 Testing Scenarios

The app handles these specific test cases:

- Default load: 12 products displayed
- Search "Dog": 11 results
- Filter Price "30": 1 result
- Filter Subscription "Yes" + Search "Cat": 5 results
- Pagination works across all filter states

## 🚀 Deployment

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## 📝 License

This project is licensed under the MIT License.

```

```
