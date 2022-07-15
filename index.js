//requiring basic file system 
const fs = require('fs');
const superagent = require('superagent');

//read data from file dog.txt and hit a get request to the URL and  display data in console 
fs.readFile(`${__dirname}/dog.txt`, (err , data) =>{ 
    console.log(`Breed: ${data}`);

    superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
    if (err) return console.log(err.message);    
    console.log(res.body.message);

    //another call back function that save url link in  
    fs.writeFile(`dog-img.txt`, res.body.message, err => {
        console.log('Random Image save to the file')
    })


});

});





