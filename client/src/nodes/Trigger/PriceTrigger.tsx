import {Handle ,Position} from "@xyflow/react";
export type PriceTriggerNodeMetadata= {
    price: number,
    asset: string,
    
};


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