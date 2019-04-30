import models from 'config/sequelize';

export const getCategories = (req, res, next) => {
  try {
    const { email } = req.query;
    console.log('getReadCategories');
    models.User.findOne({ where: { email } }).then(user => {
      console.log({ user });
      if (!user) res.status(400).send({ message: '잘못된 요청입니다.' });
      models.Category.findAll({
        where: {
          UserId: req.user.get('id'),
        },
      }).then(categories => {
        console.log({ categories });
        res.status(200).send({ categories });
      });
    });
  } catch (err) {
    console.log(err);
  }
};
export const getCategory = (req, res, next) => {
  console.log('getReadCategory');
  console.log(req.user);
};

export const postCategory = (req, res, next) => {
  try {
    console.log('postCreateCategory');
    console.log(req.body);
    models.Category.create({
      name: req.body.name,
      identity: req.body.identity,
      UserId: req.user.get('id'),
    }).then(category => {
      console.log('created', { category });
      res.status(200).send({ category });
    });
  } catch (err) {
    console.log(err);
  }
};
