import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../../api/api";
import {
  ArrowLeft,
  User,
  Building2,
  Copy,
  Library,
  Trash2,
  Bookmark,
} from "lucide-react";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: bookDetail } = useQuery({
    queryKey: ["bookDetail", id],
    queryFn: () => API.get(`/books/book/${id}/`).then((res) => res.data),
    enabled: !!id,
  });

  return (
    <div className="min-h-screen text-white p-8 font-sans">
      <button
        onClick={() => navigate(-1)}
        className="flex cursor-pointer items-center gap-2 bg-[#1e293b] hover:bg-[#334155] px-4 py-2 rounded-lg text-sm transition-all mb-10"
      >
        <ArrowLeft size={18} />
        <span>Kitoblarga qaytish</span>
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 border-2 border-purple-600 rounded-md">
          <Bookmark className="text-purple-600" size={24} />
        </div>
        <h1 className="text-3xl font-bold">
          {bookDetail?.name || "Mening ishlamagan kodlarim"}
        </h1>
      </div>

      <hr className="border-gray-800 mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#0f172a]/50 border border-gray-800 p-5 rounded-xl flex items-start gap-4">
          <User className="text-gray-400 mt-1" size={24} />
          <div>
            <p className="text-gray-500 text-sm">Muallif</p>
            <h3 className="text-lg font-semibold">
              {bookDetail?.author || "o'zim"}
            </h3>
          </div>
        </div>

        <div className="bg-[#0f172a]/50 border border-gray-800 p-5 rounded-xl flex items-start gap-4">
          <Building2 className="text-gray-400 mt-1" size={24} />
          <div>
            <p className="text-gray-500 text-sm">Nashriyot</p>
            <h3 className="text-lg font-semibold">
              {bookDetail?.publisher || "VS Code"}
            </h3>
          </div>
        </div>

        <div className="bg-[#0f172a]/50 border border-gray-800 p-5 rounded-xl flex items-start gap-4">
          <Copy className="text-gray-400 mt-1" size={24} />
          <div>
            <p className="text-gray-500 text-sm mb-1">Mavjud nusxalar</p>
            <span className="bg-green-950/30 text-green-500 px-3 py-1 rounded-full text-sm font-medium border border-green-900/50">
              {bookDetail?.quantity_in_library || 400} nusxalar
            </span>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/3">
        <div className="bg-[#0f172a]/50 border border-gray-800 p-5 rounded-xl flex items-start gap-4">
          <Library className="text-gray-400 mt-1" size={24} />
          <div>
            <p className="text-gray-500 text-sm">Kutubxona</p>
            <h3 className="text-lg font-semibold text-purple-500">
              {bookDetail?.library || "Kutubxona №15"}
            </h3>
          </div>
        </div>
      </div>

      <hr className="border-gray-800 my-10" />

      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] px-6 py-2.5 rounded-lg font-medium transition-all">
          <Trash2 size={20} />
          <span>Kitobni o'chirish</span>
        </button>
      </div>
    </div>
  );
};

export default BookDetail;
