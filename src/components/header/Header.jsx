import { HiOutlineMenu } from "react-icons/hi";
import { API } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { HiMiniUserCircle } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const { t, i18n } = useTranslation();
  const { data: profileM } = useQuery({
    queryKey: ["profile"],
    queryFn: () => API.get("/auth/admin/profile/").then((res) => res.data),
  });

  function handleChangeSelectLanguage(e) {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <div className="flex items-center justify-between h-full px-16 ">
      <div className="flex items-center gap-[50px]">
        <span className="text-[28px] font-bold">Ezma Admin</span>
        <button
          onClick={toggleSidebar}
          className="p-2 mr-4 rounded hover:bg-gray-700 transition-colors"
          title="Sidebar'ni ochish/yopish"
        >
          <HiOutlineMenu className="w-6 h-6 text-white" />
        </button>
      </div>
      <div className="flex items-center justify-center gap-4">
        <select
          onChange={handleChangeSelectLanguage}
          className="
    w-[100px] 
    bg-[#1f2937] 
    p-2 
    rounded-lg 
    text-white 
    border border-gray-600 
    hover:border-blue-500 
    focus:ring-2 focus:ring-blue-500 
    appearance-none cursor-pointer 
  "
        >
          <option value="uz"> Uzb</option>
          <option value="ru"> Рус</option>
          <option value="en"> Eng</option>
        </select>
        <NavLink to={"/profile"}>
          <div className="flex gap-2 items-center">
            <HiMiniUserCircle className="text-[30px] text-white" />
            <h1>{profileM?.name}</h1>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
