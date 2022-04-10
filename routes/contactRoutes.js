const express = require("express");
const router = express.Router(); 
const contactController= require("../controllers/contactController"); 

//create contact
router.post('/create',contactController.createContact) 
//create bulk contacts
router.post('/bulkcreate',contactController.createBulkContacts)
//get all contacts
router.get('/',contactController.getContacts)
//get event by contact id 
router.get('/contact/:id',contactController.getContact)
//get contact by query
router.get('/contact',contactController.getContactByQuery)
// update particular contact
router.patch('/update/:id',contactController.updateContact)
//delete particular contact
router.delete('/delete/:id',contactController.deleteContact)  

module.exports= router;