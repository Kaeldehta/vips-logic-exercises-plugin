import Border from "./Border";

interface Props {
    times: number
}

export default ({times}: Props) => <>{Array(times).fill(0).map((_, index) => <Border key={index} />)}</>