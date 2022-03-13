export const propRules = ["b-intro" , "i-intro" , "i-elim" , "raa" , "c-intro", "b-elim", "c-elim", "d-intro", "dn", "d-elim"];
export const predRules = [...propRules];

export const propRulesOptions: Array<{value: typeof propRules[number], label: string, count: number}> = 
[
    {
        value: "i-intro",
        label: "\u2192-Intro",
        count: 2,
    },
    {
        value: "i-elim",
        label: "\u2192-Elim",
        count: 2,
    },
    {
        value: "b-intro",
        label: "\u2194-Intro",
        count: 2,
    },
    {
        value: "b-elim",
        label: "\u2194-Elim",
        count: 2,
    },
    {
        value: "c-intro",
        label: "\u2227-Intro",
        count: 2
    },
    {
        value: "c-elim",
        label: "\u2227-Elim",
        count: 1
    },
    {
        value: "d-intro",
        label: "\u2228-Intro",
        count: 1
    },
    {
        value: "d-elim",
        label: "\u2228-Elim",
        count: 4
    },
    {
        value: "raa",
        label: "RAA",
        count: 2,
    },
    {
        value: "dn",
        label: "DN",
        count: 1
    }
]

export const predRulesOptions: Array<{value: typeof predRules[number], label: string}> = [
    ...propRulesOptions
]