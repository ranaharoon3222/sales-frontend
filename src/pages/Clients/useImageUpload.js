import { useState } from 'react';

export const useImageUpload = () => {
  const [image, setImage] = useState(undefined);
  const [cnic_image, setCnicImage] = useState(undefined);

  const handleChange = async (e) => {
    const Formdata = new FormData();
    Formdata.append('files', e.target.files[0]);

    try {
      const file = await fetch('http://localhost:1337/upload', {
        method: 'POST',
        body: Formdata,
      });
      const data = await file.json();

      if (e.target.name === 'image') {
        file.status === 200 && setImage(data?.[0].id);
      } else if (e.target.name === 'cnic_image') {
        file.status === 200 && setCnicImage(data?.[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { handleChange, cnic_image, image };
};
