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
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm">
        <img src={product.image} className="card-img-top" alt={product.name} />
        <div className="card-body text-center">
          <h5 className="card-title">{product.name}</h5>
          <p className="text-danger fw-bold">{product.price.toLocaleString()} VND</p>
          <Link to={`/product/${product.id}`} className="btn btn-dark">Xem chi tiết</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
