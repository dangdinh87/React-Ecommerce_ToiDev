import { Box } from "@material-ui/core";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";

function ProductFeature(props) {
  const match = useRouteMatch();
  return (
    <Box>
      <Switch>
        <Route path={match.url} exact component={ListPage} />
        <Route path={`${match.url}/:productId`} component={DetailPage} />
      </Switch>
    </Box>
  );
}

ProductFeature.propTypes = {};

export default ProductFeature;
