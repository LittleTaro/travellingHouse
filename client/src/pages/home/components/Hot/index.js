import React, { useState, useEffect, memo } from 'react';
import router from 'umi/router';

function Hot(props){
  const [state, setState] = useState()

  const handleClick = (id) => {
    router.push({
      pathname: '/house',
      query: {
        id
      },
    });
  }

  useEffect(() => {

  }, [])

  return (
    <div className='hot'>
      <h1 className='hot_title'>最热民宿</h1>
      
      <div className='hot-list'>
        {
          props?.houses?.map(house => (
            <div className='hot-list-item' key={house.id} 
            onClick={ () => handleClick(house.id) }>
              <img className='img' alt='img' src={house?.imgs[0]?.url} />
              <div className='title'>{house.name}</div>   
              <div className='info'>{house.info}</div>   
              <div className='price'>￥ {house.price}</div>   
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default memo(Hot)