import express from 'express';
import { v4 as uuidv4 } from 'uuid';



const router = express.Router();
/*
const users = [
    {
        firstName :"John",
        lastName :"Doe",
        age :25
    },
    {
        firstName :"Jane",
        lastName :"Doe",
        age :24  
    }
]*/
//const users = [];
let users = []; //in order for the delete function to work

router.get('/', (req,res)=>{
    console.log(users);
    res.send(users);
});

router.post('/', (req,res)=>{
    const user = req.body;

    //const userID = uuidv4();

    //const userWithID = {...user,id: uuidv4()};

    users.push({...user,id: uuidv4()});
    res.send(`User with the name ${user.firstName} added to the database!`);
});

router.get('/:id', (req,res) =>{
    const { id } = req.params;
    const foundUser = users.find((user) => user.id == id);
    res.send(foundUser);
});

router.delete('/:id', (req,res) =>{
    //get id from url
    const { id } = req.params;

    //filter function removes false arguments
    users = users.filter((user)=> user.id !== id);

    res.send(`User with the id ${id} deleted from the database`);
})

router.patch('/:id', (req,res)=>{
    //recive a request parameter (id)
    const { id } = req.params;    
    //we take te values from the client side (postman)
    const {firstName,lastName ,age} = req.body;

    //id that we found specifies a user 
    const user = users.find((user) => user.id == id);

    //if values exists we update them
    if(firstName){
        user.firstName = firstName;
    }

    if(lastName){
        user.lastName = lastName;
    }

    if(age){
        user.age = age;
    }

    res.send(`User with id ${id} has been updated`);

})

export default router;