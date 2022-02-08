export const propRules = ["b-intro" , "i-intro" , "i-elim" , "raa" , "c-intro", "b-elim", "c-elim", "d-intro", "dn", "d-elim"];
export const predRules = [...propRules];

export const propRulesOptions: Array<{value: typeof propRules[number], label: string}> = 
[
    {
        value: "i-intro",
        label: "\u2192-Intro"
    },
    {
        value: "i-elim",
        label: "\u2192-Elim"
    },
    {
        value: "b-intro",
        label: "\u2194-Intro"
    },
    {
        value: "b-elim",
        label: "\u2194-Elim"
    },
    {
        value: "c-intro",
        label: "\u2227-Intro"
    },
    {
        value: "c-elim",
        label: "\u2227-Elim"
    },
    {
        value: "d-intro",
        label: "\u2228-Intro"
    },
    {
        value: "d-elim",
        label: "\u2228-Elim"
    },
    {
        value: "raa",
        label: "RAA",
    },
    {
        value: "dn",
        label: "DN",
    }
]

export const predRulesOptions: Array<{value: typeof predRules[number], label: string}> = [
    ...propRulesOptions
]