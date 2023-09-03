const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: "dnlopauxr",
  api_key: "395823337119423",
  api_secret: "LAJfn3o_dN3RTO9_-5dVrjVnKeE"
});

module.exports = cloudinary;