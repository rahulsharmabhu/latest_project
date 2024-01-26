export const dockConfig = {
  global: {
    tabEnableFloat: true,
    tabEnableRename: false,
  },
  borders: [
    {
      type: "border",
      size: 379,
      location: "left",
      children: [
        {
           
          type: "tab",
          id: "#1941a58f-b937-46ab-af63-4946214012ed12",
          name: "Cases",
          altName: "The Cases Tab",
          component: "cases",
          enableClose: false,
          // "icon": "images/folder.svg"
        },
      ],
    },
    {
      type: "border",
      location: "right",
      size: 320,
      children: [],
      active: true,
    },
  ],
  layout: {
    type: "row",
    id: "#5bec7cdd-7f77-468e-83fe-673e7160a975",
    children: [
      {
        type: "row",
        id: "#f0c5015d-1457-402b-b315-e61ffb1db72b",
        weight: 23,
        children: [
          // video list component start

          {
            type: "tabset",
            id: "#a6628dc5-c01f-447a-b257-0de10b057ca2",
            weight: 31.592689295039165,
            children: [
              {
                type: "tab",
                id: "#305b667f-cf13-455a-a805-bf3b549cce57",
                name: "Videos",
                component: "video-list",
              },
            ],
            active: true,
          },

          // Video list component ends

          // Video Info Component Starts

          {
            type: "tabset",
            id: "#ddc2005a-75f5-4768-9385-ecd89486d3b5",
            weight: 60.40731070496084,
            children: [
              {
                type: "tab",
                id: "#305b667f-cf13-455a-a805-bf3b549cc562",
                name: "Tank Details",
                component: "download-form",
              },
              {
                type: "tab",
                id: "#0633248e-c131-4f52-b7d7-95c030f2ab40",
                name: "Properties",
                component: "video-info",
              },
            ],
          },

          // Video info component Ends

          // {
          //     type: "tabset",
          //     id: "#a6628dc5-c01f-447a-b257-0de10b057ca2",
          //     weight: 31.592689295039165,
          //     children: [
          //         {
          //             type: "tab",
          //             id: "#305b667f-cf13-455a-a805-bf3b549cce57",
          //             name: "Cases",
          //             component: "cases"
          //         }
          //     ],
          //     active: true
          // },

          // {
          //     type: "tabset",
          //     id: "#b5610cb0-f836-4594-aff2-8d26da8bcc4c",
          //     weight: 35.3322528363047,
          //     children: [
          //         {
          //             type: "tab",
          //             id: "#0633248e-c131-4f52-b7d7-95c030f2ab40",
          //             name: "Properties",
          //             component: "video-info"
          //         }
          //     ]
          // }
        ],
      },
      {
        type: "tabset",
        id: "#0bd10a73-ebae-4433-97d7-97713d3d2689",
        weight: 69.73880597014926,
        children: [
          {
            type: "tab",
            id: "#d7123cc6-7d02-4d28-a196-a25e1467f4a3",
            name: "Player",
            component: "video-player",
          },
        ],
      },
      {
        type: "row",
        id: "#01fa737a-c2de-493f-9e99-64ecd1caca7e",
        weight: 19.26119402985075,
        children: [
          {
            type: "tabset",
            id: "#7c3fbe95-45ea-4181-9f18-a4742f9a3f19",
            weight: 38.6677471636953,
            children: [
              {
                type: "tab",
                id: "#4df5fde8-6139-4ef2-9cf5-0b8ad58b62a4",
                name: "Compass",
                component: "wave",
              },
            ],
          },
          // {
          //     type: "tabset",
          //     id: "#b5610cb0-f836-4594-aff2-8d26da8bcc4c",
          //     weight: 35.3322528363047,
          //     children: [
          //         {
          //             type: "tab",
          //             id: "#0633248e-c131-4f52-b7d7-95c030f2ab40",
          //             name: "Properties",
          //             component: "video-info"
          //         }
          //     ]
          // }
        ],
      },
    ],
  },
};

