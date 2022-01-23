const fs = require('fs');
const path = require('path')

class Contenedor{
    constructor(location){
        this.location=location;
        this.aux_array=[]
    }
    async save(obj){
        await fs.promises.readFile(`${this.location}`,"utf8")
        .then (res=> {
            // console.log (res);
            this.aux_array.push(JSON.parse(res));
        })
        .catch(err => {
            console.log (err)
        })        
        console.log (this.aux_array);
    }
}
const name='\\productos.txt'
user_path_file=(__dirname.toString()).concat(name);
const oneContainer= new Contenedor(user_path_file)
oneContainer.save({title:'sprite',price:200,thumbnail:'www.placedog.net/200/200'})
