const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const firstName = req.body.fname;
   const lastName = req.body.lname;
   const Email = req.body.email;
   const data ={
        members:[
            {
                email_address:Email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const JsonData = JSON.stringify(data);
    const url = "https://us8.api.mailchimp.com/3.0/lists/1928de149d";
    const options={
        method:"POST",
        auth:"rajkumar:a3748d1f26d8aa2eb4b095dababf2d19-us8"
    }
 const request = https.request(url, options, function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
       const statusCode = response.statusCode;
        if(statusCode==200){
           res.sendFile(__dirname+"/success.html");
        }
        else{
          res.sendFile(__dirname+"/failure.html");
        }

 })

 request.write(JsonData);
request.end();
}
)

app.listen(process.env.PORT || 3000, function(req,res){
    console.log("listing  at port 3000");
})

//a3748d1f26d8aa2eb4b095dababf2d19-us8

//audience id
//1928de149d.