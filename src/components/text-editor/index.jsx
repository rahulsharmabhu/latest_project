import { Button, Card, Input, Row } from "antd";
import React, { useRef, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import './editor.css'

const SunTextEditor = ({ initialTemplateName = "", initialTempVar = [] }) => {
  const [templateName, setTemplateName] = useState(initialTemplateName);
  const [tempVar, setTempVar] = useState(initialTempVar);

  /**
   * @type {React.MutableRefObject<SunEditor>} get type definitions for editor
   */
  const editor = useRef();
  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };
  const handleCreate = () => { };

  return (
    <div className="m-3">
      <Row>
        <Input
          addonBefore="Template Name"
          placeholder="Enter template name"
          addonAfter={
            <Button className="btn btn-primary d-flex" type="primary" onClick={handleCreate}>
              Create Template
            </Button>
          }
          value={templateName}
          onChange={(e) => {
            setTemplateName(e.target.value);
          }}
          type="text"
          name="templateName"
          id="templateName"
        />
      </Row>
      <Row>
        <SunEditor
          setOptions={{
            buttonList: [
              ["font", "fontSize", "formatBlock"],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
              ],
              ["align", "horizontalRule", "list", "table"],
              ["fontColor", "hiliteColor"],
              ["outdent", "indent"],
              ["undo", "redo"],
              ["removeFormat"],
              ["outdent", "indent"],
              ["link", "image"],
              ["preview", "print"],
              ["fullScreen", "showBlocks", "codeView"],
            ],
          }}
          getSunEditorInstance={getSunEditorInstance}
          height="30vh"
        />
      </Row>
      <Row>
        {tempVar?.map((variable, index) => (
          <span className="m-10" key={index}>
            {variable}
          </span>
        ))}
      </Row>
    </div>
  );
};
export default SunTextEditor;