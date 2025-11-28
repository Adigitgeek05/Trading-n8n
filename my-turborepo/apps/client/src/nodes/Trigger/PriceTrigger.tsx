import {Handle ,Position} from "@xyflow/react";
import  { type PriceTriggerNodeMetadata } from "common/types";


export function PriceTrigger({data}: {
    data: {
        metadata: PriceTriggerNodeMetadata
    },
    isConnectable: boolean
} )
{
    return <div className="p-4 border">
        {data.metadata.price} 
        {data.metadata.asset}
        <Handle type="source" position={Position.Right}></Handle>
    </div>
}