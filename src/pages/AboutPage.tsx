import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">GIỚI THIỆU</h2>
        <p className="text-center">
          Chào mừng bạn đến với <strong>UNIQLO</strong>! Chúng tôi cung cấp những sản phẩm thời trang chất lượng cao, mang đến trải nghiệm mua sắm tuyệt vời.
        </p>
        <p className="text-center">
          Với sứ mệnh nâng cao phong cách sống, UNIQLO cam kết mang đến sản phẩm chất lượng, giá cả hợp lý và dịch vụ chuyên nghiệp.
        </p>

        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            <img src="https://doanhnhanplus.vn/wp-content/uploads/2019/11/dnp-Uniqlo-gioi-thieu-10-dong-san-pham-trong-yeu-tai-viet-nam-3-768x512.jpg" alt="About Us" className="img-fluid rounded" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
