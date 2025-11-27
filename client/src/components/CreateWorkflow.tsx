import { useCallback, useState } from "react";
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { TriggerSheet } from "./TriggerSheet";
import { PriceTrigger } from "@/nodes/Trigger/PriceTrigger";
import { Timer } from "@/nodes/Trigger/Timer";

const nodeTypes = {
  "price-trigger": PriceTrigger,
  "timer": Timer,
};

export type NodeKind = "price-trigger" | "timer" | "hyperliquid" | "lighter";

interface NodeType {
   type: NodeKind;
  data: {
   
    kind: "action" | "trigger";
    metadata: NodeMetadata;
    label: string;
  };
  id: string;
  position: { x: number; y: number };
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

export type NodeMetadata = any;

export function CreateWorkflow() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );


  const onConnectEnd= useCallback((
    params, connectionInfo)=> {


    })

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {!nodes.length && (
        <TriggerSheet
  onSelect={(type, metadata: NodeMetadata) => {
    alert("hi there")
    setNodes([
      ...nodes,
      {
        id: Math.random().toString(),
        type,
        data: {
          kind: "trigger",
          
          metadata,
          
        },
        position: { x: 0, y: 0 },
      },
    ]);
  }}
/>

      )}

      <ReactFlow
      nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
      />
    </div>
  );
}
