import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ThemeProvider } from "../context/ThemeContext";
import Header from "../components/Header";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </ThemeProvider>
  );
}
