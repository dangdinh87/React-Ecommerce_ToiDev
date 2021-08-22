import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import productApi from "../../../api/productApi";
import React, { useEffect, useMemo, useState } from "react";
import ProductList from "../components/ProductList";
import ProductSkeletonList from "../components/ProductSkeletionList";
import Pagination from "@material-ui/lab/Pagination";
import ProductSort from "../components/ProductSort";
import ProductFilters from "../components/ProductFilters";
import FilterViewer from "../components/FilterViewer";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import Alert from "@material-ui/lab/Alert";
import SlideShow from "../../../components/SlideShow";
import EmptyProduct from "../components/EmptyProduct";

const useStyles = makeStyles((theme) => ({
  left: {
    width: "250px",
  },

  right: {
    flex: "1 1 0",
  },

  pagination: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    marginTop: "30px",
    paddingBottom: "20px",
  },
}));

function ListPage(props) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    setLoading(true);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || "salePrice:ASC",
      isPromotion: params.isPromotion === "true",
      isFreeShip: params.isFreeShip === "true",
    };
  }, [location.search]);

  const classes = useStyles();
  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
    total: 10,
  });

  // const [filters, setFilters] = useState({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams._limit) || 10,
  //   _sort: queryParams._sort || "salePrice:ASC",
  // });

  // useEffect(() => {
  //   console.log(history);
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filters),
  //   });
  // }, [history, filters]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
      setLoading(false);
    })();
  }, [queryParams]);

  const handleChangePagination = (e, page) => {
    // setFilters((prevFilter) => {
    //   return { ...prevFilter, _page: page };
    // });
    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSortChange = (value) => {
    // setFilters((prevFilter) => ({ ...prevFilter, _sort: value }));
    const filters = {
      ...queryParams,
      _sort: value,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleFiltersChange = (newFilters) => {
    // setFilters((prevFilter) => ({ ...prevFilter, ...newFilters }));
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSetNewFilter = (newFilters) => {
    // setFilters(newFilters);

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };
  return (
    <Box mb={6}>
      <Container>
        <Box mb={1}>
          <SlideShow />
        </Box>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters
                filters={queryParams}
                onChange={handleFiltersChange}
              />
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <FilterViewer
                filters={queryParams}
                onChange={handleSetNewFilter}
              />
              <ProductSort
                currentSort={queryParams._sort}
                onChange={handleSortChange}
              />
              {loading ? (
                <ProductSkeletonList length={12} />
              ) : productList.length <= 0 ? (
                <EmptyProduct />
              ) : (
                <ProductList data={productList} />
              )}
              {Math.ceil(pagination.total / pagination.limit) >= 1 && (
                <Pagination
                  className={classes.pagination}
                  count={Math.ceil(pagination.total / pagination.limit)}
                  variant="outlined"
                  shape="rounded"
                  page={pagination.page}
                  onChange={handleChangePagination}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
