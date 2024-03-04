import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { MuiContentEditable } from "./Styles/MuiContentEditable";
import { Box } from "@mui/material";
import "./Styles/LexicalThemeStyle.css";
import editorConfig from "./config";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import MentionsPlugin from "./Plugins/MentionsPlugin";
import { $getRoot, $insertNodes, EditorState, LexicalEditor } from "lexical";
import { BeautifulMentionNode } from "lexical-beautiful-mentions";
import CodeHighlightPlugin from "./Plugins/CodeHighlightPlugin";
import ListMaxIndentLevelPlugin from "./Plugins/ListMaxIndentLevelPlugin";
import PlaygroundAutoLinkPlugin from "./Plugins/AutoLinkPlugin";
import Toolsbar from "./Toolsbar";
import {
  FormikComputedProps,
  FormikContextType,
  FormikValues,
  useFormikContext,
} from "formik";
import { ILegalDocument } from "@/app/api/legal-documents/legalDocument.model";

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

const ConvertToHtmlPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const { values, setFieldValue }: FormikContextType<FormikValues> =
    useFormikContext();
  useEffect(() => {
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
    editor.registerNodeTransform(BeautifulMentionNode, (textNode) => {
      textNode.__trigger = "";
    });

    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const tmp = $generateHtmlFromNodes(editor);
        return setFieldValue("htmlTemp", tmp);
      });
    });
  }, [editor, setFieldValue, values]);

  // editor.update(() => {
  //   const dom = parser.parseFromString(value, "text/html");
  //   const nodes = $generateNodesFromDOM(editor, dom);
  //   const root = $getRoot();

  //   if (!root.isEmpty()) {
  //     root.clear();
  //   }

  //   $insertNodes(nodes);
  // });

  // useEffect(() => {
  //   const parser = new DOMParser();

  //   if (value) {
  //     editor.update(() => {
  //       const dom = parser.parseFromString(value, "text/html");
  //       const nodes = $generateNodesFromDOM(editor, dom);
  //       const root = $getRoot();

  //       if (!root.isEmpty()) {
  //         root.clear();
  //       }

  //       $insertNodes(nodes);
  //     });
  //   }
  //   editor.registerNodeTransform(BeautifulMentionNode, (textNode) => {
  //     textNode.__trigger = "";
  //   });

  //   editor.registerUpdateListener(({ editorState }) => {
  //     editorState.read(() => {
  //       const tmp = $generateHtmlFromNodes(editor);
  //       console.log("html", tmp);
  //       // return setValue(docName, tmp);
  //     });
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // return null;
};

const handelOnChange = (
  editorState: EditorState,
  editor: LexicalEditor,
  tags: Set<string>
) => {
  // editor.update(() => {
  //   // if (!root.isEmpty()) {
  //   //   root.clear();
  //   // }
  // });
  // editorState.read(() => {
  //   const root = $getRoot();
  //   const selection = $getSelection();
  //   console.log(root, selection);
  // });
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
          <OnChangePlugin onChange={handelOnChange} />
          <HistoryPlugin />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MentionsPlugin data={document} />
          <PlaygroundAutoLinkPlugin />
          <CodeHighlightPlugin />
          <ListMaxIndentLevelPlugin />
          {/* <ConvertToHtmlPlugin /> */}
        </Box>
      </LexicalComposer>
    </Box>
  );
};

export default ArnifiRichEditor;
