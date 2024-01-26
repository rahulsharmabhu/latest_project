import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react';
import { NavItem, NavLink } from 'reactstrap'
import UserDropdown from '../../components/user-dropdown';
import FileUpload from '../../components/file-upload';
import NavbarSearch from '../../components/search';

const NavbarUser = () => {
  const [skin, setSkin] = useState("dark");

  const ThemeTogglerIcon = () => {
    if (skin === "dark") {
      return (
        <Icon
          className="text-white mt-2"
          icon="octicon:sun-16"
          width="25"
          height="25"
          onClick={() => setSkin("light")}
        />
      );
    } else {
      return (
        <Icon
          className="text-white mt-2"
          icon="solar:moon-bold"
          width="25"
          height="25"
          onClick={() => setSkin("dark")}
        />
      );
    }
  };


  useEffect(() => {
    const iframe = document.getElementById('theme-iframe');
    if (iframe) {
      iframe.setAttribute('class', skin);

      const primaryGroup = iframe.getElementById('primary');
      if (primaryGroup) {
        const primaryPaths = primaryGroup.querySelectorAll('path, tspan, text');
        primaryPaths.forEach((element) => {
          element.removeAttribute('class');
        });
        primaryGroup.setAttribute('class', 'primary');
      }

      const otherPaths = iframe.querySelectorAll('path:not(#primary path)');
      otherPaths.forEach((path) => {
        if (path.classList.contains('light') || path.classList.contains('dark')) {
          path.classList.remove('light', 'dark');
        }
        path.classList.add(skin);
      });
    }
  }, [skin]);




  // useEffect(() => {
  //   // document.body.className = skin;
  //   const iframe = document.getElementById('compass-iframe');
  //   if (iframe) {
  //     iframe.setAttribute('class', skin);
  //   }
  // }, [skin]);

  return (
    <>
      <NavbarSearch />
      {/* <NotificationDropdown
        addAlert={addAlert}
        updateAlert={updateAlert}
        dispatch={dispatch}
      /> */}
      <FileUpload />
      <NavItem className="d-none d-lg-block">
        <NavLink className="nav-link-style" style={{ cursor: "pointer" }}>
          <ThemeTogglerIcon />
        </NavLink>
      </NavItem>
      <UserDropdown />
    </>
  );
};

export default NavbarUser;
