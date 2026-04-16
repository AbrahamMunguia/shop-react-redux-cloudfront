import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { formatAsPrice } from "~/utils/utils";
import AddProductToCart from "~/components/AddProductToCart/AddProductToCart";
import { useAvailableProducts } from "~/queries/products";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
export default function Products() {
  const { data = [], isLoading } = useAvailableProducts();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Grid container spacing={4}>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      {data.map(({ count, ...product }, index) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                <Link
                  component={RouterLink}
                  sx={{ color: "inherit" }}
                  underline="none"
                  to="/product/${product.id}"
                >
                  {product.title}
                </Link>
              </Typography>
              <Typography>{formatAsPrice(product.price)}</Typography>
            </CardContent>
            <CardActions>
              <AddProductToCart product={product} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
