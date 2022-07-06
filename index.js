const express = require("express");

const cors = require("cors");

// using the uuid to generate random string
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended:true }));

// port number
const port = 5050;

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
app.post("/studentrecord", async function (req, res) {

   try {
       
    //    const detailsOfStudent = {
           
    //        firstName: req.body.firstName,
           
    //        lastName: req.body.lastName,

    //        age: req.bodyage,
           
    //        studentClass: req.body.studentClass,
           
    //        dateAdmmited: req.body.dateAdmmited,
           
    //        DateCompleted:req.body.DateCompleted

    //    }

    const { firstName, lastName, age, studentClass, dateAdmitted, dateCompleted } = req.body;
    
    if (!firstName) {

        res.status(404).json("first name field can't be empty")

    } else if (!lastName) {

        res.status(404).json("last name field can't be empty")

    }else if (!age) {

        res.status(404).json("age field can't be empty")

    } else if (!studentClass) {

        res.status(404).json("class field can't be empty")

    }else if (!dateAdmitted) {

        res.status(404).json("date admmited field can't be empty")

    } else if (!dateCompleted) {

        res.status(404).json("dateCompleted field can't be empty")

    } else {

        const addStudentData = {

            id: uuidv4(),
            
            firstName,

            lastName,

            age,

            studentClass,

            dateAdmitted,

            dateCompleted,
         
            completed: false
         
        }

        await studentRecords.push(addStudentData);

        // this return the one(object) which has just been added within the array 
        res.status(201).json(addStudentData)
    }
       
   } catch (error) {

    console.log(error);

   }
    
});

// updating the todo to true or false 
app.put("/studentrecord/:id", async function (req, res) {

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
        const recordMatches = await studentRecords.find(data => data.id === id);
        
        res.status(200).json(recordMatches);

    } catch (error) {
        
        console.log(error)

    }
});

// deleting a todo using the id
app.delete("/studentrecord/:id", async function (req, res) {
    
    try {
       
        const id = req.params.id;

        if (!studentRecords) {
            
            res.status(404).json("records of stundent not available")

        } else {

            const studentRecordMatches = await studentRecords.find(todo => todo.id === id);

            studentRecords = studentRecords.filter(todo => todo.id !== id);
            
            // console.log(studentRecordMatches)

            // this returning a single object of the todo based on the id
            res.status(202).json(studentRecordMatches )
        }

    } catch (error) {
        
        console.log(error)

    }

});

app.listen(port, () => console.log(`server listening on ${port}`));