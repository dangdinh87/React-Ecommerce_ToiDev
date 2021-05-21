import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";

function ProductLabel({ label }) {
  const useStyles = makeStyles((theme) => ({
    label: {
      // position: "absolute",
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      margin: theme.spacing(0.5),
      padding: theme.spacing(0.25, 0.5, 0.25, 0.5),
      borderRadius: "5px",
      color: "white",
    },
  }));
  const classes = useStyles();
  return (
    // <Box classes={classes.label}>
    <Typography classes={classes.label}>{label}</Typography>
    // </Box>
  );
}

ProductLabel.propTypes = {
  label: PropTypes.string,
};

export default ProductLabel;
