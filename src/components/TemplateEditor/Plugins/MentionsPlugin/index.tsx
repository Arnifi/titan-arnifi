import { BeautifulMentionsPlugin } from "lexical-beautiful-mentions";
import { Combobox, ComboboxItem } from "./Combobox";
import { getVariableKeys } from "./GetVariableKeys";
import { ILegal } from "@/components/Tables";

const MentionsVarible = ({ data }: { data: ILegal }) => {
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
