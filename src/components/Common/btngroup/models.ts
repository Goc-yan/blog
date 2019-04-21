export interface IProp {
    isEdited: boolean
    selectedRowKeys: number[]
    handleDel: () => void
    handleAdd: () => void
    handleSwitch: () => void
}

export interface IState {
    visible: boolean
}