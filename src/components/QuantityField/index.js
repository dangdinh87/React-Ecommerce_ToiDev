import { Box, makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  setQuantity: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  box: {
    justifyContent: "space-around",
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    maxWidth: 200,
    margin: 0,
  },

  button: {
    cursor: "pointer",
    width: theme.spacing(4.5),
    height: theme.spacing(3.5),
    background: theme.palette.background.default,
    border: `0.5px solid ${theme.palette.grey[500]}`,
    color : theme.palette.text.primary,
    fontSize: 16,
    "&:hover": {
      background: theme.palette.action.focus,
    },
  },
  notchedOutline: {
    padding: 0,
  },
  root: {
    flexGrow: 1,
    borderRadius: 0,
  },
  input: {
    padding: 0,
    textAlign: "center",
    width: theme.spacing(5),
    height: theme.spacing(3.5),
    fontSize: 14,
  },
}));

function QuantityField(props) {
  const classes = useStyles();
  const { form, name, disabled, fullWidth, setQuantity } = props;
  const { setValue } = form;
  const setNewQuantity = (name, quantity, value) => {
    const newQuantity = parseInt(value) + quantity;
    if (setQuantity) setQuantity(newQuantity);
    setValue(name, newQuantity);
  };
  const changeHandler = (name, value) => {
    if (setQuantity) setQuantity(parseInt(value));
    setValue(name, parseInt(value <= 0 ? 1 : value));
  };
  return (
    <FormControl variant="outlined" size="small" fullWidth={fullWidth}>
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, onBlur, value, name, ref } }) => {
          return (
            <Box className={classes.box}>
              <button
                type="button"
                onClick={() => setNewQuantity(name, -1, value)}
                className={classes.button}
                disabled={value <= 1}
              >
                -
              </button>
              <OutlinedInput
                margin="dense"
                classes={{
                  root: classes.root,
                  input: classes.input,
                }}
                id={name}
                type="number"
                disabled={disabled}
                value={value <= 0 ? 1 : value >= 100 ? 100 : value}
                onChange={onChange}
                onBlur={(e) => changeHandler(name, e.target.value)}
              />
              <button
                type="button"
                onClick={() => setNewQuantity(name, 1, value)}
                className={classes.button}
                disabled={value >= 100}
              >
                +
              </button>
            </Box>
          );
        }}
      />
    </FormControl>
  );
}

export default QuantityField;
