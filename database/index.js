const mongoose = require('mongoose');

mongoose.connect('DB connection link');

const UserSchema = new mongoose.Schema({
    regno: { type: String, required: true, minLength: 4, maxLength: 10},
    password: {type: String, required:true, minLength: 6},
    name : { type: String, required: true},
    email : {type : String, required: true},
    roomtype : { type: String, required: true},
    block : { type: String, required: true},
    roomno : { type: String, required: true},
    applicationids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]
  });

  const RoomSchema = new mongoose.Schema({
    roomtype : { type: String, required: true},
    block : { type: String, required: true},
    roomno : { type: String, required: true},
    roomprice : { type: String, required: true},
    bedallocated : { type: Number, required: true}
  });

  const AdminSchema = new mongoose.Schema({
    regno: { type: String, required: true, minLength: 4, maxLength: 10},
    password: {type: String, required:true, minLength: 6},
    name : { type: String, required: true, maxLength: 30},
    email : {type : String, required: true},
  });

  const ApplicationSchema = new mongoose.Schema({
    fromregno: { type: String, required: true, minLength: 4, maxLength: 10},
    toregno: { type: String, required: false, minLength: 4, maxLength: 10},
    applicationtype : { type: String, required: true},
    status : { type: Number, required : true, default : 0},
    toblock : {type: String, required: false},
    toroomtype : {type: String, required: false},
    reason : {type : String, required : false, maxLength : 150}
  });

  const User = mongoose.model('User', UserSchema);
  const Room = mongoose.model('Room', RoomSchema);
  const Admin = mongoose.model('Admin', AdminSchema);
  const Application = mongoose.model('Application', ApplicationSchema);

  module.exports = {
    User,
    Room,
    Admin,
    Application
  }
