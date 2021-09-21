// eslint-disable-next-line strict
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Comment = app.model.define('comment', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userId: INTEGER,
    houseId: INTEGER,
    msg: STRING(500),
    createTime: DATE,
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true,
  });

  // 一个用户可以评论多条
  Comment.associate = () => {
    app.model.Comment.belongsTo(app.model.User, {
      foreignKey: 'userId',
    });
  };
  return Comment;
};
