import React, { useState } from "react";

const SettingsPanel = ({ initialMessage, onSave, onCancel }) => {
  const [message, setMessage] = useState(initialMessage);

  const handleSave = () => {
    onSave(message);
  };

  return (
    <div style={{ padding: "10px", width: "200px", background: "#f0f0f0" }}>
      <h3>Settings Panel</h3>
      <div>
        <label>
          Custom Message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%", marginTop: "10px" }}
          />
        </label>
      </div>
      <button onClick={handleSave} style={{ marginTop: "10px" }}>
        Save
      </button>
      <button
        onClick={onCancel}
        style={{ marginTop: "10px", marginLeft: "10px" }}
      >
        Cancel
      </button>
    </div>
  );
};

export default SettingsPanel;
