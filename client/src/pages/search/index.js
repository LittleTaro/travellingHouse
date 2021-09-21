import React, { useState, useEffect } from 'react';
import { SearchBar, ActivityIndicator } from 'antd-mobile';
import { useHttpHook, useObserverHook, useImgHook } from '@/hooks';
import { useLocation } from 'react-router';
import { ShowLoading } from '@/components';
import { CommonEnum } from '@/enums';
import router from 'umi/router';

import './index.less';

export default function(props){
  const { query } = useLocation();
  console.log(query);
  const [page, setPage] = useState(CommonEnum.PAGE)
  const [houseLists, setHouseLists] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [houseSubmitName, setHouseSubmitName] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, loading ] = useHttpHook({
    url: '/house/search',
    body: {
      ...page,
      houseSubmitName,
      code: query?.code,
      startTime: query?.startTime + ' 00:00:00',
      endTime: query?.endTime + ' 23:59:59',
    },
    watch: [page.pageNum, houseSubmitName]
  });
  useEffect(() => {
    if (!loading && searchResult) {
      if (searchResult.length) {
        setHouseLists([...houseLists, ...searchResult]);
        if (searchResult.length < page.pageSize) {
          setShowLoading(false);
        }
      } else {
        setShowLoading(false);
      }
    }
  }, [loading]);
  useObserverHook('#' + CommonEnum.LOADING_ID, (entries) => {
    console.log(entries);
    if (!loading && entries[0].isIntersecting) {
      setPage({
      ...page,
      pageNum: page.pageNum + 1,
    })
    }
    
  }, null);

  useImgHook('.item-img', (entries) => {}, null);

  const _handleSubmit = (input) => {
    console.log(input);
    setSearchValue(input);
    setHouseSubmitName(input);
    setPage(CommonEnum.PAGE);
    setHouseLists([]);
  };

  const handleChange = (value) => {
    // console.log(value);
    setSearchValue(value);
  }

  const handleSubmit = (input) => {
    _handleSubmit(input);

  };

  const handleCancel = () => {
    _handleSubmit('');    
  }

  const handleClick = (id) => {
    router.push({
      pathname: '/house',
      query: {
        id
      },
    });
  }

  return (
    <div className='search-page'>
      <SearchBar 
        placeholder='请输入民宿名称'
        value={searchValue}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onCancel={handleCancel} />
        <div className='search-list'>
           {
            !houseLists.length ? <ActivityIndicator toast /> : 
            houseLists.map(house => (
              <div className='search_item' key={house.id} onClick={() => handleClick(house.id)}>
                <img className='item-img' alt='img' src={require('@/assets/img/blank.png')} data-src={house?.imgs[0]?.url}/>
                <div className='search_item_right'>
                  <div className='title'>{house.name}</div>
                  <div className='price'>￥{house.price}</div>
                </div>
              </div>
          ))
          }
          <ShowLoading showLoading={showLoading} />
        </div>
    </div>
  )
}