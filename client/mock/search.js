export default {
  //  key：请求类型 api地址
  //  value：可为JSON类型或函数类型
  'GET /api/getLists': {
    lists: ['a', 'b', 'c']
  },
  'GET /api/getListsAsync': (req, res) => {
    console.log(req)
    setTimeout(() => {
      res.json({
            lists: Array(10).fill(req.query.value)
          })
    }, 1000);  
  }
}