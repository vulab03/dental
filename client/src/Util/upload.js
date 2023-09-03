import axios from "axios";

const uploadFile = (imageInput,callback) => {
    const uploadData = new FormData();
    uploadData.append("file", imageInput, "file");
    axios
      .post(`${process.env.REACT_APP_SERVER_URI}/file/upload`, uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        callback(res)
      })
      .catch((err) => console.log(err));
};

export default uploadFile