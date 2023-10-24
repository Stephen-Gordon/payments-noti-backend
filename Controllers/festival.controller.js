const Festival = require('../models/festival.model')


const readData = (req, res) => {


    Festival.find({})
    .then((data) => {
        

        data ? res.status(200).json(data) 
        :
        res.status(404).json('none found') 
    })
    .catch(err => {
        console.error(`Error ${err}`)
        res.status(500).json(err)
    })


};

const readOne = (req, res) => {
    
    let id = req.params.id;



    Festival.findById(id)        
    .then(data => {
        !data ? res.status(404).json({msg: `festival ${id} not found`}) 
        :
         res.status(200).json(data)
    })
    .catch(err => {
        //Check for cast Error
        err.name == 'CastError'
        ? res.status(404).json({msg: `Festival ${id} not found`})
        : res.status(500).json(err)

        console.error(`Error ${err}`)
       
    })

    
};


const createData = (req, res) => {
    
   inputData = req.body;

   Festival.create(inputData)
   .then(data => {
        console.log(`New Fesival created`, data)
        res.status(201).json(data)
   })
   .catch(err => {
    console.log(err)
    err.name == "ValidationError"  ? res.status(422).json.error : res.status(500).json
    
    
   })
   

};


const updateData = (req, res) => {
    
    let id = req.params.id;

    let data = req.body;

    Festival.findByIdAndUpdate(id, data, {
        new: true
    })
    .then(newData => {
        res.status(201).json({
            msg: `You Updated Festival ${id}`,
            data: newData
        })
    })
    .catch(err => {
         //Check for cast Error
         err.name == 'CastError'
         ? res.status(404).json({msg: `Festival ${id} not found`})
         : res.status(500).json(err)
 
         console.error(`Error ${err}`)
    })




};


const deleteData = (req, res) => {
    
    let id = req.params.id;

    Festival.findByIdAndDelete(id)
    .then(newData => {

        !newData ? res.status(404).json({msg: `Festival ${id} not found`}) 
        :
        res.status(200).json({
            msg: `You deleted Festival ${id}`,
            data: newData
        })
    })
    .catch(err => {
         //Check for cast Error
         err.name == 'CastError'
         ? res.status(404).json({msg: `Festival ${id} not found`})
         : res.status(500).json(err)
 
         console.error(`Error ${err}`)
    })

    
};

module.exports ={
    readData,
    readOne,
    createData,
    updateData,
    deleteData
};