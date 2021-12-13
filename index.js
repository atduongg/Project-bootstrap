const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const BlogPost = require('./models/BlogPost.js')


mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')
app.get('/', async (req,res)=>{
    const blogposts = await BlogPost.find({})
    console.log(blogposts)
    res.render('index',{blogposts});
})
app.get('/about',(req,res)=>{
    //res.sendFile(path.resolve(__dirname,'pages/about.html'))
    res.render('about')
})
app.get('/contact',(req,res)=>{
    //res.sendFile(path.resolve(__dirname,'pages/contact.html'))
    res.render('contact')
})
app.get('/post',(req,res)=>{
    //res.sendFile(path.resolve(__dirname,'pages/post.html'))
    res.render('post')
})
app.get('/posts/new',(req,res)=>{
    res.render('create')
    })
app.get('/post/:id',async (req,res)=>{
        const blogpost = await BlogPost.findById(req.params.id)
        res.render('post',{
        blogpost
        })
})

app.post('/posts/store', async (req,res)=>{
        await BlogPost.create(req.body)
        console.log(req.body)
        res.redirect('/')
})
        
app.listen(4000, ()=>{

    console.log('App listening on port 4000')
})