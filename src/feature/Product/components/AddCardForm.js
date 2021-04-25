import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { default as React } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../components/InputField";
import QuantityField from "../../../components/QuantityField";

function AddCardForm({ onSubmit }) {
  const useStyles = makeStyles((theme) => ({}));
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required("Please enter quantity !")
      .min(1, "Minimum value is 1")
      .typeError("Please enter number "),
  });
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    if (onSubmit) onSubmit(values);
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Typography>Số Lượng: &nbsp;</Typography>
        <QuantityField name="quantity" form={form} quantity={1} />
        <Box ml={1}>
          <Button type="submit" variant="contained" color="secondary" size="sm">
            Add to cart
          </Button>
        </Box>
      </Grid>
    </form>
  );
}

AddCardForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddCardForm;
