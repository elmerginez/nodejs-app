const express = require('express');
const router = express.Router();

const pool = require('../database');
const { link } = require('fs');

const { isLoggedIn } = require('../lib/auth')

router.get('/add', isLoggedIn, (req,res) => {
    res.render('links/add')
})

router.post('/add', isLoggedIn, async (req,res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    }
    await pool.query('INSERT INTO links set ?', [newLink])
    req.flash('success', 'Enlace guardado correctamente')
    res.redirect('/links')
})   

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    console.log(links);
    res.render('links/list', {links})
})

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    await pool.query('DELETE FROM links WHERE id = ?', [id])
    res.redirect('/links');
})
router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
})
router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('UPDATE links SET ? WHERE id = ?', [newLink, id]);
    res.redirect('/links');
})

module.exports = router;