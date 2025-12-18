import { Table, Text, Badge, Center, Loader, Pagination } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FcLike } from "react-icons/fc";
import { HiDotsHorizontal } from "react-icons/hi";
import { API } from "../../api/api";
import { Popover, Button } from "@mantine/core";
import { queryClient } from "../../main";
import authStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const LibrariyBooks = ({ type, search }) => {
  const { toggleLiked, likedBooks } = authStore();
  const navigate = useNavigate();

  const [activePage, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setPage(1);
  }, [search, type]);

  const {
    data: books,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["librariyBook"],
    queryFn: async () => {
      const res = await API.get("/libraries/libraries/");
      return res.data;
    },
  });

  const filteredBooks = (books || [])
    ?.filter((item) => {
      const matchesType = (() => {
        if (type === "active") return item.is_active;
        if (type === "inactive") return !item.is_active;
        if (type === "liked") return likedBooks.some((b) => b.id === item.id);
        return true;
      })();

      const matchesSearch = item.name
        ?.toLowerCase()
        .includes(search?.toLowerCase() || "");

      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      if (type === "most_books") return b.total_books - a.total_books;
      if (type === "az") return (a.name || "").localeCompare(b.name || "");
      if (type === "za") return (b.name || "").localeCompare(a.name || "");
      return 0;
    });

  const totalPages = Math.ceil((filteredBooks?.length || 0) / itemsPerPage);
  const paginatedBooks = filteredBooks?.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const { mutate: deactive } = useMutation({
    mutationFn: async (id) => {
      return await API.patch(`/libraries/library/deactivate/${id}/`, {
        is_active: false,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["librariyBook"] }),
  });

  const { mutate: activateLibrirary } = useMutation({
    mutationFn: async (id) => {
      return await API.patch(`/libraries/library/activate/${id}/`, {
        is_active: true,
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["librariyBook"] }),
  });

  function handleDetailLibrariesPages(id) {
    navigate(`/librariessDetail/${id}`);
  }

  if (isError)
    return (
      <Text color="red" ta="center" mt="xl">
        Yuklashda xatolik yuz berdi.
      </Text>
    );

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
            <Table.Th></Table.Th>
            <Table.Th className="text-white font-medium">Kutubxona</Table.Th>
            <Table.Th className="text-white font-medium">Holat</Table.Th>
            <Table.Th className="text-white font-medium">Manzil</Table.Th>
            <Table.Th className="text-white font-medium">
              Jami kitoblar
            </Table.Th>
            <Table.Th className="text-white font-medium">Amallar</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {paginatedBooks && paginatedBooks.length > 0 ? (
            paginatedBooks.map((element) => (
              <Table.Tr
                key={element.id}
                className="transition-colors duration-150 h-16 hover:bg-white/5"
                style={{ borderBottom: "1px solid #2d3748" }}
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
                <Table.Td
                  onClick={() => handleDetailLibrariesPages(element.id)}
                  className="text-white cursor-pointer"
                >
                  {element.name}
                </Table.Td>
                <Table.Td
                  onClick={() => handleDetailLibrariesPages(element.id)}
                  className="cursor-pointer"
                >
                  <Badge
                    variant="outline"
                    color={element.is_active ? "green" : "red"}
                    radius="xs"
                    styles={{
                      root: {
                        borderColor: element.is_active ? "#10b981" : "#ef4444",
                        color: element.is_active ? "#10b981" : "#ef4444",
                      },
                    }}
                  >
                    {element.is_active ? "Faol" : "Nofaol"}
                  </Badge>
                </Table.Td>
                <Table.Td
                  onClick={() => handleDetailLibrariesPages(element.id)}
                  className="text-gray-400 w-[400px] cursor-pointer"
                >
                  {element.address}
                </Table.Td>
                <Table.Td className="text-white">
                  {element.total_books} ta
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
                        style={{ cursor: "pointer", display: "inline-block" }}
                      >
                        <HiDotsHorizontal className="w-5 h-5 text-gray-400 hover:text-white" />
                      </div>
                    </Popover.Target>
                    <Popover.Dropdown
                      style={{
                        padding: 2,
                        background: "#030712",
                        border: "1px solid #2d3748",
                      }}
                    >
                      {element.is_active ? (
                        <Button
                          variant="subtle"
                          color="red"
                          size="xs"
                          fullWidth
                          onClick={() =>
                            window.confirm("Faolsizlantirishga aminmisiz?") &&
                            deactive(element.id)
                          }
                        >
                          Faolsizlantirish
                        </Button>
                      ) : (
                        <Button
                          variant="subtle"
                          size="xs"
                          fullWidth
                          onClick={() => activateLibrirary(element.id)}
                        >
                          Faollashtirish
                        </Button>
                      )}
                    </Popover.Dropdown>
                  </Popover>
                </Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr style={{ borderBottom: "1px solid #2d3748" }}>
              <Table.Td colSpan={6}>
                <div className="flex items-center justify-center h-[400px] w-full">
                  <div className="flex flex-col items-center gap-2">
                    <Text className="text-gray-500 font-medium tracking-wide">
                      {search
                        ? `"${search}" bo'yicha natija topilmadi`
                        : "Ma'lumot mavjud emas"}
                    </Text>
                  </div>
                </div>
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

export default LibrariyBooks;
