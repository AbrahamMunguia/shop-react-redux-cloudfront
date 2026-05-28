import { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CartIcon from "@mui/icons-material/ShoppingCart";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

import { Product } from "~/models/Product";
import { useCart, useInvalidateCart, useUpsertCart } from "~/queries/cart";

type AddProductToCartProps = {
  product: Product;
  stock: number;
};

type CartItem = {
  cartId: string;
  productId: string;
  count: number;
};

export default function AddProductToCart({
  product,
  stock,
}: AddProductToCartProps) {
  const { data, isFetching } = useCart();

  const { mutate: upsertCart } = useUpsertCart();
  const invalidateCart = useInvalidateCart();
  // @ts-ignore - remove once the cart query is typed
  const cartItems: CartItem[] = data?.data?.cart?.items ?? [];

  const cartItem = cartItems.find(
    (item) => item.productId === product.id
  );

  const [localCount, setLocalCount] = useState<number>(
    cartItem?.count ?? 0
  );

  const pendingMutation = useRef(false);

  useEffect(() => {
    if (!pendingMutation.current) {
      setLocalCount(cartItem?.count ?? 0);
    }
  }, [cartItem?.count]);

  const updateCart = (nextCount: number) => {
    if (nextCount < 0 || nextCount > stock) {
      return;
    }

    const previousCount = localCount;

    setLocalCount(nextCount);
    pendingMutation.current = true;

    upsertCart(
      {
        productId: product.id!,
        count: nextCount,
      },
      {
        onSuccess: () => {
          pendingMutation.current = false;
          invalidateCart();
        },
        onError: () => {
          pendingMutation.current = false;
          setLocalCount(previousCount);
        },
      }
    );
  };

  if (isFetching && !cartItem && localCount === 0) {
    return null;
  }
  if (stock === 0) return <></>
  if (localCount > 0) {
    return (
      <>
        <IconButton
          size="large"
          disabled={isFetching || localCount <= 0}
          onClick={() => updateCart(localCount - 1)}
        >
          <Remove color="secondary" />
        </IconButton>

        <Typography align="center">{localCount}</Typography>

        <IconButton
          size="large"
          disabled={isFetching || localCount >= stock}
          onClick={() => updateCart(localCount + 1)}
        >
          <Add color="secondary" />
        </IconButton>
      </>
    );
  }

  return (
    <IconButton
      size="large"
      disabled={isFetching || stock === 0}
      onClick={() => updateCart(1)}
    >
      <CartIcon color="secondary" />
    </IconButton>
  );
}