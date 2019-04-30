import models from 'config/sequelize';

export const bodyCheck = (keys = []) => {
  return async (req, res, next) => {
    try {
      keys.forEach(key => {
        if (!req.body[key])
          throw new Error(`doesn't have '${key}' property in request body`);
      });
      return next();
    } catch (err) {
      const { message } = err;
      console.log(`# ERROR # `, message);
      res.status(400).send({ message });
    }
  };
};

export const doIHaveInDB = (tableName, where = {}) => {
  return (req, res, next) => {
    try {
      models[tableName].findOne({ where }).then(item => {
        if (item === null) {
          const message = `invalid parameter`;
          console.log(message, { tableName, where }, `DB doen't have it.`);
          return res.status(400).send({ message });
        }
        return next();
      });
    } catch (err) {
      console.log(err);
    }
  };
};
