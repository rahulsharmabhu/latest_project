import React, { useState, useEffect, forwardRef } from 'react'
import Logo from '../../../components/logo/Logo'
import { data, columns } from './collection-mock-data'
import ExpandableData from './expandable-data'
import ReactPaginate from 'react-paginate'
import DataTable, { createTheme } from 'react-data-table-component'
import {
  Card,
  Input,
  CardBody,
  Label,
  Col,
  Row
} from 'reactstrap'
import { Icon } from "@iconify/react"
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'
import PerfectScrollbar from "react-perfect-scrollbar";
import { useSkin } from '../../../app-redux/hooks/useSkin'


const CollectionResults = () => {

  const [collectionData, setCollectionData] = useState()
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const { skin } = useSkin()

  useEffect(() => {
    setCollectionData(data)
  }, [data])

  const BootstrapCheckbox = forwardRef((props, ref) => (
    <div className='form-check'>
      <Input type='checkbox' ref={ref} {...props} />
    </div>
  ))

    // ** Function to handle filter
    const handleFilter = e => {
      const value = e.target.value
      let updatedData = []
      setSearchValue(value)
  
      const status = {
        1: { title: 'In Progress', color: 'info' },
        2: { title: 'Completed', color: 'success' },
        3: { title: 'Queued', color: 'primary'}
      }

      const networks = {
        1: {title: 'Facebook', icon: <Icon icon="ri:facebook-fill" width={20} height={20}/>},
        2: {title: 'Instagram', icon: <Icon icon="mdi:instagram" width={20} height={20}/>},
        3: {title: 'Twitter', icon: <Icon icon="mdi:twitter" width={20} height={20}/>}
      }
  
      if (value.length) {
        updatedData = collectionData.filter(item => {
          const startsWith =
            item.targetName.toLowerCase().startsWith(value.toLowerCase()) ||
            item.jobId.toLowerCase().startsWith(value.toLowerCase()) ||
            item.created.toLowerCase().startsWith(value.toLowerCase()) ||
            item.collected.toLowerCase().startsWith(value.toLowerCase()) ||
            item.city.toLowerCase().startsWith(value.toLowerCase()) ||
            item.experience.toLowerCase().startsWith(value.toLowerCase()) ||
            item.post.toLowerCase().startsWith(value.toLowerCase()) ||
            status[item.status].title.toLowerCase().startsWith(value.toLowerCase()) ||
            networks[item.network].title.toLowerCase().startsWith(value.toLowerCase())
  
          const includes =
            item.targetName.toLowerCase().includes(value.toLowerCase()) ||
            item.jobId.toLowerCase().includes(value.toLowerCase()) ||
            item.created.toLowerCase().includes(value.toLowerCase()) ||
            item.collected.toLowerCase().includes(value.toLowerCase()) ||
            item.city.toLowerCase().includes(value.toLowerCase()) ||
            item.experience.toLowerCase().includes(value.toLowerCase()) ||
            item.post.toLowerCase().includes(value.toLowerCase()) ||
            status[item.status].title.toLowerCase().includes(value.toLowerCase()) ||
            networks[item.network].title.toLowerCase().startsWith(value.toLowerCase())
  
          if (startsWith) {
            return startsWith
          } else if (!startsWith && includes) {
            return includes
          } else return null
        })
        setFilteredData(updatedData)
        setSearchValue(value)
      }
    }

  const showLogoMessage = () => ( <div>
      <Logo height={120} width={300}/>
      <h5 className='result_wrapper'>There are no active collections</h5>
      </div> )

   // ** Function to handle Pagination
   const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  createTheme('dark', {
    background: {
      default: '#242525',
    }
  }, 'dark');

  createTheme('light', {
    background: {
      default: '#fff',
    }
  }, 'light');

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel='< previous'
      nextLabel='next >'
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(collectionData.length / 7) || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
    />
  )
  
  return ( collectionData ? <PerfectScrollbar options={{ wheelPropagation: false }}
    containerRef={ref => {
        if (ref) {
            ref._getBoundingClientRect = ref.getBoundingClientRect
            ref.getBoundingClientRect = () => {
                const original = ref._getBoundingClientRect()
                return { ...original, height: Math.floor(original.height) }
            }
        }
    }}>
    <Card>
    <CardBody className='p-0 result_data_wrapper'>
    <Row className='justify-content-end mx-0'>
    <Col className='d-flex align-items-center justify-content-end mt-3 convention_14' md='4' sm='6'>
      <Label className='me-1 pt-1' for='search-input'>
        Search
      </Label>
      <Input
        className='dataTable-filter mb-50'
        type='text'
        bsSize='sm'
        id='search-input'
        value={searchValue}
        onChange={handleFilter}
      />
    </Col>
  </Row>
  <div className='react-dataTable react-dataTable-selectable-rows collection_result_table mt-2'>
      <DataTable
        pagination
        selectableRows
        columns={columns}
        expandableRows
        paginationPerPage={7}
        expandOnRowClicked
        className='react-dataTable'
        sortIcon={<ChevronDown size={10} />}
        paginationComponent={CustomPagination}
        paginationDefaultPage={currentPage + 1}
        expandableRowsComponent={ExpandableData}
        selectableRowsComponent={BootstrapCheckbox}
        data={searchValue.length ? filteredData : collectionData }
        theme={skin === 'dark' ? 'dark' : 'light'}
      />
    </div>
    </CardBody>
  </Card></PerfectScrollbar> :  showLogoMessage())
    
}

export default CollectionResults