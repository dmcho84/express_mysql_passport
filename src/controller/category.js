import models from "../sequelize";

export const readCategories = (req, res, next) => {
  const { email } = req.query;
  console.log("readCategories");
  models.User.findOne({ where: { email } }).then(user => {
    console.log({ user });
    if (!user) res.status(400).json({ message: "잘못된 요청입니다." });
    models.Category.findAll({
      where: {
        UserId: req.user.get("id")
      }
    }).then(categories => {
      console.log({ categories });
      res.status(200).json(categories);
    });
  });
};
export const readCategory = (req, res, next) => {
  console.log("getCategory");
  console.log(req.user);
};

export const createCategory = (req, res, next) => {
  console.log("createCategory");
  console.log(req.body);

  models.Category.create({
    name: req.body.name,
    identity: req.body.identity,
    UserId: req.user.get("id")
  }).then(category => {
    console.log("created", { category });
    res.status(200).json(category);
  });

  // res.status(200).send("postCategory");
};
