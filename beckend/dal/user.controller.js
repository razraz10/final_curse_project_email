const userModel = require("../dal/user.model");

//CREATE
async function create(data) {
  return userModel.create(data);
}

//SHOW ALL
async function read() {
  return await userModel.find({ isActive: true });
}

//SHOW ONE
async function readOne(filter) {
  return await userModel.findOne({ ...filter, isActive: true });
}

//UPDATE
async function update(filter, data) {
  return await userModel.updateOne({ ...filter, isActive: true }, data);
}

//UPDATE MANY
async function updateMany(filter, data) {
  return await userModel.updateMany({ ...filter, isActive: true }, data);
}

//DELETE MANY
async function delMany(filter) {
  return await userModel.updateMany({ ...filter, isActive: false });
}

//DELETE ONE
async function delOne(filter) {
  return await userModel.updateOne(filter, { isActive: false });
}

module.exports = {
  create,
  read,
  readOne,
  update,
  updateMany,
  delOne,
  delMany,
};
