
export const SUPPORTED_ASSETS = ["SOL", "ETH", "BTC", "USDC"];
export type TradingMetadata={
    type: "LONG" | "SHORT";
    qty: number;
    symbol: typeof SUPPORTED_ASSETS; 
}

export type TimerNodeMetadata= {
    time: string;
};

export type PriceTriggerNodeMetadata= {
    price: number,
    asset: string,
    
};
