// console.log(`🚀 ~ nombre:`, nombre)
// var nombre= "osvaldo"
// console.log(`🚀 ~ nombre:`, nombre)

// nombre=2
// console.log(`🚀 ~ nombre:`, nombre)

// var nombre="Chakyra"
// console.log(`🚀 ~ nombre:`, nombre)

// console.log(`🚀 ~ nombre:`, nombre)
// let nombre = "osval";
// nombre = 34;
// console.log(`🚀 ~ nombre:`, nombre)

// let nombre="Lolo"

// console.log(`🚀 ~ dni:`, dni)
// const dni = 123456;
// const dni=85764
// console.log(`🚀 ~ dni:`, dni)

// datos primitivos
// numeros, string, null, undefined, gir int,  boolean,

let numero = 23;
// console.log(`🚀 ~ numero:`, typeof numero)

let str = "Osval";
// console.log(`🚀 ~ str:`, typeof str)

let nulo = null;
// console.log(`🚀 ~ nulo:`, typeof nulo)

// let und=undefined
let und;
// console.log(`🚀 ~ und:`, typeof und)

let big = 34n;
// console.log(`🚀 ~ big:`, typeof big)

let sm = Symbol("lolo");
let sm2 = Symbol("lolo");
// console.log(`🚀 ~ sm:`, typeof sm)
// console.log(`🚀 `,  sm===sm2)
// console.log(`🚀 `,  2==="2")

// datos complejos

// let ar=[ ]
// // ar=123456
// ar.push(2)
const ar = [2, "hola"];
ar.push("chau");

// console.log(`🚀 ~ ar:`, ar[0])
// console.log(`🚀 ~ ar:`, typeof ar)

const obj = {
  nombre: "pepe",
  apellido: "ojeda",
};
// console.log(`🚀 ~ obj:`, typeof obj)

// const data=[654365, "Osval", "Ojeda"]

// let dni= data[0]
// let nombre=data[1]
// console.log(`🚀 ~ dni:`, dni)
// console.log(`🚀 ~ nombre:`, nombre)

// const [dni, nombre, apellido ]= data
// console.log(`🚀 ~ dni:`, dni)
// console.log(`🚀 ~ nombre:`, nombre)
// console.log(`🚀 ~ apellido:`, apellido)

const data = {
  nombre: "osval",
  apellido: "ojeda",
  cursos:[]
};

// let n="nombre"

// // let apellido=data.nombre
// let apellido=data[n]
// console.log(`🚀 ~ apellido:`, apellido)
// console.log(`🚀 ~ data:`, data)

// const { apellido, nombre } = data;
// console.log(`🚀 ~ apellido:`, apellido)
// console.log(`🚀 ~ nombre:`, nombre);


// let n1=2
// console.log(`🚀 ~ n1:`, n1)
// let n2=n1
// console.log(`🚀 ~ n2:`, n2)
// n2=3
// console.log(`🚀 ~ n2:`, n2)
// console.log(`🚀 ~ n1:`, n1)

// const data2=data
// console.log(`🚀 ~ data:`, data)
// console.log(`🚀 ~ data2:`, data2)
// data2.dni=1234
// console.log(`🚀 ~ data2:`, data2)
// console.log(`🚀 ~ data:`, data)

// const data3={...data}
// console.log(`🚀 ~ data3:`, data3)
// console.log(`🚀 ~ data:`, data)
// data3.dni=98765
// data3.cursos.push("tp2")
// console.log(`🚀 ~ data3:`, data3)
// console.log(`🚀 ~ data:`, data)

// const data4=JSON.parse(JSON.stringify(data))
// data4.cursos.push("pnt2")
// console.log(`🚀 ~ data4:`, data4)
// // console.log(`🚀 ~ data:`, data)

const data5=structuredClone(data)
data5.cursos.push("tp1")
console.log(`🚀 ~ data5:`, data5)
console.log(`🚀 ~ data:`, data)
