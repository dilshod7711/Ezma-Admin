import { Button, PasswordInput, TextInput, Box, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../../api/api";
import { useState } from "react";
import authStore from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

const Login = () => {
  const { login } = authStore();
  const navigate = useNavigate();
  const [tel, setTel] = useState("");
  const [pass, setPass] = useState("");

  const { mutate: adminLogin, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (body) => API.post("/auth/login/", body),
  });

  const handleSubmitAdminForm = (e) => {
    e.preventDefault();

    adminLogin(
      { phone: tel, password: pass },
      {
        onSuccess: (res) => {
          login(res.data.user, res.data.access);
          notifications.show({
            title: "Muvaffaqiyatli",
            message: "Xush kelibsiz!",
            color: "green",
          });
          navigate("/profile");
        },
        onError: () => {
          notifications.show({
            title: "Xatolik",
            message: "Telefon raqam yoki parol noto'g'ri",
            color: "red",
          });
        },
      }
    );
  };

  const inputClasses = {
    root: "w-full",
    label: "text-[#94a3b8] mb-2 text-sm font-medium",
    input:
      "!border-[#2d3748] !bg-[#111827] !text-white focus:border-[#6366f1] rounded-md h-[45px] transition-colors placeholder:text-gray-600",
  };

  return (
    <Box className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
      <div className="flex flex-col gap-10 items-center w-full max-w-[450px]">
        <Title className="text-[46px] font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Ezma Admin
        </Title>

        <form
          onSubmit={handleSubmitAdminForm}
          className="w-full flex flex-col gap-6"
        >
          <TextInput
            onChange={(e) => setTel(e.target.value)}
            value={tel}
            label="Telefon raqam"
            placeholder="Telefon raqamni kiriting"
            classNames={inputClasses}
            required
          />

          <PasswordInput
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            label="Parol"
            placeholder="Parolni kiriting"
            classNames={inputClasses}
            required
          />

          <Button
            type="submit"
            fullWidth
            loading={isPending}
            disabled={isPending}
            loaderProps={{ type: "dots" }}
            className={`h-[48px] mt-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] 
    text-white rounded-md font-bold text-lg uppercase tracking-wider 
    transition-all border-none
    ${
      isPending
        ? "opacity-70 cursor-not-allowed"
        : "hover:from-[#4f46e5] hover:to-[#7c3aed] shadow-lg shadow-indigo-500/20"
    }
  `}
          >
            Kirish
          </Button>
        </form>
      </div>
    </Box>
  );
};

export default Login;
