import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Info from './components/Info';
import Lists from './components/Lists';
import { useStoreHook } from 'think-react-store';
import { useObserverHook } from '@/hooks';
import { CommonEnum } from '@/enums';
import { useLocation } from 'react-router';

import './index.less';

export default function (props) {
  const { query } = useLocation();
  const { house: { detail, getDetailAsync, comments,
    getCommentsAsync, reloadComments, reloadCommentsNum,
    showLoading, resetData, order, hasOrderAsync, addOrderAsync, delOrderAsync,
  } } = useStoreHook();

  const handleBtnClick = (id) => {
    if (!id) {  // 将预定->取消预定
      addOrderAsync({
        id: query?.id
      });
      hasOrderAsync({     // 判断用户是否预定该房
        id: query?.id
      });
    } else {
      delOrderAsync({
        id: query?.id
      })
    }
  };

  useObserverHook('#' + CommonEnum.LOADING_ID, (entries) => {
    console.log(entries);
    if (comments && comments.length && showLoading && entries[0].isIntersecting) {
      reloadComments();
    }
  }, [comments, showLoading])

  useEffect(() => {
    getDetailAsync({
      id: query?.id
    });
  }, []);

  useEffect(() => {
    getCommentsAsync({
      id: query?.id
    });
  }, [reloadCommentsNum]);

  useEffect(() => {
    hasOrderAsync({     // 判断用户是否预定该房
      id: query?.id
    })
  }, []);

  useEffect(() => {
    return () => {
      resetData({
        detail: {}
      });
    }
  },[]);

  return (
    <div className='house-page'>
      <Banner banner={detail?.banner} />
      <Info info={detail?.info} order={order} handleBtnClick={handleBtnClick}/>
      <Lists lists={comments} showLoading={showLoading} />
      <Footer />
    </div>
  )
}