import React, { useState } from "react";
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Modal/Backdrop/Backdrop";
function Events() {
  const [modalShown, setModalShown] = useState(false);

  const showModal = () => {
    setModalShown(!modalShown);
  };

  const confirmModal = () => {
    setModalShown(false);
  };
  const cancelModal = () => {
    setModalShown(false);
  };
  return (
    <>
      {modalShown && <Backdrop />}
      {modalShown && (
        <Modal
          title="Modal Content"
          cancel
          confirm
          onCancel={cancelModal}
          onConfirm={confirmModal}
        >
          Modal content
        </Modal>
      )}
      <div>
        <h1>Events</h1>
        <button onClick={showModal}>Create event</button>
      </div>
    </>
  );
}

export default Events;
