import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../../utils/common";
import CartEmpty from "./component/CartEmpty";
import CartItem from "./component/CartItem";
import { cartItemCountSelector, cartTotalCountSelector } from "./selectors";
export default function CartFeature() {
  const cartItemCount = useSelector(cartItemCountSelector);
  const cartList = useSelector((state) => state.cart.cartItem);
  const cartTotalCount = useSelector(cartTotalCountSelector);

  const useStyles = makeStyles((theme) => ({
    root: {
      // background: theme.palette.grey[300],
    },

    right: {
      // width: "250px",
      // margin: theme.spacing(1),
      color: theme.palette.text.secondary,
    },

    totalCartShow: {
      color: theme.palette.text.secondary,
      // text
    },
    totalPrice: {
      display: "flex",
      justifyContent: "space-between",
      borderBottom: `1px solid ${theme.palette.background.paper}`,
      padding: theme.spacing(2),
    },
    tempPrice: {
      fontWeight: "bold",
      color: theme.palette.text.primary,
    },
    lastPrice: {
      justifyContent: "space-between",
      display: "flex",
      padding: theme.spacing(2),
    },
    lastPriceTotal: {
      textAlign: "right",
      color: "red",
    },
    taxVAT: {
      color: theme.palette.text.primary,
      fontStyle: "oblique",
      fontSize: 10,
    },
  }));
  const classes = useStyles();

  return (
    <Box mt={2} className={classes.root}>
      <Container>
        <Box>
          <Typography display="inline" variant="subtitle1">
            GIỎ HÀNG&nbsp;
          </Typography>
          <Typography
            className={classes.totalCartShow}
            color="textPrimary"
            display="inline"
            variant="caption"
          >{`(${cartItemCount} sản phẩm)`}</Typography>
        </Box>

        {cartItemCount <= 0 ? (
          <CartEmpty />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={8} spacing={2}>
              {cartList.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={0} className={classes.right}>
                <Box className={classes.totalPrice}>
                  <Typography component="span" variant="body2">
                    Tạm Tính
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.tempPrice}
                  >
                    {formatPrice(cartTotalCount) || 0}
                  </Typography>
                </Box>
                <Box className={classes.lastPrice}>
                  <Typography variant="body2" component="span">
                    Thành Tiền
                  </Typography>
                  <Typography
                    variant="h5"
                    component="span"
                    className={classes.lastPriceTotal}
                  >
                    {formatPrice(cartTotalCount) || 0}
                    <Typography className={classes.taxVAT}>
                      Đã bao gồm thuế VAT (10%) nếu có
                    </Typography>
                  </Typography>
                </Box>
              </Paper>
              <Box mt={2}>
                <Button fullWidth color="primary" variant="contained">
                  Tiến Hành Đặt Hàng
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
