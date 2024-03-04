import { BeautifulMentionsPlugin } from "lexical-beautiful-mentions";
import { Combobox, ComboboxItem } from "./Combobox";
import { getVariableKeys } from "./GetVariableKeys";
import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";

const MentionsVarible = ({ data }: { data: ILegalDocument }) => {
  const mentionItems = {
    "@": getVariableKeys(data).map((item) => item.label),
  };

  return (
    <BeautifulMentionsPlugin
      items={mentionItems}
      allowSpaces
      menuItemLimit={20}
      menuComponent={Combobox}
      menuItemComponent={ComboboxItem}
    />
  );
};

export default MentionsVarible;
