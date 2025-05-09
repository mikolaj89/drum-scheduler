"use client";

import { Modal, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { SessionForm } from "./SessionForm/SessionForm";
// import { ExerciseForm } from "./ExerciseForm/ExerciseForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const CreateSession = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button
        sx={{ marginBottom: 2 }}
        type="button"
        variant="contained"
        onClick={() => setIsOpen(true)}
      >
        Create session
      </Button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h1" component="h3">
            Create new session
          </Typography>
          <SessionForm />
        </Box>
      </Modal>
    </>
  );
};
