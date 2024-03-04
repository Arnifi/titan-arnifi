import { IFieldsBlock } from "@/app/dashboard/legals-docs/step-fields/[id]/page";
import { IFormField } from "@/components/Drawers/FormFieldsDrawer";
import { ILegal } from "@/components/Tables";

export const getVariableKeys = (data: ILegal) => {
  const variableKeys: {
    label: string;
    key?: string;
    value?: { key: string; value: string };
  }[] = [];

  const formSteps = data?.steps;

  formSteps.map((step) => {
    const lebel = step?.label;
    step.blocks.map((block: IFieldsBlock) => {
      if (block.type === "Single") {
        block?.fields?.map((field: IFormField) => {
          variableKeys.push({
            label: `{{${lebel.split(" ").join("")}_${field.label
              .split(" ")
              .join("")}}}`,
          });
        });
      } else if (block.type === "Multiple") {
        block?.fields?.map((field: IFormField) => {
          variableKeys.push({
            label: `{{${lebel.split(" ").join("")}_[ ]_${field.label
              .split(" ")
              .join("")}}}`,
          });
        });
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
