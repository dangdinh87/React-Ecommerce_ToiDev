import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Menu, Typography } from "@material-ui/core";
import categoryApi from "../../../../api/categoryApi";
import { Skeleton } from "@material-ui/lab";

function FiltersByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
    menu: {
      padding: 0,
      margin: 0,
      listStyleType: " none",

      "& > li": {
        marginTop: theme.spacing(1),
        fontWeight: "700",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  }));

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(list.map((x) => ({ id: x.id, name: x.name })));
        setLoading(false);
      } catch (e) {
        console.log("fail to fetch data");
      }
    })();
  }, []);

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="body1">DANH MỤC SẢN PHẨM</Typography>
      {loading ? (
        Array.from(new Array(6)).map((x, index) => (
          <Box padding={0.5}>
            <Skeleton />
          </Box>
        ))
      ) : (
        <Box>
          <ul className={classes.menu}>
            {categoryList.map((category) => (
              <li key={category.id} onClick={() => onChange(category.id)}>
                <Typography variant="subtitle2">{category.name}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
}

FiltersByCategory.propTypes = {
  onChange: PropTypes.func,
};

export default FiltersByCategory;
