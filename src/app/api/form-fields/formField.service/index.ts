import { ObjectType } from "dynamoose/dist/General";
import Form_Fields, { IFormField, IFormFieldFilters } from "../formField.model";
import Fields_Block, {
  IFieldsBlock,
} from "../../fields-blocks/fieldsBlock.model";
import dynamoose from "dynamoose";

const findAll = async (
  filtersOptions: IFormFieldFilters
): Promise<ObjectType> => {
  const conditions: IFormFieldFilters = {};

  if (filtersOptions.blockId) {
    conditions.block = filtersOptions.blockId;
  }

  const response = await Form_Fields.scan({ ...conditions }).exec();

  return response;
};

const findOne = async (id: string): Promise<IFormField> => {
  const response = await Form_Fields.get(id);
  return (await response?.populate())?.toJSON() as IFormField;
};

const create = async (data: IFormField) => {
  const result = await Form_Fields.create(data);

  if (result?.id) {
    await Fields_Block.update(
      { id: data.block },
      {
        fields: [
          ...(await Fields_Block.get(data?.block as string))?.fields,
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

const deleteOne = async (id: string, fieldsBlock: IFieldsBlock) => {
  const remainFormFields = fieldsBlock.fields.filter((fieldId) => {
    return fieldId !== id;
  });

  await dynamoose.transaction([
    Form_Fields.transaction.delete(id),
    Fields_Block.transaction.update(
      { id: fieldsBlock?.id },
      {
        fields: remainFormFields,
      }
    ),
  ]);
};

const isExists = async (data: IFormField) => {
  const { block, label, type } = data;
  const result = (
    await Form_Fields.scan({ block, label, type }).exec()
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
