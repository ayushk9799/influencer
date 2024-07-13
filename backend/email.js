import nodemailer from 'nodemailer';
import { config } from "dotenv";

config({ path: "./config/config.env" });
const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const createAccount = async (email,username) => {
  try {
   
  
    await sendAccountCreationEmail(email,username);

  } catch (error) {
    
    throw error;
  }
};

export const sendOrderReceivedEmail=async(email,amount)=>
    {
        const mailOptions = {
            from: '"EazzyCollab" <support@eazzycollab.com>',
            to: email,
            subject: 'Order Received from EazzyCollab',
            text: `You have received an order of amount $ ${amount}(dollar)`,
            html: `<h1>You have received an order of amount $ ${amount}(dollar)</h1><h2>Login into your account on <a href="https://eazzycollab.com">eazzycollab.com</a> to know further details and chat with the brand.</h2>`
          };
          try {
             await transporter.sendMail(mailOptions);
           
          } catch (error) {
            throw error;
          }
    }
export const AccountCreationNotificationAdmin=async(useremail)=>
    {
        try{
            await sendNotificationToAdmin("ayushkumarsanu00@gmail.com",useremail)

        }
        catch(error)
        {
            
            throw error;
        }
    }
export const sendAdminOrderDetails=async(influencerEmail,buyerEmail,amount)=>
    {
        const mailOptions = {
            from: '"EazzyCollab" <support@eazzycollab.com>',
            to: "ayushkumarsanu00@gmail.com",
            cc:"rajivranjan0013@gmail.com",
            subject: 'Order happened',
            text: `Influencer :${influencerEmail} buyer:${buyerEmail}, amount: ${amount}`,
            html: `<h1>Order happened for amount ${amount}</h1> <br><p>Influencer :${influencerEmail} buyer:${buyerEmail}, amount: ${amount}</p>`
          };
          try {
            await transporter.sendMail(mailOptions);
          
          } catch (error) {
            throw error;
          }
        

    }
  export  const sendNotificationToAdmin=async(email,useremail)=>
        {
            const mailOptions = {
                from: '"EazzyCollab" <support@eazzycollab.com>',
                to: email,
                cc:"rajivranjan0013@gmail.com",
                subject: 'EazzyCollab Account registration!',
                text: `Account with email ${useremail} has been registered on eazzycollab`,
                html: `<h1>Account with email ${useremail} has been registered on eazzycollab</h1>`
              };
              try {
                await transporter.sendMail(mailOptions);
                
              } catch (error) {
                throw error;
              }
            

        }
export const sendAccountCreationEmail = async (email, username) => {
  const mailOptions = {
    from: '"EazzyCollab" <support@eazzycollab.com>',
    to: email,
    subject: 'Welcome to EazzyCollab!',
    text: `Hello ${username},\n\nYour account has been successfully created. Welcome to Your App!`,
    html: `
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="icon" href="%PUBLIC_URL%/EazzyCollab.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link href="//fonts.googleapis.com/css2?family=Tinos" rel="stylesheet">
      <style>
        html, body {
          margin: 1px;
          box-sizing: border-box;
          font-family: "Tinos";
        }
      </style>
    </head>
    <body>
      <h1>Welcome to EazzyCollab!</h1>
      <h2>Hello ${username},</h2>
      <h2>Your account has been successfully created. Welcome to EazzyCollab!</h2>
      <h2>If you have registered as influencer , your social media profile will be verified as soon as possible .Your account section will show the verification status.</h2>
      
    </body>
    </html>`
  };

  try {
    await transporter.sendMail(mailOptions);
 
  } catch (error) {
    throw error;
  }
};

