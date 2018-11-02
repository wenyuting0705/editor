import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import Sidebar from '../../components/Sidebar';
import './index.scss';

const { Header, Content, Sider } = Layout;
class LayoutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      height: `${document.documentElement.clientHeight}px`
    };
  }
  toggle = () => {
    console.log(this.props);
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    console.log(this.state.height);
    return (
      <Layout style={{ minHeight: this.state.height }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className='logo'>
            BeTime
          </div>
          <Sidebar />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default LayoutContainer;
