import {
  Box,
  Container,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router";
import SlideShow from "../../../components/SlideShow";
import { addToCart, hideMiniCart, showMiniCart } from "../../Cart/cartSlice";
import AddCardForm from "../components/AddCardForm";
import ProductInfo from "../components/Filters/ProductInfo";
import ProductDescription from "../components/ProductDescription";
import ProductItemMenu from "../components/ProductItemMenu";
import ProductThumbnail from "../components/ProductThumbnail";
import useProductDetail from "../hooks/useProductDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },

  left: {
    width: "400px",
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },

  right: {
    flex: "1 1 0",
    padding: theme.spacing(1.5),
  },

  loading: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
  },
}));

function DetailPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    params: { productId },
    url,
  } = useRouteMatch();
  const { product, loading } = useProductDetail(productId);

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  const handleAddToCartSubmit = ({ quantity }) => {
    window.scrollTo(0, 0);
    dispatch(addToCart({ id: product.id, product, quantity }));
    dispatch(showMiniCart());
    setTimeout(() => {
      dispatch(hideMiniCart());
    }, 3000);
  };

  return (
    <Box className={classes.root}>
      <Container>
      
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>

            <Grid item className={classes.right}>
              <ProductInfo product={product} />

              <AddCardForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <ProductItemMenu product={product} />

        <Switch>
          <Route exact path={url}>
            <ProductDescription product={product} />
          </Route>

          {/* <Route path={`${url}/additional`} component={ProductAdditional} />
          <Route path={`${url}/reviews`} component={ProductReviews} /> */}
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
