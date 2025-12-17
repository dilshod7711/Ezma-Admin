import { useQuery } from "@tanstack/react-query";
import React from "react";
import { API } from "../../api/api";
import { Button, Container, Flex, Loader, Text } from "@mantine/core";
import { FaUserLarge } from "react-icons/fa6";
import { ImUserTie } from "react-icons/im";
import { FaPhoneFlip } from "react-icons/fa6";
import authStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const { logout } = authStore();

  const { data: profileM, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => API.get("/auth/admin/profile/").then((res) => res.data),
  });

  const openModal = () =>
    modals.openConfirmModal({
      title: t("logoutConfirm"),

      labels: { confirm: t("confirm"), cancel: t("cancel") },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => logout(),
    });

  const handleLogOutFunction = () => {
    openModal();
  };
  return (
    <div className=" mt-10 p-4  rounded-lg shadow-md">
      <div className="px-[50px]">
        <div className="border-b border-gray-200 pb-6">
          <Flex justify={"space-between"} align={"center"}>
            <div className="w-[130px] h-[130px] rounded-full border-4 border-gray-300 flex items-center justify-center ">
              <FaUserLarge className="w-[60px] h-[60px] " />
            </div>
            <Flex gap="md">
              <Button color="#6d28d9">{t("Tahrirlash")}</Button>
              <Button onClick={handleLogOutFunction} color="red">
                {t("logout")}
              </Button>
            </Flex>
          </Flex>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-[50px] h-[50px] flex items-center justify-center bg-[#6c28d94e] rounded-lg">
              <ImUserTie className="text-[#6d28d9] w-[28px] h-[28px]" />
            </div>
            <div>
              <h2 className="text-gray-500 text-sm font-semibold">Ism</h2>
              <p className="text-lg font-medium">{profileM?.name || "-"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-[50px] h-[50px] flex items-center justify-center bg-[#6c28d94e] rounded-lg">
              <FaPhoneFlip className="text-[#6d28d9] w-[28px] h-[28px]" />
            </div>
            <div>
              <h2 className="text-gray-500 text-sm font-semibold">Telefon</h2>
              <p className="text-lg font-medium">{profileM?.phone || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
