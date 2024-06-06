import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr");

  try {
    const res = await axios.post(
      // import.meta.env.VITE_UPLOAD_LINK,
      //"https://api.cloudinary.com/v1_1/lamadev/image/upload",
      "https://api.cloudinary.com/v1_1/dtnyk8grl/image/upload?fbclid=IwAR2z2S47YXUei6Ai5M9AR1QXONENXcE1Fb6HN6L1GaGvDR1wM0fcuvEhmJQ",
      data
    );

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;
