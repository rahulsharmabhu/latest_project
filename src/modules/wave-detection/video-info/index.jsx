import React from 'react';
import { formatTime } from '../../../components/utils/app.util';
import { useOnVideoClickState } from '../../../app-redux/hooks/useOnVideoClickState';

const VideoInfo = () => {

  const { videoState } = useOnVideoClickState();


  return (
    <div className='container'>
    <div className='col-12'>
      <div className="player-wrapper">
        <div className="row pt-3">
          <h5>Video Source</h5>
          <div className="col-4">
            <p className='text-secondary'>Name of File:</p>
          </div>
          <div className="col-8">
            <span>{videoState.name}</span>
          </div>
          {/* <div className="col-4">
            <p className='text-secondary'>Type:</p>
          </div>
          <div className="col-8">
            <span>{object.type}</span>
          </div> */}
        </div>
        {/* <div className="row">
          <div className="col-4">
            <p className='text-secondary'>Dimensions:</p>
          </div>
          <div className="col-8">
            <span>{object.dimensions}</span>
          </div>
        </div> */}
        <div className="row">
          <div className="col-4">
            <p className='text-secondary'>Duration:</p>
          </div>
          <div className="col-8">
            {/* <span>{object.duration}</span> */}
            <span>{videoState.duration ? formatTime(videoState.duration) : ""}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <p className='text-secondary'>Bitrate:</p>
          </div>
          <div className="col-8">
            <span>{videoState.bitrate}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <p className='text-secondary'>Modified:</p>
          </div>
          <div className="col-8">
            <span>{videoState.modified}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <p className='text-secondary'>Path:</p>
          </div>
          <div className="col-8">
            <span>{videoState.media}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <p className='text-secondary'>Size:</p>
          </div>
          <div className="col-8">
            <span>{videoState.size}</span>
          </div>
        </div>
      </div>
      {/* <button type="button" className="btn btn-secondary ">Secondary</button> */}
    </div>

    </div>

  );
};

export default VideoInfo;
