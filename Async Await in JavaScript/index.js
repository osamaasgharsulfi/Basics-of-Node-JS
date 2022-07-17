const fs = require('fs');
const superagent = require('superagent');

const readFilepro = file =>{
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(`I couldn't found the file`) 
            resolve(data); 
        })
    })
}

const writeFilepro = (file,data) =>{
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject(`couldn't write the file`)
            resolve('success')
        })
    })
}

const getDogpic = async () => {
    try{
    const data = await readFilepro(`${__dirname}/dog.txt`)
    console.log(`Breed: ${data}`);
    
    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    console.log(res.body.message);

    await writeFilepro(`dog-img.txt`, res.body.message)
    console.log('Random Image save to the file')
    }
    catch(err){
        console.log(err);
    }
}
getDogpic();



/*
readFilepro(`${__dirname}/dog.txt`).then(data =>{
    console.log(`Breed: ${data}`); 
    return superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
})
    //--promise is pending state if 
    //--if it is resolve .then  show results
    .then(res => {       
        console.log(res.body.message);
        return writeFilepro(`dog-img.txt`, res.body.message)

    })
    
    .then( ()=>{
        console.log('Random Image save to the file')
    })


    //if the promise is rejected .catch show error or catch it.
    .catch(err =>{
        if (err) return console.log(err.message);
    })  
*/






