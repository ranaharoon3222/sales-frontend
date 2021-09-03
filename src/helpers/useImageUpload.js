import { useState } from 'react';
import axios from 'axios';

export const useImageUpload = () => {
  const [image, setImage] = useState(undefined);
  const [cnic_image, setCnicImage] = useState(undefined);

  const handleChange = async (e) => {
    const Formdata = new FormData();
    Formdata.append('files', e.target.files[0]);
    const file = await axios.request({
      baseURL: 'http://localhost:1337',
      url: '/upload',
      method: 'POST',
      data: Formdata,
    });
    console.log(file);
    if (e.target.name === 'image') {
      file.status === 200 && setImage(file.data?.[0].id);
    } else if (e.target.name === 'cnic_image') {
      file.status === 200 && setCnicImage(file.data?.[0].id);
    }
  };

  return { handleChange, cnic_image, image };
};
