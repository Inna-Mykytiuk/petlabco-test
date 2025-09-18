import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl leading-tight font-bold text-[#111827] md:text-5xl lg:text-6xl">
                Quality Products for Your
                <span className="text-[#2563eb]"> Beloved Pets</span>
              </h1>
              <p className="text-xl leading-relaxed text-[#4b5563]">
                Discover our premium collection of pet products for dogs and
                cats. From nutritional supplements to grooming essentials -
                everything for your pet health and wellbeing.
              </p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="from-primary-100 to-primary-200 flex aspect-square flex-col items-center justify-center gap-4 rounded-3xl bg-gradient-to-br">
              <div className="text-center text-[#2563eb]">
                <div className="mb-4 text-6xl">🐾</div>
                <div className="text-2xl font-semibold">Pet Care Products</div>
                <div className="text-lg">Premium Quality</div>
              </div>
              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/products"
                  className="btn btn-primary rounded-lg px-8 py-4 text-lg font-semibold shadow-lg transition-all hover:scale-105"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#111827]">
            Why Choose PetLab?
          </h2>
          <p className="text-xl text-[#4b5563]">
            Everything your pets need for a healthy and happy life
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 text-center">
            <div className="bg-primary-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Premium Quality</h3>
            <p className="text-[#4b5563]">
              All our products are carefully selected and tested for the highest
              quality standards.
            </p>
          </div>

          <div className="p-6 text-center">
            <div className="bg-primary-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Fast Shipping</h3>
            <p className="text-[#4b5563]">
              Quick and reliable delivery to your doorstep. Your pets wont have
              to wait.
            </p>
          </div>

          <div className="p-6 text-center">
            <div className="bg-primary-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <span className="text-2xl">💝</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Subscription Options</h3>
            <p className="text-[#4b5563]">
              Never run out of essentials with our convenient subscription
              service.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
