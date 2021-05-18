const express = require('express');
const quote=require('../models/quotes');
const app = express();

app.get('/',(req,res)=>
{
    res.render('user/quote.hbs',{title:"Form input"});
})
app.post('/add',async(req,res)=>
{
    const q=new quote(req.body);
    try{
        await q.save();
        res.render('user/quote.hbs',{title:"Input quote successful"})

    }catch{ (error)=>{
        res.status(500).send(error);
    }
    }

})

app.get('/list',(req,res)=>{
     quote.find({}).then(quotes=>{
        res.render('user/list.hbs',
        {quotes:quotes.map(quote=>quote.toJSON())}
     )})});
     
app.get('/edit/:id',(req,res)=>{
    quote.findById(req.params.id,(err,q)=>
    {
        if(!err)
        {
            res.render('user/quote.hbs',{
            title:"Update quote",    
            q:q.toJSON()}
        )}

    })
})
    



module.exports=app;
