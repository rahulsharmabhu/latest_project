// ** React Imports
import { useEffect } from "react";

// ** Store Imports
import { handleSkin } from "../theme/themeSlice";
import { useDispatch, useSelector } from "react-redux";

export const useSkin = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((state) => state.theme);

  const setSkin = (type) => {
    dispatch(handleSkin(type));
  };

  useEffect(() => {
    // ** Get Body Tag
    const element = window.document.body;
    // ** Define classnames for skins
    const classNames = {
      dark: "theme-dark",
      light: "theme-light",
      bordered: "bordered-layout",
      "semi-dark": "semi-dark-layout",
    };
    // ** Remove all classes from Body on mount
    element.classList.remove(...element.classList);

    // ** If skin is not light add skin class
    if (store.skin !== "theme-light") {
      element.classList.add(classNames[store.skin]);
    }
  }, [store.skin]);

  return { skin: store.skin, setSkin };
};
