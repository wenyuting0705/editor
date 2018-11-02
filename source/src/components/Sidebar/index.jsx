import React, { Component } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './index.scss';

const SubMenu = Menu.SubMenu;
const NavObject = [
  {
    name: 'editor',
    key: '/index',
    iconType: 'form',
    path: '/index',
    children: null
  }
];
export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathName: location.href.split('#')[1] === '/' ? '/databox/daily' : location.href.split('#')[1],
      openKeys: [],
      rootSubmenuKeys: []
    };
  }
  componentDidMount() {
    this.getData();
  }
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({
        openKeys,
        // pathName: location.href.split('#')[1]
       });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
        pathName: location.href.split('#')[1],
      });
    }
  }
  getData() {
    const { pathName } = this.state;
    const open = pathName.split('/')[1];
    if (open) {
      this.setState({
        openKeys: [open],
      });
    }
  }
  toggleStatus = () => {
    this.setState({
      pathName: location.href.split('#')[1],
    });
  }
  rootSubmenuKeys = NavObject.map(item => (
    item.key
  ));
  render() {
    const { pathName, openKeys } = this.state;
    return (
      <div>
        <Menu theme='dark' mode='inline' selectedKeys={[pathName]} openKeys={openKeys} onOpenChange={this.onOpenChange} onClick={this.toggleStatus}>
          {
            NavObject.map(item => (
              item.children === null ?
                (<Menu.Item key={item.key}>
                  <NavLink to={item.path} replace>
                    <Icon type={item.iconType} />
                    <span>{item.name}</span>
                  </NavLink>
                </Menu.Item>) : (
                  <SubMenu
                    key={item.key}
                    title={<span><Icon type={item.iconType} /><span>{item.name}</span></span>}
                  >
                    {
                      item.children.map(items => (
                        <Menu.Item key={items.key}>
                          <NavLink to={items.path} replace>
                            <span>{items.name}</span>
                          </NavLink>
                        </Menu.Item>
                      ))
                    }
                  </SubMenu>
                )
            ))
          }
        </Menu>
      </div>
    );
  }
}
