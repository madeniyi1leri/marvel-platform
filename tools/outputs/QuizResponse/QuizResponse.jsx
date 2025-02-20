import React from "react";

import { Fade, Grid } from "@mui/material";

import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import DocumentEditor from "../../components/DocumentEditor/DocumentEditor";

import styles from "./styles";

import { actions as toolActions } from "@/tools/data";

const { undo, redo } = toolActions;

const QuizResponse = () => {
  const { content: markdownContent } = useSelector(
    (state) => state.tools.editorState.currentState
  );

  const dispatch = useDispatch();
  // const { content: markdownContent } = useSelector(
  //   (state) => state.tools.editorState.currentState
  // );

  const handleUndo = () => {
    dispatch(undo());
  };

  const handleRedo = () => {
    dispatch(redo());
  };
  return (
    <Fade in>
      <Grid {...styles.mainGridProps}>
        <Grid {...styles.questionsGridProps}>
          <DocumentEditor markdownContent={markdownContent} />
        </Grid>
      </Grid>
    </Fade>
  );
};

export default QuizResponse;
