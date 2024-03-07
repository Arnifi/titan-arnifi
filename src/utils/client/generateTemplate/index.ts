import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";
import { ITemplate } from "@/app/api/templates/templates.model";
import { getVariableKeys } from "@/components/TemplateEditor/Plugins/MentionsPlugin/GetVariableKeys";
import { FormikValues } from "formik";
import Handlebars from "handlebars";

const generateTemplate = (
  document: ILegalDocument,
  formValues: FormikValues
): string => {
  // const storedData = localStorage.getItem("form-data");
  const docTemplate = document?.template as ITemplate;

  const sourceTemp = docTemplate?.htmlTemp;
  const template = Handlebars.compile(sourceTemp);
  const formVariables = getVariableKeys(document);
  // const formValues = JSON.parse(storedData as string) as FormikValues;

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

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${document?.title.toLocaleUpperCase()}</title>  
    </head>
    <body style="padding: 20px; height: 100%; width:8in; margin: 0 auto" >
      ${template(variablesObj)}
    </body>
  </html>
  `;
};

export default generateTemplate;
