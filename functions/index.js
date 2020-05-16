const functions = require('firebase-functions');
const fs = require('fs');
const path = require('path');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.filter = functions.https.onRequest((request, response) => {
    const requestPath = request.path;
    const matchFile = data.find(d => d.path === requestPath);
    let statusCode;
    let fileName;

    if (typeof matchFile === "undefined") {
        statusCode = 404;
        fileName = "404";
    } else {
        if (matchFile.apikey.some(k => k === request.headers.apikey)) {
            statusCode = 200;
            fileName = requestPath;
        } else {
            statusCode = 400;
            fileName = "400";
        }
    }

    let fileContent;
    fileContent = fs.readFileSync(path.resolve('public') + '/' + fileName + '.html');
    const html = fileContent.toString();

    response.status(statusCode).send(html);
});

const data = [
    {
        path: "/file-A",
        apikey: [
            "apikey1",
            "apikey2",
            "apikey3"
        ]
    },
    {
        path: "/file-B",
        apikey: [
            "apikey3"
        ]
    }
]