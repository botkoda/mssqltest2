function sheduler(){
const fs = require('fs');
const sql=require('mssql');
const stdout=process.stdout;
const getmail=require('./email');
function formatDate(date) {
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;
    return dd + '.' + mm + '.' + yy;
}


var value=formatDate(new Date());


console.log("Hello world, This is an app to connect to sql server.");
var config = {
    "user": "sa", //default is sa
    "password": "base1c",
    "server": "10.226.90.233", // for local machine
    "database": "PERS_AD", // name of database
    "options": {
        tdsVersion: '7_1' //супер важная вещь  используется если  MSSQL 2000 или ниже, без этой строчки ничего не заработает 
    }
}

sql.connect(config, err => {
    if(err){
        throw err ;
    }
    console.log("Connection Successful !");

    new sql.Request().query(`SELECT
    spPersonal_tmp.fTabNumber,spPersonal_tmp.fTransitDate,spAdUsers.mail,spAdUsers.company,spAdUsers.physicalDeliveryOfficeName,spAdUsers.Department,spAdUsers.Title
    ,spAdUsers.displayName,spAdUsers.TelephoneNumber
FROM spPersonal_tmp
  JOIN
 all_personal
  ON spPersonal_tmp.fTabNumber=all_personal.fTabNumber  AND  fTransitDate='${value}'
  JOIN
  spAdUsers
 ON spAdUsers.objectSid=all_personal.UsersSID AND mail IS NOT NULL
  ORDER BY spAdUsers.displayName desc`, (err, result) => {
      if (err) return done(err);
       /* fs.writeFile('myjsonfile.json', JSON.stringify(result.recordset, null,'\t'),'utf8', function(err) {
            if (err) throw err;
           
            console.log('complete');
         var mail= JSON.parse(JSON.stringify(result.recordset, null,'\t'));
         console.log(mail[0].mail);
          //getmail.emails(1);
          sql.close();
        });
        console.dir(result)*/
      
        var persons= JSON.parse(JSON.stringify(result.recordset, null,'\t'));
        if (persons.length>0){
        console.log(persons);
         getmail.emails(persons);
         sql.close();
        }else{
            sql.close();
        }
    })  
        
});


sql.on('error', err => {
    // ... error handler 
    console.log("Sql database connection error " ,err);
})
}

module.exports.sheduler=sheduler;