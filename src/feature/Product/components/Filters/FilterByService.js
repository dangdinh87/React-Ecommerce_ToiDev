import {
  Box,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

function FilterByService({ onChange, filters }) {
  const serviceList = [
    { value: "isFreeShip", label: "Miễn Phí Vận Chuyển" },
    { value: "isPromotion", label: "Có khuyến mãi" },
  ];
  const useStyles = makeStyles((theme) => ({
    root: {
      borderTop: `8px solid ${theme.palette.background.default} `,
      padding: theme.spacing(2),
    },
    list: {
      listStyleType: "none",
      padding: 0,
      "& > li": {
        margin: 0,
        fontSize: "16px",
      },
    },
  }));

  const classes = useStyles();

  const handleChange = (e) => {
    if (!onChange) return;
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1">DỊCH VỤ</Typography>
      <Box className={classes.range}>
        <ul className={classes.list}>
          {serviceList.map((service) => {
            return (
              <li key={service.value}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Boolean(filters[service.value])}
                      onChange={handleChange}
                      name={service.value}
                      color="primary"
                      fontSize="small"
                    />
                  }
                  label={
                    <Typography variant="body2">{service.label}</Typography>
                  }
                />
              </li>
            );
          })}
        </ul>
      </Box>
    </Box>
  );
}

FilterByService.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
};

export default FilterByService;
