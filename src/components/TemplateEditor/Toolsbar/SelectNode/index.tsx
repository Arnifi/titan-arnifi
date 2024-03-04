import { $isAtNodeEnd } from "@lexical/selection";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  Key,
  ChangeEvent,
} from "react";

interface SelectProps {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  options: string[];
  value: string;
}

export const Select: React.FC<SelectProps> = ({
  onChange,
  className,
  options,
  value,
}) => (
  <select className={className} onChange={onChange} value={value}>
    <option hidden={true} value="" />
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export const GetSelectedNode = (selection: any) => {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  return isBackward
    ? $isAtNodeEnd(focus)
      ? anchorNode
      : focusNode
    : $isAtNodeEnd(anchor)
    ? focusNode
    : anchorNode;
};
