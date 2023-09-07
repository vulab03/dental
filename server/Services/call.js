const axios = require("axios")

setInterval(()=>{
    try {
        axios.get(process.env.SERVER_CALL)
        .then(()=>
            console.log("call")
    
        )
    } catch (error) {
        console.log(error)
    }
},5000)