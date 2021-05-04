import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

function FilterByPrice({ onChange }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      borderTop: `8px solid ${theme.palette.background.default} `,
      padding: theme.spacing(2),
    },
    range: {
      display: "flex",
      flexFlow: "row",
      alignItems: "center",
      marginBottom: theme.spacing(1),
      "& > span": {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  const [values, setValues] = useState({
    salePrice_gte: "",
    salePrice_lte: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (values.salePrice_gte > 0 && values.salePrice_gte < values.salePrice_lte)
      onChange(values);

    setValues({
      salePrice_gte: "",
      salePrice_lte: "",
    });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1">MỨC GIÁ</Typography>
      <Box className={classes.range}>
        <TextField
          placeholder="Từ"
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChange}
        />
        <span>-</span>
        <TextField
          placeholder="Đến"
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChange}
        />
      </Box>
      <Button
        fullWidth
        variant="outlined"
        color="secondary"
        size="small"
        onClick={handleSubmit}
      >
        Áp dụng
      </Button>
    </Box>
  );
}

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

export default FilterByPrice;
