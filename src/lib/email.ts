import { Resend } from "resend";

// Resend API Key is set in .env
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderShippedEmail(to: string, orderNumber: string, customerName: string) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "your_resend_api_key") {
    console.warn("Resend API Key is missing or invalid. Skipping email send.");
    return false;
  }

  try {
    const data = await resend.emails.send({
      from: "PurePlast <orders@pureplast.co.ke>", // You will need to verify this domain in Resend
      to,
      subject: `Your PurePlast Order ${orderNumber} has been shipped!`,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #004C97; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Order Shipped</h1>
          </div>
          <div style="padding: 24px;">
            <p>Hi ${customerName},</p>
            <p>Great news! Your order <strong>#${orderNumber}</strong> has been shipped and is currently on its way to you.</p>
            <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
            <br/>
            <p>Thank you for choosing PurePlast.</p>
          </div>
          <div style="background-color: #F5F5F2; padding: 16px; text-align: center; font-size: 12px; color: #666;">
            &copy; ${new Date().getFullYear()} PurePlast Manufacturing. All rights reserved.
          </div>
        </div>
      `,
    });
    
    console.log("Email sent successfully:", data);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}
