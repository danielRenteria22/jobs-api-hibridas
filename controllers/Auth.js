module.exports = {
    logInUser,
    logOutUser,
    getCurrentUser,
    signUpUser
}

let User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const sha256 = require('sha256')

function logInUser(req, res){
    const email = req.body.email
    const pass = req.body.password
    let passwordIsValid  = false
    User.findOne({email: email}).then((user)=>{
        if(!user) return res.status(404).send('No user found')
        //let passwordIsValid = bcrypt.compareSync(req.pass,user.profile.password)
        if(pass === user.profile.password) passwordIsValid = true
        
        if(!passwordIsValid) return res.status(401).send({auth: false, message: 'Password is not valid'})
        let token = jwt.sign({email: user.profile.email}, process.env.JWT_SECRET, { expiresIn: 864000}  //expires in 24 hours
        )
        res.status(200).send({auth: true, token: token, name: user.username, email:user.email});
    })
}

function logoutUser(req, res) {
    res.status(200).send({auth: false, token: null});
}


function getCurrentUser(req, res) {
    let token = req.headers['authorization'];
    if (!token) return res.status(401).send({auth: false, message: 'No token provided.'});

    let fields = ['id', 'username', 'email'];

    verifyToken(token)
        .then((decoded) => models.findOne({id: decoded.id}))
        .then((user) => {
            if (!user) return res.status(401).send({auth: false, message: 'No user found'});
            res.status(200).send(user)
        })
        .catch((err) => res.status(500).send({err}));

}

function logOutUser(){
    
}

function signUpUser(req, res) {

    const user = new User({
        displayName: req.body.username,
        profile: {
            name:  req.body.name,
            lastname:  req.body.lastname,
            email:  req.body.email,
            password:  req.body.password,
            phone:  req.body.phone,
            birthDate:  req.body.birthDate,
            address:  req.body.address,
            gender:  req.body.gender,
            maritalStatus:  req.body.maritalStatus,
            profileImg:  req.body.profileImg,
            degree:  req.body.degree,
            roles:  req.body.roles
        }
        
    })

    user.save((err) => {
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
            expiresIn: 864000 // expires in 24 hours
        });

        if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })

        return res.status(201).send({ token: token, message:'User created' })
    })
}

