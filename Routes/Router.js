const express = require('express');
const router = express.Router();
const users = require('../users/userSchema');

// router.get('/', (req, res) => {
//       console.log("connect");
// })

router.post('/register', async (req, res) => {
    const {name, phone, email, hobbies} = req.body;

    if(!name || !phone || !email || !hobbies){
        res.status(422).json("Please, Enter the Required Fields!")
    }

    try {
        const preUser = await users.findOne({email: email});
        console.log(preUser);

        if(preUser){
            res.status(422).json('User already exists!')
        } else{
            const addUser = new users({
                name, phone, email, hobbies
            });

            await addUser.save();
            res.status(201).json(addUser);
            console.log(addUser);
        }
    } catch (error) {
        res.status(422).send(error);
    }
});

router.get('/getdata', async (req, res) => {
    try {
        const userData = await users.find();
        res.status(201).json(userData);
        console.log(userData);
    } catch (error) {
        res.status(422).json(error);
    }
})

router.get("/getuser/:id", async(req, res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;
        
        const userIndividual = await users.findById({_id: id});
        console.log(userIndividual);
        res.status(201).json(userIndividual);

    } catch (error) {
        res.status(422).json(error);
    }
})

router.patch('/updateuser/:id', async(req, res)=>{
     try {
        const {id} = req.params;

        const updatedUser = await users.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updatedUser);
        res.status(201).json(updatedUser);

     } catch (error) {
        res.status(422).send(error);
     }
})

router.delete("/deleteuser/:id", async(req, res)=> {
    try {
        const {id} = req.params;

        const deleteuser = await users.findByIdAndDelete({_id: id})
        console.log(deleteuser);
        res.status(201).json(deleteuser);

    } catch (error) {
        res.status(422).send(error);
    }
})

module.exports = router;