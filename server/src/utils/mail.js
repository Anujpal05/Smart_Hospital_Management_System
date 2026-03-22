import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path"
import fs from "fs"
dotenv.config();

const templatePath = path.join(process.cwd() , "src" , "templates" , "verifyMail.html")
const template = fs.readFileSync(templatePath , "utf-8")


 const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

export const sendVerificationMail = async (name ,receiverEmail , verifyLink) => {
  try {
    await transporter.sendMail({
      from: `"MEDDICAL HOSPITAL" <${process.env.EMAIL}>`,
      to: receiverEmail,
      subject: "Email verification Link",
      html: template.replace("{{name}}" , name).replace("{{verifyLink}}" , verifyLink)
      
    });
  } catch (error) {
    console.log("error in sending mail");
  }
};

export const confirmMail = async(receiverEmail)=>{
  try{
    await transporter.sendMail({
      from: `"MEDDICAL HOSPITAL" <${process.env.EMAIL}>`,
      to: receiverEmail,
      subject: "Email verification",
      text:"Your email has been verified successfully"
    })
  }catch(error){
    console.log("error in sending mail");
  }
}