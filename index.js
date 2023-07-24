const express = require("express");
const app = express();

const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml')

const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

const fileupload = require('express-fileupload');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(fileupload());

const courses = [
    {
        id:"11",
        name:"React",
        price:199
    },
    {
        id:"12",
        name:"Node",
        price:299
    },
    {
        id:"13",
        name:"Python",
        price:399
    }
]

app.get("/",(req,res)=>{
    res.send("Hello from index.js")
})

app.get("/api/v1/swa",(req,res)=> {
    res.send("First String route");
})

app.get("/api/v1/swaobject",(req,res)=> {
    res.send({id:"11",book:"JS Book",price:200});
})

app.get("/api/v1/courses",(req,res) => {
    res.send(courses)
})

app.get("/api/v1/mycourse/:courseId",(req,res)=> {
    const mycourse = courses.find((course)=>course.id === req.params.courseId);
    res.send(mycourse);
});

app.post("/api/v1/add-course",(req,res)=>{
    console.log("Body=",req.body);
    let newCourse = courses.push(req.body);
    res.send(true);
})

app.get("/api/v1/coursequery",(req,res)=> {
    let location = req.query.location
    let device = req.query.device
    res.send({location,device})
})

app.post("/api/v1/courseupload",(req,res)=>{
    let file = req.files.file;
    let path = __dirname+"/images/"+Date.now()+".jpg";

    file.mv(path,(err)=>{

        if(err) {
           return res.status(500).send(err)
        } else {
            res.send(true)
        }

    })
})

app.listen(4000,()=> console.log("Server is running at port no. 4000"));
