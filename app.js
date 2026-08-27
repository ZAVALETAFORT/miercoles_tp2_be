const { readFile } = require("node:fs");
// console.log("🚀 ~ readFile:", readFile)
// console.log("🚀 ~ fs:", fs)


// funciones
// decirHola()

function decirHola(nombre, apellido) {
    console.log(`hola ${nombre}, ${apellido}`);
}

// console.log(decirHola("Osvaldo", "Ojeda"))

// function saludar(nombre, apellido, fn) {
//     return fn(nombre, apellido);
// }

// saludar("Osvaldo", "Ojeda", decirHola)

const decirChau = (nombre, apellido) => {
    console.log(`chau ${nombre}, ${apellido}`)
}


// const saludar=(nombre, apellido, fn)=>{
//     return fn(nombre, apellido);
// }

const saludar = (nombre, apellido, fn) => fn(nombre, apellido);

// saludar= "hau"
//  saludar("lolo", "Ojeda", decirChau);
// saludar("Osvaldo", "Ojeda1", decirChau);
// saludar("Osvaldo", "Ojeda2", decirChau);
// saludar("Osvaldo", "Ojeda3", decirChau);



// setTimeout(() => {
//     decirChau("Osvaldo", "Ojeda");
// });
// setTimeout(() => {
//     decirChau("chakyra", "Ojeda");
// }, 20000);
// setTimeout(() => {
//     decirChau("chayane", "Ojeda");
// }, 10000);
//  saludar("lolo", "Ojeda", decirChau);


function leerArchivo(path) {
    readFile(path, "utf-8", (err, info) => {
        // if (err) throw err;
        console.log(info);
    })
}

// leerArchivo("./package.json")


// fetch("https://jsonplaceholder.typicode.com/posts")
//     .then((data) => {
//         return data.json();
//     }).then((data) => {
//         console.log("🚀 ~ data:", data)
//     }).catch((err) => {
//         console.log("🚀 ~ err:", err)
//     })


async function api(url) {
    try {
        const data = await fetch(url)
        const info = await data.json();
        console.log("🚀 ~ api ~ data:", info)
        // return info;
    } catch (error) {
        console.log("🚀 ~ api ~ error:", error)
    }

}

api("https://jsonplaceholder.typicode.com/posts")