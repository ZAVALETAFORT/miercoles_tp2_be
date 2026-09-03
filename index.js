import express from "express"

const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
     res.send("Server ok")
})

app.get("/categorias",(req,res)=>{
     console.log(`🚀 ~ req:`, req)
     res.send("Categorias ok")
})
app.post("/categorias",(req,res)=>{
     console.log(`🚀 ~ req:`, req.body)
     res.send("Categorias ok")
})


app.listen(8080, ()=>{
     console.log("Server on port 8080")
})
