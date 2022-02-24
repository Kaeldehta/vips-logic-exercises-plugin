import React from "react";

const Border = () => <svg className="w-10 h-full">
    <line x1={"50%"} x2={"50%"} y1={"0%"} y2={"100%"} stroke="black"></line>
</svg>

export const AssumptionBorder = () => <svg className="w-10 h-full">
    <line x1={"50%"} x2={"50%"} y1={"50%"} y2={"100%"} stroke="black"></line>
    <line x1={"50%"} x2={"100%"} y1={"100%"} y2={"100%"} stroke="black"></line>
</svg>

export default Border;
    
