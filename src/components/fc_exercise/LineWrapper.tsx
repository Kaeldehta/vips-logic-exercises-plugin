import { ReactNode } from "react";

interface Props {
    children: ReactNode
    height: string
    head?: ReactNode
}

export default ({children, height, head}: Props) => <div className={"group flex justify-start gap-2 items-stretch " + height}><div className="w-8">{head}</div>{children}</div>