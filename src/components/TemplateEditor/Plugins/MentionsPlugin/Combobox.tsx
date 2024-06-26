import {
  BeautifulMentionsComboboxItemProps,
  BeautifulMentionsComboboxProps,
} from "lexical-beautiful-mentions";
import { forwardRef } from "react";

export const Combobox = forwardRef<any, BeautifulMentionsComboboxProps>(
  ({ loading, ...other }, ref) => {
    if (loading) {
      return (
        <div
          ref={ref}
          className="h-full overflow-hidden rounded-b bg-popover p-3 text-sm text-popover-foreground"
        >
          <div className="">Loading...</div>
        </div>
      );
    }
    return (
      <ul
        ref={ref}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          listStyle: "none",
          width: "400px",
          background: "#fff",
          border: "1px solid #ccc",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          padding: "5px",
          margin: "0",
          overflow: "scroll",
          overflowY: "scroll",
          maxHeight: "300px",
        }}
        {...other}
      />
    );
  }
);
Combobox.displayName = "Combobox";

export const ComboboxItem = forwardRef<
  HTMLLIElement,
  BeautifulMentionsComboboxItemProps
>(({ selected, itemValue, ...props }, ref) => (
  <li
    ref={ref}
    style={{
      cursor: "pointer",
      fontWeight: "bold",
      padding: "5px",
      fontSize: "12px",
      borderRadius: "5px",
      ...(selected && {
        background: "#eee",
      }),
    }}
    {...props}
    data-itemvalue={itemValue}
  />
));

ComboboxItem.displayName = "ComboboxItem";
