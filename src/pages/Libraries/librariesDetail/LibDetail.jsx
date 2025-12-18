import { useQuery } from "@tanstack/react-query";
import {  useNavigate, useParams } from "react-router-dom";
import { API } from "../../../api/api";
import {
  Box,
  Grid,
  Text,
  Title,
  Paper,
  Flex,
  Table,
  ScrollArea,
} from "@mantine/core";
import {
  FaLocationDot,
  FaInstagram,
  FaTelegram,
  FaBookBookmark,
} from "react-icons/fa6";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { ArrowLeft } from "lucide-react";

const LibDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: results } = useQuery({
    queryKey: ["libdetail", id],
    queryFn: () => API.get(`/libraries/library/${id}/`).then((res) => res.data),
    enabled: !!id,
  });

  if (!results?.results) return null;

  const lat = parseFloat(results.results.library?.latitude);
  const lng = parseFloat(results.results.library?.longitude);
  const coords = [lat, lng];

  return (
    <Box className="bg-[#030712] min-h-screen p-6 text-gray-300">
      <button
        onClick={() => navigate(-1)}
        className="flex cursor-pointer items-center gap-2 bg-[#1e293b] hover:bg-[#334155] px-4 py-2 rounded-lg text-sm transition-all mb-10"
      >
        <ArrowLeft size={18} />
        <span>Kutubxonaga qaytish</span>
      </button>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper
            p="xl"
            radius="md"
            className="!bg-[#111827] border border-[#1f2937] h-[350px]"
          >
            <Flex align="center" gap="sm" mb="xl">
              <Box className="p-2 bg-[#6d28d922] rounded text-[#8b5cf6]">
                <FaLocationDot size={20} />
              </Box>
              <Title order={3} className="text-white text-lg font-semibold">
                Kutubxona haqida ma'lumot
              </Title>
            </Flex>

            <Box className="space-y-6">
              <Flex gap="md">
                <Text size="sm" color="dimmed" className="w-20">
                  Manzil:
                </Text>
                <Text size="sm" className="flex-1 text-white">
                  {results.results.library?.address}
                </Text>
              </Flex>
              <Flex gap="md" className="border-t border-[#1f2937] pt-4">
                <Text size="sm" color="dimmed" className="w-20">
                  Telefon:
                </Text>
                <Text size="sm" className="text-white">
                  {results.results.phone}
                </Text>
              </Flex>

              <Box mt="xl">
                <Text
                  size="xs"
                  color="dimmed"
                  mb="xs"
                  className="uppercase font-bold tracking-widest"
                >
                  Ijtimoiy tarmoqlar
                </Text>
                <Flex gap="md">
                  <Flex
                    align="center"
                    gap="xs"
                    className="bg-[#1a1b1e] px-4 py-2 rounded-md border border-[#2d3748]"
                  >
                    <FaTelegram className="text-blue-400" />{" "}
                    <Text size="xs">
                      {results.results.library?.social_media?.telegram}
                    </Text>
                  </Flex>
                  <Flex
                    align="center"
                    gap="xs"
                    className="!bg-[#1a1b1e] px-4 py-2 rounded-md border border-[#2d3748]"
                  >
                    <FaInstagram className="text-pink-500" />{" "}
                    <Text size="xs">
                      {results.results.library?.social_media?.instagram}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Box>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper
            radius="md"
            className="!bg-[#111827] border border-[#1f2937] h-[350px] overflow-hidden"
          >
            <YMaps>
              <Map
                state={{ center: coords, zoom: 16 }}
                width="100%"
                height="100%"
                options={{}}
              >
                <Placemark geometry={coords} />
              </Map>
            </YMaps>
          </Paper>
        </Grid.Col>

        <Grid.Col span={12}>
          <Paper
            p="xl"
            radius="md"
            className="!bg-[#111827] border border-[#1f2937]"
          >
            <Flex align="center" gap="lg">
              <Box className="p-4 bg-[#6d28d922] rounded-xl text-[#8b5cf6]">
                <FaBookBookmark size={40} />
              </Box>
              <Box>
                <Title className="text-white text-5xl font-black">
                  {results.results.total_books}
                </Title>
                <Text
                  color="dimmed"
                  size="sm"
                  className="uppercase tracking-widest"
                >
                  Jami kitoblar soni
                </Text>
              </Box>
            </Flex>
          </Paper>
        </Grid.Col>

        <Grid.Col span={12}>
          <Paper
            p="xl"
            radius="md"
            className="!bg-[#111827] border border-[#1f2937]"
          >
            <Title order={3} className="text-white mb-6">
              Kutubxonadagi kitoblar
            </Title>

            <ScrollArea h={400} offsetScrollbars scrollbarSize={6}>
              <Table verticalSpacing="md" highlightOnHover>
                <Table.Thead className="!bg-[#111827] sticky top-0 z-10 shadow-sm">
                  <Table.Tr className="border-b border-[#1f2937]">
                    <Table.Th className="text-[#8b5cf6] py-4">
                      Kitob nomi
                    </Table.Th>
                    <Table.Th className="text-[#8b5cf6]">Muallif</Table.Th>
                    <Table.Th className="text-[#8b5cf6]">Nashriyot</Table.Th>
                    <Table.Th className="text-[#8b5cf6]">Soni</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {results.results.books?.map((book) => (
                    <Table.Tr
                      key={book.id}
                      className="transition-colors hover:!bg-[#374151]"
                    >
                      <Table.Td className="text-white font-semibold">
                        {book.name}
                      </Table.Td>
                      <Table.Td>{book.author}</Table.Td>
                      <Table.Td>{book.publisher}</Table.Td>
                      <Table.Td>
                        <Box className="px-3 py-1 !bg-[#6d28d933] text-[#a78bfa] rounded-md text-xs font-bold inline-block border border-[#6d28d966]">
                          {book.quantity_in_library} ta
                        </Box>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default LibDetail;
