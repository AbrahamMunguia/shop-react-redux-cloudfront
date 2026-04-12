import Products from "~/components/pages/PageProducts/components/Products";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function PageProducts() {
  return (
    <Box py={3}>
      <Typography variant="h1">Products that cesar owns visit https://blackstonehobbies.com/</Typography>
      <Products />
    </Box>
  );
}
