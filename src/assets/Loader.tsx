import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'

export const Loader = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  return (
    <div>
      <Spin indicator={antIcon} />
    </div>
  )
}
