import { Box } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import FilterByPrice from "./Filters/FilterByPrice";
import FiltersByCategory from "./Filters/FiltersByCategory";
import FilterByService from "./Filters/FilterByService";

function ProductFilters({ filters, onChange }) {
  const handleCategoryFilters = (categoryId) => {
    if (!onChange) return;

    const newFilters = {
      ...filters,
      "category.id": categoryId,
    };

    onChange(newFilters);
  };

  const handlePriceChange = (values) => {
    if (onChange) onChange(values);
  };

  const handleServiceChange = (values) => {
    if (onChange) onChange(values);
  };

  return (
    <Box>
      <FiltersByCategory onChange={handleCategoryFilters} />
      <FilterByPrice onChange={handlePriceChange} />
      <FilterByService filters={filters} onChange={handleServiceChange} />
    </Box>
  );
}

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

export default ProductFilters;
