export type Task = {
    answers: [{
        consequence: string,
        statements: string[],
        predicateLogic: boolean
    }?]
}