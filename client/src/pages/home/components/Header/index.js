import React, { useState, useEffect, memo } from 'react';
import Link from 'umi/link';
import { cookie } from 'project-libs';

function Header(props){
  const [username, setUsername] = useState(localStorage.getItem('username'))

  useEffect(() => {
    console.log(cookie.get('user'));
  }, [])

  return (
    <div className='header'>
      <div className='header_title'>民宿</div>
      <div className='header_login'>
        {
          username ? 
          <div>{username}</div> : 
          <div>
            <Link to='/login'>登录</Link> | <Link to='/register'>注册</Link>
          </div> 
        }
       
      </div>
    </div>
  )
}

export default memo(Header)