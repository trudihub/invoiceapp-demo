const express = require('express');
const Invoice = require("../models/Invoice")
const router = express.Router();


  

router.get('/', (req,res ) => {
    Invoice.find({ })
    .then(data => {
        res.json(data)
    })
    .catch(err =>{
        console.log(err)
    })
})

router.post('/save', (req, res) =>{
    
    
    const newInvoice = new Invoice(req.body);
    console.log(req.body)
    newInvoice.save(err => {
        err ? 
        res.status(500).json({msg: "Sorry bro"}):
        res.json(req.body)
    })
})
router.post("/delete", async (req, res) => {
    const deleteInvoice = await Invoice.deleteOne({id: req.body.id}, err => {
        err ? 
        res.status(500).json({msg: "Sorry bro"}):
        res.json({msg:"Document deleted"})
    })
})
router.post("/status", async (req, res) => {
    const deleteInvoice = await Invoice.updateOne({id: req.body.id}, {$set: {status:"paid"}}, err => {
        err ? 
        res.status(500).json({msg: "Sorry bro"}):
        res.json({msg:"Document updated"})
    })
})

router.post('/update', async (req, res) => {
    const updatedInvoice = await Invoice.replaceOne({ id: req.body.id }, req.body );
    res.json({msg:"hey :)"}) 
})

module.exports = router;