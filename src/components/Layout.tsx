import React from 'react'
import { Layout, Menu, Message } from '@arco-design/web-react'
import { IconCalendar, IconPlusCircle } from '@arco-design/web-react/icon'
import Add from './add'

const Sider = Layout.Sider
const MenuItem = Menu.Item
const Header = Layout.Header
const Footer = Layout.Footer
const Content = Layout.Content

const LayoutFc: React.FC = () => {
  return (
    <Layout>
      <Sider className=' h-screen'>
        <div className=' text-center'>EmojiManager</div>
        <Menu
          defaultOpenKeys={['1']}
          defaultSelectedKeys={['1']}
          onClickMenuItem={(key) =>
            Message.info({
              content: `You select ${key}`,
              showIcon: true,
            })
          }
          style={{ width: '100%' }}
        >
          <MenuItem key='1'>
            <IconPlusCircle />
            表情添加
          </MenuItem>
          <MenuItem key='2'>
            <IconCalendar />
            表情管理
          </MenuItem>
          <MenuItem key='3'>
            <IconCalendar />
            表情包商店
          </MenuItem>
          <MenuItem key='4'>
            <IconCalendar />
            表情包制作
          </MenuItem>
          <MenuItem key='5'>
            <IconCalendar />
            设置
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header className=' text-center'>表情添加</Header>
        <Layout style={{ padding: '0 24px' }}>
          <Content>
            <Add/>
          </Content>
          <Footer></Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default LayoutFc
