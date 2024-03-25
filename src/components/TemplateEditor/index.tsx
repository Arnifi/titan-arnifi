import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useEffect, useMemo } from "react";
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

      // const temp = $generateHtmlFromNodes(editor);
      // const parser = new DOMParser();
      // const dom = parser.parseFromString(temp, "text/html");
      // const mentienElements = dom.querySelectorAll(
      //   "[data-lexical-beautiful-mention]"
      // );
      // if (mentienElements.length) {
      //   mentienElements?.forEach((element) => {
      //     element.removeAttribute("data-lexical-beautiful-mention");
      //     element.removeAttribute("data-lexical-beautiful-mention-value");
      //     element.removeAttribute("data-lexical-beautiful-mention-trigger");
      //     element.setAttribute("style", "white-space: pre-wrap;");
      //   });

      //   // const editorState = editor.parseEditorState(
      //   //   JSON.stringify(editorNodes)
      //   // );
      //   // editor.setEditorState(editorNodes);

      //   // editor.setEditorState(dom);

      //   editor.update(() => {
      //     const root = $getRoot();

      //     if (!root.isEmpty()) {
      //       root.clear();
      //     }

      //     $insertNodes($generateNodesFromDOM(editor, dom));
      //   });
      // }
    });
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const temp = $generateHtmlFromNodes(editor);
        const parser = new DOMParser();
        const dom = parser.parseFromString(temp, "text/html");
        const mentienElements = dom.querySelectorAll(
          "[data-lexical-beautiful-mention]"
        );

        if (mentienElements.length) {
          mentienElements.forEach((element) => {
            element.removeAttribute("data-lexical-beautiful-mention");
            element.removeAttribute("data-lexical-beautiful-mention-value");
            element.removeAttribute("data-lexical-beautiful-mention-trigger");
            element.setAttribute(
              "style",
              "white-space: pre-wrap; font-weight: bold;"
            );

            const strongElement = document.createElement("strong");
            strongElement.setAttribute("class", "editor-text-bold");
            strongElement.innerHTML = element.innerHTML;
            element.replaceWith(strongElement);
          });
        }

        return setFieldValue("htmlTemp", dom.body.innerHTML);
      });
    });
  }, [editor, setFieldValue]);

  return null;
};

const ArnifiRichEditor = ({ document }: { document: ILegalDocument }) => {
  return (
    <Box>
      <LexicalComposer initialConfig={editorConfig}>
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
    </Box>
  );
};

export default ArnifiRichEditor;
