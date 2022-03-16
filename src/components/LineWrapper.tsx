import type { ReactNode } from "react";

interface Props {
    children: ReactNode
    className?: string
}

export default ({children, className=""}: Props) => 
<div className={"h-16 group min-w-fit flex justify-start gap-2 items-center " + className}>
    {children}
</div>