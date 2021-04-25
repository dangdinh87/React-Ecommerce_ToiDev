import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Link,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from "../../../constants";
import { formatPrice } from "../../../utils/common";
import { removeCart } from "../cartSlice";
import CartQuantityForm from "./CartQuantityForm";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const handleDelete = (removeId) => {
    dispatch(removeCart(removeId));
  };
  const thumbnailUrl = item.product.thumbnail
    ? `${STATIC_HOST}${item.product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;
  const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: theme.spacing(2),
    },
    imageCart: {
      width: "100%",
      minHeight: 40,
    },
    cartInfo: {
      textAlign: "left",
      fontWeight: 500,
    },
    cartPrice: {
      flexFlow: "row wrap",
      textTransform: "capitalize",
    },
    cartOriginalPrice: {
      fontSize: 12,
      color: theme.palette.text.secondary,
      textAlign: "right",
    },
    promotionPercent: {
      textDecoration: "none",
      fontWeight: 700,
      color: theme.palette.text.primary,
    },
    quantityPrice: {
      flexFlow: "row nowrap",
    },
    inputQuantity: {
      width: 40,
      height: 20,
    },
    input: {
      padding: 1,
    },
  }));
  const classes = useStyles();
  const { product } = item;
  console.log(item);
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <Paper className={classes.root} elevation={0}>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <img
              src={thumbnailUrl}
              alt={product.name}
              className={classes.imageCart}
            />
          </Grid>
          <Grid item xs={6}>
            <Paper p={2} elevation={0} className={classes.paper}>
              <Typography className={classes.cartInfo}>
                {product.name}
              </Typography>
              <Link
                color="secondary"
                component="button"
                onClick={() => handleDelete(item.id)}
              >
                Xóa
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Grid container justify="space-between">
              <Grid item xs={5} className={classes.quantityPrice}>
                <Box className={classes.cartPrice}>
                  <Typography variant="h6">
                    <Box fontWeight="500" fontSize={17} textAlign="right">
                      {formatPrice(product.salePrice)}
                    </Box>
                  </Typography>

                  {product.promotionPercent > 0 && (
                    <Typography className={classes.cartOriginalPrice}>
                      <del> {`${formatPrice(product.originalPrice)}`}</del>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.promotionPercent}
                      >{` | -${product.promotionPercent}%`}</Typography>
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <CartQuantityForm
                  onSubmit={handleSubmit}
                  quantity={item.quantity}
                  id={item.id}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

CartItem.propTypes = {};

export default CartItem;
