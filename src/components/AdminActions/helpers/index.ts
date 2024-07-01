import { IUploadImage } from "@/lib/Redux/features/companyApplication/companyApplicationSlice";

export const pdfUrlToImgBlob = async (file: IUploadImage) => {
  const { pdfjs } = await import("react-pdf");
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

  try {
    const pdfResponse = await fetch(file?.url, {
      mode: "cors",
    });

    const pdfBlob = await pdfResponse.blob();
    const arrayBuffer = await pdfBlob.arrayBuffer();

    const loadingTask = pdfjs.getDocument(new Uint8Array(arrayBuffer));
    const pdf = await loadingTask.promise;

    const pageNumber = 1;
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    if (!context) {
      throw new Error("Failed to get canvas context");
    }

    await page.render({ canvasContext: context, viewport }).promise;

    const imageUrl = canvas.toDataURL("image/png");

    return imageUrl;
  } catch (error) {
    console.error("Error converting PDF to image:", error);
    throw error;
  }
};
