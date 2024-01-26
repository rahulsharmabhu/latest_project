import React, { useState, useEffect, useRef } from "react";
import { Actions, Layout, Model } from "flexlayout-react";
import { useOnRibbonClickState } from "../../app-redux/hooks/useOnRibbonClickState";
import { useOnVideoClickState } from "../../app-redux/hooks/useOnVideoClickState";
import { useOnDetectionClickState } from "../../app-redux/hooks/useOnDetectionClickState";
import "flexlayout-react/style/dark.css";
import "../../custom.css";
import { useOnNewTabClickState } from "../../app-redux/hooks/useOnNewTabClickState";
import { selectConfig } from "./utils/select-config";
import { factory } from "./utils/component-factory";
import { dockConfig } from "../utils/dock-config";

function DockManager() {
  const layoutRef = useRef();
  const { ribbonState } = useOnRibbonClickState();
  const { newTabState } = useOnNewTabClickState();
  const { videoState } = useOnVideoClickState();
  const { setDetectionClickState } = useOnDetectionClickState();
  const [adding, setAdding] = useState(false);
  const [model, setModel] = useState(Model.fromJson(dockConfig));

  useEffect(() => {
    const config = selectConfig(ribbonState?.name)
    if (config) {
      setModel(Model.fromJson(config));
    }
  }, [ribbonState]);



  const onAddIndirectClick = (obj) => {
    layoutRef.current.addTabWithDragAndDropIndirect(
      obj.text,
      {
        component: obj.component,
        name: obj.name,
      },
      onAdded
    );
    setAdding(true);
  };

  const onAdded = () => {
    setAdding(false);
  };

  const onAddDragMouseDown = (obj) => {
    layoutRef.current.addTabWithDragAndDrop(
      obj.text,
      {
        component: obj.component,
        icon: obj.icon,
        name: obj.name,
      },
      onAdded
    );

    setAdding(true);
  };

  const onAddActiveClick = (obj) => {
    layoutRef.current.addTabToActiveTabSet({
      id: obj.id,
      component: obj.component,
      // icon: obj.icon,
      name: obj.name,
    });
    setAdding(true);
  };

  const getNodeById = (id) => {
    return model.getNodeById(id);
  };

  const OnAddToTabset = (obj) => {
    layoutRef.current.addTabToTabSet(
      obj.tabsetId,
      {
        id: obj.id,
        component: obj.component,
        name: obj.name
      });
  };

  useEffect(() => {
    if (newTabState && newTabState?.type) {
      const existingNode = getNodeById(newTabState.id);
      if (existingNode) {
        model.doAction(Actions.selectTab(newTabState.id));
      } else {
        switch (newTabState.type) {
          case "indirect":
            onAddIndirectClick(newTabState);
            break;
          case "active":
            onAddActiveClick(newTabState);
            break;
          case "drag":
            onAddDragMouseDown(newTabState);
            break;
          case "addToTabset":
            OnAddToTabset(newTabState);
            break;
          case "node":
            addNewNode();
            break;
        }
      }
    }
  }, [newTabState]);

  const createArrayWithInterval = (duration, interval) => {
    const array = [];
    let currentTime = 0;

    while (currentTime < duration) {
      array.push({
        time: currentTime.toFixed(1),
        angle: null,
        waveFrequency: null,
      });
      currentTime += interval;
    }

    return array;
  };


  useEffect(() => {
    if (videoState) {
      const array = createArrayWithInterval(videoState?.duration, 0.5);
      setDetectionClickState(array);
    }
  }, [videoState?.name]);


  return (
    <>
      <Layout
        ref={layoutRef}
        model={model}
        factory={factory}
      // onModelChange={onModelChange}
      />
    </>
  );
}

export default DockManager;