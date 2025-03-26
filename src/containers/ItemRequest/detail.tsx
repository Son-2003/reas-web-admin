import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReduxDispatch } from "@/lib/redux/store";

import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { selectItemDetail } from "./selector";
import { fetchItemDetail, reviewItemRequest } from "./thunk";

export const ItemRequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<ReduxDispatch>();
  const item = useSelector(selectItemDetail);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchItemDetail(id));
    }
  }, [dispatch, id]);

  if (!item) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle />
      </div>
    );
  }

  const handleReview = async (statusItem: "AVAILABLE" | "REJECTED") => {
    if (!id) return;
    try {
      await dispatch(reviewItemRequest({ id, statusItem })).unwrap();
      alert(
        `Item request has been ${statusItem === "AVAILABLE" ? "approved" : "rejected"} successfully!`
      );
      navigate("/admin/item-request");
    } catch (error) {
      console.error("Error reviewing item request:", error);
      alert("Failed to process the request.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-6 h-6 bg-[url(/logo.svg)] bg-no-repeat bg-cover" />
        <span className="text-white text-xl font-bold">Suncook Rice Cooker</span>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Author Section */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-500 rounded-full border border-gray-300" />
          <div>
            <span className="text-white font-medium">Ngọc Cường</span>
            <p className="text-gray-400 text-xs">Hoạt động 2 giờ trước</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <span className="text-gray-400 text-sm">Description:</span>
          <p className="text-white text-sm mt-2">{item.description}</p>
        </div>

        {/* Image */}
        <div>
          <span className="text-gray-400 text-sm">Image:</span>
          <div className="w-full max-w-sm h-64 bg-gray-300 rounded-lg overflow-hidden mt-2">
            <img src={item.imageUrl} alt={item.itemName} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Information */}
        <div>
          <span className="text-gray-400 text-sm">Information</span>
          <div className="text-white text-sm mt-2 space-y-1">
            <p>Tình trạng: Đã sử dụng</p>
            <p>Thiết bị: Máy giặt</p>
            <p>Hãng: Samsung</p>
            <p>Phương thức trao đổi: Tự đến lấy</p>
            <p>Loại giao dịch: Giao dịch mở</p>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="mt-6">
        <span className="text-gray-400 text-sm">Price:</span>
        <span className="text-white text-xl font-bold ml-2">150.000</span>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap gap-4">
        <Button onClick={() => handleReview("AVAILABLE")} variant="default">
          Approve
        </Button>
        <Button onClick={() => handleReview("REJECTED")} variant="destructive">
          Discard
        </Button>
        <Button onClick={() => navigate("/admin/item-request")} variant="outline">
          Quay lại
        </Button>
      </div>
    </div>
  );
};
