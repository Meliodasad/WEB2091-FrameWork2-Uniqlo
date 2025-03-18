import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Sản phẩm không tồn tại");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => console.error("Lỗi khi tải sản phẩm:", error));
  }, [id]);

  if (!product) {
    return <p className="text-center text-red-500 mt-10">Sản phẩm không tồn tại!</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{product.name}</h1>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Hình ảnh sản phẩm */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={product.image} alt={product.name} className="w-96 h-auto rounded-md" />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-red-500 text-xl font-semibold">
            Giá: {product.price.toLocaleString()} VND
          </p>
          <p className="text-gray-700 mt-2">
            {product.description || "Chưa có mô tả cho sản phẩm này."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
