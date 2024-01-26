// ** Store Imports
import { useDispatch, useSelector } from "react-redux";
import {
  handleDetectionClickState,
  resetDetectionState,
  handleDetectionUpdateClickState,
} from "../detection/detectionSlice";

export const useOnDetectionClickState = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((state) => {
    return state.detection;
  });

  const setDetectionUpdateClickState = (obj) => {
    dispatch(handleDetectionUpdateClickState(obj));
  };
  
  const setDetectionClickState = (obj) => {
    dispatch(handleDetectionClickState(obj));
  };

  const resetDetection = () => {
    dispatch(resetDetectionState());
  };

  return {
    detectionState: store?.detectionState,
    setDetectionClickState,
    setDetectionUpdateClickState,
    resetDetection,
  };
};
