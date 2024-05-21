import React from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        padding: 10,
        border: "1px solid #777",
        borderRadius: 5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100px",
        background: "#fff",
        position: "relative",
        textAlign: "center",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        isConnectable={true}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
        isConnectable={true}
      />
    </div>
  );
};

export default CustomNode;
