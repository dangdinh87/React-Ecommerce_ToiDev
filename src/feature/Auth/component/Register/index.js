import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { toastError } from "../../../../components/Notification";
import { register } from "../../useSlice";
import RegisterForm from "../RegisterForm";

Register.propTypes = {
  // closeDialog: PropTypes.func,
};

function Register({ handleClose }) {
  const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      values.username = values.email;
      const action = register(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      toast.success("Đăng kí thành công !");
      handleClose();
    } catch (error) {
      toast.error(error.message);
    }

    //   // try {
    //     // auto set username = email
    //     values.username = values.email;

    //     // const action = register(values);
    //     const resultAction = await dispatch(action);
    //     unwrapResult(resultAction);

    //     // close dialog
    //     // const { closeDialog } = props;
    //     // if (closeDialog) {
    //     //   closeDialog();
    //     // }

    //     // enqueueSnackbar('Register successfully!!! 🎉', { variant: 'success' });
    //   // } catch (error) {
    //   //   console.log("Failed to register:", error);
    //     // enqueueSnackbar(error.message, { variant: 'error' });
    //   }
  };

  return (
    <div>
      <RegisterForm handleClose={handleClose} onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
