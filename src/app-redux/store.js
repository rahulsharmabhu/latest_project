import { configureStore } from '@reduxjs/toolkit';
import { reduxBatch } from '@manaflair/redux-batch';
import { loadState } from './localstorage';
import authReducer from './auth/authSlice';
import ribbonReducer from './ribbon/ribbonSlice';
import detectionReducer from './detection/detectionSlice';
import angleReducer from './angle/angleSlice';
import videoReducer from './video/videoSlice';
import caseReducer from './cases/caseSlice';
import themeReducer from './theme/themeSlice'
import commonReducer from './common/commonSlice';
import newTabReducer from './tab/newTabSlice';
import fireReducer from './fire-detection/fireAlertSlice';
import cameraReducer from './fire-detection/fireCameraSlice'
import esmReducer from './esm/esmSlice'

const reducer = {
  auth: authReducer,
  ribbon: ribbonReducer,
  detection: detectionReducer,
  angle: angleReducer,
  video: videoReducer,
  common: commonReducer,
  theme: themeReducer,
  case: caseReducer,
  tab: newTabReducer,
  fire: fireReducer,
  camera: cameraReducer,
  esm: esmReducer
}

const preloadedState = loadState();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // devTools: process.env.NODE_ENV !== 'production',
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  enhancers: [reduxBatch],
});

export default store;

