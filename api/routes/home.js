const router = require('express').Router()
const {User, Session} = require('../models/User'),
HttpStatus = require('http-status-codes')
router.post('/signup', (req, res)=> {
    User.findOne({email:req.fields.email}).exec(function (err, user) {
        if (err) res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, err: err.message})


        User.findOne({username: req.fields.username}).exec(function (err, user2) {
            if (err){ res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, err: err.message})
            return null}


        if (user||user2){ res.status(HttpStatus.CONFLICT).json({success: false, err: 'User Already exists'})
            return null}

            let newUser = new User(req.fields)
            newUser.created = Date.now()
            if(!req.fields.username) newUser.username= req.fields.email.slice(0, req.fields.email.indexOf("@"))
            newUser.save()
            res.json({sucess: true})

        })

    })
})

router.post('/signin', (req, res) => {
    if(req.fields.key) {
        console.log(req.fields)
        Session.findOne({key: req.fields.key}).exec(function (err, sess) {
            if (err){ res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, err: err.message});
                return null
            }
            if (!sess){ res.status(HttpStatus.OK).json({success: false, err: 'Username or Password incorrect'})
                return null}

            res.json(({isAuthenticated: true, session:sess.key}))

        })
        return
    }
    User.findOne({email:req.fields.email, password: req.fields.password}).exec(function (err, user) {
        if (err){ res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, err: err.message})
            return null}
        if (!user){ res.status(HttpStatus.BAD_REQUEST).json({success: false, err: 'Username or Password incorrect'})
            return null}


            let session = new Session({user: user})

            session.save(()=> {
                res.status(200).json({isAuthenticated: true, session:session.key});
            })

    })
});

router.post('/signout', (req, res) => {
    Session.findOneAndDelete({id: req.fields.id}, ()=> {
        res.json({isAuthenticated: false, message:'You have logged out'})
    })
})



module.exports = router;
