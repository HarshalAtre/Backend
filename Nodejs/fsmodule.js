const fs=require('fs');

// fs.readFile('file.txt','utf8',(err,data)=>{
//     console.log(err,data)
// })

// const a= fs.readFileSync('file.txt')
// console.log(a.toString())

// fs.writeFile('file.txt',"This is Data",()=>{
//     console.log("Written")
// })

b=fs.writeFileSync('file.txt',"Data Sync")
console.log(b)
console.log("Completed")  