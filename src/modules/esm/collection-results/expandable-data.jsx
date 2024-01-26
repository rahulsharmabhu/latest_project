import React from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { CollectionMockData } from "./collection-mock-data";
import { useSkin } from "../../../app-redux/hooks/useSkin";
import { Link } from "react-router-dom"
import { Badge } from 'reactstrap'
import { Icon } from "@iconify/react"
import { useOnNewTabClickState } from "../../../app-redux/hooks/useOnNewTabClickState";
import { useEsmChartData } from "../../../app-redux/hooks/useEsmChartData";

const RowExpandableTable = ({ data }) => {
  return (
    <div style={{ fontSize: "12px" }} className="expandable-content p-2 d-flex">
      <div>
        <p>
          <span className="fw-bold">From : </span>{" "}
          {data.city ? data.city : "Data not found"}
        </p>
        <p>
          <span className="fw-bold">Experience : </span>{" "}
          {data.experience ? data.experience : "Data not found"}
        </p>
        <p className="m-0">
          <span className="fw-bold">Post : </span>{" "}
          {data.post ? data.post : "Data not found"}
        </p>
      </div>
      <div style={{ marginLeft: "20px" }}>
        <p>
          <span className="fw-bold">Studied At : </span>{" "}
          {data.studied_at ? data.studied_at : "Data not found"}
        </p>
        <p>
          <span className="fw-bold">Studied : </span>{" "}
          {data.studied ? data.studied : "Data not found"}
        </p>
        <p className="m-0">
          <span className="fw-bold">Lives In : </span>{" "}
          {data.lives_in ? data.lives_in : "Data not found"}
        </p>
      </div>
      <div style={{ marginLeft: "20px" }}>
        <p>
          <span className="fw-bold">Went to : </span>{" "}
          {data.went_to ? data.went_to : "Data not found"}
        </p>
        <p>
          <span className="fw-bold">Joined : </span>{" "}
          {data.joined ? data.joined : "Data not found"}
        </p>
        <p className="m-0">
          <span className="fw-bold">Followed by : </span>{" "}
          {data.followed_by ? data.followed_by : "Data not found"}
        </p>
      </div>
      <div style={{ marginLeft: "20px" }}>
        <p className="m-0">
          <span className="fw-bold">Full Data : </span>{" "}
          {data.full_data ? data.full_data : "Data not found"}
        </p>
      </div>
    </div>
  );
};

const ExpandableData = ({ data }) => {
  createTheme(
    "dark",
    {
      background: {
        default: "#242525",
      },
    },
    "light",
    {
      background: {
        default: "#fff",
      },
    }
  );

  // createTheme(
  //   "light",
  //   {
  //     background: {
  //       default: "#fff",
  //     },
  //   },
  //   "light"
  // );

  const { skin } = useSkin();

  const { setNewTabClickState } = useOnNewTabClickState();
  const { esmDataState, setEsmChartData } = useEsmChartData();

  const addNewNode = (
    event,
    id,
    type,
    name,
    component,
    isCaseTab,
    text,
    icon,
    data
  ) => {
    setEsmChartData({ id: id, data })
    event.stopPropagation();
    event.preventDefault();
    const obj = { id, type, name, component, isCaseTab, text, icon };
    setNewTabClickState(obj);
  };
  const status = {
    1: { title: 'In Progress', color: 'info' },
    2: { title: 'Completed', color: 'success' },
    3: { title: 'Queued', color: 'primary' }
    // 2: { title: 'Professional', color: 'light-success' },
    // 3: { title: 'Rejected', color: 'light-danger' },
    // 5: { title: 'Applied', color: 'light-info' },
  }
  const networks = {
    1: { title: 'Facebook', icon: <Icon icon="ri:facebook-fill" width={20} height={20} /> },
    2: { title: 'Instagram', icon: <Icon icon="mdi:instagram" width={20} height={20} /> },
    3: { title: 'Twitter', icon: <Icon icon="mdi:twitter" width={20} height={20} /> }
  }
  // ** Table Common Column
  const groupcolumns = [
    {
      name: 'Job ID',
      minWidth: '80px',
      sortable: row => row.jobId,
      selector: row => row.jobId
    },
    {
      name: 'Profile',
      minWidth: '50px',
      selector: row => (
        <div className='d-flex align-items-center'>
          <img style={{ borderRadius: '50%' }} src={row.profileAvatar} width={40} height={40} />
        </div>
      )
    },
    {
      name: 'Target Name',
      sortable: true,
      minWidth: '100px',
      selector: row => row.targetName
    },
    {
      name: 'Network',
      sortable: true,
      minWidth: '50px',
      selector: row => row.network,
      cell: row => {
        return (networks[row.network].icon)
      }
    },
    {
      name: 'Created Date',
      sortable: true,
      minWidth: '100px',
      selector: row => row.created
    },
    {
      name: 'Collected Date',
      sortable: true,
      minWidth: '100px',
      selector: row => row.collected
    },
    {
      name: 'Status',
      minWidth: '50px',
      sortable: row => row.status.title,
      cell: row => {
        return (
          <Badge color={status[row.status].color} pill>
            {status[row.status].title}
          </Badge>
        )
      }
    },
    {
      name: 'View',
      minWidth: '30px',
      selector: row => row.view,
      cell: (row) => {
        return (
          <Link to='/view' className='font-medium-3'>{row.view}</Link>
        )
      }
    },
    {
      name: 'Export',
      minWidth: '30px',
      selector: row => row.export,
      cell: (row) => {
        return (
          <Link to='/export' className='font-medium-3'>{row.export}</Link>
        )
      }
    },
    {
      name: 'Chart',
      minWidth: '30px',
      selector: row => row.chart,
      cell: (row) => {
        return (
          <Link to='#' className='font-medium-3' onClick={(e) =>
            addNewNode(
              e,
              `chart-${new Date().getTime()}`,//id
              "active",//type
              "Chart",//name
              "chart",//component            
              false,//isCaseTab
              undefined,//text
              undefined,//icon
              row
            )
          }>{row.chart}</Link>
        )
      }
    },
  ]
  const groupid = data.groupId;
  const groupdata = CollectionMockData.find((row) => row.groupId === groupid);
  return (
    <DataTable
      className="sub_table_row"
      expandableRows
      expandableRowsComponent={RowExpandableTable}
      columns={groupcolumns}
      data={groupdata ? groupdata.groupData : ""}
      theme={skin === "dark" ? "dark" : "light"}
    />
  );
};

export default ExpandableData;
