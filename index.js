const fs = require('fs').promises;
const path = require('path')

class Contenedor{
    constructor(location){
        this.location=location;
    }
    save(obj){
        (async()=>{
            const aux_arr=[];
            try{
                await fs.readFile(`${this.location}`,"utf8")
                .then (res => {
                    if (!res=='') {
                        aux_arr=JSON.parse(res);
                        obj.id=aux_arr.length;
                    } else {
                        obj.id=0;
                        aux_arr.push(obj)
                    }
                })
                .catch (err=>{
                    console.error ('catch-<>'+error)
                })
            }
            catch(err){
                console.log ('error<<<<'+err)
            }
            try{
                await fs.writeFile(`${this.location}`,JSON.stringify(aux_arr,null,2))
            }
            catch(error) {
                console.log (error)
            }
        })()
    }
    showAll(){
        (async()=>{
            fs.readFile(`${this.location}`,"utf8")
                .then (res => {
                    console.log (JSON.stringify(res))
                })
                .catch (err => {
                    console.log (err)
                })
        })()
    }
}
// consulta la ubicación del archivo
// console.log (__dirname.toString());
const name='\\productos.txt'
user_path_file=(__dirname.toString()).concat(name);
const oneContainer = new Contenedor(user_path_file)

oneContainer.save({title:'sprite',price:200,thumbnail:'www.placedog.net/200/200'})
oneContainer.save({title:'mirinda',price:200,thumbnail:'www.placedog.net/200/200'})
oneContainer.save({title:'coca-cola',price:200,thumbnail:'www.placedog.net/200/200'})
oneContainer.save({title:'fanta',price:200,thumbnail:'www.placedog.net/200/200'})
oneContainer.showAll();





