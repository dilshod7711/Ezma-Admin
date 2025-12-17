import { NavLink } from "react-router-dom";
import { FaUser, FaBook, FaFolder } from "react-icons/fa";
import { API } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mantine/core";
import { GiExitDoor } from "react-icons/gi";
import authStore from "../../store/authStore";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";
const Sidebar = ({ isSidebarOpen }) => {
  const { t } = useTranslation();
  const { logout } = authStore();

  const { data: profileM } = useQuery({
    queryKey: ["profile"],
    queryFn: () => API.get("/auth/admin/profile/").then((res) => res.data),
  });

  function handleLogOutFunctionAdmin() {
    openModal();
  }
  const openModal = () =>
    modals.openConfirmModal({
      title: t("confirmExit"),

      labels: { confirm: t("confirm"), cancel: t("cancel") },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => logout(),
    });
  const baseClasses =
    "flex items-center p-3 rounded-lg transition-colors duration-200 font-semibold";
  const activeClasses = "bg-gray-700 text-orange-400 ";
  const defaultClasses = "text-gray-300 hover:bg-gray-800 ";

  const getNavLinkClass = (isActive) =>
    `${baseClasses} ${isActive ? activeClasses : defaultClasses} ${
      !isSidebarOpen ? "justify-center" : "justify-start"
    }`;

  const getTextSpanClass = () =>
    `ml-3 whitespace-nowrap overflow-hidden transition-all duration-300 font-semibold ${
      isSidebarOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
    }`;

  const userNavLinkClass = (isActive) =>
    `flex items-center p-3 rounded-lg transition-colors duration-200 mt-1 mb-2 border-b border-gray-700 ${
      isActive
        ? "bg-gray-700 text-orange-400"
        : "bg-[#1f2937] text-gray-300 hover:bg-gray-800"
    } ${!isSidebarOpen ? "justify-center" : "justify-start"}`;

  return (
    <div className="flex flex-col justify-between h-full">
      <nav className="flex flex-col gap-1 p-2">
        <NavLink
          to="/profile"
          className={({ isActive }) => userNavLinkClass(isActive)}
        >
          <FaUser className="w-5 h-5 flex-shrink-0" />

          <span className={getTextSpanClass()}>
            {profileM ? profileM.name || "Admin" : "..."}
          </span>
        </NavLink>

        <div className="flex flex-col gap-2 pt-2">
          {" "}
          <NavLink
            to="/libraries"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <FaFolder className="w-5 h-5 flex-shrink-0" />
            <span className={getTextSpanClass()}>{t("librirary")}</span>
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <FaBook className="w-5 h-5 flex-shrink-0" />
            <span className={getTextSpanClass()}>{t("books")}</span>
          </NavLink>
        </div>
      </nav>

      <div className="px-2 py-6">
        <Button
          onClick={handleLogOutFunctionAdmin}
          color="red"
          fullWidth
          className={!isSidebarOpen ? "p-3" : ""}
        >
          <GiExitDoor className="w-5 h-5" />

          {isSidebarOpen && (
            <span className="ml-2 font-semibold">{t("exit")}</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
