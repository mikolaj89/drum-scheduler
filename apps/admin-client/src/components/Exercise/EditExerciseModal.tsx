"use client";

import { Modal, Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ExerciseForm } from "./ExerciseForm/ExerciseForm";
import {
  EDITED_EXERCISE_ID_KEY,
  getExerciseFormDataFormat,
  useExerciseQuery,
} from "./ExerciseForm/exercise-form-helper";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchExercise } from "@/utils/exercises-api";
import { EditExerciseForm } from "./ExerciseForm/EditExerciseForm";
import { useForm } from "react-hook-form";

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

type EditExerciseProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const EditExerciseModal = ({ isOpen, setIsOpen }: EditExerciseProps) => {
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box sx={{ ...style, minHeight: 500 }}>
          <Typography id="edit-modal-title" variant="h1" component="h3">
            Edit drum exercise
          </Typography>
          <EditExerciseForm handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};
