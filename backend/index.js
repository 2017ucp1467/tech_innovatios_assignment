import express from "express"
import mysql from 'mysql'
import nodemailer from "nodemailer"
import {google} from 'googleapis'

const OAuth2 = google.auth.OAuth2;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

const myOAuth2Client = new OAuth2("Client ID Here", "Client Secret Here");

myOAuth2Client.setCredentials({
  refresh_token: "Refresh Token Here",
});

const myAccessToken = myOAuth2Client.getAccessToken();

const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'redbus'
})

app.get('/bus-tickets', (req,res)=>{
  const fromCity = req.query.fromCity;
  const toCity = req.query.toCity;
  const q = `SELECT * FROM buses WHERE src="${fromCity}" AND destination="${toCity}"`
  db.query(q,(err,data)=>{
    if(err) return res.json(err)    
    return res.json(data)
  })
})

const sendEmail = (context)=>{
  console.log('context data',context)
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
          user: "your email here", //your gmail account you used to set the project up in google cloud console"
          clientId: " Client ID Here",
          clientSecret: "Client Secret Here",
          refreshToken: "Refresh Token Here",
          accessToken: myAccessToken //access token variable we defined earlier
    },
  });

  var mailOptions = {
    from: "singh.navneet2698@gmail.com",
    to: `${context.email}`,
    subject: `Booking Confirmation Detail for journey from ${context.src} to ${context.dest}`,
    text: `Hello ${context.name}, Your booking for journey from ${context.src} to ${context.dest} on ${context.onward} is confirmed with booking id ${context.bookingId}. You Will receive seat details 1 hour before boarding.`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

app.post('/bus-tickets/book', (req,res)=>{
  let data = req.body;
  console.log('post data',data)
  let src= null;
  let dest = null;
  const q = `INSERT INTO passengers (name,age,gender,email,phone) VALUES ("${data.name}",${data.age},"${data.gender}","${data.email}","${data.phone}")`
  db.query(`SELECT * FROM buses where id=${data.busId}`, (err, bus) => {
    if(err) throw err
    src = bus[0].src
    dest = bus[0].destination
  });
  db.query(q,(err,result)=>{
    if(err) return res.status(500).json({'message':'some error occured while creating booking.'});
    let date = new Date().toISOString().slice(0, 19).replace("T", " ")
    const booking = `INSERT INTO bookings (booking_date,journey_date,bus_id,passenger_id) VALUES ("${date}","${data.onward}",${data.busId},${result.insertId})`;
    db.query(booking, (err, bookingData) => {
      if (err) return res.status(500).json(err);
      sendEmail({bookingId:bookingData.insertId,name:data.name,email:data.email,onward:data.onward,src,dest})
      return res.status(200).json({ message: "booking successful.",bookingId: data.insertId });
    });
  })
})

app.listen(8080,()=>{
  console.log('backend service running');
})