import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ModelTemplate() {
  const dispatch = useDispatch();
  const { isOpen, content, title } = useSelector((state) => state.ModelReducer);

  return (
    <div>
      <Dialog
        open={isOpen}
        fullWidth={true}
        maxWidth={"md"}
        keepMounted
        onClose={() => {
          dispatch({ type: "CLOSE_MODEL" });
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="flex justify-between">
          <div className="m-0">{title}</div>
          <div
            onClick={() => {
              dispatch({ type: "CLOSE_MODEL" });
            }}
            className="m-0 duration-200 cursor-pointer hover:bg-slate-100 rounded-full w-10 flex justify-center items-center h-10"
          >
            <CloseIcon />
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button>Disagree</Button>
          <Button>Agree</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
