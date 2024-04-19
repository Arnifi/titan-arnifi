import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useEffect, useMemo, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { MuiContentEditable } from "./Styles/MuiContentEditable";
import { Box } from "@mui/material";
import "./Styles/LexicalThemeStyle.css";
import editorConfig from "./config";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import MentionsPlugin from "./Plugins/MentionsPlugin";
import {
  $createTextNode,
  $getRoot,
  $getSelection,
  $insertNodes,
  EditorState,
  LexicalNode,
} from "lexical";
import { BeautifulMentionNode } from "lexical-beautiful-mentions";
import CodeHighlightPlugin from "./Plugins/CodeHighlightPlugin";
import ListMaxIndentLevelPlugin from "./Plugins/ListMaxIndentLevelPlugin";
import PlaygroundAutoLinkPlugin from "./Plugins/AutoLinkPlugin";
import Toolsbar from "./Toolsbar";
import { FormikContextType, FormikValues, useFormikContext } from "formik";
import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";
import StickyToolsbar from "./Toolsbar/StickyToolsbar";

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

const ConvertToHtmlPlugin: React.FC<{ docName: string }> = ({ docName }) => {
  const [editor] = useLexicalComposerContext();
  const { values, setFieldValue }: FormikContextType<FormikValues> =
    useFormikContext();

  useMemo(() => {
    if (values?.htmlTemp) {
      const parser = new DOMParser();
      editor.update(() => {
        const dom = parser.parseFromString(values?.htmlTemp, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);
        const root = $getRoot();

        if (!root.isEmpty()) {
          root.clear();
        }

        $insertNodes(nodes);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  useMemo(() => {
    editor.registerNodeTransform(BeautifulMentionNode, (textNode) => {
      textNode.__trigger = "";

      const strongNode = $createTextNode(textNode.getTextContent());
      textNode.replace(strongNode);
    });
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const temp = $generateHtmlFromNodes(editor);
        return setFieldValue("htmlTemp", temp);
      });
    });
  }, [editor, setFieldValue]);

  return null;
};

const ArnifiRichEditor = ({ document }: { document: ILegalDocument }) => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <StickyToolsbar />
      <Toolsbar />
      <MyCustomAutoFocusPlugin />
      <Box sx={{ position: "relative" }}>
        <RichTextPlugin
          contentEditable={<MuiContentEditable />}
          placeholder={<Box></Box>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <MentionsPlugin data={document} />
        <PlaygroundAutoLinkPlugin />
        <CodeHighlightPlugin />
        <ListMaxIndentLevelPlugin />
        <ConvertToHtmlPlugin docName={document?.title} />
      </Box>
    </LexicalComposer>
  );
};

export default ArnifiRichEditor;
