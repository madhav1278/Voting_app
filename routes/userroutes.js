const express=require('express');
const router=express.Router();
const user=require('./../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) =>{
    try{
        const data = req.body 

       
        const adminUser = await user.findOne({ role: 'admin' });
        if (data.role === 'admin' && adminUser) {
            return res.status(400).json({ error: 'Admin user already exists' });
        }

      
        if (!/^\d{12}$/.test(data.aadharCardnumber)) {
            return res.status(400).json({ error: 'Aadhar Card Number must be exactly 12 digits' });
        }

        const existingUser = await user.findOne({ aadharCardnumber: data.aadharCardnumber });
        if (existingUser) {
            return res.status(400).json({ error: 'User with the same Aadhar Card Number already exists' });
        }

    
        const newUser = new user(data);

        const response = await newUser.save();
        console.log('data saved');

        const payload = {
            id: response.id
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);

        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


module.exports = router;