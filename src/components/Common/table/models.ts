import { ITableColumn } from '@models'

export interface IProp {
    columns: any[]
    data: any[]
    isEdited: boolean
    showOperating?: boolean
    api?: string
}

export interface IState {
    selectedRowKeys: number[]
    visible: boolean
}


