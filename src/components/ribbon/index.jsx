import { useState } from "react";
import {
  Navbar,
  NavItem,
  Nav,
  Button,
  TabContent,
  TabPane,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
} from "reactstrap";
import { Icon } from "@iconify/react";
import classnames from "classnames";
import { useOnRibbonClickState } from "../../app-redux/hooks/useOnRibbonClickState";
import PdLogo from "../../assets/images/pd_logo.png";
import PdInitialLogo from "../../assets/images/PDInitialLogo.svg";
import NavbarUser from "../../layouts/ribbon-layout/header";
import { useOnCaseSelectState } from "../../app-redux/hooks/useOnCaseSelectState";
import { useSkin } from "../../app-redux/hooks/useSkin";

const CustomRibbon = () => {
  const [active, setActive] = useState("1");
  const [secribactive, setSecribActive] = useState("0");
  const [btnDroprightOp, setBtnDroprightOp] = useState(false);
  const [btnDroprightAi, setBtnDroprightAi] = useState(false);
  const [btnDroprightAiFire, setBtnDroprightAiFire] = useState(false)
  const [btnDroprightOpFire, setBtnDroprightOpFire] = useState(false);
  const { setRibbonClickState } = useOnRibbonClickState();
  const { caseState, setCaseSelectState } = useOnCaseSelectState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const { skin } = useSkin();

  const toggle = (tab) => {
    setActive(tab);
  };

  const addNewNode = (
    event,
    id,
    name,
    component,
    type,
    isCaseTab,
    text,
    icon
  ) => {
    setIsDropdownOpen(!isDropdownOpen)
    event.stopPropagation();
    event.preventDefault();
    const obj = { id, name, component, type, text, icon, isCaseTab };
    setRibbonClickState(obj);
  };

  return (
    <>
      <div className="d-flex ribbon_main_container">
        <div className="logo_container">
          {caseState ? (
            <div className="selected_case">
              <div className="mt-2 mb-2">
                <img
                  // className="mt-2"
                  src={PdInitialLogo}
                  alt="Point Duty"
                  height={50}
                  // width={150}
                />
              </div>
              <div className="d-flex align-items-center mt-3 px-2">
                <p>{caseState.caseId}</p>
              </div>
            </div>
          ) : (
            <img
              className="mt-2 mr-2"
              src={PdLogo}
              alt="Point Duty"
              height={60}
              width={150}
            />
          )}
        </div>

        <div className="navbar_container">
          <Navbar
            expand="lg"
            className={classnames(
              "header-navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center navbar navbar-expand-lg navbar-custom"
            )}
            // id='theme-iframe'
          >
            <div className="bookmark-wrapper d-flex align-items-center p-0">
              <Nav>
                <NavItem>
                  <Button
                    id="UnControlledExample"
                    className={classnames("btn-icon border-0 shadow-none")}
                    color={`${
                      active === "1" ? "nav_head_botton" : "flat-dark"
                    } `}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    {/* <Icon icon="lucide:home" width="26" height="26" />*/}
                    {/* <img style={{ color: 'darkgrey' }} src={HomeIcon} width={24} height={24} alt="Home" /> */}
                    <p
                      className={`mb-0 mt-0 ${
                        skin === "light" && active === "1"
                          ? "icon-name"
                          : active === "1"
                          ? "selected"
                          : "deselected"
                      }`}
                      data-tab="1"
                    >
                      Home
                    </p>

                    {/* <UncontrolledTooltip placement='top' target="UnControlledExample">
                                      Home
                                  </UncontrolledTooltip> */}
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    id="connect-tooltip"
                    className="btn-icon border-0 shadow-none"
                    color={`${
                      active === "2" ? "nav_head_botton" : "flat-dark"
                    } `}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    {/* <Icon icon="grommet-icons:connect" width="26" height="26" />
                  {/* <img src={ConnectIcon} alt="Connect" /> */}
                    <p
                      className={`mb-0 mt-0 ${
                        skin === "light" && active === "2"
                          ? "icon-name"
                          : active === "2"
                          ? "selected"
                          : "deselected"
                      }`}
                      data-tab="2"
                    >
                      Connect
                    </p>
                    {/* <UncontrolledTooltip placement='top' target='connect-tooltip'>
                                      Connect
                                  </UncontrolledTooltip> */}
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    id="collect-tooltip"
                    className="btn-icon border-0 shadow-none"
                    color={`${
                      active === "3" ? "nav_head_botton" : "flat-dark"
                    } `}
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    {/* <Icon
                    icon="material-symbols:hub-outline"
                    width="26"
                    height="26"
                  />
                  {/* <img src={CollectIcon} alt="Collect"/> */}
                    {/* <p className={` mb-0 mt-0 ${active === '3' ? "text-white" : " "}`}>Collect</p> */}
                    <p
                      className={`mb-0 mt-0 ${
                        skin === "light" && active === "3"
                          ? "icon-name"
                          : active === "3"
                          ? "selected"
                          : "deselected"
                      }`}
                      data-tab="3"
                    >
                      Collect
                    </p>

                    {/* <UncontrolledTooltip placement='top' target='collect-tooltip'>
                                      Collect
                                  </UncontrolledTooltip> */}
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    id="enrich-tooltip"
                    className="btn-icon border-0 shadow-none"
                    color={`${
                      active === "4" ? "nav_head_botton" : "flat-dark"
                    } `}
                    onClick={() => {
                      toggle("4");
                    }}
                  >
                    {/* <Icon icon="tabler:settings-cog" width="26" height="26" />
                  {/* <img src={EnrichIcon} alt="Enrich" /> */}
                    <p
                      className={`mb-0 mt-0 ${
                        skin === "light" && active === "4"
                          ? "icon-name"
                          : active === "4"
                          ? "selected"
                          : "deselected"
                      }`}
                      data-tab="4"
                    >
                      Enrich
                    </p>
                    {/* <UncontrolledTooltip placement="top" target="enrich-tooltip">
                    Enrich
                  </UncontrolledTooltip> */}
                  </Button>
                </NavItem>

                {/* Adding the dropdown for the navbar */}

                {/* <UncontrolledDropdown nav inNavbar>
                            <Button id="enrich-tooltip" className='btn-icon border-0 shadow-none' color={`${active === '8' ? "nav_head_botton" : "flat-dark"} `}>
                              <DropdownToggle className='text-white pb-0 pt-0' nav caret>
                                <Icon icon="iconoir:triangle" width="24" height="24" />
                              </DropdownToggle>
                              <p className=' mb-0 mt-0'>Enrich</p>
                              </Button>
                              <DropdownMenu>
                                <DropdownItem>
                                    AI
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    AI Training
                                </DropdownItem>
                                <DropdownItem onClick={() => {toggle('8')}}>
                                    Wave Detection
                                </DropdownItem>
                              </DropdownMenu>
                              <UncontrolledTooltip placement='top' target='enrich-tooltip'>
                                Enrich
                              </UncontrolledTooltip>
                          </UncontrolledDropdown> */}

                {/* Adding the dropdown for the navbar */}

                <NavItem>
                  <Button
                    id="visualise-tooltip"
                    className="btn-icon border-0 shadow-none"
                    color={`${
                      active === "5" ? "nav_head_botton" : "flat-dark"
                    } `}
                    onClick={() => {
                      toggle("5");
                    }}
                  >
                    {/* <Icon icon="ic:outline-visibility" width="26" height="26" />
                  {/* <img src={VisualiseIcon} alt="Visualise" /> */}
                    <p
                      className={`mb-0 mt-0 ${
                        skin === "light" && active === "5"
                          ? "icon-name"
                          : active === "5"
                          ? "selected"
                          : "deselected"
                      }`}
                      data-tab="5"
                    >
                      Visualise
                    </p>
                    {/* <UncontrolledTooltip placement='top' target='visualise-tooltip'>
                                      Visualise
                                  </UncontrolledTooltip> */}
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    id="analyse-tooltip"
                    className="btn-icon border-0 shadow-none"
                    color={`${
                      active === "6" ? "nav_head_botton" : "flat-dark"
                    } `}
                    onClick={() => {
                      toggle("6");
                    }}
                  >
                    {/* <Icon icon="ion:bulb-outline" width="26" height="26" />
                  {/* <img src={AnalyzeIcon} alt="Analyse" /> */}
                    <p
                      className={`mb-0 mt-0 ${
                        skin === "light" && active === "6"
                          ? "icon-name"
                          : active === "6"
                          ? "selected"
                          : "deselected"
                      }`}
                      data-tab="6"
                    >
                      Analyse
                    </p>
                    {/* <UncontrolledTooltip placement='top' target='analyse-tooltip'>
                                      Analyse
                                  </UncontrolledTooltip> */}
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    // id="report-tooltip"
                    className="btn-icon border-0 shadow-none bg-opacity-50"
                    color={`${
                      active === "7" ? "nav_head_botton" : "flat-dark"
                    } `}
                    onClick={() => {
                      toggle("7");
                    }}
                  >
                    {/* <Icon icon="akar-icons:file" width="26" height="26" />
                  {/* <img src={ReportIcon} alt="Report" /> */}
                    <p
                      className={`mb-0 mt-0 ${
                        skin === "light" && active === "7"
                          ? "icon-name"
                          : active === "7"
                          ? "selected"
                          : "deselected"
                      }`}
                      data-tab="7"
                    >
                      Report
                    </p>
                    {/* <UncontrolledTooltip placement='top' target='report-tooltip'>
                                      Report
                                  </UncontrolledTooltip> */}
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    // id="report-tooltip"
                    className="btn-icon border-0 shadow-none bg-opacity-50"
                    color={`${
                      active === "8" ? "nav_head_botton" : "flat-dark"
                    } `}
                    onClick={() => {
                      toggle("8");
                    }}
                  >
                    {/* <Icon icon="akar-icons:file" width="26" height="26" />
                {/* <img src={ReportIcon} alt="Report" /> */}
                    <p
                      className={`mb-0 mt-0 ${
                        skin === "light" && active === "8"
                          ? "icon-name"
                          : active === "8"
                          ? "selected"
                          : "deselected"
                      }`}
                      data-tab="8"
                    >
                      All
                    </p>
                    {/* <UncontrolledTooltip placement='top' target='report-tooltip'>
                                    Report
                </UncontrolledTooltip> */}
                  </Button>
                </NavItem>
              </Nav>
            </div>
          </Navbar>

          <TabContent className="py-50 tab-custom" activeTab={active}>
            <TabPane tabId="1">
              <Nav className="nav">
                <NavItem
                  onClick={(e) =>
                    addNewNode(
                      e,
                      "va-enrich-panel",
                      "Cases",
                      "cases",
                      "active",
                      false
                    )
                  }
                >
                  <Card
                    id="cases-tooltip"
                    className={classnames(
                      "icon-card cursor-pointer text-center mb-0 th-tab-item-width bg-transparent "
                    )}
                  >
                    <CardBody
                      onClick={() => setSecribActive("1")}
                      color="primary"
                      className={`px-50 ${
                        secribactive === "1"
                          ? "secondary_ribbon_active"
                          : "secondary_ribbon_inactive"
                      }`}
                    >
                      {/*  <div className="icon-wrapper">
                         <Icon icon="lucide:file-text" width="24" height="24" /> 
                         <UncontrolledTooltip
                          placement="top"
                          target="cases-tooltip"
                        >
                          Cases
                        </UncontrolledTooltip> 
                      </div> */}
                      <p
                        className={`text-truncate mb-0 mt-0 ${
                          secribactive === "1"
                            ? "secondary_ribbon_active"
                            : "secondary_ribbon_inactive"
                        }`}
                      >
                        Cases
                      </p>
                    </CardBody>
                  </Card>
                </NavItem>
                <div className="vr"></div>
                {/*  <NavItem
                              onClick={(e) => addNewNode(e, "active-panel", "Active", "wave", "active")}
                          >
                              <Card
                                  id="active-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0  th-tab-item-width bg-transparent  ')}
                              >
                                  <CardBody className='mb-0 px-50 py-1'>
                                      <div className='icon-wrapper'>
                                          <Icon icon="ri:archive-line" width="24" height="24" />
                                          <UncontrolledTooltip placement='top' target='active-tooltip'>
                                              Active
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Active</p>
                                  </CardBody>
                              </Card>
                          </NavItem>
                          <NavItem
                              onMouseDown={(e) => addNewNode(e, "drag-panel", "Drag", "detection-list", "drag", undefined)}
                          >
                              <Card
                                  id="drag-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0  th-tab-item-width bg-transparent  ')}
                              >
                                  <CardBody className='mb-0 px-50 py-1'>
                                      <div className='icon-wrapper'>
                                          <Icon icon="uil:arrow-circle-up" width="24" height="24" />
                                          <UncontrolledTooltip placement='top' target='drag-tooltip'>
                                              Drag
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Drag</p>
                                  </CardBody>
                              </Card>
                          </NavItem>
                          <NavItem
                              onClick={(e) => addNewNode(e, "tools-connect-panel", "Active", "video-player", "active")}
                          >
                              <Card
                                  id="tools-connect-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0  th-tab-item-width bg-transparent  ')}
                              >
                                  <CardBody className='mb-0 px-50 py-1 fc-button-primary'>
                                      <div className='icon-wrapper'>
                                          <Icon icon="uiw:setting-o" width="24" height="24" />
                                          <UncontrolledTooltip placement='top' target='tools-connect-tooltip'>
                                              Tools
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Help</p>
                                  </CardBody>
                              </Card>
                          </NavItem> */}
              </Nav>
            </TabPane>
            <TabPane tabId="2">
              <Nav className="nav">
                <NavItem
                  onClick={(e) =>
                    addNewNode(
                      e,
                      "active-panel",
                      "Active",
                      "video-player-c",
                      "active"
                    )
                  }
                >
                  <Card
                    id="tools-connect-tooltip"
                    className={classnames(
                      "icon-card cursor-pointer text-center mb-0  th-tab-item-width bg-transparent  "
                    )}
                  >
                    <CardBody
                      onClick={() => setSecribActive("2")}
                      className={`px-50 ${
                        secribactive === "2"
                          ? "secondary_ribbon_active"
                          : "secondary_ribbon_inactive"
                      }`}
                    >
                      <div className="icon-wrapper">
                        {/* <Icon icon="uiw:setting-o" width="24" height="24" /> */}
                        {/* <UncontrolledTooltip
                          placement="top"
                          target="tools-connect-tooltip"
                        >
                          Connections
                        </UncontrolledTooltip> */}
                      </div>
                      <p
                        className={`text-truncate mb-0 mt-0 ${
                          secribactive === "2"
                            ? "secondary_ribbon_active"
                            : "secondary_ribbon_inactive"
                        }`}
                      >
                        Connections
                      </p>
                    </CardBody>
                  </Card>
                </NavItem>

                <NavItem
                  onClick={(e) =>
                    addNewNode(e, "nifi-connect-panel", "NiFi", "", "nifi")
                  }
                  onMouseDown={(e) =>
                    addNewNode(e, "nifi-connect-panel", "NiFi", "", "nifi")
                  }
                  onTouchStart={(e) =>
                    addNewNode(e, "nifi-connect-panel", "NiFi", "", "nifi")
                  }
                >
                  <Card
                    id="nifi-connect-tooltip"
                    className={classnames(
                      "icon-card cursor-pointer text-center mb-0  th-tab-item-width bg-transparent"
                    )}
                  >
                    <CardBody
                      onClick={() => setSecribActive("3")}
                      className={`px-50 ${
                        secribactive === "3"
                          ? "secondary_ribbon_active"
                          : "secondary_ribbon_inactive"
                      }`}
                    >
                      {/*  <div className="icon-wrapper">
                        <Icon icon="clarity:sun-line" width="24" height="24" /> 
                       <UncontrolledTooltip
                          placement="top"
                          target="nifi-connect-tooltip"
                        >
                          NiFi
                        </UncontrolledTooltip> 
                      </div> */}
                      <p
                        className={`text-truncate mb-0 mt-0 ${
                          secribactive === "3"
                            ? "secondary_ribbon_active"
                            : "secondary_ribbon_inactive"
                        }`}
                      >
                        NiFi
                      </p>
                    </CardBody>
                  </Card>
                </NavItem>

                {/* <NavItem
                              onClick={(e) => addNewNode("book", "grid", "tab")}
                              onMouseDown={(e) => addNewNode("book", "grid", "tab")}
                              onTouchStart={(e) => addNewNode("book", "grid", "tab")}

                          >
                              <Card
                                  id="book-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0 ')}
                              >
                                  <CardBody className='mb-0 p-2 py-1'>
                                      <div className='icon-wrapper'>
                                          <Book />
                                          <UncontrolledTooltip placement='top' target='book-tooltip'>
                                              Book
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Test</p>
                                  </CardBody>
                              </Card>
                          </NavItem>
                          <NavItem
                              onClick={(e) => addNewNode("fileplus", "grid", "tab")}
                              onMouseDown={(e) => addNewNode("fileplus", "grid", "tab")}
                              onTouchStart={(e) => addNewNode("fileplus", "grid", "tab")}
                          >
                              <Card
                                  id="fileplus-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0 ')}
                              >
                                  <CardBody className='mb-0 p-2 py-1'>
                                      <div className='icon-wrapper'>
                                          <FilePlus />
                                          <UncontrolledTooltip placement='top' target='fileplus-tooltip'>
                                              FilePlus
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Test</p>
                                  </CardBody>
                              </Card>
                          </NavItem>
                          <NavItem
                              onClick={(e) => addNewNode("folderplus", "grid", "tab")}
                              onMouseDown={(e) => addNewNode("folderplus", "grid", "tab")}
                              onTouchStart={(e) => addNewNode("folderplus", "grid", "tab")}
                          >
                              <Card
                                  id="folderplus-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0 ')}
                              >
                                  <CardBody className='mb-0 p-2 py-1'>
                                      <div className='icon-wrapper'>
                                          <FolderPlus />
                                          <UncontrolledTooltip placement='top' target='folderplus-tooltip'>
                                              FilePlus
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0'>Test</p>
                                  </CardBody>
                              </Card>
                          </NavItem> */}
              </Nav>
            </TabPane>
            <TabPane tabId="3">
              <Nav className="nav">
                {/* <NavItem
                              onClick={(e) => addNewNode(e, "tools-collect-panel", "Tools", "grid", "active")}
                              onMouseDown={(e) => addNewNode(e, "tools-collect-panel", "Tools", "grid", "active")}
                              onTouchStart={(e) => addNewNode(e, "tools-collect-panel", "Tools", "grid", "active")}
                          >
                              <Card
                                  id="tools-collect-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0  th-tab-item-width bg-transparent  ')}
                              >
                                  <CardBody className='mb-0 px-50 py-1'>
                                      <div className='icon-wrapper'>
                                          <Icon icon="uiw:setting-o" width="24" height="24" />
                                          <UncontrolledTooltip placement='top' target='tools-collect-tooltip'>
                                              Tools
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Tools</p>
                                  </CardBody>
                              </Card>
                          </NavItem> */}
                <NavItem
                  onClick={(e) =>
                    addNewNode(
                      e,
                      "esm-collect-panel",
                      "Enterprise Social Media",
                      "esm",
                      "active",
                      false
                    )
                  }
                >
                  <Card
                    id="esm-collect-tooltip"
                    className={classnames(
                      "icon-card cursor-pointer text-center mb-0  th-tab-item-width bg-transparent"
                    )}
                  >
                    <CardBody
                      onClick={() => setSecribActive("4")}
                      className={`px-50 ${
                        secribactive === "4"
                          ? "secondary_ribbon_active"
                          : "secondary_ribbon_inactive"
                      }`}
                    >
                      {/* <div className="icon-wrapper">
                         <Icon icon="clarity:sun-line" width="24" height="24" />
                       <UncontrolledTooltip
                          placement="top"
                          target="esm-collect-tooltip"
                        >
                          Enterprise Social Media
                    </UncontrolledTooltip> 
                      </div> */}
                      <p
                        className={`text-truncate mb-0 mt-0 ${
                          secribactive === "4"
                            ? "secondary_ribbon_active"
                            : "secondary_ribbon_inactive"
                        }`}
                      >
                        ESM
                      </p>
                    </CardBody>
                  </Card>
                </NavItem>
              </Nav>
            </TabPane>
            <TabPane tabId="4">
              <Nav className="nav enrich_submenus convention_14">
                <NavItem className="">
                  <Card
                    id="indirect-tooltip"
                    className={classnames(
                      "icon-card cursor-pointer text-center mb-0 bg-transparent"
                    )}
                  >
                    <CardBody
                      className={`px-50 ${
                        secribactive === "5"
                          ? "secondary_ribbon_active"
                          : "secondary_ribbon_inactive"
                      }`}
                    >
                      <div className="icon-wrapper">
                        {/* <Icon icon="uiw:setting-o" width="17" height="17" />  */}
                      </div>
                      <p
                        className={`text-truncate mb-0 mt-0 ${
                          secribactive === "5"
                            ? "secondary_ribbon_active"
                            : "secondary_ribbon_inactive"
                        }`}
                        style={{
                          fontSize: "13px",
                          margin: "auto",
                          cursor: "disabled",
                        }}
                      >
                        Video Analytics
                      </p>
                      <UncontrolledDropdown isOpen={isDropdownOpen} toggle={() => setIsDropdownOpen(!isDropdownOpen)} nav inNavbar>
                        <Button
                          id="enrich-tooltip"
                          className="btn-icon border-0 shadow-none"
                          color={`${
                            active === "8" ? "nav_head_botton" : "flat-dark"
                          } `}
                        >
                          <div className="icon-wrapper">
                            <DropdownToggle
                              style={{ fontSize: "14px", margin: "auto" }}
                              className={`px-50 ${
                                secribactive === "5"
                                  ? "secondary_ribbon_active"
                                  : "secondary_ribbon_inactive pb-0 pt-0"
                              }`}
                              nav
                              caret
                            >
                              AI
                            </DropdownToggle>
                          </div>
                        </Button>
                        <DropdownMenu className="video_analytics_dropdown">
                          <DropdownItem>Wave</DropdownItem>
                          <DropdownItem divider />

                          <div className="head_submenu_panel">
                            <Dropdown
                              direction="right"
                              isOpen={btnDroprightOp}
                              toggle={() => {
                                setBtnDroprightOp(!btnDroprightOp);
                              }}
                            >
                              <DropdownItem>
                                Operational
                                <span className="right_icon">
                                  <Icon icon="ic:round-arrow-right" />
                                </span>
                                <DropdownMenu>
                                  <DropdownItem>
                                    Wave Operational Interface
                                  </DropdownItem>
                                </DropdownMenu>
                              </DropdownItem>
                            </Dropdown>

                            <Dropdown
                              direction="right"
                              isOpen={btnDroprightAi}
                              toggle={() => {
                                setBtnDroprightAi(!btnDroprightAi);
                              }}
                            >
                              <DropdownItem>
                                AI Training
                                <span className="right_icon">
                                  <Icon icon="ic:round-arrow-right" />
                                </span>
                                <DropdownMenu
                                  onClick={() => setSecribActive("5")}
                                >
                                  <DropdownItem
                                    onClick={(e) =>
                                      addNewNode(
                                        e,
                                        "va-enrich-panel",
                                        "Wave Detection",
                                        "grid",
                                        "active",
                                        false
                                      )
                                    }
                                  >
                                    Wave Training Interface
                                  </DropdownItem>
                                </DropdownMenu>
                              </DropdownItem>
                            </Dropdown>
                          </div>
                           
                          <DropdownItem divider />
                          
                          <DropdownItem>Fire Detection</DropdownItem>
                          <DropdownItem divider />
                          <div className="head_submenu_panel">
                            <Dropdown
                              direction="right"
                              isOpen={btnDroprightOpFire}
                              toggle={() => {
                                setBtnDroprightOpFire(!btnDroprightOpFire);
                              }}
                            >
                              <DropdownItem>
                                Operational
                                <span className="right_icon">
                                  <Icon icon="ic:round-arrow-right" />
                                </span>
                                <DropdownMenu>
                                  <DropdownItem onClick={(e) =>
                                    addNewNode(
                                      e,
                                      "va-enrich-panel",
                                      "Fire Detection",
                                      "grid",
                                      "active",
                                      false
                                    )
                                  }>
                                    Fire Operational Interface
                                  </DropdownItem>
                                </DropdownMenu>
                              </DropdownItem>
                            </Dropdown>
                            <Dropdown
                              direction="right"
                              isOpen={btnDroprightAiFire}
                              toggle={() => {
                                setBtnDroprightAiFire(!btnDroprightAiFire);
                              }}
                            >
                              <DropdownItem>
                                AI Training
                                <span className="right_icon">
                                  <Icon icon="ic:round-arrow-right" />
                                </span>
                                <DropdownMenu
                                  onClick={() => setSecribActive("6")}
                                >
                                  <DropdownItem>
                                    Fire Training Interface
                                  </DropdownItem>
                                </DropdownMenu>
                              </DropdownItem>
                            </Dropdown>
                          </div>


                          <DropdownItem divider />
                          <DropdownItem className="convention_14">
                            ANPR
                          </DropdownItem>
                          <DropdownItem divider />
                          <div className="head_submenu_panel_anpr">
                            <DropdownItem>Operational</DropdownItem>
                            <DropdownItem>AI Training</DropdownItem>
                          </div>
                        </DropdownMenu>

                        {/* <UncontrolledTooltip placement='top' target='enrich-tooltip'>
                       Video Analytics
                      </UncontrolledTooltip> */}
                      </UncontrolledDropdown>
                    </CardBody>
                  </Card>
                </NavItem>
                <NavItem>
                  <Card
                    id="nlp-enrich-tooltip"
                    className={classnames(
                      "icon-card cursor-pointer text-center mb-0 bg-transparent"
                    )}
                  >
                    <CardBody
                      className={`px-50 ${
                        secribactive === "6"
                          ? "secondary_ribbon_active"
                          : "secondary_ribbon_inactive"
                      }`}
                    >
                      <div className="icon-wrapper">
                        {/* <Icon icon="uiw:setting-o" width="17" height="17" />  */}
                      </div>
                      <p
                        className={`text-truncate mb-0 mt-0 ${
                          secribactive === "6"
                            ? "secondary_ribbon_active"
                            : "secondary_ribbon_inactive"
                        }`}
                        style={{ fontSize: "13px", margin: "auto" }}
                      >
                        Entity Extract
                      </p>
                      <UncontrolledDropdown nav inNavbar>
                        <Button
                          id="enrich-tooltip"
                          className="btn-icon border-0 shadow-none"
                          color={`${
                            active === "8" ? "nav_head_botton" : "flat-dark"
                          } `}
                        >
                          <div className="icon-wrapper">
                            <DropdownToggle
                              style={{ fontSize: "14px", margin: "auto" }}
                              className={`px-50 ${
                                secribactive === "6"
                                  ? "secondary_ribbon_active"
                                  : "secondary_ribbon_inactive pb-0 pt-0"
                              }`}
                              nav
                              caret
                            >
                              NLP
                            </DropdownToggle>
                          </div>
                        </Button>
                        <DropdownMenu className="entity_extract_dropdown" onClick={() => setSecribActive("6")}>
                          <DropdownItem>AI</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem
                            onClick={(e) =>
                              addNewNode(
                                e,
                                "nlp-enrich-panel",
                                "Natural Language Processing",
                                "grid",
                                "active",
                                false
                              )
                            }
                            onTouchStart={(e) =>
                              addNewNode(
                                e,
                                "nlp-enrich-panel",
                                "Natural Language Processing",
                                "grid",
                                "active"
                              )
                            }
                          >
                            AI Training
                          </DropdownItem>
                        </DropdownMenu>

                        {/* <UncontrolledTooltip placement='top' target='enrich-tooltip'>
                    Natural Language Processing
                  </UncontrolledTooltip> */}
                      </UncontrolledDropdown>
                    </CardBody>
                  </Card>
                </NavItem>

                {/* 
              <NavItem
                onClick={(e) =>
                  addNewNode(
                    e,
                    "identity-enrich-panel",
                    "Identity Resolution",
                    "grid",
                    "active",
                    false
                  )
                }
                onTouchStart={(e) =>
                  addNewNode(
                    e,
                    "identity-enrich-panel",
                    "Identity Resolution",
                    "grid",
                    "active"
                  )
                }
              >
                <Card
                  id="identity-enrich-tooltip"
                  className={classnames(
                    "icon-card cursor-pointer text-center mb-0  th-tab-item-width bg-transparent  "
                  )}
                >
                  <CardBody className="mb-0 px-50 py-1">
                    <div className="icon-wrapper">
                      <Icon icon="lucide:cloud-drizzle" width="24" height="24" />
                      <UncontrolledTooltip
                        placement="top"
                        target="identity-enrich-tooltip"
                      >
                        Identity Resolution
                      </UncontrolledTooltip>
                    </div>
                    <p className=" text-truncate mb-0 mt-0">Identity</p>
                  </CardBody>
                </Card>
              </NavItem>
              <NavItem
                onClick={(e) =>
                  addNewNode(
                    e,
                    "va-enrich-panel",
                    "Video Analytics",
                    "grid",
                    "active",
                    false
                  )
                }
                onTouchStart={(e) =>
                  addNewNode(
                    e,
                    "va-enrich-panel",
                    "Video Analytics",
                    "grid",
                    "active"
                  )
                }
              >
                <Card
                  id="va-enrich-tooltip"
                  className={classnames(
                    "icon-card cursor-pointer text-center mb-0  th-tab-item-width bg-transparent  "
                  )}
                >
                  <CardBody className="mb-0 px-50 py-1">
                    <div className="icon-wrapper">
                      <Icon icon="lucide:video" width="24" height="24" />
                      <UncontrolledTooltip
                        placement="top"
                        target="va-enrich-tooltip"
                      >
                        Video Analytics
                      </UncontrolledTooltip>
                    </div>
                    <p className=" text-truncate mb-0 mt-0">VA</p>
                  </CardBody>
                </Card>
              </NavItem>
              */}
                {/* <NavItem
                              onClick={(e) => addNewNode("filep", "grid", "tab")}
                              onMouseDown={(e) => addNewNode("filep", "grid", "tab")}
                              onTouchStart={(e) => addNewNode("filep", "grid", "tab")}
                          >
                              <Card
                                  id="filep-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0 ')}
                              >
                                  <CardBody className='mb-0 p-2 py-1'>
                                      <div className='icon-wrapper'>
                                          <FilePlus />
                                          <UncontrolledTooltip placement='top' target='filep-tooltip'>
                                              FilePlus
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Test</p>
                                  </CardBody>
                              </Card>
                          </NavItem> */}
              </Nav>
            </TabPane>
            <TabPane tabId="5">
              <Nav className="nav">
                {/* <NavItem
                              onClick={(e) => addNewNode(e, "tools-visualise-panel", "Tools", "grid", "active")}
                              onMouseDown={(e) => addNewNode(e, "tools-visualise-panel", "Tools", "grid", "active")}
                              onTouchStart={(e) => addNewNode(e, "tools-visualise-panel", "Tools", "grid", "active")}
                          >
                              <Card
                                  id="tools-visualise-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0  th-tab-item-width bg-transparent  ')}
                              >
                                  <CardBody className='mb-0 px-50 py-1'>
                                      <div className='icon-wrapper'>
                                          <Icon icon="uiw:setting-o" width="24" height="24" />
                                          <UncontrolledTooltip placement='top' target='tools-visualise-tooltip'>
                                              Tools
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Tools</p>
                                  </CardBody>
                              </Card>
                          </NavItem> */}
                {/* <NavItem
                              onClick={(e) => addNewNode("i2-nootbook", "grid", "tab")}
                              onMouseDown={(e) => addNewNode("i2-nootbook", "grid", "tab")}
                              onTouchStart={(e) => addNewNode("i2-nootbook", "grid", "tab")}
                          >
                              <Card
                                  id="nootbook-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0 ')}
                              >
                                  <CardBody className='mb-0 p-2 py-1'>
                                      <div className='icon-wrapper'>
                                          <Sun />
                                          <UncontrolledTooltip placement='top' target='nootbook-tooltip'>
                                              I2 Nootbook
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>I2 Nootbook</p>
                                  </CardBody>
                              </Card>
                          </NavItem> */}
                <NavItem
                  onClick={(e) =>
                    addNewNode(
                      e,
                      "va-enrich-panel",
                      "Chart",
                      "chart",
                      "active",
                      false
                    )
                  }
                >
                  <Card
                    id="map-visualise-tooltip"
                    className={classnames(
                      "icon-card cursor-pointer text-center mb-0 th-tab-item-width bg-transparent"
                    )}
                  >
                    <CardBody
                      onClick={() => setSecribActive("7")}
                      className={`px-50 ${
                        secribactive === "7"
                          ? "secondary_ribbon_active"
                          : "secondary_ribbon_inactive"
                      }`}
                    >
                      {/* <div className="icon-wrapper">
                         <Icon icon="ph:graph" width="24" height="24" />
                         <UncontrolledTooltip
                          placement="top"
                          target="map-visualise-tooltip"
                        >
                          Chart
                        </UncontrolledTooltip> 
                      </div> */}
                      <p
                        className={`text-truncate mb-0 mt-0 ${
                          secribactive === "7"
                            ? "secondary_ribbon_active"
                            : "secondary_ribbon_inactive"
                        }`}
                      >
                        Chart
                      </p>
                    </CardBody>
                  </Card>
                </NavItem>
                {/* <NavItem
                              onClick={(e) => addNewNode("sett", "grid", "tab")}
                              onMouseDown={(e) => addNewNode("sett", "grid", "tab")}
                              onTouchStart={(e) => addNewNode("sett", "grid", "tab")}
                          >
                              <Card
                                  id="sett-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0 ')}
                              >
                                  <CardBody className='mb-0 p-2 py-1'>
                                      <div className='icon-wrapper'>
                                          <Settings />
                                          <UncontrolledTooltip placement='top' target='sett-tooltip'>
                                              Setting
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Setting</p>
                                  </CardBody>
                              </Card>
                          </NavItem> */}
                {/* <NavItem
                              onClick={(e) => addNewNode("analyz", "grid", "tab")}
                              onMouseDown={(e) => addNewNode("analyz", "grid", "tab")}
                              onTouchStart={(e) => addNewNode("analyz", "grid", "tab")}
                          >
                              <Card
                                  id="analyz-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0 ')}
                              >
                                  <CardBody className='mb-0 p-2 py-1'>
                                      <div className='icon-wrapper'>
                                          <Sun />
                                          <UncontrolledTooltip placement='top' target='analyz-tooltip'>
                                              Analyze
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Analyze</p>
                                  </CardBody>
                              </Card>
                          </NavItem> */}
                {/* <NavItem
                              onClick={(e) => addNewNode("analyze", "grid", "tab")}
                              onMouseDown={(e) => addNewNode("analyze", "grid", "tab")}
                              onTouchStart={(e) => addNewNode("analyze", "grid", "tab")}
                          >
                              <Card
                                  id="analyze-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0 ')}
                              >
                                  <CardBody className='mb-0 p-2 py-1'>
                                      <div className='icon-wrapper'>
                                          <Sun />
                                          <UncontrolledTooltip placement='top' target='analyze-tooltip'>
                                              Analyze
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Analyze</p>
                                  </CardBody>
                              </Card>
                          </NavItem> */}
              </Nav>
            </TabPane>
            <TabPane tabId="6">
              <Nav className="nav">
                <NavItem
                  onClick={(e) =>
                    addNewNode(
                      e,
                      "anb-analyse-panel",
                      "i2 Analyst's Notebook",
                      "grid",
                      "active",
                      false
                    )
                  }
                  // onMouseDown={(e) => addNewNode(e, "anb-analyse-panel", "i2 Analyst's Notebook", "grid", "active")}
                  onTouchStart={(e) =>
                    addNewNode(
                      e,
                      "anb-analyse-panel",
                      "i2 Analyst's Notebook",
                      "grid",
                      "active"
                    )
                  }
                >
                  <Card
                    id="anb-analyse-tooltip"
                    className={classnames(
                      "icon-card cursor-pointer text-center mb-0 th-tab-item-width bg-transparent"
                    )}
                  >
                    <CardBody
                      onClick={() => setSecribActive("8")}
                      className={`px-50 ${
                        secribactive === "8"
                          ? "secondary_ribbon_active"
                          : "secondary_ribbon_inactive"
                      }`}
                    >
                      {/* <div className="icon-wrapper">
                         <Icon icon="tabler:loader" width="24" height="24" /> 
                         <UncontrolledTooltip
                          placement="top"
                          target="anb-analyse-tooltip"
                        >
                          Linkurious
                        </UncontrolledTooltip> 
                      </div> */}
                      <p
                        className={`text-truncate mb-0 mt-0 ${
                          secribactive === "8"
                            ? "secondary_ribbon_active"
                            : "secondary_ribbon_inactive"
                        }`}
                      >
                        Linkurious
                      </p>
                    </CardBody>
                  </Card>
                </NavItem>
                {/* <NavItem
                              onClick={(e) => addNewNode(e, "i2-web-analyse-panel", "i2 Web Notebook", "grid", "active")}
                              onMouseDown={(e) => addNewNode(e, "i2-web-analyse-panel", "i2 Web Notebook", "grid", "active")}
                              onTouchStart={(e) => addNewNode(e, "i2-web-analyse-panel", "i2 Web Notebook", "grid", "active")}
                          >
                              <Card
                                  id="i2-web-analyse-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0  th-tab-item-width bg-transparent  ')}
                              >
                                  <CardBody className='mb-0 px-50 py-1'>
                                      <div className='icon-wrapper'>
                                          <Icon icon="ri:book-line" width="24" height="24" />
                                          <UncontrolledTooltip placement='top' target='i2-web-analyse-tooltip'>
                                              i2 Web Notebook
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>i2 Web</p>
                                  </CardBody>
                              </Card>
                          </NavItem> */}
                {/* <NavItem
                              onClick={(e) => addNewNode("entity", "grid", "tab")}
                              onMouseDown={(e) => addNewNode("entity", "grid", "tab")}
                              onTouchStart={(e) => addNewNode("entity", "grid", "tab")}
                          >
                              <Card
                                  id="Entity_Resolution-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0 ')}
                              >
                                  <CardBody className='mb-0 p-2 py-1'>
                                      <div className='icon-wrapper'>
                                          <Grid />

                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>EntityResolution</p>
                                  </CardBody>
                                  <UncontrolledTooltip placement='top' target='Entity_Resolution-tooltip'>
                                      Entity Resolution
                                  </UncontrolledTooltip>
                              </Card>
                          </NavItem> */}
                {/* <NavItem>
                              <Card
                                  className={classnames('icon-card cursor-pointer text-center mb-0 ')}
                              >
                                  <CardBody className='mb-0 p-2 py-1'>
                                      <div className='icon-wrapper'>
                                          <FilePlus />
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Test</p>
                                  </CardBody>
                              </Card>
                          </NavItem>
                          <NavItem>
                              <Card
                                  className={classnames('icon-card cursor-pointer text-center mb-0 ')}
                              >
                                  <CardBody className='mb-0 p-2 py-1'>
                                      <div className='icon-wrapper'>
                                          <Grid />
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Test</p>
                                  </CardBody>
                              </Card>
                          </NavItem>
                          <NavItem>
                              <Card
                                  className={classnames('icon-card cursor-pointer text-center mb-0 ')}
                              >
                                  <CardBody className='mb-0 p-2 py-1'>
                                      <div className='icon-wrapper'>
                                          <Home />
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Test</p>
                                  </CardBody>
                              </Card>
                          </NavItem> */}
              </Nav>
            </TabPane>
            <TabPane tabId="7">
              <Nav className="nav">
                <NavItem
                  onClick={(e) =>
                    addNewNode(e, "report-panel", "Report", "grid", "active")
                  }
                  // onMouseDown={(e) => addNewNode(e, "report-panel", "Report", "grid", "active")}
                  // onTouchStart={(e) => addNewNode(e, "report-panel", "Report", "grid", "active")}
                >
                  <Card
                    id="report-tooltip"
                    className={classnames(
                      "icon-card cursor-pointer text-center mb-0 th-tab-item-width bg-transparent"
                    )}
                  >
                    <CardBody
                      onClick={() => setSecribActive("9")}
                      className={`px-50 ${
                        secribactive === "9"
                          ? "secondary_ribbon_active"
                          : "secondary_ribbon_inactive"
                      }`}
                    >
                      {/* <div className="icon-wrapper">
                         <Icon icon="lucide:file-text" width="24" height="24" />
                        <UncontrolledTooltip
                          placement="top"
                          target="report-tooltip"
                        >
                          Report
                        </UncontrolledTooltip>
                      </div>  */}
                      <p
                        className={`text-truncate mb-0 mt-0 ${
                          secribactive === "9"
                            ? "secondary_ribbon_active"
                            : "secondary_ribbon_inactive"
                        }`}
                      >
                        Report
                      </p>
                    </CardBody>
                  </Card>
                </NavItem>
                <NavItem
                  onClick={(e) =>
                    addNewNode(e, "guage-panel", "Boat Dashboard", "grid", "active")
                  }
                >
                  <Card
                    id="guage-tooltip"
                    className={classnames(
                      "icon-card cursor-pointer text-center mb-0 th-tab-item-width bg-transparent"
                    )}
                  >
                    <CardBody
                      onClick={() => setSecribActive("10")}
                      className={`px-50 ${
                        secribactive === "10"
                          ? "secondary_ribbon_active"
                          : "secondary_ribbon_inactive"
                      }`}
                    >
                      {/* <div className="icon-wrapper">
                        <UncontrolledTooltip
                          placement="top"
                          target="guage-tooltip"
                        >
                          Boat Dashboard
                        </UncontrolledTooltip>
                      </div>  */}
                      <p
                        className={`text-truncate mb-0 mt-0 ${
                          secribactive === "10"
                            ? "secondary_ribbon_active"
                            : "secondary_ribbon_inactive"
                        }`}
                      >
                        Boat Dashboard
                      </p>
                    </CardBody>
                  </Card>
                </NavItem>
                {/* <NavItem
                              onClick={(e) => addNewNode("film", "grid", "tab")}
                              onMouseDown={(e) => addNewNode("film", "grid", "tab")}
                              onTouchStart={(e) => addNewNode("film", "grid", "tab")}
                          >
                              <Card
                                  id="film-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0 ')}
                              >
                                  <CardBody className='mb-0 p-2 py-1'>
                                      <div className='icon-wrapper'>
                                          <Film />
                                          <UncontrolledTooltip placement='top' target='film-tooltip'>
                                              Film
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Test</p>
                                  </CardBody>
                              </Card>
                          </NavItem> */}
                {/* <NavItem
                              onClick={(e) => addNewNode("instsgram", "grid", "tab")}
                              onMouseDown={(e) => addNewNode("instagram", "grid", "tab")}
                              onTouchStart={(e) => addNewNode("instagram", "grid", "tab")}
                          >
                              <Card
                                  id="Instagram-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0 ')}
                              >
                                  <CardBody className='mb-0 p-2 py-1'>
                                      <div className='icon-wrapper'>
                                          <Instagram />
                                          <UncontrolledTooltip placement='top' target='Instagram-tooltip'>
                                              Instagram
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Test</p>
                                  </CardBody>
                              </Card>
                          </NavItem> */}
                {/* <NavItem
                              onClick={(e) => addNewNode("layers", "grid", "tab")}
                              onMouseDown={(e) => addNewNode("layers", "grid", "tab")}
                              onTouchStart={(e) => addNewNode("layers", "grid", "tab")}
                          >
                              <Card
                                  id="Layers-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0 ')}
                              >
                                  <CardBody className='mb-0 p-2 py-1'>
                                      <div className='icon-wrapper'>
                                          <Layers />
                                          <UncontrolledTooltip placement='top' target='Layers-tooltip'>
                                              Layers
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Test</p>
                                  </CardBody>
                              </Card>
                          </NavItem> */}
                {/* <NavItem
                              onClick={(e) => addNewNode("layou", "grid", "tab")}
                              onMouseDown={(e) => addNewNode("layou", "grid", "tab")}
                              onTouchStart={(e) => addNewNode("layou", "grid", "tab")}
                          >
                              <Card
                                  id="Layou-tooltip" className={classnames('icon-card cursor-pointer text-center mb-0 ')}
                              >
                                  <CardBody className='mb-0 p-2 py-1'>
                                      <div className='icon-wrapper'>
                                          <Layout />
                                          <UncontrolledTooltip placement='top' target='Layou-tooltip'>
                                              Layout
                                          </UncontrolledTooltip>
                                      </div>
                                      <p className=' text-truncate mb-0 mt-0'>Test</p>
                                  </CardBody>
                              </Card>
                          </NavItem> */}
              </Nav>
            </TabPane>
          </TabContent>
        </div>

        <div className="navuser_container p-0 m-0">
          <Nav>
            <NavbarUser />
          </Nav>
        </div>
      </div>
    </>
  );
};

export default CustomRibbon;
