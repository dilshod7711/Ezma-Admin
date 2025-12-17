import { Button, Container, PasswordInput, TextInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { API } from "../../../api/api";
import { useRef, useState } from "react";
import authStore from "../../../store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = authStore();
  const navigate = useNavigate();
  const [tel, setTel] = useState("");
  const [pass, setPass] = useState("");
  const { mutate: adminLogin } = useMutation({
    mutationKey: ["login"],
    mutationFn: (body) => API.post("/auth/login/", body),
  });

  function handleSubmitAdminForm(e) {
    e.preventDefault();

    adminLogin(
      { phone: tel, password: pass },
      {
        onSuccess: (res) => {
          login(console.log(res.data.user), res.data.access);
          navigate("/profile");
        },
      }
    );
  }
  return (
    <Container>
      <div className="flex flex-col gap-8 items-center justify-center h-screen">
        <h1 className="text-[46px]">Ezma Admin</h1>
        <form
          onSubmit={handleSubmitAdminForm}
          className="w-[500px] flex flex-col gap-4 "
        >
          <TextInput
            onChange={(e) => setTel(e.target.value)}
            value={tel}
            label="Telefon raqam"
            placeholder="Telefon raqamni kiriting"
          />
          <PasswordInput
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            label="Parol"
          />
          <Button type="submit">Kirish</Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
