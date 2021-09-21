import React, { useState, useEffect, memo } from 'react';
import { List, Picker, Calendar, Button, Toast } from 'antd-mobile';
import dayjs from 'dayjs';
import router from 'umi/router';

function Search(props){
  const [state, setState] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [times, setTimes] = useState('可选时间');
  const [calShow, setCalShow] = useState(false);

  useEffect(() => {

  }, [])

  const handleCityChange = (value) => {
    setSelectedCity(value);
  }

  const handleCalCancel = () => {
    setCalShow(false);
  }

  const handleCalConfirm =  (startTime, endTime) => {
    setCalShow(false);
    setTimes(dayjs(startTime).format('YYYY-MM-DD')+'~'+dayjs(endTime).format('YYYY-MM-DD'));
  }
  
  const handleSearch = () => {
    if (times.includes('~')) {
      console.log('start',times.split('~')[0]);
      console.log('end',times.split('~')[1]);
      console.log(selectedCity);
      router.push({
        pathname: '/search',
        query: {
          code: selectedCity,
          startTime: times.split('~')[0],
          endTime: times.split('~')[1],
        }
      });
    } else {
      Toast.fail('请选择时间', 2);
    }
  }
  return (
    <div className='search'>
      <List>
        {
          !props.citysLoading && <Picker
          title='城市'
          data={props.citys}
          value={selectedCity}
          cascade={false}
          col={1}
          onChange={handleCityChange}
        >
          <List.Item>可选城市</List.Item>
         </Picker> 
        }
        <List.Item extra={times} onClick={
          () => setCalShow(true)
        }>
          出租时间
        </List.Item>
      </List>
      <Button type="warning" onClick={handleSearch} size='small'>搜索民宿</Button>
      <Calendar
          visible={calShow}
          onCancel={handleCalCancel}
          onConfirm={handleCalConfirm}
        />
    </div>
  )
}

function areEqual(prevProps, nextProps) {
  if (prevProps.citys === nextProps.citys && prevProps.citysLoading === nextProps.citysLoading) {
    return true;
  } else {
    return false;
  }
}

export default memo(Search, areEqual);