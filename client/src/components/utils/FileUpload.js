import React from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios';
import { useState } from 'react';
function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    Axios.post('/api/product/uploadImage', formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setImages([...Images, response.data.image]);
        props.refreshFunction([...Images, response.data.image]);
      } else {
        alert('Failed to save the Image in server');
      }
    });

    // save the Image we chose inside the Node Server
  };

  const onDelete = (index) => {
    const newImages = Images.filter((image) => image !== index);
    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={80000000000}>
        {({ getRootProps, getInputProps }) => (
          <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }} {...getRootProps()}>
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: '3rem' }} />
          </div>
        )}
      </Dropzone>
      <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
        {Images.map((image, index) => (
          <div key={index} onClick={() => onDelete(image)}>
            <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:5000/${image}`} alt={`productImg-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
