import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  LinearProgress
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../components/InputField";
import PasswordField from "../../../../components/PasswordField";

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1, 1, 0, 1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    position  :"absolute",
    width : "100%",
    top: theme.spacing(1),
  },
  closeBtn: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));
function LoginForm({ handleClose, onSubmit }) {
  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required("Please enter your email !")
      .email("Please enter your address email !"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(6, "Please enter least 6 characters"),
  });
  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
    console.log(values);
  };
  const classes = useStyles();
  const { isSubmitting } = form.formState;
  return (
    <Container component="main">
      <CssBaseline />
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <IconButton
        aria-label="clear"
        className={classes.closeBtn}
        onClick={handleClose}
      >
        <CloseIcon color="primary" />
      </IconButton>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField name="identifier" label="Gmail" form={form} />
            </Grid>
            <Grid item xs={12}>
              <PasswordField name="password" label="Mật khẩu" form={form} />
            </Grid>
            <Button
              type="submit"
              disabled={isSubmitting}
              fullWidth
              variant="contained"
              size="large"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LoginForm;
