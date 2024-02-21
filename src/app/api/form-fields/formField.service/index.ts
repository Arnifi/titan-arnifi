import { ObjectType } from "dynamoose/dist/General";
import Form_Fields, { IFormField } from "../formField.model";
import Form_Steps, { IFormStep } from "../../form-steps/formStep.model";
import dynamoose from "dynamoose";

const findAll = async (): Promise<ObjectType> => {
  const response = await Form_Fields.scan().exec();
  return (await response).sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : 1;
  });
};

const findOne = async (id: string): Promise<IFormField> => {
  const response = await Form_Fields.get(id);
  return (await response?.populate())?.toJSON() as IFormField;
};

const create = async (data: IFormField) => {
  const result = await Form_Fields.create(data);

  if (result?.id) {
    await Form_Steps.update(
      { id: data.step },
      {
        fields: [
          ...(await Form_Steps.get(data?.step as string))?.fields,
          result.id,
        ],
      }
    );
  }
  return result;
};

const updateOne = async (id: string, data: IFormField) => {
  const result = await Form_Fields.update({ id }, data);
  return result;
};

const deleteOne = async (id: string, step: IFormStep) => {
  const remainFormFields = step.fields.filter((fieldID) => {
    return fieldID !== id;
  });

  await dynamoose.transaction([
    Form_Fields.transaction.delete(id),
    Form_Steps.transaction.update(
      { id: step?.id },
      { fields: remainFormFields }
    ),
  ]);
};

const isExists = async (data: IFormField) => {
  const { step, name, label, type } = data;
  const result = (
    await Form_Fields.scan({ step, name, label, type }).exec()
  ).toJSON();

  return result;
};

export const FormFieldService = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne,
  isExists,
};
