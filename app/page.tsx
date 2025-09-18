import Image from "next/image";

export default function Home() {
  return (
    <section className="bg-purple h-screen py-20">
      <div className="container h-full">
        <div className="fle flex-col items-center justify-center">
          <h1 className="mb-8 text-center text-3xl font-bold text-blue-500 text-white">
            Hello world!
          </h1>
          <div className="flex items-center justify-between">
            <Image
              src="/images/promo.jpeg"
              alt="Logo"
              width={400}
              height={400}
              priority
              className="h-auto w-[400px]"
            />
            <div className="h-[440px] w-[400px] bg-[url('/images/promo.jpeg')] bg-cover bg-center bg-no-repeat"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
