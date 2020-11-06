// var express = require('express');
// const bodyParser = require('body-parser');
// var User = require('../models/user');
// var router = express.Router();
// router.use(bodyParser.json());
// var passport = require('passport');
// var authenticate = require('../authenticate');
// var config = require('../config');
// const {body, validationResult} = require('express-validator');
// const Joi = require('joi')

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//     res.send('respond with a resource');
// });

// router.post('/signup', [
//     body('email').isEmail(),
//     body('phone').isLength({min: 10}),
//     body('password').isLength({min: 7}),
//     body('username').isLength({min: 7})
// ], function (req, res, next) {
//     const err = validationResult(req);
//     if (!err.isEmpty()) {
//         console.log(err);
//         res.statusCode = 422;
//         res.setHeader('Content-Type', 'application/json');
//         res.json({err: err.array()});
//     } else {
//         User.findOne({'username':req.body.username}).then((user)=>{
//             console.log(user);
//             if(user!=null){
//                 res.status = 409;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json({error:'Username already exists'});
//                 return;
//             }
//         });
//         User.findOne({'email':req.body.email}).then((user)=>{
//             console.log(user);
//             if(user!=null){
//                 res.status = 409;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json({error:'Email already exists'});
//                 return;
//             }
//         });
//         User.findOne({'phone':req.body.phone}).then((user)=>{
//             console.log(user);
//             if(user!=null){
//                 res.status = 409;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json({error:'Phone already exists'});
//                 return;
//             }
//         });
//             User.register(
//                 new User({username: req.body.username}),
//                 req.body.password,
//                 (err, user) => {
//                     if (err) {
//                         res.statusCode = 500;
//                         res.setHeader('Content-Type', 'application/json');
//                         res.json({err: err});
//                     } else {
//                         console.log('req.body',req.body);
//                         if (req.body.firstname) 
//                             user.firstname = req.body.firstname;
//                         if (req.body.lastname) 
//                             user.lastname = req.body.lastname;
//                         if (req.body.email) 
//                             user.email = req.body.email;
//                         if (req.body.phone) 
//                             user.phone = req.body.phone;
//                         if (req.body.mod) 
//                             user.mod = req.body.mod;
//                         if (req.body.admin) 
//                             user.admin = req.body.admin;
//                         user.save((err, user) => {
//                             if (err) {
//                                 console.log(err);
//                                 res.statusCode = 500;
//                                 res.setHeader('Content-Type', 'application/json');
//                                 res.json({err: err});
//                             }
//                             passport.authenticate('local')(req, res, () => {
//                                 res.statusCode = 200;
//                                 res.setHeader('Content-Type', 'application/json');
//                                 res.json({success: true, status: 'Registration Succcessfull'});
//                             });
//                         });

//                     }
//                 }
//             );
        

//     }
// });

// router.post('/login', passport.authenticate('local'), (req, res, next) => {

//     var token = authenticate.getToken({_id: req.user._id});
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     res.json({success: true, token: token, status: 'You are logged in'});

// });

// router.route('/logout')
// .get(authenticate.verifyUser, (req, res, next) => {
//     console.log('userasdasd',user);
//     if (req.session) {
//         req
//             .session
//             .destroy();
//         res.clearCookie('session-id');
//         res.redirect('/');
//     } else {
//         var err = new Error('You are not logged in ');
//         err.status = 403;
//         next(err);
//     }
// });

// module.exports = router;
const express = require('express')
const User = require('../models/user')

const router = express.Router()

router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})