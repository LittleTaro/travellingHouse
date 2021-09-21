import React, { useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { timer } from '@/utils';

export default function (props) {
  const [state, setState] = useState()

  const renderBtn = () => {
    console.log('po',props.order);
    if (!props.order?.id) {   // 该订单不存在
      return (<Button className='info-btn' type='warning' onClick={() => props.handleBtnClick()}>预定</Button>);
    }
    if (props.order?.isPaid === 1) {
      return (<Button className='info-btn' type='ghost'>居住中</Button>);
    }
    if (props.order?.isPaid === 0) {
      return (<Button className='info-btn' type='ghost' onClick={() => props.handleBtnClick(props.order?.id)}>取消预定</Button>);
    }
  }


  useEffect(() => {

  }, [])

  return (
    <div className='info'>
      <div className='info-title'>{props?.info?.name}</div>
      <div className='info-msg'>简介：{props?.info?.info}</div>
      <div className='info-price'>价格：{props?.info?.price}</div>
      <div className='info-time'>发布时间：{timer(props?.info?.publishTime)}</div>
      <div className='info-time'>开始出租：{timer(props?.info?.startTime, '')}</div>
      <div className='info-time'>结束出租：{timer(props?.info?.endTime, '')}</div>
      {renderBtn()}
    </div>
  )
}