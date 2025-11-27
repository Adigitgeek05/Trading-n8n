import { useCallback, useState } from "react";
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { TriggerSheet } from "./TriggerSheet";
import { PriceTrigger, type PriceTriggerNodeMetadata } from "@/nodes/Trigger/PriceTrigger";
import { Timer, type TimerNodeMetadata } from "@/nodes/Trigger/Timer";
import { Lighter, type TradingMetadata } from "@/nodes/action/Lighter";
import { ActionSheet } from "./ActionSheet";
import { Backpack } from "@/nodes/action/Backpack";
import { Hyperliquid } from "@/nodes/action/Hyperliquid";


const nodeTypes = {
  "price-trigger": PriceTrigger,
  "timer": Timer,
  "lighter": Lighter,
  "backpack": Backpack,
  "hyperliquid": Hyperliquid
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

export type NodeMetadata = TradingMetadata | PriceTriggerNodeMetadata | TimerNodeMetadata;

export function CreateWorkflow() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectAction, setSelectAction] = useState<{
   position: { x: number;
    y: number;
  },
  startinNodeId: string,
  } | null
  
  >(null);

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

const POSITION_OFFSET = 50;
  const onConnectEnd= useCallback((
    params, connectionInfo)=> {
      if(!connectionInfo.isValid)
      {
        setSelectAction({
          startinNodeId: connectionInfo.fromNode.id,
          position: {
            x: connectionInfo.from.x + POSITION_OFFSET,
            y: connectionInfo.from.y + POSITION_OFFSET,
          }
      })




    }},[] );

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
      {selectAction && <ActionSheet onSelect={(type, metadata: NodeMetadata) => {
   const nodeId=Math.random().toString();
    setNodes([
      ...nodes,
      {
        id: nodeId,
        type,
        data: {
          kind: "action",
          metadata,
          
        },
        position: selectAction.position,
      },
    ]);
    setEdges([...edges, {
      id: `${selectAction.startinNodeId}-${nodeId}`,
      source: selectAction.startinNodeId,
      target: nodeId,

    }])
    setSelectAction(null);
  }}/>}

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
