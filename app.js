const bodyParser = require("body-parser");
const express = require("express");





const app = express();
const port = 3000;
const address = "localhost";
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.listen(port, address, ()=>{console.log("port open @: http://" + address + ":" + port);});



app.get("/", (req,res) =>
  {
    res.render("index.ejs",{name: "Welcome to BLAH-BLAH. Start you blogging jurney here.", scriptSrc: "../index.js"});
  });


  
let blogs = addBlogs();



// see all blogs page
app.get("/blogs", (req,res) => {res.render("blogs.ejs", {name: "Blogs", blogs, scriptSrc: "../blogs.js"})});

 // see add blog page (form)
app.get("/blogs/create", (req,res) => {res.render("addBlogForm.ejs", {name: "Add Blog", url: "/blogs"})});

// submit blog from add blog page (form)
app.post("/blogs", (req,res) =>
  {
    
    if (req.body.blogContent.includes("\r"))
    {
      blogs.push({blogTitle: req.body.blogTitle,blogAuthor: req.body.blogAuthor , blogContent: req.body.blogContent.split("\r\n")});
      
    }

    else
      blogs.push({blogTitle: req.body.blogTitle,blogAuthor: req.body.blogAuthor, blogContent: req.body.blogContent});
    res.redirect("/blogs");
  
  });

// see the blog
app.get("/blog/:id",(req,res) => {
  
  res.render("blog.ejs", {name: "Add Blog", blog: blogs[req.params.id], id: req.params.id});
  
});



// delete blog
app.delete("/blog/:id", (req,res) => {
  blogs.splice(req.params.id,1);
  res.json({redirect: "/blogs"})
  res.end();
});


// edit blog page
app.get("/blogs/edit/:id", (req,res) =>
  {
    res.render("addBlogForm.ejs", {name: "Edit Blog", blog: blogs[req.params.id], url: "/blogs/" + req.params.id });
  });


// submit edited blog from add blog page (form) 
app.post("/blogs/:id" , (req,res) =>
{
  if (req.body.blogContent.includes("\r"))
    {
      blogs[req.params.id] = {blogTitle: req.body.blogTitle,
                              blogAuthor: req.body.blogAuthor,
                              blogContent: req.body.blogContent.split("\r\n")};
    }
    else
      blogs[req.params.id] = {blogTitle: req.body.blogTitle,
                              blogAuthor: req.body.blogAuthor,
                              blogContent: req.body.blogContent};
    res.redirect("/blogs");
});



// add a few blogs for testing purposes
function addBlogs() 
{
  return [
          {blogTitle: "The Tempest", blogAuthor: "William Shakespeare" ,blogContent:
            [
              "You do look, my son, in a moved sort,",
              "As if you were dismay'd: be cheerful, sir.",
              "Our revels now are ended. These our actors,",
              "As I foretold you, were all spirits, and",
              "Are melted into air, into thin air:",
              "And, like the baseless fabric of this vision,",
              "The cloud-capp'd towers, the gorgeous palaces,",
              "The solemn temples, the great globe itself,",
              "Yea, all which it inherit, shall dissolve,",
              "And, like this insubstantial pageant faded,",
              "Leave not a rack behind. We are such stuff",
              "As dreams are made on; and our little life",
              "Is rounded with a sleep. Sir, I am vex'd;",
              "Bear with my weakness; my old brain is troubled:",
              "Be not disturb'd with my infirmity:",
              "If you be pleased, retire into my cell",
              "And there repose: a turn or two I'll walk,",
              "To still my beating mind." ]},
          {blogTitle: "Blog2", blogAuthor: "Thimothee" ,blogContent: "This is blog no# 2"},
          {blogTitle: "Blog2", blogAuthor: "Jack Monroe" ,blogContent:
            [
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              "Fuga cum eius excepturi soluta eligendi! Odit rerum voluptate aspernatur quis error,",
              "quisquam ratione corporis ullam saepe sit excepturi nesciunt veritatis! Aliquid." ]}
         ];
}






