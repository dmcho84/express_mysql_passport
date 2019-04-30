import models from 'config/sequelize';

export const getBoardList = async (req, res, next) => {
  console.log('getBoardList');
  try {
    models.Board.findAll({ where: { UserId: req.user.get('id') } }).then(
      boards => {
        res.status(200).send({ boards });
      },
    );
  } catch (err) {
    console.log(err);
  }
};

export const getBoardListFromEmail = async (req, res, next) => {
  console.log('getBoardList');
  const { email } = req.query;
  try {
    models.Board.findAll({
      include: [{ model: models.User, where: { email } }],
    }).then(boards => {
      res.status(200).send({ boards });
    });
  } catch (err) {
    console.log(err);
  }
};
// export const getBoardListFromEmail = async (req, res, next) => {
//   console.log('getBoardListFromEmail');
//   console.log(req.params, req.params.email);
//   try {
//     models.Board.findAll({ where: { UserId: req.user.get('id') } }).then(
//       boards => {
//         res.status(200).send({ boards });
//       },
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };

export const postBoard = async (req, res, next) => {
  console.log('postBoard');
  try {
    const { user, body } = req;
    const { title, content, categoryId } = body;
    models.Board.create({
      title,
      content,
      CategoryId: categoryId,
      UserId: user.get('id'),
    }).then(board => {
      console.log({ board });
      res.status(200).send({ board });
    });
  } catch (err) {
    console.log(err);
  }
};
