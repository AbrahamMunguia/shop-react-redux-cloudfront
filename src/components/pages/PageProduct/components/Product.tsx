import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { formatAsPrice } from "~/utils/utils";
import { useAvailableProduct } from "~/queries/products";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";

export default function Product() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useAvailableProduct(id);

  if (isLoading) return <Skeleton variant="rectangular" width={300} height={192} />
  return (
    <Grid container spacing={4}>
      {data && <Grid item key={data.id} xs={12} sm={6} md={4}>
        <Card
          sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {data.title}
            </Typography>
            <Typography>{data.description}</Typography>
            <Typography>{formatAsPrice(data.price)}</Typography>
          </CardContent>
        </Card>
      </Grid>}
    </Grid>
  );
}
