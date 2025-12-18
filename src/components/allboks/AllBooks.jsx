import {
  Table,
  Center,
  Text,
  Alert,
  Popover,
  Button,
  Pagination,
} from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FcLike } from "react-icons/fc";
import { HiDotsHorizontal } from "react-icons/hi";
import { API } from "../../api/api";
import authStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../main";
import { notifications } from "@mantine/notifications";
import { useState, useEffect } from "react"; 

const AllBooks = ({ type, search }) => {
  const navigate = useNavigate();
  const { toggleLiked, likedBooks } = authStore();

  const [activePage, setPage] = useState(1);
  const itemsPerPage = 25;

  useEffect(() => {
    setPage(1);
  }, [search, type]);

const {
  data: books,
  isError,
} = useQuery({
  queryKey: ["AllBooks", search],
  queryFn: async () => {
    if (search && search.trim() !== "") {
      const res = await API.get(
        `/books/search/book/?q=${encodeURIComponent(search)}`
      );
      return res.data.results || res.data;
    }

    const res = await API.get("/books/books/");
    return res.data.results || res.data;
  },
});

  const { mutate: deleteBookM } = useMutation({
    mutationFn: (id) => API.delete(`/books/book/${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AllBooks"] });
      notifications.show({
        title: "Muvaffaqiyatli",
        message: "Kitob o‘chirildi",
        color: "green",
      });
    },
  });

  const filteredBooks = books
    ? [...books]
        .filter((item) => {
          if (type === "liked") return likedBooks.some((b) => b.id === item.id);
          return true;
        })
        .sort((a, b) => {
          if (type === "az") return (a.name || "").localeCompare(b.name || "");
          if (type === "za") return (b.name || "").localeCompare(a.name || "");
          return 0;
        })
    : [];

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );


  if (isError)
    return (
      <Alert color="red" mt="md">
        Ma'lumot yuklashda xatolik yuz berdi.
      </Alert>
    );

  return (
    <div className="w-full overflow-x-auto">
      <Table className="text-white border-collapse min-w-[600px]">
        <Table.Thead className="sticky top-0 z-10 bg-[#030712]">
          <Table.Tr style={{ borderBottom: "1px solid #2d3748" }}>
            <Table.Th className="w-8"></Table.Th>
            <Table.Th className="text-white font-medium">Kitob nomi</Table.Th>
            <Table.Th className="text-white font-medium">Muallif</Table.Th>
            <Table.Th className="text-white font-medium">Nashriyot</Table.Th>
            <Table.Th className="text-white font-medium text-center">
              Amallar
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {paginatedBooks.length > 0 ? (
            paginatedBooks.map((element) => (
              <Table.Tr
                key={element.id}
                className="transition-colors duration-150 h-16 hover:bg-white/5 cursor-pointer"
                style={{ borderBottom: "1px solid #2d3748" }}
              >
                <Table.Td className="w-8">
                  <FcLike
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLiked(element);
                    }}
                    className={`w-5 h-5 transition-opacity ${
                      likedBooks?.some((b) => b.id === element.id)
                        ? "opacity-100"
                        : "opacity-20 grayscale"
                    }`}
                  />
                </Table.Td>
                <Table.Td
                  onClick={() => navigate(`/booksDetail/${element.id}`)}
                >
                  <Text fw={500}>{element.name}</Text>
                </Table.Td>
                <Table.Td
                  onClick={() => navigate(`/booksDetail/${element.id}`)}
                >
                  {element.author}
                </Table.Td>
                <Table.Td
                  onClick={() => navigate(`/booksDetail/${element.id}`)}
                >
                  {element.publisher}
                </Table.Td>
                <Table.Td className="w-8 text-center">
                  <Popover
                    width={150}
                    position="bottom-end"
                    trapFocus
                    withinPortal
                  >
                    <Popover.Target>
                      <div
                        onClick={(e) => e.stopPropagation()}
                        style={{ cursor: "pointer", padding: "8px" }}
                      >
                        <HiDotsHorizontal className="w-5 h-5 text-gray-400" />
                      </div>
                    </Popover.Target>
                    <Popover.Dropdown
                      style={{
                        background: "#030712",
                        border: "1px solid #2d3748",
                        padding: 4,
                      }}
                    >
                      <Button
                        variant="subtle"
                        color="red"
                        size="xs"
                        fullWidth
                        onClick={() => {
                          if (
                            window.confirm("Ushbu kitobni o'chirmoqchimisiz?")
                          ) {
                            deleteBookM(element.id);
                          }
                        }}
                      >
                        O'chirish
                      </Button>
                    </Popover.Dropdown>
                  </Popover>
                </Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={5}>
                <Center className="h-64 flex-col gap-3">
                  <Text size="lg" color="dimmed">
                    {search
                      ? `"${search}" bo'yicha kitob topilmadi`
                      : "Ma'lumot yo'q"}
                  </Text>
                </Center>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      {totalPages > 1 && (
        <Center mt="xl" pb="xl">
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={setPage}
            color="violet"
            radius="xs"
            styles={{
              control: {
                backgroundColor: "transparent",
                border: "1px solid #2d3748",
                color: "white",
              },
            }}
          />
        </Center>
      )}
    </div>
  );
};

export default AllBooks;
