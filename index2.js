const fs = require('fs');
const path = require('path')

class Contenedor{
    constructor(location){
        this.location=location;
        this.aux_array=[]
        this.cont=0;
    }
    async save(obj){
        let idAsigned
        await fs.promises.readFile(`${this.location}`,"utf8")
        .then ( () => {
            obj.id=this.cont;
            this.cont++;
            this.aux_array.push(obj);
        })
        .catch(err => {
            console.log (err)
        })        
        try {
            await fs.promises.writeFile(`${this.location}`,JSON.stringify(this.aux_array,null,2))
            console.log('guardado con exito');
            // console.log (this.aux_array)
        }
        catch(err){
            console.log ('errrrrrr'+err)
        }
        return idAsigned;
    }
    
    async getById(num_id){
        let aRetornar=null;
        let aux;
        await fs.promises.readFile(`${this.location}`,"utf8")
        .then (res=> {
            aux=JSON.parse(res);
        })
        .then (()=>{
            aux.forEach(element => {
                if (element.id===num_id){
                    aRetornar=element;
                }
            });
        })
        .catch(err => {
            console.log (err);
        })
        return aRetornar;
    }

    async getAll(){
        let aRetornar;
        await fs.promises.readFile(`${this.location}`,"utf8")
        .then (res=> {
            aRetornar=res;
        })
        .catch (error => console.log (error))
        return aRetornar;
    }
    async deleteById(num){
        let aux2;
        this.aux_array=[];
        await fs.promises.readFile(`${this.location}`,"utf8")
        .then (res=> {
            aux2=JSON.parse(res);
            aux2.forEach(element => {
                if (element.id!=num){
                    this.aux_array.push(element)
                }
            });
            console.log(this.aux_array);
        })
        try {
            await fs.promises.writeFile(`${this.location}`,JSON.stringify(this.aux_array,null,2))
            console.log('guardado con exito');
            // console.log (this.aux_array)
        }
        catch(err){
            console.log ('errrrrrr'+err)
        }
    }
    async deleteAll(){
        try {
            await fs.promises.writeFile(`${this.location}`,"[]")
            console.log('borrado con exito');
        }
        catch(err){
            console.log ('errrrrrr'+err)
        }
    }
    crearArchivo(){
        let empty_array=[];
        fs.writeFileSync(`${this.location}`,empty_array,(err)=> {
            if (err) {
                console.log ('error al crear el archivo')
            }
        })
    }
}
const name='\\productos.txt'
user_path_file=(__dirname.toString()).concat(name);
const oneContainer= new Contenedor(user_path_file)



async function agregaProductos () {
    console.log ('agregando producto')
    await oneContainer.save({title:'sprite',price:200,thumbnail:'www.placedog.net/200/200'})    
    await oneContainer.save({title:'coca',price:200,thumbnail:'www.placedog.net/200/200'})
    await oneContainer.save({title:'fanta',price:200,thumbnail:'www.placedog.net/200/200'})
    await oneContainer.save({title:'beldent menta',price:60,thumbnail:'www.placedog.net/200/200'})
    await oneContainer.save({title:'beldent fruta',price:60,thumbnail:'www.placedog.net/200/200'})
    await oneContainer.save({title:'yerba',price:300,thumbnail:'www.placedog.net/200/200'})
    await oneContainer.save({title:'te',price:130,thumbnail:'www.placedog.net/200/200'})
    await oneContainer.save({title:'agua mineral',price:130,thumbnail:'www.placedog.net/200/200'})
}
async function mostrar(){
    console.log (await oneContainer.getAll());
}


async function traerXId(){
    // trae el 5 -> yerba
    console.log('trae por id');
    let objGetById = await oneContainer.getById(5);
    console.log (objGetById);
}

async function borrarTodo(){
    await oneContainer.deleteAll();
}

async function borrarPorId(){
    await oneContainer.deleteById(5);
}


// oneContainer.crearArchivo();
agregaProductos();
// mostrar();

// traerXId();

// borrarPorId();

// borrarTodo();
