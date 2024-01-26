import React, {useState} from 'react'
import { Button } from "reactstrap";
import { Icon } from '@iconify/react';
import '../../../assets/css/esm.css'
import CollectionPanel from './collection-panel';

const Collections = () => {
  
  const [openCollection, setOpenCollectionPanel] = useState(false)

  return (
    <>
    <div className='col-md-12'>
      { openCollection ? '' : <Button className="btn-icon border-0 shadow-none collection_wrapper convention_13 m-3" onClick={() => {setOpenCollectionPanel(!openCollection)}}>
      Add Collection
      <Icon
      className="text-white mb-1"
      icon="ic:baseline-plus"
      width="20"
      height="20"
      />
  </Button>}       
    </div>
    <CollectionPanel openCollection={openCollection} />
    </>
  )
}

export default Collections