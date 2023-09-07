const axios = require("axios")

setInterval(()=>{
    axios.get(process.env.SERVER_CALL)
    .then(()=>
        console.log("call")
    )
    .catch((err)=>{
    })

},1000*60*10)