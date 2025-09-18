import ProductDetails from "@/components/ProductDetails";
import { getProduct } from "@/lib/api";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await params перед доступом до його властивостей
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails product={product} />
    </div>
  );
}

export async function generateMetadata({ params }: ProductPageProps) {
  // Await params і тут також
  const { id } = await params;
  const productId = parseInt(id, 10);
  const product = await getProduct(productId);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} - PetLab`,
    description: `${product.title} від ${product.vendor}. Ціна: $${product.price}`,
  };
}
