import React, { useState } from "react";
import SettingsPanel from "./SettingsPanel";

const Sidebar = ({ customMessage, setCustomMessage }) => {
  const [isEditing, setIsEditing] = useState(false);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType, message: customMessage }),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = (message) => {
    setCustomMessage(message);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return isEditing ? (
    <SettingsPanel
      initialMessage={customMessage}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  ) : (
    <aside
      style={{
        padding: "10px",
        width: "200px",
        background: "#f0f0f0",
      }}
    >
      <div
        onDragStart={(event) => onDragStart(event, "custom")}
        draggable
        onDoubleClick={handleDoubleClick}
        style={{
          padding: "10px",
          border: "1px solid #ddd",
          background: "#fff",
          cursor: "move",
          marginBottom: "10px",
          display: "flex",
          flexDirection: "column",
          gap: ".1rem",
        }}
      >
        <img src="message.svg" height={25} width={25} />
        <h4 style={{ margin: "0" }}>{customMessage}</h4>
      </div>
    </aside>
  );
};

export default Sidebar;
