const { Long } = require('bson');
const express = require('express');
const quote=require('../models/quotes');
const app = express();

app.get('/',(req,res)=>
{
    res.render('user/quote.hbs',{title:"Form input"});
})
app.post('/add',async(req,res)=>
{
  if(req.body.id==''){
      addrecord(req,res);
  }
  else{
      updaterecord(req,res);
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

function addrecord(req,res){
    const q=new quote(req.body);
    try{
         q.save();
        res.render('user/quote.hbs',{title:"Input quote successful"})

    }catch{ (error)=>{
        res.status(500).send(error);
    }
    }
}
    
function updaterecord(req,res)
{
    quote.findOneAndUpdate({_id:req.body.id},req.body,{new:true},(err,doc)=>
    {
        if(!err){
            res.redirect('/quote/list');
        }else{
            console.log(err);
            res.render('user/add.hbs',{
                title:'Error update'
            })
        }
    })
}
//delete
app.get('/delete/:id',async(req,res)=>{
    try{
        const qd= await quote.findByIdAndDelete(req.params.id,req.body);
        if(!qd) res.status(404).send('No item found');
        else res.redirect('/quote/list')
    }catch(error)
    {
        res.status(500).send(error);
    }
})

module.exports=app;
