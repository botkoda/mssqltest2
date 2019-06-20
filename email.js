function emails(data){
    var temp='dmshagaliev@udmurtneft.ru';
    var data=data;
    var len_massive=data.length;
    const nodemailer = require("nodemailer");
    let transporter = nodemailer.createTransport({
        host: '10.226.3.43',
        port:587,
        secure : false, 
        auth: {
            user: 'uneft\\accountmanager',
            pass: 'Ghjdthrf02'
        }, 
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
      });

      for (i = 0; i < len_massive; i++) {
      let info =  transporter.sendMail({
        from: 'dmshagaliev@udmurtneft.ru',
        to: `${temp}`,
        subject: 'Проверка данных справочника сотрудника',
        html:
         `Проверьте свои данные:<br><br>
         Компания: <b>${data[i].company}</b><br>
         Место расположения: <b>${data[i].physicalDeliveryOfficeName}</b><br>
         Департамент: <b>${data[i].Department}</b><br>
         Должность: <b>${data[i].Title}</b><br>
         Телефон: <b>${data[i].TelephoneNumber}</b><br><br>
         Если какие-то из данных не верны, напишите по адресу: <b>dmshagaliev@udmurtneft.ru</b>
        `
      
      });
    }
}

module.exports.emails=emails;