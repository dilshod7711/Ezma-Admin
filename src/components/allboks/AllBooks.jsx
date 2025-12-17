import { Table, Badge, Loader, Center, Text, Alert } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { IconAlertCircle } from "@tabler/icons-react";
import { FcLike } from "react-icons/fc";
import { HiDotsHorizontal } from "react-icons/hi";
import { API } from "../../api/api";
import authStore from "../../store/authStore";

const AllBooks = ({ type }) => {
  const { toggleLiked, likedBooks } = authStore();
  const {
    data: books,

    isError,
    error,
  } = useQuery({
    queryKey: ["AllBooks"],
    queryFn: () => API.get("books/books/").then((res) => res.data),
    select: (data) => data.results || data,
  });

  const filteredBooks = books
    ?.filter((item) => {
      if (type === "liked") {
        return likedBooks.some((b) => b.id === item.id);
      }

      return true;
    })
    .sort((a, b) => {
      if (type === "az") return a.name.localeCompare(b.name);
      if (type === "za") return b.name.localeCompare(a.name);
      return 0;
    });

  if (isError) {
    console.error("API Fetch Xatosi:", error);
    return (
      <Alert
        icon={<IconAlertCircle size={20} />}
        title="Ma'lumotlarni yuklashda xato"
        color="red"
        className="mt-4"
      >
        Kitob ro'yxatini olishda kutilmagan xato yuz berdi.
      </Alert>
    );
  }

  if (!filteredBooks || filteredBooks.length === 0) {
    return (
      <Center className="h-48">
        <Text size="xl" className="text-gray-400">
          Hozircha hech qanday kitob topilmadi.
        </Text>
      </Center>
    );
  }

  const rows = filteredBooks?.map((element) => (
    <Table.Tr
      key={element.id || element.name}
      className="transition-colors duration-150 h-16  "
      style={{
        borderBottom: "1px solid #2d3748 ",
      }}
    >
      <Table.Td className="w-8">
        <FcLike
          onClick={() => toggleLiked(element)}
          className={`w-5 h-5 cursor-pointer ${
            likedBooks?.some((b) => b.id === element.id)
              ? "opacity-100"
              : "opacity-20 grayscale"
          }`}
        />
      </Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.author}</Table.Td>
      <Table.Td>{element.publisher}</Table.Td>

      <Table.Td className="w-8 text-center  cursor-pointer">
        <HiDotsHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="w-full">
      <Table className="text-white border-collapse">
        <Table.Thead
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "#030712",
            borderBottom: "1px solid #2d3748",
          }}
        >
          <Table.Tr>
            <Table.Th className="text-white font-medium "></Table.Th>
            <Table.Th className="text-white font-medium">Kitob nomi</Table.Th>
            <Table.Th className="text-white font-medium">Muallif</Table.Th>
            <Table.Th className="text-white font-medium">Nashriyot</Table.Th>
            <Table.Th className="text-white font-medium">Amallar</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default AllBooks;
