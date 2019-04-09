import { Obj } from '@models'

export type iGetUrlParams = () => Obj

export type iGetCookie = (cname: string, defaultValue?: string) => string

export type iSetCookie = (cname: string, cvalue: string, day?: number, path?: string) => void

export type iDeleteCookie = (cname: string) => void
