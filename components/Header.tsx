import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl">🐾</div>
            <span className="text-xl font-bold text-[#2563eb]">PetLab</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden space-x-8 md:flex">
            <Link
              href="/"
              className="text-[#4b5563] transition-colors hover:text-[#2563eb]"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-[#4b5563] transition-colors hover:text-[#2563eb]"
            >
              Products
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="p-2 md:hidden">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
