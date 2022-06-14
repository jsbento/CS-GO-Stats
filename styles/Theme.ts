import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "light",
    useSystemColorMode: true,
}

const Theme = extendTheme({ config });

export default Theme;