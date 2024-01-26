import {
  dockConfig,
  dockConfigCase,
  dockConfigCaseDetails,
  dockConfigCollect,
  dockConfigFire,
  dockConfigGuage,
  dockConfigHome,
  dockConfigLinkurios,
  dockConfigReport,
  dockConfigCasePanelClose
} from "../../utils/dock-config";

export const selectConfig = (name) => {
  switch (name) {
    case "Wave Detection":
      return dockConfig;
      break;
    case "Cases":
      return dockConfigCase;
      break;
    case "Case-Panel-Close":
      return dockConfigCasePanelClose;
      break;
    case "Case Details":
      return dockConfigCaseDetails;
      break;
    case "Chart":
      return dockConfigLinkurios;
      break;
    case "Enterprise Social Media":
      return dockConfigCollect;
      break;
    case "Report":
      return dockConfigReport;
      break;
    case "Boat Dashboard":
      return dockConfigGuage;
      break;
    case "Fire Detection":
      return dockConfigFire;
      break;
    case 'Home':
      return dockConfigHome;
      break;
    default:
      return dockConfigHome;
      break;
  }
};
