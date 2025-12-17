import { Table, Text, Alert, Badge } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FcLike } from "react-icons/fc";
import { HiDotsHorizontal } from "react-icons/hi";
import { API } from "../../api/api";
import { Popover, Button } from "@mantine/core";
import { queryClient } from "../../main";
import authStore from "../../store/authStore";

const LibrariyBooks = ({ type }) => {
  const { toggleLiked, likedBooks } = authStore();
  console.log(likedBooks);

  const { data: books } = useQuery({
    queryKey: ["AllBooks"],
    queryFn: async () => {
      const res = await API.get("/libraries/libraries/");
      return res.data;
    },
  });
  const filteredBooks = books
    ?.filter((item) => {
      if (type === "active") return item.is_active;
      if (type === "inactive") return !item.is_active;

      if (type === "liked") {
        return likedBooks.some((b) => b.id === item.id);
      }

      return true;
    })
    .sort((a, b) => {
      if (type === "most_books") return b.total_books - a.total_books;
      if (type === "az") return a.name.localeCompare(b.name);
      if (type === "za") return b.name.localeCompare(a.name);
      return 0;
    });

  const { mutate: deactive } = useMutation({
    mutationFn: async (id) => {
      const res = await API.patch(`/libraries/library/deactivate/${id}/`, {
        is_active: false,
      });
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AllBooks"] });
    },
  });

  function handleDelete(id) {
    if (window.confirm("Kutubxonani o'chirishga aminmisiz?")) {
      deactive(id);
    }
  }

  const { mutate: activateLibrirary } = useMutation({
    mutationFn: async (id) => {
      const res = await API.patch(`/libraries/library/activate/${id}/`, {
        is_active: true,
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AllBooks"] });
    },
  });

  function handleActiveLibrirary(id) {
    activateLibrirary(id);
  }

  const rows = filteredBooks?.map((element) => (
    <Table.Tr
      key={element.id}
      className="transition-colors duration-150 h-16"
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
      <Table.Td className="text-white">{element.name}</Table.Td>
      <Table.Td>
        <Badge
          variant="outline"
          color={element.is_active ? "green" : "red"}
          radius="xs"
          styles={{
            root: {
              borderColor: element.is_active ? "#10b981" : "#ef4444",
              color: element.is_active ? "#10b981" : "#ef4444",
              backgroundColor: "transparent",
            },
          }}
        >
          {element.is_active ? "Faol" : "Nofaol"}
        </Badge>
      </Table.Td>
      <Table.Td className="text-gray-400 w-[400px]">{element.address}</Table.Td>
      <Table.Td className="text-white">{element.total_books} ta</Table.Td>
      <Table.Td className="w-8 text-center cursor-pointer">
        <Popover width={120} position="bottom" withArrow shadow="md" trapFocus>
          <Popover.Target>
            <HiDotsHorizontal className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          </Popover.Target>
          <Popover.Dropdown
            style={{
              padding: 4,
              background: "#030712",
              border: "1px solid #2d3748",
            }}
          >
            <Button
              variant="subtle"
              color="red"
              size="xs"
              fullWidth
              onClick={() => handleDelete(element.id)}
            >
              O'chirish
            </Button>
            {!element.is_active ? (
              <Button
                onClick={() => handleActiveLibrirary(element.id)}
                variant="subtle"
                size="xs"
                fullWidth
                className="mt-1"
              >
                Foallashtirish
              </Button>
            ) : (
              ""
            )}
          </Popover.Dropdown>
        </Popover>
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
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default LibrariyBooks;
