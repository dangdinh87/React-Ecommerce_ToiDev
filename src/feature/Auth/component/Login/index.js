import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastError } from "../../../../components/Notification";
import { login } from "../../useSlice";
import LoginForm from "../LoginForm";

Login.propTypes = {
  // closeDialog: PropTypes.func,
};

function Login({ handleClose }) {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      console.log(values);
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      toast.success("Đăng nhập thành công !");
      handleClose();
    } catch (error) {
      toast.error(error.message);
    }

    //   // try {
    //     // auto set username = email
    //     values.username = values.email;

    //     // const action = login(values);
    //     const resultAction = await dispatch(action);
    //     unwrapResult(resultAction);

    //     // close dialog
    //     // const { closeDialog } = props;
    //     // if (closeDialog) {
    //     //   closeDialog();
    //     // }

    //     // enqueueSnackbar('login successfully!!! 🎉', { variant: 'success' });
    //   // } catch (error) {
    //   //   console.log("Failed to login:", error);
    //     // enqueueSnackbar(error.message, { variant: 'error' });
    //   }
  };

  return (
    <div>
      <LoginForm handleClose={handleClose} onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
