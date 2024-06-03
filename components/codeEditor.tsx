import React, { useRef, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import axios from 'axios';

const CodeEditor: React.FC = () => {
  const editorRef = useRef<any>(null);
  const [output, setOutput] = useState<string | null>(null);

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor;
  }

  async function handleExecuteCode() {
    const code = editorRef.current.getValue();
    try {
      const response = await axios.post('http://127.0.0.1:8000/execute', { code });
      setOutput(response.data.output || response.data.error);
    } catch (error) {
      setOutput('An error occurred while executing the code.');
    }
  }

  return (
    <div>
      <Editor
        height="50vh"
        defaultLanguage="python"
        defaultValue="# Write your code here"
        onMount={handleEditorDidMount}
      />
      <button onClick={handleExecuteCode} className="mt-2 px-4 py-2 bg-blue-500 text-white">
        Execute
      </button>
      {output && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Output:</h2>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
