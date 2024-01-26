import React, {useState} from 'react'
import CInput from '../../../components/custom-input'
import { Button, Card, CardBody, Input } from "reactstrap";
import { useFormik } from 'formik';
import PerfectScrollbar from "react-perfect-scrollbar";
import { Icon } from '@iconify/react';
import FileUploader from '../../../components/dropzone';


const CollectionPanel = (props) => {
  
 const {openCollection} = props
 const [addUploadOperation, setAddUploadOperation] = useState('')
 const [aboutScroll, setAboutScroll] = useState(10)
 const [postScroll, setPostScroll] = useState(10)
 const [commentScroll, setCommentScroll] = useState(10)
 const [friendScroll, setFriendScroll] = useState(10)

 const formik = useFormik({
    initialValues: {
      createTask: "",
      targetUrl: "",
      collectionDetails: "",
      about: false,
      aboutScroll : aboutScroll,
      posts: false,
      postsScroll: postScroll,
      comments: false,
      commentsScroll: commentScroll,
      friends: false,
      friendsScroll: friendScroll,
    },
    onSubmit: (values) => {
      handleDownload();
    },
  });

  const targetUrl = (action) => {
      setAddUploadOperation(action)
  }

  const min = 0;
  const max = 20;

  const setMinMax = (inputValue) => {
    return Math.max(min, Math.min(max, Number(inputValue)));
  }

  const handleCommentChange = (e) => {
    const value = setMinMax(e.target.value)
    setCommentScroll(value)
  }

  const handlePostChange = (e) => {
    const value = setMinMax(e.target.value)
    setPostScroll(value)
  }

  const handleFriendChange = (e) => {
    const value = setMinMax(e.target.value)
    setFriendScroll(value)
  }

  const handleAboutChange = (e) => {
    const value = setMinMax(e.target.value)
    setAboutScroll(value)
  }

  return (
    <PerfectScrollbar options={{ wheelPropagation: true }}
    containerRef={ref => {
        if (ref) {
            ref._getBoundingClientRect = ref.getBoundingClientRect
            ref.getBoundingClientRect = () => {
                const original = ref._getBoundingClientRect()
                return { ...original, height: Math.floor(original.height) }
            }
        }
    }}>
    <Card className='m-0'>
      {openCollection &&
      <CardBody className='create_collection_wrapper convention_13'>
      <form>
        <div className="form-group mt-1">
            <div className="form-check form-switch">
                <label className="form-check-label" for="flexSwitchCheckDefault">Create Task</label>
                <CInput
                name="createTask"
                className="form-check-input"
                value={formik.values.createTask}
                onBlur={formik.handleBlur}
                role="switch" 
                id="flexSwitchCheckDefault"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleFileName(e); // Call handleFileName function
                }}
                type="checkbox"
              />
            </div>
        </div>
        <div className="form-group mt-3">
            <div className='col-12 col-md-12 col-sm-12 col-xs-12 d-flex'>
                <div className="col-md-6 form-check form-switch">
                    <label className="form-check-label" for="flexSwitchCheckDefault">Collect</label>
                    <CInput
                    name="createTask"
                    className="form-check-input"
                    value={formik.values.createTask}
                    onBlur={formik.handleBlur}
                    role="switch" 
                    id="flexSwitchCheckDefault"
                    onChange={(e) => {
                    formik.handleChange(e);
                    handleFileName(e); // Call handleFileName function
                    }}
                    type="checkbox"
                />
                </div>
                <div className="col-md-6 form-check form-switch">
                <label className="form-check-label" for="flexSwitchCheckDefault">Monitor</label>
                <CInput
                name="createTask"
                className="form-check-input"    
                value={formik.values.createTask}
                onBlur={formik.handleBlur}
                role="switch" 
                id="flexSwitchCheckDefault"
                onChange={(e) => {
                formik.handleChange(e);
                handleFileName(e); // Call handleFileName function
                }}
                type="checkbox"
                />
            </div>
            </div>
        </div>
        <div className="form-group mt-3">            
            <label className='form-label'>Collection Details</label><br/>
            <div>
            <label className='form-label text-secondary'>Description</label>
            <CInput
            name="collectionDetails"
            className="custom-input form-control form-control-sm text-white"
            value={formik.values.collectionDetails}
            rows={4}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Type your text here..."
            type="textarea"
            />
            </div>
        </div>
        <div className="form-group mt-3">
            <div className='col-12 col-md-12 col-sm-12 col-xs-12 d-flex gap-2'>
                <div className="col-md-6">
                <Button className="btn-sm btn-icon border-0 shadow-none add_button" onClick={() => targetUrl('add')}>Add</Button>
                </div>
                <div className="col-md-6">
                <Button className="btn-sm btn-icon border-0 shadow-none upload_button" onClick={() => targetUrl('upload')}>Upload</Button>
                </div>
            </div>
            <div className='col-12 col-md-12 col-sm-12 col-xs-12'>
              {addUploadOperation === 'add' ? 
              <div className='mt-3'>
              <label className="form-label" for="flexSwitchCheckDefault">Target Url</label>
              <Input
                name="targetUrl"
                value={formik.values.targetUrl}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                formik.handleChange(e);
                }}
                type="text"
              />
              </div> : addUploadOperation === 'upload' ?  <div className='mt-3'><FileUploader/></div> : '' 
            }
        </div>
        </div>
        <div className="form-group mt-3">
        <label className='form-label'>Collection Parameters</label>
        <div className='col-12 col-md-12 col-sm-12 col-xs-12 d-flex'>
            <div className="col-md-6 form-check form-switch mt-1">
                <label className="form-check-label" for="flexSwitchCheckDefault">About</label>
                <CInput
                name="createTask"
                className="form-check-input"
                value={formik.values.about}
                onBlur={formik.handleBlur}
                role="switch" 
                id="flexSwitchCheckDefault"
                onChange={(e) => {
                formik.handleChange(e);
                }}
                type="checkbox"
            />
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <label className="form-label pe-2" for="flexSwitchCheckDefault">Scrolls</label>
              <Input
              name="createTask"
              value={aboutScroll}
              onChange={(e) => handleAboutChange(e)}
              type="number"
              />
           </div>
        </div>
        <div className='col-12 col-md-12 col-sm-12 col-xs-12 d-flex mt-3'>
          <div className="col-md-6 form-check form-switch mt-1">
            <label className="form-check-label" for="flexSwitchCheckDefault">Posts</label>
            <CInput
            name="createTask"
            className="form-check-input"
            value={formik.values.posts}
            onBlur={formik.handleBlur}
            role="switch" 
            id="flexSwitchCheckDefault"
            onChange={(e) => {
            formik.handleChange(e);
            }}
            type="checkbox"
            />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <label className="form-label pe-2" for="flexSwitchCheckDefault">Scrolls</label>
            <Input
            name="createTask"
            value={postScroll}
            onChange={(e) => handlePostChange(e)}
            type="number"
            />
        </div>
        </div>
        <div className='col-12 col-md-12 col-sm-12 col-xs-12 d-flex mt-3'>
                  <div className="col-md-6 col-md-6 col-sm-6 col-xs-6 form-check form-switch mt-1">
                  <label className="form-check-label" for="flexSwitchCheckDefault">Comments</label>
                  <CInput
                  name="createTask"
                  className="form-check-input"
                  value={formik.values.comments}
                  onBlur={formik.handleBlur}
                  role="switch" 
                  id="flexSwitchCheckDefault"
                  onChange={(e) => {
                  formik.handleChange(e);
                  }}
                  type="checkbox"
              />
              </div>
              <div className="col-md-6 col-md-6 col-sm-6 col-xs-6 d-flex align-items-center">
              <label className="form-label pe-2" for="flexSwitchCheckDefault">Scrolls</label>
              <Input
              name="createTask"
              value={commentScroll}
              onChange={(e) => handleCommentChange(e)}
              type="number"
              />
          </div>
        </div>
        <div className='col-12 col-md-12 col-sm-12 col-xs-12 d-flex mt-3'>
          <div className="col-md-6 col-md-6 col-sm-6 col-xs-6 form-check form-switch mt-1">
            <label className="form-check-label" for="flexSwitchCheckDefault">Friends</label>
            <CInput
            name="createTask"
            className="form-check-input"
            value={formik.values.friends}
            onBlur={formik.handleBlur}
            role="switch" 
            id="flexSwitchCheckDefault"
            onChange={(e) => {
            formik.handleChange(e);
            }}
            type="checkbox"
            />
          </div>
          <div className="col-md-6 col-md-6 col-sm-6 col-xs-6 d-flex align-items-center">
            <label className="form-label pe-2" for="flexSwitchCheckDefault">Scrolls</label>
            <Input
              name="createTask"
              value={friendScroll}
              onChange={(e) => handleFriendChange(e)}
              type="number"
              />
          </div>
        </div>
        <div className="form-group mt-3">
        <label className='form-label'>Account</label>
          <div className='col-12 col-md-12 col-sm-12 col-xs-12 d-flex gap-2'>
              <div className="col-md-6">
              <Button className="btn-sm btn-icon border-0 shadow-none account_system_button" onClick={() => targetUrl}>System</Button>
              </div>
              <div className="col-md-6">
              <Button className="btn-sm btn-icon border-0 shadow-none account_select_button" onClick={() => targetUrl}>Select</Button>
              </div>
          </div>
       </div>
       <div className="form-group mt-3">
       <label className='form-label'>Account Details</label>
       <div className='col-12 col-md-12 col-sm-12 col-xs-12 d-flex'>
           <Button className="btn-sm btn-icon border-0 shadow-none systm_default_button" onClick={() => targetUrl}>System Default</Button>
       </div>
      </div>
      <div className="form-group mt-3">
      <Button className="btn-sm btn-icon border-0 shadow-none mb-3 create_collection_button" style={{minWidth: '280px'}} color='primary' onClick={() => targetUrl}>Create Collection
      <Icon
            className="text-white mb-1"
            icon="ic:baseline-plus"
            width="20"
            height="20"
            />
      </Button>
        </div>
     </div>
      </form>
      </CardBody>
    }
    </Card>
    </PerfectScrollbar>
  )
}

export default CollectionPanel