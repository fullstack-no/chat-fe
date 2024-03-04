import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";

export const ToggleDarkMode = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Button
      position="fixed"
      top="1rem"
      right="1rem"
      zIndex={1}
      onClick={toggleColorMode}
    >
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
