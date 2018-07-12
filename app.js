const express = require('express');
const fs = require('fs');
const path = './public/uploads';
const app = express();

const multer = require("multer");
const upload = multer({ dest: path})
const uploadedFiles = [];

app.use(express.static('public'));
// app.use(express.static('/public/uploads'));

app.get('/', function (req, res) {
  fs.readdir('./public/uploads', function (err, items) {
    console.log(items)
    res.send(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
    
            <form action="/" method="POST" enctype="multipart/form-data">
                Select an image to upload:
                <input type="file" name="image"> 
                <input type="submit" value="uploads"> 
                <input type="button" value="home">
                </form>
                
                <img src="/uploads/${items[0]}"  >
                
        <script src="main.js"></script>
    </body>
    </html>`
  
  
  
  );
  })
})

app.post('/', upload.single('image'), function (request, response, next) {
  // request.file is the `myFile` file
  // request.body will hold the text fields, if there were any
  let file = request.file.filename
  console.log("Uploaded: " + file);
  uploadedFiles.push(file);
  response.send(
    `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Document</title>
      </head>
      <body>
      
              <form action="/" method="POST" enctype="multipart/form-data">
                  Select an image to upload:
                  <input type="file" name="image"> 
                  <input type="submit" value="uploads"> 
                  <input type="button" value="home">
                  </form>
                  
                  <img src="${file}"  >
                  
          <script src="main.js"></script>
      </body>
      </html>`
  );
})
app.listen(3000)