const { Diet } = require("../db");

const arr = require("./arr");

async function diet(req, res, next) {
  const whole = await Diet.bulkCreate(arr);

  return res.send(whole);
}

module.exports = {
  diet,
};
