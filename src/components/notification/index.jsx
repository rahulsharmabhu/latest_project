import React, { useEffect, useState, Fragment } from 'react'
import { Icon } from "@iconify/react";
import { Badge, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from 'classnames';
import { Link } from 'react-router-dom'
import { useOnFireAlert } from '../../app-redux/hooks/useOnFireAlert';
import { useOnRibbonClickState } from "../../app-redux/hooks/useOnRibbonClickState";

const NavNotification = () => {

  const { setFireAlertNotificationState } = useOnFireAlert();
  const { setRibbonClickState } = useOnRibbonClickState();
  const [notificationsArray, setNotificationsArray] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(notificationsArray.filter(e => e.isRead === false).length)
  }, [notificationsArray])

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
    event.stopPropagation();
    event.preventDefault();
    const obj = { id, name, component, type, text, icon, isCaseTab };
    setRibbonClickState(obj);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      const notificationMessage = {
        AlertTriggerTimestamp: "2022-07-08T11:43:27.2931002Z",
        ThreatAlertId: null,
        TriggeredRuleId: null,
        SourceDataText: "task with word die in it\\n",
        ThreatLevel: 2,
        Sentiment: 0,
        SourceSystemType: "Fire",
        SourceSystemId: "\\\\\\\\192.168.58.35\\\\ingest_dev",
        SourceSystemVersion: null,
        SourceItemId: "\\\\\\\\192.168.58.35\\\\ingest_dev\\\\NineOneOne\\\\911-2.txt",
        IngestionItemId: "1737",
        OrchestrationId: 6799,
        EnrichmentId: "0f8cfffe8c714bad2edfa98937c29583",
        IngestionType: "New",
        Id: "065c6ffd-bbee-4f53-9681-ab7e0b4299ad",
        CreationDate: "2022-07-08T11:43:27.3048218Z",
        detectionData: {
          cameraId: 8140066928,
          title: "Camera 1",
          percentage: 45,
          observer: "Amit Patel",
          hours: "3:00 PM",
          timeSinceLastDetection: "23 min",
          detectionTime: "2038-01-19  03:14:07",
          // address: "98 Shirley street \n PIMPAMA QLD 4209 AUSTRALIA",
          // elevation: "12 meter / 36 Feet (Elevation)",
          // angle: "45 Degree angle",
          coordinates: `34°01'46.6"N 118°28'11.3"W"`//,
          // seaLevel: "50 Meter",
          // span: "1 KM",
          // estimatedDistance: "134 KM",
          // bearing: "78%",
          // size: "134 KM",
          // density: "134 KM",
          // type: "134 KM",
          // typeOfSpread: "134 KM"
        }
      }
      const percentage = Math.floor((Math.random() * (100 - 35 + 1)) + 1)
      notificationMessage.detectionData.percentage = percentage
      // const fileName = notificationMessage.SourceItemId.substring(notificationMessage.SourceItemId.lastIndexOf('\\') + 1)
      const randomNumber = Math.floor((Math.random() * (999 - 100 + 1)) + 100)
      const documentId = `33204f139f6f1e7fc5f80a8221e626e9${randomNumber}`//notificationMessage.EnrichmentId
      notificationMessage['EnrichmentId'] = documentId
      const notificationPayload = {
        // avatarIcon: <Wind size={14} />,
        color: 'light-danger',
        subtitle: `Fire detected on ${notificationMessage.detectionData.title}`,
        title: (
          <p className='media-heading'>
            <span className='fw-bolder'>Fire detected</span>
          </p>
        ),
        documentLink: (
          <Link onClick={(e) =>
            addNewNode(
              e,
              "va-enrich-panel",
              "Fire Detection",
              "grid",
              "active",
              false
            )
          } to={notificationMessage.SourceSystemType === 'Twitter' || notificationMessage.SourceSystemType === 'NineOneOne' ? `/monitoring?q=documentid:${documentId}` : (notificationMessage.SourceSystemType === 'Fire' ? `#` : `#`)}><small>View</small></Link>
        ),
        isRead: false,
        documentId
      }
      setNotificationsArray(notificationsArray => [...notificationsArray, notificationPayload])
      setFireAlertNotificationState(notificationMessage)
      // dispatch(updateAlert(documentId))
    }, 60000)
    return () => clearInterval(interval)
  }, [])


  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {notificationsArray.map((item, index) => {
          return (
            <span key={index} className='d-flex' onClick={e => e.preventDefault()}>
              <div
                className={classnames('list-item d-flex', {
                  'align-items-start': !item.switch,
                  'align-items-center': item.switch
                })}
              >
                {!item.switch ? (
                  <Fragment>
                    <div className='me-1'>
                     <Icon icon="mdi:fire" width="20" height="20"/>
                    </div>
                    <div className='list-item-body flex-grow-1'>
                      {item.title}
                      <small className='notification-text'>{item.subtitle}</small> - {item.documentLink}
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    {item.title}
                    {item.switch}
                  </Fragment>
                )}
              </div>
            </span>
          )
        })}
      </PerfectScrollbar>
    )
  }

  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item me-25 mt-2'>
    <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
    <Icon icon="mingcute:notification-line" width="22" height="22"/>
      {count > 0 ? (
        <Badge pill color='danger' className='badge-up'>
          {count}
        </Badge>
      ) : null}
    </DropdownToggle>
    <DropdownMenu end tag='ul' className='dropdown-menu-media mt-0'>
      <li className='dropdown-menu-header'>
        <DropdownItem className='d-flex' tag='div' header>
          <h6 className='notification-title mb-0 me-auto'>Notifications</h6>
          <Badge tag='div' color='primary' pill>
            {count} New
          </Badge>
        </DropdownItem>
      </li>
      {renderNotificationItems()}
    </DropdownMenu>
  </UncontrolledDropdown>
  )
}

export default NavNotification