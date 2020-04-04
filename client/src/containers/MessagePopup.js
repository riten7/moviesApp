import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'antd';

const MessagePopup = () => {
  const history = useHistory();

  const closeModal = () => {
    return history.push('/');
  };

  return (
    <>
        <Button type="primary" onClick={closeModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
        </Modal>
      </>
  )
}

export default MessagePopup;