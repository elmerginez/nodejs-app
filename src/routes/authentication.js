const express = require('express');
const router = express.Router();
const passport = require('passport')

const { isLoggedIn, isNotLoggedIn }= require('../lib/auth')

// RUTA DE INICIO DE SESION
router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin')
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    }) (req,res,next);
});

// RUTA DE REGISTRO DE USUARIO
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup')
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

// 
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile')
});

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) {
          console.error(err);
          return next(err);
        }
        res.redirect('/signin');
      });
    
});

module.exports = router;