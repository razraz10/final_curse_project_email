const massageModel = require('../dal/massage.model');
const userModel = require('../dal/user.model');

//CREATE USER
async function create(data) {
  return massageModel.create(data);
}

//SHOW ALL
async function read(filter) {
  return await massageModel.find({ ...filter });
}

//SHOW TRASH
async function readTrash(filter) {
  console.log(filter);
  return await massageModel.find({ ...filter });
}

//SHOW ONE
async function readOne(filter) {
  return await massageModel.findOne({ ...filter });
}

//CHECK USER IF EXIST
async function readOneUser(filter) {
  return await userModel.findOne({ ...filter });
}

//UPDATE
async function update(filter, data) {
  return await massageModel.updateOne({ ...filter, isActive: true }, data);
}

//SEARCH
async function searchEmail(userEmail, text) {
  const query = await massageModel.find({
    $or: [
        { from: userEmail,  massageBody: { $regex: text}, fromIsActive:true },
        {  to: userEmail, isActive: {
          $elemMatch: { to: userEmail, active: true }
      }, massageBody: { $regex: text}  },
      ],
    }
  );
  return query;
}

//STATUS READ
async function readMassage(filter, update, condition) {
  return await massageModel.updateOne(filter, update, condition)
}

//DELETE MASSAGE
async function delOne(filter, update, condition) {
  return await massageModel.updateOne(filter, update, condition);
}

//ONLY THE SENDER DELETE
async function delOneForSender(filter) {
  return await massageModel.updateOne(filter, { fromIsActive: false });
}

async function updateMany(filter, data) {
  return await massageModel.updateMany({ ...filter, isActive: true }, data);
}

async function delMany(filter) {
  return await massageModel.updateMany(filter, { isActive: false });
}



module.exports = {
  create,
  read,
  readOne,
  update,
  updateMany,
  delOne,
  delMany,
  readTrash,
  searchEmail,
  readMassage,
  delOneForSender,
  readOneUser
}
