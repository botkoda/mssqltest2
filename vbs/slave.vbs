Function sendMail()
strSmtpServer="udn-cas01.uneft.ru" ' имя почтового сервера, в моем случае это Exchange
strSmtpPort=25
strSmtpAuth="no"
strSmtpSsl="no"
strDate=date
strSendingEmail="dmshagaliev@udmurtneft" ' Имя отправителя
strReportEmail="dmshagaliev@udmurtneft" ' Имя получателя
'WScript.Echo logPath & "\backup" & strDate & ".html"
Set objMessage = CreateObject("CDO.Message")
objMessage.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2
objMessage.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/smtpserver") = strSmtpServer
objMessage.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = strSmtpPort
If strSmtpAuth = "yes" Then
objMessage.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate") = 1 'use '2' for NTLM authentication
objMessage.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/sendusername") = strSmtpUser
objMessage.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/sendpassword") = strSmtpPass
End If
If strSmtpSsl = "yes" Then
objMessage.Configuration.Fields.Item("http://schemas.microsoft.com/cdo/configuration/smtpusessl") = True
End If
objMessage.Configuration.Fields.Update
objMessage.Subject = "TEST1" & strDate & "."
objMessage.From = strSendingEmail
objMessage.To = strReportEmail
objMessage.HTMLBody = "test test"
objMessage.Send
End Function

sendMail()
