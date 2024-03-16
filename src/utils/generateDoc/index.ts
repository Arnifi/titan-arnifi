const generateDocBuffer = async (htmlTemp: string) => {
  const preHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>Export HTML To Doc</title>
      <style>
        <!-- Add any necessary CSS styles here -->
      </style>
    </head>
    <body>
  `;

  const postHtml = `</body></html>`;
  const buffer = preHtml + htmlTemp + postHtml;
  return buffer;
};

export default generateDocBuffer;
