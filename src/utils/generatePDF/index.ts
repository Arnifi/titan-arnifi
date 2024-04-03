"use server";

import axios from "axios";

const generatePdfBuffer = async (htmlTemp: string) => {
  const data = { template: htmlTemp };
  const bufferResponse = await axios.post(
    // "http://localhost:4000/api/generate-pdf",
    "https://arnifi-pdf-generator.onrender.com/api/generate-pdf",
    data,
    {
      responseType: "arraybuffer",
    }
  );

  return bufferResponse.data;
};

export default generatePdfBuffer;
