import { Dispatch, SetStateAction } from "react";

const prientAsPDF = async (
  temp: string,
  fileName: string,
  setPdfLoading: Dispatch<SetStateAction<boolean>>
) => {
  const html2pdf = (await import("html2pdf.js")).default;

  const options = {
    filename: `${fileName}`,
    margin: 20,
    image: { type: "jpeg", quality: 3 },
    jsPDF: { unit: "mm", format: "A4" },
    pagebreak: { mode: "auto" },
  };

  html2pdf()
    .from(temp)
    .set(options)
    .toPdf()
    .get("pdf")
    .then((pdf: any) => {
      let totalPage = pdf.internal.getNumberOfPages();

      for (let i = 1; i <= totalPage; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setFontSize(10);
        const text = "Page - " + i + " of " + totalPage;
        const textWidth =
          pdf.getStringUnitWidth(text) * pdf.internal.getFontSize();
        const textHeight = pdf.internal.getLineHeight();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const x = pageWidth - textWidth + 20;
        const y = pageHeight - textHeight - 0;
        pdf.text(text, x, y);
      }

      const pdfDataUri = pdf.output("datauristring");
      const browserWindow = window.open("", "_blank");

      if (browserWindow) {
        setPdfLoading(false);
        browserWindow.document.write(
          '<iframe src="' +
            pdfDataUri +
            '" style="position:absolute; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" frameborder="0"></iframe>'
        );
      }
    })
    .save();
};

export default prientAsPDF;
