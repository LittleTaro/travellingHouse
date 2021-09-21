// eslint-disable-next-line strict
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Imgs = app.model.define('imgs', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    url: STRING(500),
    houseId: INTEGER,
    createTime: DATE,
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true,
  });

  return Imgs;
};
