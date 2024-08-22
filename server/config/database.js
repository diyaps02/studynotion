const mongoose=require( 'mongoose' );
require("dotenv").config();

const database= async(req,res)=>{
 mongoose.connect(process.env.DATABASE_URL,
    {useNewUrlParser:true},
    {useUnifiedTopology: true}
    )
    .then(()=>{console.log( "Database Connected Successfully!" )})
    .catch((err) => {console.log(`Error Connecting to Database ${err}`)
    console.log(err);
     process.exit();
});
 
}
module.exports=database;