import { ITableColumn } from '@models'

export interface IProp {
    form: any
    onRef:  Function
}

export interface IState {
    selectedRowKeys: number[]
    visible: boolean
    isEdited: boolean
}


