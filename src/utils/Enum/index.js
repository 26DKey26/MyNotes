/*
    @inputs Объект { NAME1: {...}, NAME2: {...} } -> {...} -> { value: [number], description: [string] }
    
    @methods: 
        getDescription() - получение описания поля
        getName() - получение имени поля
        values() - получение названий всех полей 
        valueOf() - получение названия или значения поля в зависимости от входных параметров number или string соответственно
    
    @examples:
        var enum = new Enum({
            STRING: {
                value: 1,
                description: "Строка"
            },
            INT: {
                value: 2,
                description: "Число"
            },
            CHAR: {
                value: 3,
                description: "Символ"
            }
        })

        enum.STRING     //-> 1
        enum.INT        //-> 2
        enum.CHAR       //-> 3

        enum.descriptionOf("STRING")    //-> Строка
        enum.descriptionOf("INT")       //-> Число
        enum.descriptionOf("CHAR")      //-> Символ
        enum.nameOf(1)              //-> STRING
        enum.nameOf(2)              //-> INT
        enum.nameOf(3)              //-> CHAR

        enum.values()   //-> [1, 2, 3]
        enum.names()    //-> ["STRING", "INT", "CHAR"]

        enum.valueOf("STRING") //-> 1
*/
export default class Enum{
    constructor(obj){
        let that = this;
        this.obj = obj;
      
        Object.keys(obj).forEach(function(item, index){
            Object.defineProperty(that, item, {
                get: function(){
                    return this.obj[item].value
                }
            })
        })

        this.getDescription = function(value){
            return this.obj[value].description;
        }

        this.values = function(){
            return Object.keys(this.obj).map( key => this.obj[key].value );
        }

        this.names = function(){
            return Object.keys(this.obj);
        }

        this.valueOf = function(key){
            if(this.obj[key])
                return this.obj[key].value;
            return undefined;
        }

        this.nameOf = function(value){
            return Object.keys(this.obj).filter( key => this.obj[key].value == value )[0];
        }

        this.descriptionOf = function(value){
            if(typeof value == "number"){
                if(this.obj[Object.keys(this.obj).filter( key => this.obj[key].value == value )[0]]){
                    return this.obj[Object.keys(this.obj).filter( key => this.obj[key].value == value )[0]].description;
                } 
                else
                {
                    console.error("Can not get description for "+this.constructor.name+" with id: "+value);
                    return undefined;
                }
            }
                
            if(typeof value == "string"){
                if(this.obj[value.toUpperCase()]){
                    return this.obj[value.toUpperCase()].description;
                }
                else
                {
                    console.error("Can not get description for "+this.constructor.name+" with key: "+value);
                    return undefined;
                }
            }
        }
    }
}