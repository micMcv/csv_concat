const fs = require('fs');
const xlsx =  require('node-xlsx');
const filenames = fs.readdirSync("./")
let finalSheet = {}
let counter = 0

for (const file of filenames){

    if (file.includes("xlsx")){
        const filename = `./${file}`
        const fileData = xlsx.parse(fs.readFileSync(filename));
        
        if (counter === 0){
             for (let table of fileData){
                finalSheet[table.name] = table.data
                }             
            }
            
            else{
                for (let table of fileData){      
                    finalSheet[table.name] = finalSheet[table.name].concat(table.data.slice(3))                   
                }        
            }
            counter ++;
        }
    }

for (const key in finalSheet){
    const buffer = xlsx.build([{name: key, data: finalSheet[key] }]);
    fs.writeFileSync(`${key}.xlsx`, buffer);
}