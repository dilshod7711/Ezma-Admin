import { PasswordInput, TextInput, Switch } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api/api";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { YMaps, Map, ZoomControl, Placemark } from "@pbe/react-yandex-maps";

const phoneClean = (v) =>
  v.replace(/\D/g, "").replace(/^998/, "").replace(/^0/, "");

const schema = yup.object().shape({
  name: yup.string().required("Ismni kiriting"),
  phone: yup
    .string()
    .required("Telefon raqamni kiriting")
    .transform((val) => (val ? phoneClean(val) : ""))
    .matches(/^\d{9}$/, "Format: 901234567"),
  password: yup
    .string()
    .required("Parolni kiriting")
    .min(6, "Parol kamida 6 belgidan iborat bo'lishi kerak"),
  address: yup.string().required("Manzilni kiriting"),
  latitude: yup.string().required("Kenglikni kiriting"),
  longitude: yup.string().required("Uzunlikni kiriting"),
  instagram: yup.string().nullable(),
  facebook: yup.string().nullable(),
  telegram: yup.string().nullable(),
  can_rent_books: yup.boolean(),
});

const Register = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [coords, setCoords] = useState(null);

  const {
    register: formRegister,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      address: "",
      latitude: "",
      longitude: "",
      instagram: "",
      facebook: "",
      telegram: "",
      can_rent_books: false,
    },
  });

  const { mutate: registerLibrirary } = useMutation({
    mutationFn: (body) => API.post("/auth/register-library/", body),
    onSuccess: () => {
      notifications.show({
        title: "Muvaffaqiyatli",
        message: "Kutubxona ro'yxatdan o'tdi",
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Xatolik",
        message: "Ro'yxatdan o'tishda xato yuz berdi",
        color: "red",
      });
    },
  });

  const onSubmit = (data) => {
    const body = {
      library: {
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        can_rent_books: checked,
        social_media: {
          instagram: data.instagram,
          facebook: data.facebook,
          telegram: data.telegram,
        },
      },
      user: {
        name: data.name,
        phone: data.phone,
        password: data.password,
      },
    };
    registerLibrirary(body);
  };

  const handleMapClick = (e) => {
    const clickedCoords = e.get("coords");
    if (clickedCoords) {
      setCoords(clickedCoords);
      setValue("latitude", clickedCoords[0].toString());
      setValue("longitude", clickedCoords[1].toString());
    }
  };

  const inputClasses = {
    root: "w-full",
    label: "text-[#94a3b8] mb-2 text-sm",
    input:
      "!border-[#2d3748] !bg-[#111827] !text-gray-300 focus:border-[#6366f1] rounded-md h-[42px]",
    error: "text-red-500 text-xs mt-1",
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[1200px] mx-auto flex flex-col gap-12"
      >
        <section>
          <h2 className="text-xl font-semibold mb-6 text-white border-b border-[#2d3748] pb-2">
            Foydalanuvchi ma'lumotlari
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TextInput
              label="Ism"
              placeholder="Ismingizni kiriting"
              {...formRegister("name")}
              error={errors.name?.message}
              classNames={inputClasses}
            />
            <TextInput
              label="Telefon"
              placeholder="901234567"
              {...formRegister("phone")}
              error={errors.phone?.message}
              onBlur={(e) => setValue("phone", phoneClean(e.target.value))}
              classNames={inputClasses}
            />
            <PasswordInput
              label="Parol"
              placeholder="••••••"
              {...formRegister("password")}
              error={errors.password?.message}
              classNames={inputClasses}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-6 text-white border-b border-[#2d3748] pb-2">
            Kutubxona ma'lumotlari
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TextInput
              label="Manzil"
              placeholder="Kutubxona manzili"
              {...formRegister("address")}
              error={errors.address?.message}
              classNames={inputClasses}
            />
            <TextInput
              label="Kenglik"
              placeholder="44.559285..."
              {...formRegister("latitude")}
              error={errors.latitude?.message}
              classNames={inputClasses}
            />
            <TextInput
              label="Uzunlik"
              placeholder="78.178710..."
              {...formRegister("longitude")}
              error={errors.longitude?.message}
              classNames={inputClasses}
            />
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-4 text-[#94a3b8]">Joylashuv</h3>
          <div className="w-full h-[400px] border border-[#2d3748] rounded-xl overflow-hidden bg-[#111827]">
            <YMaps query={{ apikey: "3d763bcd-1d38-4d2c-bda0-41deb0997e82" }}>
              <Map
                defaultState={{
                  center: [41.2995, 69.2401],
                  zoom: 12,
                  controls: [],
                }}
                width="100%"
                height="100%"
                onClick={handleMapClick}
              >
                <ZoomControl options={{ float: "right" }} />
                {coords && <Placemark geometry={coords} />}
              </Map>
            </YMaps>
          </div>
        </section>

        <section className="pt-8 border-t border-[#1a1b1e]">
          <h2 className="text-xl font-semibold mb-6 text-white border-b border-[#2d3748] pb-2">
            Ijtimoiy tarmoqlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TextInput
              label="Telegram"
              placeholder="username"
              {...formRegister("telegram")}
              classNames={inputClasses}
            />
            <TextInput
              label="Instagram"
              placeholder="username"
              {...formRegister("instagram")}
              classNames={inputClasses}
            />
            <TextInput
              label="Facebook"
              placeholder="username"
              {...formRegister("facebook")}
              classNames={inputClasses}
            />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-white">
            Kitob ijaraga berish mumkinmi?
          </h3>
          <Switch
            checked={checked}
            onChange={(event) => {
              setChecked(event.currentTarget.checked);
              setValue("can_rent_books", event.currentTarget.checked);
            }}
            size="lg"
            color="#6d28d9"
            classNames={{
              track: `cursor-pointer !border-[#2d3748] ${
                !checked ? "!bg-[#1a1b1e]" : ""
              }`,
              thumb: "!border-[#2d3748] !bg-[#94a3b8]",
            }}
            styles={{
              track: { backgroundColor: !checked ? "#1a1b1e" : undefined },
            }}
            thumbIcon={
              checked ? (
                <IconCheck size={12} stroke={3} color="white" />
              ) : (
                <IconX size={12} stroke={3} color="black" />
              )
            }
          />
        </section>

        <div className="flex justify-end items-center gap-4 mt-8 pb-12">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 cursor-pointer bg-white/5 text-gray-400 hover:text-white rounded-md transition-colors"
          >
            Ortga
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-10 py-2 bg-[#6d28d9] hover:bg-[#5b21b6] text-white rounded-md font-medium transition-colors ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Yuborilmoqda..." : "Ro'yxatdan o'tish"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
