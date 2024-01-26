import React, {useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Form } from 'reactstrap'
import { Icon } from '@iconify/react';
import FileUploader from '../dropzone';

const FileUpload = ({ skin }) => {
    
    const [uploadModal, setUploadModal] = useState(false)
    const [files, setFiles] = useState([])

    const toggleUploadModal = () => {
        setFiles([])
        setUploadModal(!uploadModal)
    }

  return (
    <>
    <Icon icon="material-symbols:upload" width="22" height="22" onClick={toggleUploadModal} className={`cursor-pointer mt-3 ${skin === 'light' ? 'text-dark' : 'text-white'}`} style={{cursor: "pointer"}} />
    <div>
        <Modal isOpen={uploadModal} toggle={() => setUploadModal(!uploadModal)} className='modal-dialog-centered'>
            <Form id='form-modal-todo' className='todo-modal'>
                <ModalHeader toggle={() => setUploadModal(!uploadModal)}>Upload</ModalHeader>
                <ModalBody>
                    <div className='mb-2'>
                        <div className='form-check form-check-inline'>
                            <Input type='checkbox' defaultChecked disabled id='entityExtraction' />
                            <Label for='entityExtraction' className='form-check-label'>
                                Entity Extraction Processing
                            </Label>
                        </div>
                    </div>
                    <FileUploader/>
                    <hr />
                    <div className='mb-2'>
                        <Label className='form-label' >
                            File location is: abcxyz
                        </Label>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={() => setUploadModal(!uploadModal)} outline>
                        Cancel
                    </Button>{' '}
                    <Button color='primary'>
                        Submit
                    </Button>{' '}
                </ModalFooter>
            </Form>
        </Modal>
    </div>
</>
  )
}

export default FileUpload


   