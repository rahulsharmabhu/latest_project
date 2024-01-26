import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { NavItem, NavLink } from "reactstrap";
import FileUpload from "../../../components/file-upload";
import NavbarSearch from "../../../components/search";
import NavNotification from "../../../components/notification";
import UserDropdown from "../../../components/user-dropdown";
import {
  bodyHasClass,
  switchBodyClass,
} from "../../../components/utils/app.util";
import { useSkin } from "../../../app-redux/hooks/useSkin";

const NavbarUser = () => {
  const { skin, setSkin } = useSkin();

  const changeTheme = (classNames) => {
    const doc = window.document;
    const currentTheme = doc.documentElement.getAttribute("data-bs-theme");

    if (currentTheme === "dark") {
      doc.documentElement.setAttribute("data-bs-theme", "light");
    } else {
      doc.documentElement.setAttribute("data-bs-theme", "dark");
    }
    switchBodyClass(classNames);
    const s = bodyHasClass("theme-dark");
    if (s === false) {
      setSkin("light");
      localStorage.setItem("theme", "light");
    } else {
      setSkin("dark");
      localStorage.setItem("theme", "dark");
    }
    // svg ------------------------
    const iframe = document.getElementById("theme-iframe");
    if (iframe) {
      iframe.setAttribute("class", skin);

      const primaryGroup = iframe.getElementById("primary");
      if (primaryGroup) {
        const primaryPaths = primaryGroup.querySelectorAll("path, tspan, text");
        primaryPaths.forEach((element) => {
          element.removeAttribute("class");
        });
        primaryGroup.setAttribute("class", "primary");
      }

      const otherPaths = iframe.querySelectorAll("path:not(#primary path)");
      otherPaths.forEach((path) => {
        if (
          path.classList.contains("light") ||
          path.classList.contains("dark")
        ) {
          path.classList.remove("dark", "light");
        }
        path.classList.add(skin);
      });
    }
  };

  useEffect(() => {
    const s = bodyHasClass("theme-dark");
    if (s === false) {
      setSkin("light");
      localStorage.setItem("theme", "light");
    } else {
      setSkin("dark");
      localStorage.setItem("theme", "dark");
    }

    const iframe = document.getElementById("theme-iframe");
    if (iframe) {
      iframe.setAttribute("class", skin);

      const primaryGroup = iframe.getElementById("primary");
      if (primaryGroup) {
        const primaryPaths = primaryGroup.querySelectorAll("path, tspan, text");
        primaryPaths.forEach((element) => {
          element.removeAttribute("class");
        });
        primaryGroup.setAttribute("class", "primary");
      }

      const otherPaths = iframe.querySelectorAll("path:not(#primary path)");
      otherPaths.forEach((path) => {
        if (
          path.classList.contains("light") ||
          path.classList.contains("dark")
        ) {
          path.classList.remove("dark", "light");
        }
        path.classList.add(skin);
      });
    }
  }, [skin]);

  return (
    <>
      <NavbarSearch />
      <NavNotification/>
      {/* <NotificationDropdown
        addAlert={addAlert}
        updateAlert={updateAlert}
        dispatch={dispatch}
      /> */}
      <FileUpload skin={skin} />
      <NavItem className="d-none d-lg-block">
        <NavLink className="nav-link-style pe-0">
          <span
            className="w-75 d-flex justify-content-center cursor-pointer"
            onClick={() => changeTheme(["theme-dark", "theme-light"])}
            style={{ paddingTop: "6px" }}
          >
            {skin === "light" ? (
              <span title="Enable dark mode">
                <Icon
                  className="border-0"
                  icon="tabler:moon"
                  width="22"
                  height="22"
                />
              </span>
            ) : (
              <span title="Enable light mode">
                <Icon
                  className="border-0"
                  icon="tabler:sun-high"
                  width="22"
                  height="22"
                />
              </span>
            )}
          </span>
        </NavLink>
      </NavItem>
      <UserDropdown />
    </>
  );
};

export default NavbarUser;