export const dockConfigCase = {
  global: {
    tabEnableFloat: true,
    tabEnableRename: false,
  },
  borders: [
    {
      type: "border",
      location: "left",
      size: 320,
      selected: 0,
      children: [
        {
          type: "tab",
          enableClose: false,
          name: "Cases",
          altName: "case",
          component: "cases",

          // icon: "images/folder.svg"
        },
      ],
      active: true,
    },
    {
      type: "border",
      location: "right",
      size: 320,
      children: [],
      active: true,
    },
  ],
  layout: {
    type: "row",
    id: "#5bec7cdd-7f77-468e-83fe-673e7160a975",
    children: [
      // {
      //     type: "row",
      //     id: "#f0c5015d-1457-402b-b315-e61ffb1db72b",
      //     weight: 22,
      //     children: [
      //         {
      //             type: "tabset",
      //             id: "#a6628dc5-c01f-447a-b257-0de10b057ca2",
      //             weight: 21.592689295039165,
      //             children: [
      //                 {
      //                     type: "tab",
      //                     id: "#305b667f-cf13-455a-a805-bf3b549cce57",
      //                     name: "Cases",
      //                     component: "cases"
      //                 }
      //             ],
      //             active: true
      //         }
      //     ]
      // },
      {
        type: "tabset",
        id: "#0bd10a73-ebae-4433-97d7-97713d3d2689",

        children: [
          {
            type: "row",
            id: "#d7123cc6-7d02-4d28-a196-a25e1467f4a3",
            name: "",
            allowFloat: true,
            enableDrag: false,
            enableDrop: false,
            name: "Case Details",
            component: "case-details",
            enableClose: true,
          },
           {
            type: "row",
            id: "#d7123cc6-7d02-4d28-a196-a25e1467f4a312567",
            name: "",
            allowFloat: true,
            enableDrag: false,
            enableDrop: false,
            name: "Alerts",
            component: "alerts",
            enableClose: true,
          },
          {
            type: "row",
            id: "#d7123cc6-7d02-4d28-a196-a25e1467f4a3001",
            name: "",
            allowFloat: true,
            enableDrag: false,
            enableDrop: false,
            name: "Rules",
            component: "rules",
            enableClose: true,
          },
          {
            type: "row",
            id: "#d7123cc6-7d02-4d28-a196-a25e1467f4a3002",
            name: "",
            allowFloat: true,
            enableDrag: false,
            enableDrop: false,
            name: "Tasks",
            component: "tasks",
            enableClose: true,
          },
        ],
      },
    ],
  },
};

// Dock config for close the case panel after adding the new case....

export const dockConfigCasePanelClose = {
  global: {
    tabEnableFloat: true,
    tabEnableRename: false,
  },
  borders: [
    {
      type: "border",
      location: "left",
      size: 320,
      children: [
        {
          type: "tab",
          enableClose: false,
          name: "Cases",
          altName: "case",
          component: "cases",

          // icon: "images/folder.svg"
        },
      ],
      active: true,
    },
    {
      type: "border",
      location: "right",
      size: 320,
      children: [],
      active: true,
    },
  ],
  layout: {
    type: "row",
    id: "#5bec7cdd-7f77-468e-83fe-673e7160a97512",
    children: [
      // {
      //     type: "row",
      //     id: "#f0c5015d-1457-402b-b315-e61ffb1db72b",
      //     weight: 22,
      //     children: [
      //         {
      //             type: "tabset",
      //             id: "#a6628dc5-c01f-447a-b257-0de10b057ca2",
      //             weight: 21.592689295039165,
      //             children: [
      //                 {
      //                     type: "tab",
      //                     id: "#305b667f-cf13-455a-a805-bf3b549cce57",
      //                     name: "Cases",
      //                     component: "cases"
      //                 }
      //             ],
      //             active: true
      //         }
      //     ]
      // },
      {
        type: "tabset",
        id: "#0bd10a73-ebae-4433-97d7-97713d3d268923",

        children: [
          {
            type: "row",
            id: "#d7123cc6-7d02-4d28-a196-a25e1467f4a345",
            name: "",
            allowFloat: true,
            enableDrag: false,
            enableDrop: false,
            name: "Case Details",
            component: "case-details",
            enableClose: true,
          },
           {
            type: "row",
            id: "#d7123cc6-7d02-4d28-a196-a25e1467f4a31256712",
            name: "",
            allowFloat: true,
            enableDrag: false,
            enableDrop: false,
            name: "Alerts",
            component: "alerts",
            enableClose: true,
          },
          {
            type: "row",
            id: "#d7123cc6-7d02-4d28-a196-a25e1467f4a300134",
            name: "",
            allowFloat: true,
            enableDrag: false,
            enableDrop: false,
            name: "Rules",
            component: "rules",
            enableClose: true,
          },
          {
            type: "row",
            id: "#d7123cc6-7d02-4d28-a196-a25e1467f4a300245",
            name: "",
            allowFloat: true,
            enableDrag: false,
            enableDrop: false,
            name: "Tasks",
            component: "tasks",
            enableClose: true,
          },
        ],
      },
    ],
  },
};

