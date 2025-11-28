import { useCallback, useState } from "react";
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { TriggerSheet } from "./TriggerSheet";
import { PriceTrigger} from "@/nodes/Trigger/PriceTrigger";
import { Timer} from "@/nodes/Trigger/Timer";
import { Lighter} from "@/nodes/action/Lighter";
import type { TradingMetadata } from "common/types";
import type { TimerNodeMetadata } from "common/types";
import type { PriceTriggerNodeMetadata } from "common/types";
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

  const styles = {
    page: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column" as const,
      background: "linear-gradient(180deg,#0f172a, #071029)",
      color: "#e6eef8",
      fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    },
    header: {
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 18px",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
      backdropFilter: "blur(6px)",
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: 0.2,
    },
    canvasWrap: {
      flex: 1,
      padding: 18,
      boxSizing: "border-box" as const,
    },
    canvas: {
      width: "100%",
      height: "100%",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 6px 30px rgba(2,6,23,0.6)",
      border: "1px solid rgba(255,255,255,0.03)",
      background: "linear-gradient(180deg, rgba(10,14,28,0.7), rgba(4,9,18,0.6))",
    },
    sheetModal: {
      position: "absolute" as const,
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
      zIndex: 50,
      minWidth: 420,
      maxWidth: "90%",
      borderRadius: 12,
      background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.015))",
      boxShadow: "0 10px 40px rgba(2,6,23,0.7)",
      padding: 18,
      border: "1px solid rgba(255,255,255,0.04)",
    },
    sheetBackdrop: {
      position: "absolute" as const,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(180deg, rgba(3,6,18,0.45), rgba(3,6,18,0.6))",
      zIndex: 45,
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={styles.title}>Workflow Builder</div>
          <div style={{ fontSize: 12, color: "rgba(230,238,248,0.7)" }}>Create and connect triggers & actions</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ padding: "8px 12px", borderRadius: 8, border: "none", background: "rgba(255,255,255,0.03)", color: "#e6eef8" }} onClick={() => setNodes([])}>Clear</button>
        </div>
      </div>

      <div style={styles.canvasWrap}>
        <div style={styles.canvas}>
          {!nodes.length && (
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <div style={styles.sheetBackdrop} />
              <div style={styles.sheetModal}>
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
                          label: type,
                        },
                        position: { x: 0, y: 0 },
                      },
                    ]);
                  }}
                />
              </div>
            </div>
          )}

          {selectAction && (
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <div style={styles.sheetBackdrop} />
              <div style={styles.sheetModal}>
                <ActionSheet
                  onSelect={(type, metadata: NodeMetadata) => {
                    const nodeId = Math.random().toString();
                    setNodes([
                      ...nodes,
                      {
                        id: nodeId,
                        type,
                        data: {
                          kind: "action",
                          metadata,
                          label: type,
                        },
                        position: selectAction.position,
                      },
                    ]);
                    setEdges([
                      ...edges,
                      {
                        id: `${selectAction.startinNodeId}-${nodeId}`,
                        source: selectAction.startinNodeId,
                        target: nodeId,
                      },
                    ]);
                    setSelectAction(null);
                  }}
                />
              </div>
            </div>
          )}

          <div style={{ width: "100%", height: "100%" }}>
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
        </div>
      </div>
    </div>
  );
}
