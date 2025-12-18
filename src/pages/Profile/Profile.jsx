import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { API } from "../../api/api";
import { Button, Flex, TextInput, Box } from "@mantine/core";
import { FaUserLarge, FaPhoneFlip } from "react-icons/fa6";
import { ImUserTie } from "react-icons/im";
import authStore from "../../store/authStore";
import { modals } from "@mantine/modals";
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";

const Profile = () => {
  const { t } = useTranslation();
  const { logout } = authStore();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  const { data: profileM, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => API.get("/auth/admin/profile/").then((res) => res.data),
  });

  useEffect(() => {
    if (profileM) {
      setFormData({ name: profileM.name, phone: profileM.phone });
    }
  }, [profileM]);

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: (body) => API.patch("/auth/admin/profile/", body),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      setIsEditing(false);
      notifications.show({
        title: "Muvaffaqiyatli",
        message: "Ma'lumotlar yangilandi",
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Xatolik",
        message: "Yangilashda xato yuz berdi",
        color: "red",
      });
    },
  });

  const openModal = () =>
    modals.openConfirmModal({
      title: t("logoutConfirm"),
      labels: { confirm: t("confirm"), cancel: t("cancel") },
      onConfirm: () => logout(),
    });
  const inputClasses = {
    root: "w-full",
    label: "text-red-500 mb-2 text-xs font-bold flex items-center gap-1",
    input: `
      !transition-all !duration-300
      !bg-[#1a1b1e] 
      h-[45px] !rounded-md
      ${
        isEditing
          ? "!border-[#6d28d9] !text-white shadow-[0_0_10px_rgba(109,40,217,0.2)]"
          : "!border-[#2d3748] !text-gray-100 cursor-default opacity-80 focus"
      }
      focus:!border-[#6d28d9] focus:!shadow-[0_0_15px_rgba(109,40,217,0.3)]
    `,
  };

  return (
    <div className="mt-10 p-4 text-white">
      <div className="px-[50px]">
        <div className="border-b border-[#1a1b1e] pb-10">
          <Flex justify={"space-between"} align={"center"}>
            <div className="w-[140px] h-[140px] rounded-full border-[3px] border-[#6d28d9] flex items-center justify-center relative overflow-hidden bg-[#0d1117]">
              <div className="absolute inset-0 bg-[#6d28d910]"></div>
              <FaUserLarge className="w-[60px] h-[60px] text-gray-500" />
            </div>

            <Flex gap="md">
              {!isEditing ? (
                <>
                  <Button
                    variant="filled"
                    color="#6d28d9"
                    onClick={() => setIsEditing(true)}
                  >
                    {t("Tahrirlash")}
                  </Button>
                  <Button onClick={openModal} color="red">
                    {t("logout")}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="green"
                    variant="filled"
                    className="bg-green-600 px-6"
                    onClick={() => updateProfile(formData)}
                    loading={isUpdating}
                  >
                    💾 Saqlash
                  </Button>
                  <Button
                    color="red"
                    variant="filled"
                    className="bg-red-600 px-6"
                    onClick={() => setIsEditing(false)}
                  >
                    ✖ Bekor qilish
                  </Button>
                </>
              )}
            </Flex>
          </Flex>
        </div>

        <div className="mt-10 flex flex-col gap-10 max-w-[900px]">
          <div className="flex flex-col gap-2">
            <TextInput
              label="* Ism"
              placeholder="Ismingizni kiriting"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              readOnly={!isEditing}
              classNames={inputClasses}
              leftSection={
                <ImUserTie
                  className={isEditing ? "text-[#6d28d9]" : "text-gray-500"}
                />
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <TextInput
              label="* Telefon raqam"
              placeholder="+998"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              readOnly={!isEditing}
              classNames={inputClasses}
              leftSection={
                <FaPhoneFlip
                  className={isEditing ? "text-[#6d28d9]" : "text-gray-500"}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
