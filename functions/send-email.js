export async function onRequestPost(context) {
  const { request, env } = context;
  
  // Change 1: Read as FormData instead of JSON
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const date = formData.get('date');

  // Sending the email via Resend
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to: 'aliaftabshagi@gmail.com', 
      subject: 'New Appointment Booking',
      html: `
        <h3>New Booking Received!</h3>
        <p><strong>Name:</strong> ${name || 'N/A'}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Date:</strong> ${date || 'N/A'}</p>
      `,
    }),
  });

  if (res.ok) {
    return new Response('Email sent successfully!', { status: 200 });
  } else {
    const error = await res.text();
    return new Response('Error: ' + error, { status: res.status });
  }
}
