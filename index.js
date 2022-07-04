const express = require("express");

const cors = require("cors");

// using the uuid to generate random string
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended:true }));

// port number
const port = 6000;

// setting the custmTasks to empty array 
let studentRecords = [];

// fetching all todo 
app.get("/studentrecord", function (req, res) {
   
    try {
        
            
        res.status(200).json(studentRecords)

       

    } catch (error) {
        
        console.log(error)
    }

});

// posting data using raw js fxn
app.post("/studentrecord", function (req, res) {

   try {
       
       const detailsOfStudent = {
           
           firstName: req.body.firstName,
           
           lastName: req.body.lastName,

           age: req.bodyage,
           
           studentClass: req.body.studentClass,
           
           dateAdmmited: req.body.dateAdmmited,
           
           DateCompleted:req.body.DateCompleted

       }
    
    if (!detailsOfStudent) {

        res.status(404).json("field can't be empty")

    } else {

        const addStudentData = {

            id: uuidv4(),
            
            detailsOfStudent,
         
            completed: false
         
        }

        studentRecords.push(addStudentData);
        
        // this return the one(object) which has just been added within the array 
        res.status(201).json(addStudentData)
    }
       
   } catch (error) {

    console.log(error);

   }
    
});

// updating the todo to true or false 
app.put("/studentrecord/:id", function (req, res) {

    try {
        
        const id = req.params.id;

        // this is what is actually doing the update 
        // maping through the customTask to perform the update 
        studentRecords = studentRecords.map(data => {

            // comparing of ids 
                if (data.id === id) {
                    
                    return { ...data, completed: !data.completed }
                    
                } else { 

                    return { ...data }

                }
            
        })

        // this returning a single object of the todo based on the id
        const recordMatches = studentRecords.find(data => data.id === id);
        
        res.status(200).json(recordMatches);

    } catch (error) {
        
        console.log(error)

    }
});

// deleting a todo using the id
app.delete("/studentrecord/:id", function (req, res) {
    
    try {
       
        const id = req.params.id;

        if (!studentRecords) {
            
            res.status(404).json("records of stundent not available")

        } else {

            const studentRecordMatches = studentRecords.find(todo => todo.id === id);

            studentRecords = studentRecords.filter(todo => todo.id !== id);
            
            console.log(studentRecordMatches)

            // this returning a single object of the todo based on the id
            res.status(202).json(studentRecordMatches )
        }

    } catch (error) {
        
        console.log(error)

    }

});

app.listen(port, () => console.log(`server listening on ${port}`));