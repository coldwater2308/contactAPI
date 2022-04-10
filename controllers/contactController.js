const mongoose = require("mongoose");
const Contact = require("../models/contact");
var dataPerPage= 10;
//get -get all contacts
exports.getContacts=async(req,res,next)=>{
let page= req.query.page; 

try {
    if (!page) {
    page = 1;
    }
    const contacts = await Contact.find().skip((parseInt(page)-1)*dataPerPage).limit(dataPerPage)
    if(contacts)
    return res.status(200).json({
        message:"Success",
        page : page,
        data : contacts
    })
} catch (error) {
     res.status(203).json({
         message:"Failed",
         error: error
     })
}


}
//post -create contact

exports.createContact= async(req,res,next)=>{
  const { name , phone,email,address}= req.body

try { 
    const contact = await Contact.create({
        name: name ,
        phone:phone,
        email: email,
        address:address
    }) 
    if(contact)
    return res.status(200).json({
        message: "Success",
        data: contact
    })
    
} catch (error) {
    res.status(203).json({
        message:"Failed",
        error: error
    })
}


}
 

//post - create bulk contacts 
exports.createBulkContacts= async(req,res,next)=>{
    const contactData= req.body.contactData;
    try {
            const contacts= await Contact.insertMany(contactData);
            if(contacts)
                return res.status(200).json({
                    message:"Success",
                    data:contacts
                })
        
    } catch (error) {
        res.status(203).json({
            message:"Failed",
            error:error
        })
    }


}


//get - get particular contact by id
exports.getContact= async(req,res,next)=>{
     
      const id = req.params.id.toString();
    try { 
          const contact = await Contact.findById(id)
          if(contact)
          return res.status(200).json({
              message: "Success",
              data: contact
          })
          
        } 
    catch (error) {
          res.status(203).json({
              message:"Failed",
              error: error
          })
      }
      
      
}  
// patch - update particular contact
exports.updateContact= async(req,res,next)=>{
    const { name , phone,email,address}= req.body
    const id = req.params.id.toString();
    try { 
              const contact = await Contact.findByIdAndUpdate( id,{
                  name: name ,
                  phone:phone,
                  email: email,
                  address:address
              }) 
              if(contact)
              return res.status(200).json({
                  message: "Success",
                  data: contact
              })
              
          } 
    catch (error) {
              res.status(203).json({
                  message:"Failed",
                  error: error
              })
          }
          
          
} 
// delete - delete particular contact
exports.deleteContact= async(req,res,next)=>{
    const id = req.params.id.toString();
              
    try { 
            const contact = await Contact.findByIdAndDelete(id)
                  if(contact)
                  return res.status(200).json({
                      message: "Success"
                  })
                  
        } 
    catch (error) {
                  res.status(203).json({
                      message:"Failed",
                      error: error
                  })
              }
              
              
}
// get - get all contacts by query
exports.getContactByQuery = async(req,res,next)=>{
 
            
    try { 

            let {name,phone,email}=req.query;
  

                if(name&&!phone&&!email)
                    var contacts = await Contact.find({name:name})
                else if(name&&phone&&!email)
                    var contacts = await Contact.find({name:name,phone:phone})    
                else if(name&&phone&&email)
                    var contacts = await Contact.find({name:name,phone:phone,email:email})
                else if(name&&!phone&&email) 
                    var contacts = await Contact.find({name:name,email:email})
                else if(!name&&!phone&&email)
                    var contacts = await Contact.find({email:email}) 
                else if(!name&&phone&&!email)
                    var contacts = await Contact.find({phone:phone})
                else if(!name&&phone&&email)
                    var contacts = await Contact.find({phone:phone,email:email})    
                else 
                    var contacts = await Contact.find()
                if (contacts)
                    return res.status(200).json({
                          message:"Success",
                          data : contacts
                      }) 
                      
                  } 
                  catch (error) {
                      res.status(203).json({
                          message:"Failed",
                          error : error
                      })
                  }



}
