import { createTheme, ThemeOptions } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

const palette: PaletteOptions = {
  type: "dark",
  primary: {
    main: red[800],
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#242526",
  },
};

const theme: ThemeOptions = createTheme({
  palette,
});

export default theme;
