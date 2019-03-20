export interface IOption {
    router: string
    name: string
}

export interface INav {
    title: string
    options: IOption[]
}

export interface IProp {
    data: INav[]
}
