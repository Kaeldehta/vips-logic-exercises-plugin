import type { ReactNode } from "react";

interface Props {
    children: ReactNode
}

export default ({children}: Props) => 
<div className={"h-16 group flex justify-start gap-2 items-center"}>
    {children}
</div>