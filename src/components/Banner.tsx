import { useEffect, useState } from "react";

const banners = [
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/0941f274270633.5c2a304d9d375.jpg",
  "https://vaqueroadvertising.com/wp-content/uploads/2019/12/file.gif",
  "https://shelaf.net/wp-content/uploads/2017/12/Christmassive-Deals.jpg"
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000); // Chuyển ảnh mỗi 3 giây

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="bannerCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner" style={{ maxHeight: "300px" }}>
        {banners.map((src, index) => (
          <div key={index} className={`carousel-item ${index === currentIndex ? "active" : ""}`}>
            <img
              src={src}
              className="d-block w-100"
              alt={`Banner ${index + 1}`}
              style={{ height: "300px", objectFit: "cover", borderRadius: "10px" }}
            />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
};

export default Banner;
