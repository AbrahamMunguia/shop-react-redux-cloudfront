import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { formatAsPrice } from "~/utils/utils";
import AddProductToCart from "~/components/AddProductToCart/AddProductToCart";
import { useAvailableProducts } from "~/queries/products";

// Updated to match the actual shape coming from the API
type RawCartItem = {
  cartId: string;
  productId: string;
  count: number;
};

type CartItemsProps = {
  items: RawCartItem[];
  isEditable: boolean;
};

export default function CartItems({ items, isEditable }: CartItemsProps) {
  const { data: availableProducts = [] } = useAvailableProducts();

  // Join raw cart items with their full product data
  const enrichedItems = items
    .map((item) => ({
      ...item,
      product: availableProducts.find((p) => p.id === item.productId),
    }))
    .filter((item) => item.product !== undefined); // skip orphaned cart entries

  const totalPrice = enrichedItems.reduce(
    (total, item) => total + item.count * item.product!.price,
    0
  );

  return (
    <>
      <List disablePadding>
        {enrichedItems.map((cartItem) => {
          const product = cartItem.product!;

          return (
            <ListItem
              sx={{ padding: (theme) => theme.spacing(1, 0) }}
              key={cartItem.productId}
            >
              {isEditable && (
                <AddProductToCart product={product} stock={product.stock} />
              )}
              <ListItemText
                primary={product.title}
                secondary={product.description}
              />
              <Typography variant="body2">
                {formatAsPrice(product.price)} x {cartItem.count} ={" "}
                {formatAsPrice(product.price * cartItem.count)}
              </Typography>
            </ListItem>
          );
        })}
        <ListItem sx={{ padding: (theme) => theme.spacing(1, 0) }}>
          <ListItemText primary="Shipping" />
          <Typography variant="body2">Free</Typography>
        </ListItem>
        <ListItem sx={{ padding: (theme) => theme.spacing(1, 0) }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {formatAsPrice(totalPrice)}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}