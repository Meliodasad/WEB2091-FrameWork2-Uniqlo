import { useEffect, useState } from "react";
import { Table, Button, Input, Switch, message } from "antd";

interface Review {
  id: number;
  productId: number;
  user: string;
  comment: string;
  rating: number;
  approved: boolean;
}

const AdminComments = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setFilteredReviews(data);
      })
      .catch((error) => console.error("Lỗi tải bình luận:", error));
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3001/reviews/${id}`, { method: "DELETE" });
    setReviews(reviews.filter((review) => review.id !== id));
    setFilteredReviews(filteredReviews.filter((review) => review.id !== id));
    message.success("Đã xóa bình luận!");
  };

  const handleApprovalToggle = async (id: number, approved: boolean) => {
    await fetch(`http://localhost:3001/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved })
    });
    
    setReviews(reviews.map((r) => (r.id === id ? { ...r, approved } : r)));
    setFilteredReviews(filteredReviews.map((r) => (r.id === id ? { ...r, approved } : r)));
    message.success("Cập nhật trạng thái thành công!");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredReviews(
      reviews.filter(
        (r) => r.user.toLowerCase().includes(query.toLowerCase()) || r.comment.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const columns = [
    { title: "Người dùng", dataIndex: "user", key: "user" },
    { title: "Bình luận", dataIndex: "comment", key: "comment" },
    { title: "Đánh giá", dataIndex: "rating", key: "rating" },
    {
      title: "Duyệt",
      dataIndex: "approved",
      key: "approved",
      render: (approved: boolean, record: Review) => (
        <Switch checked={approved} onChange={(value) => handleApprovalToggle(record.id, value)} />
      )
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: Review) => (
        <Button danger onClick={() => handleDelete(record.id)}>Xóa</Button>
      )
    }
  ];

  return (
    <div className="container mt-4">
      <h2>Quản lý Bình luận</h2>
      <Input
        placeholder="Tìm kiếm theo người dùng hoặc nội dung..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="mb-3"
      />
      <Table columns={columns} dataSource={filteredReviews} rowKey="id" />
    </div>
  );
};

export default AdminComments;
