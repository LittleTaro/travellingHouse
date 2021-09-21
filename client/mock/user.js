export default  {
  'post /api/user/detail': (req, res) => {
    res.json({
      status: 200,
      data: {
        id: 10,
        username: '测试用户',
        avatar: '',
        phone: '13090909090',
        sign: 'beryy'
      }
    })
  },
  'post /api/user/edit': (req, res) => {
    res.json({
      status: 200,
      data: 'ok'
    })
  },
  'post /api/user/login': (req, res) => {
    res.json({
      status: 200,
      data: {
        id: 100,
        username: 'admin'
      }
    })
  },
  'post /api/user/register': (req, res) => {
    res.json({
      status: 200,
      data: {
        id: 100,
        username: 'admin'
      }
    })
  },
}