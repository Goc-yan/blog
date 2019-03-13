import * as React from 'react'

import { Breadcrumb } from 'antd'

interface Prop {
  data: string[]
}

export default function (props: Prop) {
  return (
    <Breadcrumb className="mar-16-0">
      {props.data.map((nav, index) => <Breadcrumb.Item key={index}>{nav}</Breadcrumb.Item>)}
    </Breadcrumb>
  )
}