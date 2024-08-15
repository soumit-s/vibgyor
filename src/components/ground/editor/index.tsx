import { Monaco, Editor as MonacoEditor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import EditorIcon from "@/components/svg/Markup1.svg";

interface EditorProps {
  value: string,
  onChange?(content: string | undefined): void;
}

const Editor = ({ onChange, value }: EditorProps) => {
  const handleEditorBeforeMount = (monaco: Monaco) => setupEditor(monaco);

  return (
    <div className="h-full w-[30em] rounded-lg overflow-hidden border border-outline bg-primary flex flex-col">
      <div className="p-3 border-b border-outline flex items-center gap-4">
        <EditorIcon className="w-5 h-5 stroke-foreground" /> Editor
      </div>
      <MonacoEditor
        className="h-full w-full py-2"
        theme="OneDarkPro"
        beforeMount={handleEditorBeforeMount}
        options={editorOptions}
        onChange={onChange}
        value={value}
      ></MonacoEditor>
    </div>
  );
};

function setupEditor(monaco: Monaco) {
  monaco.editor.defineTheme("OneDarkPro", {
    base: "vs-dark",
    inherit: true,
    rules: [
      {
        token: "comment",
        foreground: "#5d7988",
        fontStyle: "italic",
      },
      { token: "constant", foreground: "#e06c75" },
    ],
    colors: {
      "editor.background": "#0b0f0d",
      "editor.foreground": "#97afa5",
    },
  });
}

const editorOptions = {
  fontFamily: "Fira Code",
  fontLigatures: true,
  tabSize: 2,
  minimap: { enabled: false },
  wordWrap: "on",
  renderLineHighlight: "none",
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 3,
  scrollbar: {
    vertical: "auto",
    verticalSliderSize: 8,
    verticalScrollbarSize: 8,
  },
} satisfies editor.IStandaloneEditorConstructionOptions;

export default Editor;
