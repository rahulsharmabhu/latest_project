import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "flexlayout-react/style/dark.css";
import "../../custom.css";

const Alert = ({ isOpen, toggleModal, handleOkClick, handleCancelClick }) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Warning!</ModalHeader>
        <ModalBody>
          <p>You're shifting to next video, previous data will be lost.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleOkClick}>
            OK
          </Button>
          <Button color="secondary" onClick={handleCancelClick}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Alert;