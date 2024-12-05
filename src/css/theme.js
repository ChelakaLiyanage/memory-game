import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "#ffffff", // Default outline color
          color: "#ffffff", // Text color (optional)
          "&:hover": {
            borderColor: "#bdbdbd", // Hover outline color
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#ffffff",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#ffffff", // Default outline color
        },
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#bdbdbd", // Hover outline color
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#bdbdbd", // Focused outline color
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Default label color
          "&.Mui-focused": {
            color: "#bdbdbd", // Focused label color
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#000000", // Black background for table headers
          color: "#ffffff", // White text color for table headers
        },
        body: {
          fontSize: "14px", // Font size for table body cells
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: "#d6c7c7", // Light gray background for odd rows
          },
          "&:nth-of-type(even)": {
            backgroundColor: "#eee8e8", // Light gray background for odd rows
          },
          "&:last-child td, &:last-child th": {
            border: 0, // Remove border for the last row
          },
        },
      },
    },
  },
});
export default theme;
