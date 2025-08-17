import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  const { name, email, message } = await request.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f8f9fa;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background-color: #000000; padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 2px;">
            STUDIO GRAVITAS
          </h1>
          <div style="width: 60px; height: 1px; background-color: #ffffff; margin: 20px auto 0;"></div>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #333333; margin: 0 0 30px; font-size: 24px; font-weight: 300;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 30px; border-left: 4px solid #000000; margin-bottom: 30px;">
            <div style="margin-bottom: 20px;">
              <strong style="color: #333333; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">From:</strong>
              <p style="margin: 5px 0 0; color: #666666; font-size: 16px; line-height: 1.5;">${name}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #333333; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Email:</strong>
              <p style="margin: 5px 0 0; color: #666666; font-size: 16px; line-height: 1.5;">
                <a href="mailto:${email}" style="color: #000000; text-decoration: none;">${email}</a>
              </p>
            </div>
            
            <div>
              <strong style="color: #333333; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Message:</strong>
              <p style="margin: 15px 0 0; color: #666666; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px 0;">
            <a href="mailto:${email}" style="display: inline-block; background-color: #000000; color: #ffffff; padding: 12px 30px; text-decoration: none; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; transition: background-color 0.3s;">
              Reply to ${name}
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
          <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5;">
            This message was sent through the Studio Gravitas contact form<br>
            <strong>Studio Gravitas</strong> • Architecture Studio • India International
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const autoResponseTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting Studio Gravitas</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f8f9fa;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background-color: #000000; padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 2px;">
            STUDIO GRAVITAS
          </h1>
          <div style="width: 60px; height: 1px; background-color: #ffffff; margin: 20px auto 0;"></div>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #333333; margin: 0 0 20px; font-size: 24px; font-weight: 300;">
            Thank you, ${name}
          </h2>
          
          <p style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
            We have received your message and appreciate you taking the time to contact Studio Gravitas. 
            Our team will review your inquiry and respond within 24-48 hours.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 25px; border-left: 4px solid #000000; margin: 30px 0;">
            <p style="margin: 0; color: #333333; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
              <strong>Your Message:</strong>
            </p>
            <p style="margin: 0; color: #666666; font-size: 15px; line-height: 1.5; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            In the meantime, feel free to explore our portfolio and learn more about our approach to architecture 
            that is rooted in phenomenology and driven by collaborative spirit.
          </p>
          
          <div style="text-align: center; padding: 20px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/home" style="display: inline-block; background-color: #000000; color: #ffffff; padding: 12px 30px; text-decoration: none; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin-right: 15px;">
              View Portfolio
            </a>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/about" style="display: inline-block; border: 1px solid #000000; color: #000000; padding: 12px 30px; text-decoration: none; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">
              About Us
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
          <p style="margin: 0 0 10px; color: #333333; font-size: 16px; font-weight: 500;">
            Studio Gravitas
          </p>
          <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5;">
            Architecture Studio • India International<br>
            mail@studiogravitas.com • +91 11 1234 5678
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // Send notification email to admin
    await transporter.sendMail({
      from: `"Studio Gravitas Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: htmlTemplate,
    });

    // Send auto-response to the person who submitted the form
    await transporter.sendMail({
      from: `"Studio Gravitas" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank you for contacting Studio Gravitas`,
      text: `Dear ${name},\n\nThank you for contacting Studio Gravitas. We have received your message and will respond within 24-48 hours.\n\nBest regards,\nStudio Gravitas Team`,
      html: autoResponseTemplate,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
