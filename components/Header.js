import { Box, Heading, IconButton, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Link from "next/link";

export default function Header() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Box
      as="header"
      bg={bg}
      p={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Link href="/">
        <Heading size="md">Movie House</Heading>
      </Link>
      <IconButton
        aria-label="Toggle theme"
        icon={isDarkMode ? <SunIcon /> : <MoonIcon />}
        onClick={toggleTheme}
      />
    </Box>
  );
}
