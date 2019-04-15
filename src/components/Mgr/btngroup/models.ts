export interface IProp {
    isEditor: boolean
    selectedRowKeys: number[]
    handleDel: () => void
    handleAdd: () => void
    handleSwitch: () => void
}
