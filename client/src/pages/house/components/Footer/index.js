import React, { useState, useEffect } from 'react';
import { Modal, TextareaItem, Button, Toast } from 'antd-mobile';
import { useStoreHook } from 'think-react-store';
import { useLocation } from 'react-router-dom';

export default function (props) {
  const [commentsValue, setCommentsValue] = useState();
  const [showModal, setShowModal] = useState(false);
  const { house: { addCommentsAsync } } = useStoreHook();
  const { query } = useLocation();

  const handleClick = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const handleChange = (value) => {
    setCommentsValue(value);
  };
  const handleSubmit = () => {
    if (commentsValue) {
      console.log(commentsValue);
      addCommentsAsync({
        comment: commentsValue,
        houseId: query?.id,
      });
    } else {
      Toast.fail('请输入评论');
    }
    
    setShowModal(false);
  }
  useEffect(() => {

  }, [])

  return (
    <div>
      <div className='footer' onClick={handleClick}>
        评论~
      </div>
      <Modal
        className='comment-modal'
        popup
        visible={showModal}
        onClose={handleClose}
        animationType='slide-up'
      >
        <TextareaItem className="popup-textarea"
          closeble='true'
          placeholder='请输入评论'
          rows={3}
          count={200}
          onChange={handleChange}
        />
        <Button className='comment-btn' type='warning' onClick={handleSubmit}>评论</Button>
      </Modal>
    </div>
  )
}