// ------------------------------------------------------------------ //

export const dockConfigCaseDetails = {
  global: {
    tabEnableFloat: true,
    tabEnableRename: false,
  },
  borders: [
    {
      type: "border",
      location: "left",
      size: 320,
      children: [
        {
          type: "tab",
          enableClose: false,
          name: "Cases",
          altName: "case",
          component: "cases",

          // icon: "images/folder.svg"
        },
      ],
      active: true,
    },
  ],
  layout: {
    type: "row",
    id: "#5bec7cdd-7f77-468e-83fe-673e7160a975er3",
    children: [
    //   {
    //     type: "row",
    //     id: "#f0c5015d-1457-402b-b315-e61ffb1db72bui1",
    //     weight: 22,
    //     children: [
    //       {
    //         type: "tabset",
    //         id: "#a6628dc5-c01f-447a-b257-0de10b057ca2hg2",
    //         weight: 21.592689295039165,
    //         children: [
    //           {
    //             type: "tab",
    //             id: "#305b667f-cf13-455a-a805-bf3b549cce57kj4",
    //             name: "Cases",
    //             component: "cases",
    //           },
    //         ],
    //         active: true,
    //       },
    //     ],
    //   },
      {
        type: "tabset",
        id: "#0bd10a73-ebae-4433-97d7-97713d3d2689jk5",
        weight: 80.73880597014926,
        children: [
          {
            type: "row",
            id: "#d7123cc6-7d02-4d28-a196-a25e1467f4a3lk6",
            name: "Case Details",
            component: "case-details",
          },
          // {
          //     type: "tab",
          //     id: "#4df5fde8-6139-4ef2-9cf5-0b8ad58b62a4ol7",
          //     name: "Tasks",
          //     component: "tasks"
          // },
          // {
          //     type: "tab",
          //     id: "#0633248e-c131-4f52-b7d7-95c030f2ab445mn8",
          //     name: "Rules",
          //     component: "rules"
          // },
          // {
          //     type: "tab",
          //     id: "#4df5fde8-6139-4ef2-9cf5-0b8ad58b62a4bv9",
          //     name: "Alerts",
          //     component: "alert"
          // },
          {
            type: "tab",
            id: "#0633248e-c131-4f52-b7d7-95c030f2ab445we1",
            name: "Notifications",
            component: "notifications",
          },
        ],
      },
    ],
  },
};

