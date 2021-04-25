import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { default as React } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import QuantityField from "../../../components/QuantityField";
import { setQuantity } from "../cartSlice";

function CartQuantityForm({ onSubmit, id, quantity }) {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required("Please enter quantity !")
      .min(1, "Minimum value is 1")
      .typeError("Please enter number "),
  });
  const form = useForm({
    reValidateMode: "onChange",
    mode: "onTouched",
    defaultValues: {
      quantity: quantity,
    },
    resolver: yupResolver(schema),
  });
  const handleSetQuantity = (newQuantity) => {
    dispatch(setQuantity({ id: id, quantity: newQuantity }));
  };
  const handleSubmit = (values) => {
    if (onSubmit) onSubmit(values);
    values.id = id;
    dispatch(setQuantity(values));
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Grid container direction="row" justify="flex-end">
        <QuantityField
          setQuantity={handleSetQuantity}
          name="quantity"
          form={form}
          quantity={quantity}
        />
      </Grid>
    </form>
  );
}

CartQuantityForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default CartQuantityForm;
