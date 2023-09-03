const corsConfig={
    origin: process.env.CLIENT_URI,
    exposedHeaders: 'Authorization',
    credentials: true,
}

module.exports=corsConfig