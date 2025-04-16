import { Resend } from "resend";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to format field names (can be removed or kept as fallback)
// function formatFieldName(fieldName: string): string {
//   return fieldName
//     .replace(/([A-Z])/g, ' $1')
//     .replace(/^./, (str) => str.toUpperCase());
// }

export async function POST(request: NextRequest) {
  // console.log('[API /contact] Received POST request'); // REMOVE
  try {
    const formData = await request.formData();
    const referer = request.headers.get('referer') || 'Unknown page';
    const pageUrl = new URL(referer).pathname || '/';

    const formEntries = Array.from(formData.entries());
    const formDataObj: Record<string, any> = {};
    const files: Record<string, any> = {};
    let fieldMetadata: Record<string, { label: string; type: string }> = {};
    let formTitle = "New submission"; // Default form title

    // console.log('[API /contact] Processing FormData...'); // REMOVE
    // Process form entries, separate files, and extract metadata
    for (const [key, value] of formEntries) {
      if (key === '__fieldMetadata__' && typeof value === 'string') {
        try {
          fieldMetadata = JSON.parse(value);
        } catch (e) {
          // REMOVE console.error for metadata parse failure if desired, or keep for ops visibility
          // console.error("Failed to parse field metadata:", e);
        }
      } else if (key === '__formTitle__' && typeof value === 'string') {
        formTitle = value || formTitle; // Use submitted title or default
      } else if (value instanceof File && value.size > 0) {
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

    // console.log(`[API /contact] Parsed data keys: ${Object.keys(formDataObj).join(', ')}`); // REMOVE
    // console.log(`[API /contact] Found ${Object.keys(files).length} files.`); // REMOVE
    // console.log(`[API /contact] Metadata keys: ${Object.keys(fieldMetadata).join(', ')}`); // REMOVE
    // console.log(`[API /contact] Form Title: ${formTitle}`); // REMOVE

    // Build email HTML content using metadata
    let htmlContent = `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">${formTitle} - Contact Form Submission</h1>
      
      <div style="background-color: #f9f9f9; padding: 10px; margin-bottom: 15px; border-left: 4px solid #0070f3;">
        <p><strong>Submitted from:</strong> ${pageUrl}</p>
        <p><strong>Full URL:</strong> ${referer}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      </div>
      
      <table style="width: 100%; border-collapse: collapse;">`;

    // Add form fields to email, using metadata for labels and formatting
    for (const [key, rawValue] of Object.entries(formDataObj)) {
      const metadata = fieldMetadata[key];
      const displayLabel = metadata?.label || key; // Use label from metadata or fall back to key
      const fieldType = metadata?.type;
      let displayValue = rawValue as string;

      // Format specific types
      if (fieldType === 'checkbox') {
        displayValue = rawValue === 'true' ? 'Yes' : 'No'; // More readable boolean
      } else if (fieldType === 'checkboxGroup' && typeof rawValue === 'string') {
        // Split comma-separated string and display as a list
        const items = rawValue.split(', ').filter(item => item);
        if (items.length > 0) {
          displayValue = `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
        } else {
          displayValue = '<i>No options selected</i>';
        }
      } else if (!rawValue) {
        // Don't display rows for empty fields (unless it was a checkbox/group)
        continue; 
      }
      
      htmlContent += `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 35%; vertical-align: top;">${displayLabel}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${displayValue}</td>
        </tr>`;
    }
    
    htmlContent += `</table></div>`;

    // console.log('[API /contact] Email HTML prepared. Sending email...'); // REMOVE

    const recipientEmail = process.env.CONTACT_FORM_RECIPIENT || process.env.ADMIN_EMAIL;
    if (!recipientEmail) {
      throw new Error("No recipient email configured");
    }

    // Prepare email subject using form title
    const pageName = pageUrl === '/' ? 'Homepage' : pageUrl.split('/').filter(Boolean).pop() || 'Unknown page';
    const emailSubject = `Contact Form: ${formTitle} (${pageName})`;

    const emailData: any = {
      from: process.env.EMAIL_FROM || 'frikk@guerrilla.no',
      to: recipientEmail,
      bcc: 'frikk@guerrilla.no',
      subject: emailSubject,
      html: htmlContent,
    };

    if (Object.keys(files).length > 0) {
      emailData.attachments = Object.values(files); // Simplified attachment adding
    }

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('[API /contact] Resend Error:', error); // Keep this important error log
      throw new Error(error.message);
    }
    
    // console.log('[API /contact] Main email sent. Message ID:', data?.id); // REMOVE

    // Send confirmation email (still relies on finding a field named 'email')
    const userEmail = formDataObj['email'];
    if (userEmail && typeof userEmail === 'string') {
      // console.log('[API /contact] Sending confirmation email to:', userEmail); // REMOVE
      try {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
          to: userEmail,
          subject: 'We received your message',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #333;">Thank you for contacting us</h1>
              <p>We have received your message and will get back to you as soon as possible.</p>
              <p>Best regards,<br>The Team</p>
            </div>
          `,
        });
        // console.log('[API /contact] Confirmation email sent.'); // REMOVE
      } catch (confError: any) {
        console.error('[API /contact] Confirmation Email Error:', confError); // Keep this important error log
      }
    }

    // console.log('[API /contact] Request successful.'); // REMOVE
    return Response.json({ success: true, messageId: data?.id });
  } catch (error: any) {
    console.error('[API /contact] Catch Error:', error); // Keep this general error log
    return Response.json(
      { error: error.message || "Error sending contact form" },
      { status: 500 }
    );
  }
} 