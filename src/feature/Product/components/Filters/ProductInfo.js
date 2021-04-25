import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { formatPrice } from "../../../../utils/common";

function ProductInfo({ product }) {
  const useStyle = makeStyles((theme) => ({
    root: {},
    title: {
      textTransform: "uppercase",
    },
    description: {
      margin: theme.spacing(1, 0),
    },
    priceBox: {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.default,
      flexFlow: "flex wrap",
      marginBottom: theme.spacing(1),
    },
    salePrice: {
      fontWeight: "bold",
      fontSize: theme.typography.h5.fontSize,
      marginRight: theme.spacing(2),
    },
    originalPrice: {
      textDecoration: "line-through",
      fontSize: theme.typography.body2.fontSize,
    },
    label: {
      // position: "absolute",
      background: "linear-gradient(45deg,#00695f 30%, #099136 90%)",
      margin: theme.spacing(0.5),
      padding: theme.spacing(0.25, 0.5, 0.25, 0.5),
      borderRadius: "5px",
      color: "#ffffff",
    },
  }));
  const {
    name,
    shortDescription,
    salePrice,
    originalPrice,
    promotionPercent,
    isFreeShip,
    isPromotion,
    category,
  } = product;
  console.log(product);
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Typography
        fontWeight="bold"
        variant="h4"
        component="h1"
        className={classes.title}
      >
        {name}
      </Typography>
      <Typography variant="body2" className={classes.description}>
        {shortDescription}
      </Typography>
      <Box className={classes.priceBox}>
        <Box className={classes.salePrice} component="span">
          {formatPrice(salePrice)}
        </Box>
        {promotionPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {originalPrice}
            </Box>
            <Box component="span">{` - ${promotionPercent}%`}</Box>
          </>
        )}
      </Box>
      {isFreeShip && (
        <Typography className={classes.label} variant="caption">
          Free ship
        </Typography>
      )}
      {isPromotion && (
        <Typography className={classes.label} variant="caption">
          Khuyễn mãi
        </Typography>
      )}
      {category && (
        <Typography className={classes.label} variant="caption">
          {category.name}
        </Typography>
      )}
    </Box>
  );
}

ProductInfo.propTypes = {
  product: PropTypes.object,
};

export default ProductInfo;
