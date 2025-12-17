import { Loader, Overlay, Center } from "@mantine/core";
import { useIsFetching } from "@tanstack/react-query";

export function GlobalLoader() {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return (
    <Overlay opacity={0.5} color="#000" zIndex={999}>
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" type="ring" />
      </Center>
    </Overlay>
  );
}
