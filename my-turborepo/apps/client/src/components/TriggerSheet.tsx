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
import type { PriceTriggerNodeMetadata } from "common/types";


import type { TimerNodeMetadata } from "common/types";
import { SUPPORTED_ASSETS } from "common/types";



type NodeMetadata = any;

const SUPPORTED_TRIGGERS = [{
    id: "timer",
    title: "Timer",
    description: "Trigger that activates at specified time intervals.",

},
{
    id: "price-trigger",
    title: "Price Trigger",
    description: "Trigger based on asset price movements.",
}]



export const TriggerSheet = (
    {
        onSelect
}: {
        onSelect: (kind: NodeKind, metadata: NodeMetadata) => void
    }
) => {
    const [metadata, setMetadata] =  useState<PriceTriggerNodeMetadata | TimerNodeMetadata>({time: 3600 });
    const [selectedTrigger, setSelectedTrigger] = useState(SUPPORTED_TRIGGERS[0].id);
     return (
    <Sheet open={true}>
      
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Select the type of trigger you would like to add to your workflow.
             <Select value={selectedTrigger} onValueChange={(value)=> setSelectedTrigger(value)}>
                <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Trigger" />
                </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                
                {SUPPORTED_TRIGGERS.map(({id , title, description})=><>
              
                
                <SelectItem key={id} 
                
                value={id}>{title}</SelectItem>
                <SelectLabel>{description}</SelectLabel>
                </>)}
            
          
        </SelectGroup>
      </SelectContent>
    </Select>
    {selectedTrigger === "timer" && <div>
      <div className="pt-4">
        Number of seconds after which to run the timer
      </div>
      
       <Input value={metadata.time} onChange={(e)=> setMetadata(metadata => ({
        ...metadata,
        time: Number(e.target.value)
      })
      )}></Input>
    </div>}
    {selectedTrigger === "price-trigger" && <div>
      Price: 
      <Input type="text" onChange={(e) => setMetadata(m=> ({
        ...m,
        price:Number(e.target.value)
      }))}></Input>

      Asset
      <Select value={metadata.asset} onValueChange={(value)=> setMetadata(metadata => ({
        ...metadata,
        asset: value
      })
      )}>
                <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an asset" />
                </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                
                {SUPPORTED_ASSETS.map((id)=><>
              
                
                <SelectItem key={id} 
                
                value={id}>{id}</SelectItem>
                
                </>)}
            
          
        </SelectGroup>
      </SelectContent>
    </Select>
      
    </div>}

          </SheetDescription>
        </SheetHeader>
        
        <SheetFooter>
          <Button onClick={() => {
            onSelect(
                selectedTrigger,
                metadata)
            }} type="submit">Create Trigger</Button>
          
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
    
}