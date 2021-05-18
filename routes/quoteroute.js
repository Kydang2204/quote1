const express = require('express');

const quote=require('../models/quotes');


const app=express();



//add quote
app.post('/quote',async(req,res)=>
{
    const q=new quote(req.body);
    try{
        await q.save();
        res.send(q)

    }catch{ (error)=>{
        res.status(500).send(error);
    }
    }

})
// get all
app.get('/list', async(req,res)=>{
    const qs = await quote.find({});
    try{
        res.send(qs);
    }catch(error){
        res.status(500).send(error);
    }
})

app.patch('/list/:id' ,async(req,res)=>{
    try{
        const qu= await quote.findByIdAndUpdate(req.params.id,req.body);
        await userModle.save();
        res.send(qu);
    }catch(error)
    {
        res.status(500).send(error);
    }
})

app.delete('/list/:id' ,async(req,res)=>{
    try{
        const qd= await quote.findByIdAndDelete(req.params.id,req.body);
        if(!qd) res.status(404).send('No item found');
        else res.status(200).send('Delete finish');
    }catch(error)
    {
        res.status(500).send(error);
    }
})



module.exports=app;