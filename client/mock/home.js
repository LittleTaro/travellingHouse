export default {
  'post /api/commons/citys':  (req, res) => {
    res.json({
      status: 200,
      data: [[
        {
         label: '杭州',
          value: 10001,
        },
        {
          label: '苏州',
          value: 10002,
        },
        {
          label: '上海',
           value: 10003,
         },
         {
           label: '绍兴',
           value: 10004,
         },
         {
          label: '大同',
           value: 10005,
         },
         {
           label: '嘉兴',
           value: 10006,
         },
         {
          label: '芜湖',
           value: 10007,
         },
         {
           label: '上尧',
           value: 10008,
         },
      ]]
    });
  },
  // 'post /api/house/hot':  (req, res) => {
  //   res.json({
  //     status: 200,
  //     data: [
  //       {
  //         id: 1,
  //         img: '../../../../assets/img/imgHolder.jpg',
  //         title: '东城民宿',
  //         info: '交通方便',
  //         price: '100',
  //       },
  //       {
  //         id: 2,
  //         img: '../../../../assets/img/imgHolder.jpg',
  //         title: '东城民宿',
  //         info: '交通方便',
  //         price: '100',
  //       },
  //       {
  //         id: 3,
  //         img: '../../../../assets/img/imgHolder.jpg',
  //         title: '东城民宿',
  //         info: '交通方便',
  //         price: '100',
  //       },
  //       {
  //         id: 4,
  //         img: '../../../../assets/img/imgHolder.jpg',
  //         title: '东城民宿',
  //         info: '交通方便',
  //         price: '100',
  //       },
  //       {
  //         id: 5,
  //         img: '../../../../assets/img/imgHolder.jpg',
  //         title: '东城民宿',
  //         info: '交通方便',
  //         price: '100',
  //       },
  //     ],
  //   })
  // }
}