export const dockConfigHome = {
  global: {
    tabEnableFloat: true,
    tabEnableRename: false,
  },
  borders: [],
  layout: {
    type: "row",
    id: "#5bec7cdd-7f77-468e-83fe-673e7160a975",
    children: [
      // {
      //     type: "row",
      //     id: "#f0c5015d-1457-402b-b315-e61ffb1db72b",
      //     weight: 22,
      //     children: [
      //         {
      //             type: "tabset",
      //             id: "#a6628dc5-c01f-447a-b257-0de10b057ca2",
      //             weight: 31.592689295039165,
      //             children: [
      //                 {
      //                     type: "tab",
      //                     id: "#305b667f-cf13-455a-a805-bf3b549cce57",
      //                     name: "Cases",
      //                     component: "cases"
      //                 }
      //             ],
      //             active: true
      //         }
      //     ]
      // },
      {
        type: "tabset",
        id: "#0bd10a73-ebae-4433-97d7-97713d3d2689",
        weight: 100.73880597014926,
        children: [
          {
            type: "row",
            id: "#d7123cc6-7d02-4d28-a196-a25e1467f4a3",
            name: "",
            enableFloat: false,
            enableDrag: false,
            enableDrop: false,
            component: "logo",
            enableClose: false,
            className: "logo-tab"
          },
        ],
      },
      // {
      //     type: "row",
      //     id: "#01fa737a-c2de-493f-9e99-64ecd1caca7e",
      //     weight: 21.26119402985075,
      //     children: [
      //         {
      //             type: "tabset",
      //             id: "#7c3fbe95-45ea-4181-9f18-a4742f9a3f19",
      //             weight: 38.6677471636953,
      //             children: [
      //                 {
      //                     type: "tab",
      //                     id: "#4df5fde8-6139-4ef2-9cf5-0b8ad58b62a4",
      //                     name: "Alerts",
      //                     component: "alert"
      //                 },
      //                 {
      //                     type: "tab",
      //                     id: "#0633248e-c131-4f52-b7d7-95c030f2ab445",
      //                     name: "Notifications",
      //                     component: "notifications"
      //                 }
      //             ]
      //         }
      //     ]
      // }
    ],
  },
};

export const dockConfigLinkurios = {
  global: {
    tabEnableFloat: true,
    tabEnableRename: false,
  },
  borders: [
    {
      type: "border",
      location: "left",
      size: 320,
      children: [
        {
          type: "tab",
          enableClose: false,
          name: "Cases",
          altName: "case",
          component: "cases",
        },
      ],
    },
    {
      type: "border",
      location: "right",
      size: 320,
      children: [],
      active: true,
    },
  ],
 
  layout: {
    type: "row",
    id: "#5bec7cdd-7f77-468e-83fe-673e7160a975iu11",
    children: [
      {
        type: "tabset",
        id: "#0bd10a73-ebae-4433-97d7-97713d3d2689hg12",
        weight: 70,
        children: [
          {
            type: "tab",
            id: "#d7123cc6-7d02-4d28-a196-a25e1467f4a312",
            name: "Chart",
            enableFloat: true,
            enableDrag: true,
            enableDrop: true,
            component: "chart",
            enableClose: true,
          },
          {
            type: "tab",
            id: "#d7123cc6-7d02-4d28-a196-a25e1467f5a312",
            name: "Chart",
            enableFloat: true,
            enableDrag: true,
            enableDrop: true,
            component: "chart",
            enableClose: true,
          }
        ],
        active: true,
      },
    ],
  },
};

