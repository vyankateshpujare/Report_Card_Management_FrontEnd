import React, { useEffect, useState } from "react";
import ImgSrc from "../../images/DemoImage.png";
function ShowImage(props) {
  const { item } = props;
  const [image, setImage] = useState(ImgSrc);
  useEffect(() => {
    if (item?.profile) {
      function _arrayBufferToBase64(buffer) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
      const data = _arrayBufferToBase64(item?.profile?.data?.data);
      setTimeout(() => {
        setImage(`data:${item.profile?.mimetype};base64,` + data);
      }, 100);
    }
  }, [item]);
  return (
    <div className="flex w-full h-full">
      <img src={image} alt="image" className="w-full object-cover rounded-lg" />
    </div>
  );
}
export default ShowImage;
