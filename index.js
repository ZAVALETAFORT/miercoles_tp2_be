const validate= require("./validate.js")
const http= require("http")
// console.log(`🚀 ~ http:`, http)
// console.log(`🚀 ~ require:`, require)
// validate(true)
//   .then((data) => {
//     return data;
//   })
//   .then((data2) => console.log(data2))
//   .catch((error) => console.log(error));

// async function verify() {
//   try {
// //     const data = validate(true);
//     const data = await validate(true);
//     console.log(`🚀 ~ verify ~ data:`, data);
//   } catch (error) {
//     console.log(`🚀 ~ verify ~ error:`, error);
//   }
// }

// verify();


// --------------------------------

const server= http.createServer((request, response)=>{

if (request.url==="/") {
       response.end("servodor ok ")
}
if (request.url==="/sumar") {
       response.end("servodor ok sumando ")
}
   })
// console.log(`🚀 ~ server:`, server)


server.listen(8000,()=>{
     console.log(`🚀 ~ server ok in port:`, 8000)
     
})
