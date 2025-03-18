import { Link } from "react-router-dom";

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

const ProductCard = ({ product }: ProductProps) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 flex flex-col items-center bg-white">
      {/* Ảnh sản phẩm căn chỉnh đúng kích thước */}
      <div className="w-full h-64 flex justify-center items-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <h2 className="text-lg font-semibold mt-3 text-center">{product.name}</h2>
      <p className="text-red-500 font-bold">{product.price.toLocaleString()} VND</p>

      <Link
        to={`/product/${product.id}`}
        className="mt-3 text-black px-4 py-2 border border-black rounded-lg hover:bg-gray-200 transition"
      >
        Xem chi tiết
      </Link>
    </div>
  );
};

export default ProductCard;
