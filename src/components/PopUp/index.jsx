import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PopUp({ title = "add", children }) {
  let buttonText = "";
  let variant = "";
  let color = "primary";
  switch (title) {
    case "add":
      buttonText = (
        <>
          <AddOutlinedIcon />
          <span>&nbsp; Add Account</span>
        </>
      );
      variant = "contained";
      break;
    case "delete":
      buttonText = (
        <>
          <DeleteForeverOutlinedIcon />
          <span>&nbsp; Delete</span>
        </>
      );
      variant = "contained";
      color = "error";
      break;

    default:
      break;
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        size="small"
        color={color}
        onClick={() => {
          handleOpen();
        }}
        variant={variant}
      >
        {buttonText}
      </Button>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
}
