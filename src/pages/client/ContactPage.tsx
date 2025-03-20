import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ContactPage = () => {
  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">LIÊN HỆ</h2>
        <p className="text-center">
          Hãy liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi nào! Chúng tôi sẵn sàng hỗ trợ bạn.
        </p>

        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <label className="form-label">Họ và Tên</label>
                <input type="text" className="form-control" placeholder="Nhập họ và tên" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="Nhập email" />
              </div>
              <div className="mb-3">
                <label className="form-label">Nội dung</label>
                <textarea className="form-control" rows={4} placeholder="Nhập nội dung liên hệ"></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Gửi liên hệ</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
