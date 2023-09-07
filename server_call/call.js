const axios = require("axios")

setInterval(()=>{
    try {
        
        axios.get(process.env.SERVER)
        .then(()=>
            console.log("call")
        )
        .catch(err=>{

        })
    } catch (error) {
        
    }
},1000*60*10)