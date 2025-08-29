import { Resend } from 'resend';

export const handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the incoming form data
    const formData = JSON.parse(event.body);
    
    // Initialize Resend with API key from environment variables
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Create the email HTML content
    const emailHtml = `
      <h2>New Nanny Request Form Submission</h2>
      
      <h3>Service Details:</h3>
      <ul>
        <li><strong>Care Type:</strong> ${formData.careType}</li>
        <li><strong>Hourly Rate:</strong> ${formData.hourlyRate}</li>
        <li><strong>Schedule:</strong> ${formData.schedule}</li>
        <li><strong>Urgency:</strong> ${formData.urgency}</li>
      </ul>
      
      <h3>Contact Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${formData.fullName}</li>
        <li><strong>Email:</strong> ${formData.email}</li>
        <li><strong>Phone:</strong> ${formData.phone}</li>
        <li><strong>Zip Code:</strong> ${formData.zipCode}</li>
        <li><strong>Text Opt-in:</strong> ${formData.textOptIn ? 'Yes' : 'No'}</li>
      </ul>
    `;

    // Send the email via Resend
    const result = await resend.emails.send({
      from: 'Household Harmony <noreply@mg.householdharmonyagency.com>',
      to: ['hosting@wgmtx.com', 'info@householdharmonyagency.com'],
      replyTo: formData.email,
      subject: `New Nanny Request - ${formData.fullName}`,
      html: emailHtml
    });

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        data: result 
      })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return error response
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send email',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
}; 