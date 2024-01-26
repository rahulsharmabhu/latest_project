import React, { useEffect, useState } from 'react'
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import defaultAvatar from '../../assets/images/avatar/avatar-s-11.jpg'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import { handleLogoutAction } from '../../app-redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from "../../app-redux/hooks";

const UserDropdown = () => {

  const dispatch = useAppDispatch();

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item convention_13'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className=''>
          <span className=' user-name fw-bold'>Mike M</span><br />
          <span style={{ marginRight: '20px' }} className=' user-status'>Admin</span>
          <img className='profile_image' src={defaultAvatar} height='45' width='45' />
        </div>
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/' onClick={e => e.preventDefault()}>
          <div className='d-flex'>
            <div>
              <img className='userprofile_dropdown' src={defaultAvatar} height='50' width='50' />
            </div>
            <div style={{marginLeft: '10px'}}>
              <span className='user-name fw-bold ml-1'>Mike M</span><br />
              <span className='user-status ml-1'>Admin</span>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to='/' onClick={e => e.preventDefault()}>
          <Icon icon="iconamoon:profile-bold" width="24" height="24" />
          <span style={{marginLeft: '10px'}} className='align-right'>Profile</span>
        </DropdownItem>

        <UncontrolledDropdown setActiveFromChild>
          <DropdownToggle tag="a" className="nav-link" caret>
            <Icon icon="material-symbols:settings-outline" width="24" height="24" />
            <span style={{marginLeft: '10px'}} className='align-middle'>Settings</span>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag={Link} href="/">
              <span>Wave : &nbsp; <b>123456</b></span><br />
              <span>Fire : &nbsp; <b>987654</b></span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <DropdownItem divider />
        <DropdownItem tag={Link} to='/' onClick={e => e.preventDefault()}>
          <Icon icon="solar:help-linear" width="24" height="24" />
          <span style={{marginLeft: '10px'}} className='align-middle'>Help</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/' onClick={e => e.preventDefault()}>
          <Icon icon="material-symbols:help-outline" width="24" height="24" />
          <span style={{marginLeft: '10px'}} className='align-middle'>FAQ</span>
        </DropdownItem>
        <DropdownItem onClick={() => dispatch(handleLogoutAction())} className='w-100'>
          <Icon icon="material-symbols:logout" width="24" height="24" />
          <span style={{marginLeft: '10px'}} className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown