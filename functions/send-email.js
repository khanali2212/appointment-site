export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json();

  // Sending the email via Resend
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to: 'aliaftabshagi@gmail.com', // <--- REPLACE THIS with your actual email
      subject: 'New Appointment Booking',
      html: `
        <h3>New Booking Received!</h3>
        <p><strong>Name:</strong> ${body.name || 'N/A'}</p>
        <p><strong>Email:</strong> ${body.email || 'N/A'}</p>
        <p><strong>Date:</strong> ${body.date || 'N/A'}</p>
      `,
    }),
  });

  const result = await res.json();

  return new Response(JSON.stringify(result), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' }
  });
}
