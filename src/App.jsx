import React, { useState, useCallback, useMemo } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./customNode";
import Sidebar from "./sideBar";

const initialNodes = [
  {
    id: "1",
    data: { label: "Hello" },
    position: { x: 0, y: 0 },
    type: "custom",
  },
  {
    id: "2",
    data: { label: "World" },
    position: { x: 50, y: 50 },
    type: "custom",
  },
];

const initialEdges = [];

const nodeTypes = {
  custom: CustomNode,
};

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [customMessage, setCustomMessage] = useState("Message");

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params) => {
      const { source, target } = params;

      const sourceHasEdge = edges.some((edge) => edge.source === source);

      if (!sourceHasEdge) {
        setEdges((eds) => addEdge(params, eds));
      } else {
        alert("Source node can only connect to one edge.");
      }
    },
    [edges],
  );

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = event.target.getBoundingClientRect();
    const data = JSON.parse(
      event.dataTransfer.getData("application/reactflow"),
    );
    const { nodeType, message } = data;
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };
    const newNode = {
      id: `${nodes.length + 1}`,
      type: nodeType,
      position,
      data: { label: message },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar
        customMessage={customMessage}
        setCustomMessage={setCustomMessage}
      />
      <div
        style={{ flex: 1, position: "relative" }}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;
