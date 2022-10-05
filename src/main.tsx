import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Global } from "@emotion/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider
      theme={extendTheme({
        direction: "rtl",
        fonts: {
          heading: `'Vazirmatn', sans-serif`,
          body: `'Vazirmatn', sans-serif`,
        },
      })}
    >
      <App />
      <Global
        styles={`
          @font-face {
            font-family: "Vazirmatn";
            src: url("/Vazirmatn[wght].woff2") format("woff2");
            font-weight: 100 900;
            font-style: normal;
            font-display: swap;
          }
      `}
      />
    </ChakraProvider>
  </React.StrictMode>
);
