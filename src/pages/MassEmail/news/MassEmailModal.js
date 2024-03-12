import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Icon } from "components/Component";

const MassEmailModal = ({ isOpen, toggle, newsData }) => {
  if (!newsData) {
    // Handle the case where newsData is null or undefined
    return null; // or display a message, or render an empty state
  }

  const { subject, html } = newsData;

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle} className="bg-info text-white">
        View News
      </ModalHeader>
      <ModalBody>
        <div className="mb-3">
          <strong className="text-success">Title:</strong>{" "}
          <span className="text-black bg-light p-2 d-block">{subject}</span>
        </div>
        <div>
          <strong className="text-success">Content:</strong>{" "}
          <span className="text-black bg-light p-2 d-block">{html}</span>
        </div>
        {/* Add other fields like date here */}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" className="text-danger" onClick={toggle}>
          <Icon name="x"></Icon> Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MassEmailModal;
