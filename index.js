const express=require("express")
const server=express()

require("./Connection/Db")
const app=require("./app")
server.use("/",app)


server.listen(8000)