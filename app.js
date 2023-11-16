// Requiring express to handle routing 
const express = require("express");

// The fileUpload npm package for handling 
// file upload functionality 
const fileUpload = require("express-fileupload");

// Creating app 
const app = express();

// Passing fileUpload as a middleware 
app.use(fileUpload());

// For handling the upload request 
app.post("/upload", function (req, res) {

    // When a file has been uploaded 
    if (req.files && Object.keys(req.files).length !== 0) {

        // Uploaded path 
        const uploadedFile = req.files.uploadFile;

        // Logging uploading file 
        console.log(uploadedFile);

        // Upload path 
        const uploadPath = __dirname
            + "/uploads/" + uploadedFile.name;

        // To save the file using mv() function 
        uploadedFile.mv(uploadPath, function (err) {
            if (err) {
                console.log(err);
                res.send("Failed !!");
            } else res.send("Successfully Uploaded !!");
        });
    } else res.send("No file uploaded !!");
});

// To handle the download file request 
app.get("/download", function (req, res) {

    // The res.download() talking file path to be downloaded 
    res.download(__dirname + "/download_gfg.txt", function (err) {
        if (err) {
            console.log(err);
        }
    });
});

// GET request to the root of the app 
app.get("/", function (req, res) {

    // Sending index.html file as response to the client 
    res.sendFile(__dirname + "/index.html");
});

// Makes app listen to port 3000 
app.listen(3000, function (req, res) {
    console.log("Started listening to port 3000");
});