export const dockConfigReport = {
  global: {
    tabEnableFloat: true,
    tabEnableRename: false,
  },
  borders: [
    {
      type: "border",
      location: "left",
      size: 320,
      children: [
        {
          type: "tab",
          enableClose: false,
          name: "Cases",
          altName: "case",
          component: "cases",
          // "icon": "images/folder.svg"
        },
        
      ],
    },
    {
      type: "border",
      location: "right",
      size: 320,
      children: [],
      active: true,
    },
  ],
  layout: {
    type: "row",
    id: "#5bec7cdd-7f77-418e-83fe-673e7160a975iu11",
    children: [
      {
        type: "tabset",
        id: "#f0c501fd-1457-402b-b315-e61ffb1db72b761",
        weight: 20,
        children: [
          {
            type: "tab",
            id: "#305c667f-cf13-455a-a805-bf3b549cce57sdf77",
            name: "Tasks",
            // enableClose: false,
            component: "tasks",
          },
        ],
      },
      {
        type: "tabset",
        id: "#0bd10a73-ebae-44q3-97d7-97713d3d2689hg12",
        weight: 70,
        // selected: 0,
        children: [
          {
            type: "tab",
            id: "#d7123cc2-7d02-4d28-a196-a25e1467f4a312",
            name: "Report",
            // enableFloat: true,
            // enableDrag: false,
            // enableDrop: false,
            component: "report",
            // enableClose: true,
          },
         
          // {
          //   type: "tab",
          //   id: "#d7123cc6-7d02-4d28-a196-a25e111111a3lk634ui5",
          //   name: "Case Details",
          //   component: "case-details",
          // },
        ],
        active: true,
      },
    ],
  },
};


export const dockConfigGuage = {
  global: {
    tabEnableFloat: true,
    tabEnableRename: false,
  },
  borders: [
    {
      type: "border",
      location: "left",
      size: 320,
      children: [
        {
          type: "tab",
          enableClose: false,
          name: "Cases",
          altName: "case",
          component: "cases",
          // "icon": "images/folder.svg"
        },
        
      ],
    },
    {
      type: "border",
      location: "right",
      size: 320,
      children: [],
      active: true,
    },
  ],
  layout: {
    type: "row",
    id: "#5bec7cdd-7f77-418e-83fe-67123160a975iu11",
    children: [
      // {
      //   type: "tabset",
      //   id: "#f0c501fd-1457-402b-b315-e61ffb12372b761",
      //   weight: 20,
      //   children: [
      //     {
      //       type: "tab",
      //       id: "#305c667f-cf13-455a-a805-bf3b5123ce57sdf77",
      //       name: "Tasks",
      //       // enableClose: false,
      //       component: "tasks",
      //     },
      //   ],
      // },
      {
        type: "tabset",
        id: "#0bd10a73-ebae-44q3-97d7-97713d3d2689hg12",
        weight: 70,
        // selected: 0,
        children: [
          
          {
            type: "tab",
            id: "#d7123cc2-7d02-4d28-a196-a2512317f4a312",
            name: "Boat Dashboard",
            // enableFloat: true,
            // enableDrag: false,
            // enableDrop: false,
            component: "circular-guage",
            // enableClose: true,
          }
          // {
          //   type: "tab",
          //   id: "#d7123cc6-7d02-4d28-a196-a25e111111a3lk634ui5",
          //   name: "Case Details",
          //   component: "case-details",
          // },
        ],
        active: true,
      },
    ],
  },
};

// export const dockConfigCaseId = {
//     global: {tabEnableRename:false},
//     borders: [
//       {
//         type: "border",
//         location: "left",
//         children: [
//           {
//             type: "tab",
//             enableClose: false,
//             name: "caseId",
//             altName: "case",
//             component: "caseId",
//             // icon: "images/folder.svg"
//           }
//         ]
//       }
//     ],
//     layout: {
//       type: "row",
//       weight: 100,
//       children: [
//         {
//           type: "tabset",
//           weight: 100,
//           children: []
//         }
//       ]
//     }
//   };

