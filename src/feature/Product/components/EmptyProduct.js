import { Box } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

export default function EmptyProduct() {
  return (
    <Box m={2} pb={2} alignItems="center" justifyContent="" center>
      <Alert severity="warning">Rất tiêc. Không tìm thấy sản phẩm phù hợp !</Alert>
    </Box>
  );
}
