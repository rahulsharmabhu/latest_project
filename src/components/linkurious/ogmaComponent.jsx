import React, { useEffect, useRef } from 'react';
import Ogma from 'ogma/umd';
import { useState } from 'react';

const OgmaComponent = ({ data, layout, resetChart, toggle, geoEnabled, visible, ...props }) => {
  const ogmaRef = useRef(null);
  const [containerId, setContainerId] = useState(new Date().getTime().toString());
  const ogmaContainerRef = useRef(null);
  useEffect(() => {
    // create the Ogma instance
    ogmaRef.current = new Ogma({
      container: ogmaContainerRef.current,
      options: {
        backgroundColor: 'rgb(240, 240, 240)',
      },
      graph: data,
    });

    ogmaRef.current.layouts.force({ locate: true });
    ogmaRef.current.styles.addNodeRule({
      // text: (node) => node.getData('name'),
      text: {
        content: node => {
          if (node) {
            return node.getData('name');
          }
        },
        minVisibleSize: 0,
      }

    });
    ogmaRef.current.styles.addEdgeRule({
      text: {
        minVisibleSize: 0,
      }
    });

    ogmaRef.current.events.onClick(function (evt) {
      const target = evt.target
      if (target) {
        toggle(target)
      } else {
        toggle(null)
      }
    });

    bindEvents();

    return () => {
      ogmaRef.current.destroy();
    };
  }, [data]);

  const toggleGeo = () =>
    ogmaRef.current.geo.toggle({
      duration: 1500,
      disableNodeDragging: false
    });

  useEffect(() => {
    if (layout !== 'hierarchical') return;

    const options = {
      locate: true,
      roots: [1], // set node with ID = 1 as root of the hierarchy
    };

    ogmaRef.current.layouts[layout](options);
  }, [layout]);

  useEffect(() => {
    if (props.layout !== layout) {
      runLayout();
    }
  }, [props.layout]);

  useEffect(() => {
    const options = {
      locate: true,
    };

    ogmaRef.current.layouts[layout](options);
  }, [resetChart]);

  useEffect(() => {
    if ((geoEnabled && !ogmaRef.current.geo.enabled()) || (!geoEnabled && ogmaRef.current.geo.enabled())) {
      toggleGeo()
    }
  }, [geoEnabled]);

  useEffect(() => {
    ogmaRef.current.view.forceResize();
    runLayout();
  }, [visible]);

  const runLayout = () => {
    const options = { locate: true };

    if (layout === 'hierarchical') {
      options.roots = [1];
    }

    ogmaRef.current.layouts[layout](options);
  };

  const bindEvents = () => {
    Object.keys(props).forEach((prop) => {
      if (/^on/.test(prop) && prop in ogmaRef.current.events) {
        ogmaRef.current.events[prop](props[prop]);
      }
    });
  };

  return <div ref={ogmaContainerRef} style={{ width: '100%', height: '100%' }} ></div>;
};

export default OgmaComponent;