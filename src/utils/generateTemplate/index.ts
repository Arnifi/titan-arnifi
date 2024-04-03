import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";
import { ITemplate } from "@/app/api/templates/templates.model";
import { getVariableKeys } from "@/components/TemplateEditor/Plugins/MentionsPlugin/GetVariableKeys";
import { FormikValues } from "formik";
import Handlebars from "handlebars";

const generateTemplate = (
  document: ILegalDocument,
  formValues: FormikValues
): string => {
  const docTemplate = document?.template as ITemplate;

  const sourceTemp = docTemplate?.htmlTemp;
  const template = Handlebars.compile(sourceTemp);
  const formVariables = getVariableKeys(document);

  const variablesObj: { [key: string]: string } = formVariables.reduce(
    (acc, item) => {
      const { label, key } = item;
      const keyArray = key?.split(".") as string[];
      const objectKey = label.replace(/{{|}}/g, "");

      const objectValue =
        formValues[keyArray[0] as string]?.[keyArray[1] as string]?.[
          keyArray[2] as string
        ];

      if (label) {
        acc[objectKey] = objectValue;
      }
      return acc;
    },
    {} as Record<string, any>
  );

  // @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap")

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${document?.title.toLocaleUpperCase()}</title>  

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" />
    </head>
    <body style="padding: 20px; height: 100%; width:8in; margin: 0 auto" >
      ${template(variablesObj)}
    </body>
  </html>
  `;
};

export default generateTemplate;
