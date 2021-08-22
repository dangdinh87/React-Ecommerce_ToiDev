import {
  AppBar,
  Container,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
}));
export default function Footer() {
  const classes = useStyles();
  return (
    <AppBar position="relative" color="primary" className={classes.appBar}>
      <Toolbar>
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="body1" color="inherit">
              © 2020 ToiDev
            </Typography>
          </Toolbar>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
