const PostModel = require("../models/PostModel");
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const dotenv = require("dotenv");

dotenv.config();

const imageKit = new ImageKit({
    privateKey:process.env.IMAGEKIT_SECRET_KEY
})



async function CreatePost(req,res){

console.log(req.body,req.file)

const file = await imageKit.files.upload({
     file:await toFile(Buffer.from(req.file.buffer),'file'),
     fileName:"Test"
})

 res.send(file)
}


module.exports = {
    CreatePost
}