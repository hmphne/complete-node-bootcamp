const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject("I could not read file")
            resolve(data)
        })
    })
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject("I could not write file") 
            resolve('success')
        })
    })
}

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`)
        console.log(`Bread: ${data}`)
    
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
        console.log(res.body.message)
    
        await writeFilePro('dog-img.txt', res.body.message)
        console.log('Random dog image saved to file!')
    } catch (err) {
        console.log(err)
    }
    
}
getDogPic()
/*
readFilePro(`${__dirname}/dog.txt`)
.then((data) => {   
    console.log(`Bread: ${data}`) 

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
})
.then(res => {
       console.log(res.body.message)
    
       return writeFilePro('dog-img.txt', res.body.message)
})
.then(()=>{
        console.log('Random dog image saved to file!')
})
.catch(err => console.log(err.message))
*/