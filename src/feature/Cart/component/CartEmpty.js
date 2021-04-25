import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { CART_EMPTY } from "../../../constants";

function CartEmpty(props) {
  const history = useHistory();
  return (
    <Box textAlign="center" bgcolor="primary.main" pb={8}>
      <img
        style={{ width: "300px", minHeight: "300px" }}
        src={CART_EMPTY}
        alt="cart-empty"
      />
      <Typography variant="subtitle1">
        Không có sản phẩm nào trong giỏ hàng của bạn!
      </Typography>

      <Box mt={4}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => history.push("/products")}
        >
          Tiếp tục mua hàng
        </Button>
      </Box>
    </Box>
  );
}

CartEmpty.propTypes = {};

export default CartEmpty;
