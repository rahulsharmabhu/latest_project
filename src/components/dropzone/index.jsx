// ** React Imports
import {  Fragment } from 'react'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, ListGroup, ListGroupItem } from 'reactstrap'
import React, {useState} from 'react'
import { toast } from 'react-toastify'
import { useDropzone } from 'react-dropzone'
import { X, DownloadCloud, FileText } from 'react-feather'
import { Icon } from '@iconify/react'

const ErrorToast = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <h6 className='toast-title'>Error!</h6>
      </div>
      {/* <small className='text-muted'>a second ago</small> */}
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
      You can only upload PDF, Word document or TXT files.
      </span>
    </div>
  </Fragment>
)

const FileUploader = props => {
  // ** State
  const [files, setFiles] = useState([])
//   const {
//     files,
//     setFiles
//   } = props


  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: 'application/pdf, application/msword, text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    maxFiles:1,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length) {
        toast.error(<ErrorToast />, { icon: false, hideProgressBar: true, position: 'bottom-right' })
      } else {
        setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
      }
    }
  })

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const renderFileSize = size => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  const renderFilePreview = () => {
    return <FileText size='28' />
  }

  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>
        <div className='file-preview me-1'>{renderFilePreview(file)}</div>
        </div>
        <div>
          <p className='file-name mb-0'>{file.name}</p>
          <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
        <X size={15} />
      </Button>
    </ListGroupItem>
  ))

  return (
    <Card>
      <CardBody>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className='d-flex align-items-center justify-content-center flex-column mt-1'>
            <Icon icon='uil:file-upload-alt' width={40} height={40} />
            <p className='text-secondary p-1'>
              <a href='/' onClick={e => e.preventDefault()}>
                Click to upload
              </a>{' '}
              or drag and drop <br/>
            <p className='text-center'>Max file size 5MB</p>
            </p>
          </div>
        </div>
        {files.length ? (
          <Fragment>
            <ListGroup className='my-2'>{fileList}</ListGroup>
            {/* <div className='d-flex justify-content-end'>
              <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                Remove File
              </Button>
              <Button color='primary'>Upload File</Button>
            </div> */}
          </Fragment>
        ) : null}
      </CardBody>
    </Card>
  )
}

export default FileUploader
