import { Resend } from "resend";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Parse FormData instead of JSON
    const formData = await request.formData();
    
    // Get the page URL the form was submitted from
    const referer = request.headers.get('referer') || 'Unknown page';
    const pageUrl = new URL(referer).pathname || '/';
    
    // Convert formData to a more manageable object
    const formEntries = Array.from(formData.entries());
    const formDataObj: Record<string, any> = {};
    const files: Record<string, any> = {};
    
    // Process form entries and separate files
    for (const [key, value] of formEntries) {
      // Check if the value is a File
      if (value instanceof File && value.size > 0) {
        const fileBytes = await value.arrayBuffer();
        const fileBuffer = Buffer.from(fileBytes);
        
        files[key] = {
          filename: value.name,
          content: fileBuffer,
        };
      } else {
        formDataObj[key] = value;
      }
    }

    // Build email HTML content
    let htmlContent = `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h1>
      
      <div style="background-color: #f9f9f9; padding: 10px; margin-bottom: 15px; border-left: 4px solid #0070f3;">
        <p><strong>Submitted from:</strong> ${pageUrl}</p>
        <p><strong>Full URL:</strong> ${referer}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      </div>
      
      <table style="width: 100%; border-collapse: collapse;">`;
    
    // Add form fields to email
    for (const [key, value] of Object.entries(formDataObj)) {
      // Skip empty values and format the field name for display
      if (value) {
        const fieldName = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase());
        
        htmlContent += `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 35%;">${fieldName}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${value}</td>
          </tr>`;
      }
    }
    
    htmlContent += `</table></div>`;

    // Get recipient email from environment variable
    const recipientEmail = process.env.CONTACT_FORM_RECIPIENT || process.env.ADMIN_EMAIL;
    
    if (!recipientEmail) {
      throw new Error("No recipient email configured");
    }

    // Prepare email subject with page information
    const pageName = pageUrl === '/' ? 'Homepage' : pageUrl.split('/').filter(Boolean).pop() || 'Unknown page';
    const emailSubject = `Contact Form: ${pageName} - ${formDataObj.subject || formDataObj.name || 'New submission'}`;

    // Send email with form data
    const emailData: any = {
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: recipientEmail,
      subject: emailSubject,
      html: htmlContent,
    };

    // Add attachments if any
    if (Object.keys(files).length > 0) {
      emailData.attachments = Object.entries(files).map(([key, file]) => ({
        filename: file.filename,
        content: file.content,
      }));
    }

    // Send email with Resend
    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      throw new Error(error.message);
    }

    // Send confirmation email to user if their email is provided
    if (formDataObj.email && typeof formDataObj.email === 'string') {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: formDataObj.email,
        subject: 'We received your message',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Thank you for contacting us</h1>
            <p>We have received your message and will get back to you as soon as possible.</p>
            <p>Best regards,<br>The Team</p>
          </div>
        `,
      });
    }

    return Response.json({ success: true, messageId: data?.id });
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    return Response.json(
      { error: error.message || "Error sending contact form" },
      { status: 500 }
    );
  }
} 