export const dockConfigCollect = {
  global: {
    tabEnableFloat: true,
    tabEnableRename: false,
    tabSetMinWidth: 100,
    tabSetMinHeight: 100,
    borderMinSize: 100,
  },
  borders: [
    {
      type: "border",
      location: "left",
      size: 320,
      children: [
        {
          type: "tab",
          enableClose: false,
          name: "Cases",
          altName: "case",
          component: "cases",

          // icon: "images/folder.svg"
        },
      ],
      active: true,
    },
    {
      type: "border",
      location: "right",
      size: 320,
      children: [],
      active: true,
    },
  ],
  layout: {
    type: "row",
    id: "#022984d4-ba08-47ea-a1b2-8f3922fea407uu1",
    children: [
      {
        type: "tabset",
        id: "#dd2434ab-23b1-493f-96d4-9a677e8fc27dmk2",
        weight: 21,
        selected: 0,
        children: [
          {
            type: "tab",
            id: "#f5475921-7f01-4138-a0e9-f01c27299089lk2",
            name: "Collection",
            component: "collection",
          },
          {
            type: "tab",
            id: "#44bc9fa2-e90f-41b2-9ebb-847bb1048620kl4",
            name: "Accounts",
            component: "accounts",
          },
        ],
        active: true,
      },
      {
        type: "tabset",
        id: "#dd2434ab-23b1-493f-96d4-9a677e8fc27dop4",
        weight: 60,
        selected: 0,
        children: [
          // {
          //   type: "tab",
          //   id: "#d7123cc6-7d02-4d28-a196-a25e1467f4a3lk634ui5",
          //   name: "Case Details",
          //   component: "case-details",
          // },
          {
            type: "tab",
            id: "#44bc9fa2-e90f-41b2-9ebb-847bb1048620yt3",
            name: "Results",
            component: "results",
          },
          {
            type: "tab",
            id: "#44bc9fa2-e90f-41b2-9ebb-847bb1048620re2",
            name: "Tasks",
            component: "tasks",
          },
          {
            type: "tab",
            id: "#44bc9fa2-e90f-41b2-9ebb-847bb1048620ew1",
            name: "Rules",
            component: "rules",
          },
          {
            type: "tab",
            id: "#44bc9fa2-e90f-41b2-9ebb-847bb1048620qw2",
            name: "Alerts",
            component: "alerts",
          },
        ],
        active: true,
      },
    ],
  },
};


export const dockConfigFire = {
  global: {
    tabEnableFloat: true,
    tabEnableRename: false,
    tabSetMinWidth: 100,
    tabSetMinHeight: 100,
    borderMinSize: 100,
  },
  borders: [
    {
      type: "border",
      location: "left",
      size: 320,
      children: [
        {
          type: "tab",
          enableClose: false,
          name: "Cases",
          altName: "case",
          component: "cases",
          // icon: "images/folder.svg"
        },
      ],
      active: true,
    },
    {
      type: "border",
      location: "right",
      size: 320,
      children: [],
      active: true,
    },
  ],
  layout: {
    type: "row",
    id: "#022984d4-ba08-47ea-a1b2-8f3922fea407uu11",
    children: [
      {
        type: "tabset",
        id: "#dd2434ab-23b1-493f-96d4-9a677e8fc27dmk22",
        weight: 20,
        selected: 0,
        children: [
          {
            type: "tab",
            id: "#f5475921-7f01-4138-a0e9-f01c27299089lk23",
            name: "Camera Panel",
            component: "camera-panel",
          },
        ],
        // active: true,
      },
      {
        type: "tabset",
        id: "#dd9004ab-23b1-493f-96d4-9a677e8fc27dop41",
        weight: 60,
        selected: 0,
        children: [
          {
            type: "tab",
            id: "#44bc9fa2-e90f-41b2-9ebb-847bb1048620yt3211",
            name: "Map",
            component: "fire-map",
          }
        ],
        active: true,
      },
      {
        type: "tabset",
        id: "#dd2434ab-23b1-493f-96d4-9a677e8fc27dop4111",
        weight: 20,
        selected: 0,
        children: [
          {
            type: "tab",
            id: "#44bc9fa2-e90f-41b2-9ebb-847bb1048620yt32",
            name: "Alerts",
            component: "fire-alert",
          }
        ],
        // active: true,
      },
      // {
      //   type: "row",
      //   id: "camera-details-tab",
      //   name: "",
      //   allowFloat: true,
      //   enableDrag: false,
      //   enableDrop: false,
      //   name: "Camera Detailsss",
      //   component: "camera-details",
      //   enableClose: true,
      // },
    ],
  },
};