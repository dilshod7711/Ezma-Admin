import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n.js";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createTheme, MantineProvider, Loader } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
// import { RingLoader } from "./ui/RingLoader.jsx";
// import { GlobalLoader } from "./ui/GlobalLoader.jsx";

const theme = createTheme({
  components: {
    Container: {
      defaultProps: {
        size: 1320,
      },
    },
    // Loader: Loader.extend({
    //   defaultProps: {
    //     loaders: {
    //       ...Loader.defaultLoaders,
    //       ring: RingLoader,
    //     },
    //     type: "ring",
    //   },
    // }),
  },
});

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <ModalsProvider>
          <App />
          {/* <GlobalLoader /> */}
        </ModalsProvider>

        <Notifications />
      </MantineProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
);
