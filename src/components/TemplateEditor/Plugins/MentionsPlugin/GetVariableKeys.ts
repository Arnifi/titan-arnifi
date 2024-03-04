import { IFieldsBlock } from "@/app/api/fields-blocks/fieldsBlock.model";
import { IFormStep } from "@/app/api/form-steps/formStep.model";
import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";

export const getVariableKeys = (data: ILegalDocument) => {
  const variableKeys: {
    label: string;
    key?: string;
    value?: { key: string; value: string };
  }[] = [];

  const formSteps = data?.steps as IFormStep[];

  formSteps.map((step) => {
    const lebel = step?.label;
    step.blocks.map((block: IFieldsBlock | string) => {
      if (typeof block !== "string") {
        if (block.type === "Single") {
          block?.fields?.map((field) => {
            if (typeof field !== "string") {
              variableKeys.push({
                label: `{{${lebel.split(" ").join("")}_${field.label
                  .split(" ")
                  .join("")}}}`,
              });
            }
          });
        } else if (block.type === "Multiple") {
          block?.fields?.map((field) => {
            if (typeof field !== "string") {
              variableKeys.push({
                label: `{{${lebel.split(" ").join("")}_[ ]_${field.label
                  .split(" ")
                  .join("")}}}`,
              });
            }
          });
        }
      }
    });
  });

  // formSteps.forEach((step) => {
  //   if (step.docId === docId) {
  //     const stepFields = stepperFields.filter(
  //       (field) => field.stepId === step.id && docId === step.docId
  //     );

  //     stepFields.forEach((field) => {
  //       if (field.docId === docId && field.stepId === step.id) {
  //         const fieldInputs = stepInputFields.filter(
  //           (input) => input.fieldId === field.id
  //         );

  //         fieldInputs.map((input) => {
  //           variableKeys.push({
  //             label: `{{${step.label
  //               .split(" ")
  //               .join("")}_${input.name.toUpperCase()}}}`,
  //             key: `${step.label
  //               .split(" ")
  //               .join("")}_${input.name.toUpperCase()}`,
  //             value: { key: step.label, value: input.name },
  //           });
  //         });
  //       }
  //     });
  //   }
  // });

  return variableKeys;
};
