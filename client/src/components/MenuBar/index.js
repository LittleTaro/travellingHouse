import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import { BsHouseDoorFill, BsHouseDoor, BsBagFill, BsBag, BsPerson, BsPersonFill } from "react-icons/bs";
import router from 'umi/router';
import PropTypes from 'prop-types';

import './index.less';

export default class MenuBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          title: '首页',
          link: '/',
          icon: <BsHouseDoor style={{ fontSize: '1.5rem' }} />,
          selectedIcon: <BsHouseDoorFill style={{ fontSize: '1.5rem' }} />,
        },
        {
          title: '订单',
          link: '/order',
          icon: <BsBag style={{ fontSize: '1.5rem' }} />,
          selectedIcon: <BsBagFill style={{ fontSize: '1.5rem' }} />,
        },
        {
          title: '我的',
          link: '/user',
          icon: <BsPerson style={{ fontSize: '1.5rem' }} />,
          selectedIcon: <BsPersonFill style={{ fontSize: '1.5rem' }} />,
        },
      ],
    };
  }

  render() {
    const { show, pathName } = this.props;

    return (
      <div className="menu-bar">
        <TabBar
          hidden={!show}
        >
          {
            this.state.items.map(item => (
              <TabBar.Item
                title={item.title}
                key={item.link}
                icon={item.icon}
                selectedIcon={item.selectedIcon}
                selected={pathName === item.link}
                onPress={() => router.push(item.link)}
              />
            ))
          }
        </TabBar>
      </div>
    )
  }
}

MenuBar.defaultProps = {
  show: false,
  pathName: ''
};

MenuBar.propTypes = {
  show: PropTypes.bool,
  pathName: PropTypes.string,
}