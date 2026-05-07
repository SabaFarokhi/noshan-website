import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message, locale } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // TODO: Replace with actual email sending (Resend, Nodemailer, etc.)
    // when CONTACT_EMAIL env var is set
    const contactEmail = process.env.CONTACT_EMAIL || 'noshan@example.com';

    console.log('Contact form submission:', {
      to: contactEmail,
      from: email,
      name,
      phone: phone || 'N/A',
      subject,
      message,
      locale,
      timestamp: new Date().toISOString(),
    });

    // When Nodemailer is configured:
    // const transporter = nodemailer.createTransport({ ... });
    // await transporter.sendMail({ from, to, subject, html });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
