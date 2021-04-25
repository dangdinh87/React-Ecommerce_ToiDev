import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@material-ui/core";

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (event, newValue) => {
    if (onChange) onChange(newValue);
  };

  return (
    <Tabs
      style={{ marginLeft: "16px" }}
      value={currentSort}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleSortChange}
    >
      {/* <Tab label="Phổ biến" value="salePrice:default"></Tab> */}
      <Tab label="Giá thấp tới cao" value="salePrice:ASC"></Tab>
      <Tab label="Giá cao xuống thấp" value="salePrice:DESC"></Tab>
    </Tabs>
  );
}

export default ProductSort;
