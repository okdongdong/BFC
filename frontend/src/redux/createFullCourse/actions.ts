// import axios from "axios";
import { Dispatch } from "redux";
import { CreateFullCourseDnd } from "./reducer";
import { MOVE_CARD, CREATE_FULL_COURSE } from "./types";

export const moveCard = (newState: CreateFullCourseDnd) => {
  return {
    type: MOVE_CARD,
    payload: newState,
  };
};
