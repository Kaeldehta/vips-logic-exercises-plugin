export const propRules = ["b-intro" , "i-intro" , "i-elim" , "raa" , "c-intro", "b-elim", "c-elim", "d-intro", "dn", "d-elim"];
export const predRules = [...propRules, 'u-elim', 'u-intro', 'e-intro', 'e-elim', 'id-intro','id-elim'];

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
        count: 5
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

export const predRulesOptions: Array<{value: typeof predRules[number], label: string, count: number}> = [
    ...propRulesOptions,
    {
        value: 'u-intro',
        label: '\u2200-Intro',
        count: 1
    },
    {
        value: 'u-elim',
        label: '\u2200-Elim',
        count: 1
    },
    {
        value: 'e-intro',
        label: '\u2203-Intro',
        count: 1
    },
    {
        value: 'e-elim',
        label: '\u2203-Elim',
        count: 3
    },
    {
        value: 'id-intro',
        label: '=-Intro',
        count: 0
    },
    {
        value: 'id-elim',
        label: '=-Elim',
        count: 2
    },

]