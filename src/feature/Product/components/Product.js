import { Box, Typography, makeStyles, Tooltip } from "@material-ui/core";
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from "../../../constants/";
import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router";
import { positions } from "@material-ui/system";
import ProductItemMenu from "./ProductItemMenu";
// import { formatPrice } from 'utils';

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      "&:hover": {
        boxShadow: "rgb(0 0 0 / 10%) 0px 0px 20px",
        // boxSixing: "border-box",
        zIndex: 1,
      },
      cursor: "pointer",
    },
    label: {
      // position: "absolute",
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      margin: theme.spacing(0.5),
      padding: theme.spacing(0.25, 0.5, 0.25, 0.5),
      borderRadius: "5px",
      color: "white",
    },
  }));
  const history = useHistory();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;

  const handleClick = () => {
    history.push(`/products/${product.id}`);
  };

  const classes = useStyles();
  return (
    <Box padding={2} className={classes.root} onClick={handleClick}>
      <Box minHeight="215px">
        <Box mt={0.5} position="absolute">
          {product.isFreeShip && (
            <Typography className={classes.label} variant="caption">
              Free ship
            </Typography>
          )}
          {product.isPromotion && (
            <Typography className={classes.label} variant="caption">
              Khuyễn mãi
            </Typography>
          )}
        </Box>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>

      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.salePrice)}
        </Box>

        {product.promotionPercent > 0 ? ` - ${product.promotionPercent}%` : ""}
      </Typography>
    </Box>
  );
}

export default Product;
