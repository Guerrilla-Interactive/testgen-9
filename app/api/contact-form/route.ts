import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request: Request) => {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return Response.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Register to the audience first
    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    // Send confirmation email to the subscriber
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: email,
      subject: 'Newsletter Subscription Confirmation',
      html: `
        <div>
          <h1>Thank you for subscribing!</h1>
          <p>You have been successfully added to our newsletter list.</p>
          <p>You'll receive updates about our latest news and offers.</p>
        </div>
      `,
    });

    // Optional: Send notification to admin
    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: process.env.ADMIN_EMAIL || 'frikk@guerrilla.no',
        bcc: 'frikk@guerrilla.no',
        subject: 'New Newsletter Subscriber',
        html: `<p>A new user has subscribed to the newsletter: ${email}</p>`,
      });
    }

    return Response.json({ success: true });
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return Response.json(
      { error: error.message || "Error processing subscription request" },
      { status: 400 }
    );
  }
};
