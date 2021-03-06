import React, { useState, useEffect } from 'react';
import { List, ImagePicker, Toast, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { useStoreHook } from 'think-react-store';

function Edit(props) {
  const { user: { editUserAsync, getUserAsync, avatar, phone, sign, id } } = useStoreHook();
  const [files, setFiles] = useState([{ url: avatar }]);
  const { getFieldProps, validateFields } = props.form;
  const handleChange = (files) => {
    if (files[0]?.file?.size / 1024 / 1024 > 0.1) {
      Toast.fail('图片不能大于0.1M');
      return;
    }
    setFiles(files);
  };

  const handleSubmit = () => {
    if (!files.length) {
      Toast.fail('请上传图片');
      return;
    }
    validateFields((error, value) => {
      console.log(error);
      if (error) {
        Toast.fail('请将信息补充完整');
        return;
      } else {
        editUserAsync({
          avatar: files[0].url,
          phone: value.phone,
          sign: value.sign,
        })
      }
    })
  };

  useEffect(() => {
    getUserAsync({});
  }, [])

  return (
    <div className='user-edit'>
      <List>
        <ImagePicker
          files={files}
          selectable={files.length < 1}
          onChange={handleChange}
        />
        <InputItem
          {...getFieldProps('phone', {
            rules: [{ required: true }],
            initialValue: phone
          })}
          placeholder='电话'
        >
          电话：
        </InputItem>
        <InputItem
          {...getFieldProps('sign', {
            rules: [{ required: true }],
            initialValue: sign
          })}
          placeholder='签名'
        >
          签名：
        </InputItem>
      </List>
      <Button type='warning' style={{ marginTop: '20px' }}
        onClick={handleSubmit}
      >
        修改
      </Button>
    </div>
  )
};

export default createForm()(Edit);