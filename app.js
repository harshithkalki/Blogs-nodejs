const express=require("express");
const mongoose=require('mongoose');
const app=express();
const Blog=require('./models/blog');
const bodyparser=require('body-parser');
const res = require("express/lib/response");
const urlencoded = require("body-parser/lib/types/urlencoded");
const { redirect } = require("express/lib/response");

//server listener...
const dburi='mongodb+srv://kalki:kalki1234@harshith.o1l6aog.mongodb.net/mongokk?retryWrites=true&w=majority'
mongoose.connect(dburi)
.then((result)=>{app.listen(3000);
    console.log("connected to the server!!")
})
.catch((err)=>console.log(err))

//ejs ...
app.set("view engine","ejs");

//public file...
app.use("/blog",express.static('public'))
app.use(express.urlencoded({extended:true}));

// app.get('/new-blog',(req,res)=>{
//     const newb=new Blog({
//         title:"this is title",
//         snippet:"this snippet",
//         body:"this is the body of the blog"
//     });
//     newb.save()
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         res.send(err);
//     })
// })

// request handelers...
app.get('/blog/',(req,res)=>{
    res.render('home',{title:"Home"});
});
app.get('/blog/about',(req,res)=>{
    res.render('about',{title:"about"});
});

app.get('/blog/blogs',(req,res)=>{
    Blog.find().sort({createdAT:-1})
    .then((result)=>{
        res.render('blogs',{title:"blogs",blogs:result})
    }).catch((err)=>{
        res.send(err);
    })
    
})

app.post('/blogs',(req,res)=>{
    const blogn=new Blog(req.body)
    // console.log(req.body);
    blogn.save()
    .then((result)=>{
        res.redirect('/blog/blogs');
    })
})


app.get('/blog/new',(req,res)=>{
    res.render('create',{title:"createBlog"});
})

app.get("/blog/:id",(req,res)=>{
    const id=req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('details',{title:'full-blog',blog:result})
    })
    .catch((err)=>{
        res.send(err);
    })
})
app.delete('/blog/:id',(req,res)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:"/blog"})
    }).catch(err=>{
        console.log(err);
    })
})

app.use((req,res)=>{
    res.status(404).render("404",{title:"404"})
});

