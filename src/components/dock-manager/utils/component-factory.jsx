import React from 'react'
import CompassSvg from '../../../modules/wave-detection/direction-detection/compass-svg';
import VideoPlayer from '../../../modules/wave-detection/video-player';
import VideoInfo from '../../../modules/wave-detection/video-info';
import VideoSection from '../../../modules/wave-detection/video-section';
import DownloadForm from '../../../modules/wave-detection/download-form';
import Cases from '../../../modules/itwo-summit/cases';
import Alerts from '../../../modules/itwo-summit/alert/alerts';
import Notifications from '../../../modules/itwo-summit/alert/notifications';
import CaseDetails from '../../../modules/itwo-summit/case-details';
import Report from '../../../modules/report';
import CollectionResults from '../../../modules/esm/collection-results';
import Collections from '../../../modules/esm/collection';
import CircularGaugeComp from '../../../modules/report/boat-dashboard';
import Logo from '../../logo/Logo';
import LinkuriousChart from '../../linkurious';
import FireAlertPanel from '../../../modules/fire-detection/alert-panel';
import FireMap from '../../../modules/fire-detection/fire-map';
import CameraList from '../../../modules/fire-detection/camera-panel';
import ImagesListModal from '../../../modules/fire-detection/fire-imagelist-modal';
import CameraPanel from '../../../modules/fire-detection/camera-panel/cameraPanel';

export const factory = (node) => {
  const component = node.getComponent();
  if (component === "detections-list") {
    return <h1>Detection list</h1>;
  }
  if (component === "wave") {
    // return <CompassSvg object={videoState || {}} />;
    return <CompassSvg isShow={true} />;
  }
  if (component === "video-player") {
    // return <VideoPlayer object={videoState || {}} />;
    return <VideoPlayer />;
  }
  if (component === "video-info") {
    return <VideoInfo />;
  }
  if (component === "video-list") {
    return (
      <VideoSection />
    );
  }
  if (component === "download-form") {
    return <DownloadForm />;
  }
  if (component === "logo") {
    return <Logo />;
  }

  if (component === "cases") {
    return <Cases />;
  }
  if (component === "alert") {
    return <Alerts />;
  }
  if (component === "notifications") {
    return <Notifications />;
  }
  if (component === "case-details") {
    return <CaseDetails />;
  }
  if (component === "chart") {
    return <LinkuriousChart tabId={node.getId()} chartNode={node} />;
  }
  if (component === "report") {
    return <Report />;
  }
  if (component === "results") {
    return <CollectionResults />;
  }
  if (component === "collection") {
    return <Collections />;
  }
  if (component === "results") {
    return <Results />;
  }
  if (component === "circular-guage") {
    return <CircularGaugeComp />;
  }
  if (component === "fire-alert") {
    return <FireAlertPanel />;
  }
  if (component === 'fire-map') {
    return <FireMap />;
  }
  if (component === 'camera-panel') {
    return <CameraList />;
  }
  if (component === 'camera-details') {
    return <CameraPanel/>;
  }
  if (component === 'image-gallery') {
    return <ImagesListModal />;
  }
};
