import type { NodeKind } from "./CreateWorkflow";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useState } from "react";


import type { TradingMetadata } from "@/nodes/action/Lighter";




type NodeMetadata = any;

const SUPPORTED_ACTIONS = [{
    id: "hyperliquid",
    title: "Hyperliquid",
    description: "Place a trade on hyperliquid",

},
{
    id: "lighter",
    title: "Lighter",
    description: "Place a trade on lighter",
},
{
    id: "backpack",
    title: "Backpack",
    description: "Place a trade on backpack",
}]

const SUPPORTED_ASSETS = [
  "BTC-PERP",
  "ETH-PERP",
  "SOL-PERP",
];

const LONG = "LONG";
const SHORT = "SHORT";



export const ActionSheet = (
    {
        onSelect
}: {
        onSelect: (kind: NodeKind, metadata: NodeMetadata) => void
    }
) => {
    const [metadata, setMetadata] =  useState<TradingMetadata | {}>({});
    const [selectedAction , setSelectedAction] = useState(SUPPORTED_ACTIONS[0].id);
     return (
    <Sheet open={true}>
      
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Select the type of trigger you would like to add to your workflow.
             <Select value={selectedAction} onValueChange={(value)=> setSelectedAction(value)}>
                <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Trigger" />
                </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                
                {SUPPORTED_ACTIONS.map(({id , title, description})=><>
              
                
                <SelectItem key={id} 
                
                value={id}>{title}</SelectItem>
                <SelectLabel>{description}</SelectLabel>
                </>)}
            
          
        </SelectGroup>
      </SelectContent>
    </Select>
    {(selectedAction === "hyperliquid" || selectedAction === "lighter" || selectedAction === "backpack") && <div>
      <div className="pt-4">
      Type
      </div>
      <Select value={metadata?.type} onValueChange={(value)=> setMetadata(metadata => ({
        ...metadata,
        type: value
      })
      )}>
                <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an asset" />
                </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                <SelectItem  value={LONG}>LONG</SelectItem>
                 <SelectItem  value={SHORT}>SHORT</SelectItem>
            </SelectGroup>
      </SelectContent>
    </Select>
      
      <div className="pt-4">
      Symbol
      </div>
         <Select value={metadata?.symbol} onValueChange={(value)=> setMetadata(metadata => ({
        ...metadata,
        symbol: value
      })
      )}>
                <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a symbol" />
                </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                {SUPPORTED_ASSETS.map(asset => <SelectItem key={asset} value={asset}>{asset}</SelectItem>)}
            </SelectGroup>
      </SelectContent>
    </Select>
     
    <div className="pt-4">
      Qty
      </div>
      
       <Input value={metadata.qty} onChange={(e)=> setMetadata(metadata => ({
        ...metadata,
        qty: Number(e.target.value)
      })
      )}></Input>
    </div>}
    

          </SheetDescription>
        </SheetHeader>
        
        <SheetFooter>
          <Button onClick={() => {
            onSelect(
                selectedAction,
                metadata)
            }} type="submit">Create Trigger</Button>
          
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
    
}