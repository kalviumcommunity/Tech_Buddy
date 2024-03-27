const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comments:{
        type:String,
        required:true
    }
});


module.exports = mongoose.model('User', commentSchema);
