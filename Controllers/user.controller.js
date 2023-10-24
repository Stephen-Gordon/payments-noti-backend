const readData = (req, res) => {
    res.status(200).json({
        "msg": "All users retrieved"
    })
};

const readOne = (req, res) => {
    
    let id = req.params.id;

    //connect to db and retrieve user with :id

    res.status(200).json({
        "msg": `You retrieved with user ${id}`
    })
};


const createData = (req, res) => {
    
    //check data is valid
    //connect to db and check emial exists, if yes respond with error
    //if user info is missing, respond with error
    let data = req.body;


    data.password.length < 6 
    ?
    res.status(422).json({
        "msg": "Password must be at least 6 characters"
    }) 
    :
    res.status(201).json({
        "msg": "User created",
        data,
    })


   

};


const updateData = (req, res) => {
    
    let id = req.params.id;

    let data = req.body;

    id  = data.id;



    //connect to db and check if user exists
    //check data is valid, if yes update user with :id
    //

    res.status(200).json({
        "msg": `Updated user with id ${id}`,
        data
    })


};


const deleteData = (req, res) => {
    
    let id = req.params.id;

    //connect to db and check if user exists, then delete 

    res.status(200).json({
        "msg": `You deleted ${id}`
    })

    
};

module.exports ={
    readData,
    readOne,
    createData,
    updateData,
    deleteData
};