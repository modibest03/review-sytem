import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const customiseTheme = {
  colors: {
    primary: "#707070",
    secondary: "#fff",
    tertiary: "#359EF7",
    skyBlue: "#369DF7",
    yellow: "#FFC80B",
    orange: "#E89318",
    brightGrey: "#E6F3F6",
    seaBlue: "#00678E",
    grey: {
      10: "#7AC8FF0F",
      20: "#F7F7F7",
      30: "#00000014",
      40: "#0000001A",
      50: "#00000078",
    },
  },
  styles: {
    global: {
      html: {
        fontSize: "62.5%",
        boxSizing: "border-box",
      },
      "*": {
        margin: 0,
        padding: 0,
      },
      "*, *::before, &::after": {
        boxSizing: "inherit",
      },
      body: {
        fonts: "Poppins sans-serif",
        fontWeight: 400,
        color: "primary",
      },
    },
  },
};

const theme = extendTheme(customiseTheme);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById("root")
);
