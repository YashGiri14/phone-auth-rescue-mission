
export const sendCustomerDataToCompany = async (customerData: any) => {
  const emailData = {
    to: 'yashgiri588@gmail.com',
    subject: `New Customer Estimate Request - ${customerData.contactInfo.name}`,
    html: `
      <h2>New Customer Estimate Request</h2>
      
      <h3>Customer Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${customerData.contactInfo.name}</li>
        <li><strong>Email:</strong> ${customerData.contactInfo.email}</li>
        <li><strong>Mobile:</strong> ${customerData.contactInfo.mobile}</li>
        <li><strong>Address:</strong> ${customerData.contactInfo.address}</li>
      </ul>
      
      <h3>Customer Preferences:</h3>
      <ul>
        <li><strong>Configuration:</strong> ${customerData.configuration}</li>
        <li><strong>Package:</strong> ${customerData.packageType}</li>
        <li><strong>Rooms:</strong> ${customerData.rooms.filter(room => room.count > 0).map(room => `${room.count} ${room.name}${room.count > 1 ? 's' : ''}`).join(', ')}</li>
        <li><strong>Total Rooms:</strong> ${customerData.rooms.reduce((sum, room) => sum + room.count, 0)}</li>
      </ul>
      
      <h3>Estimate Details:</h3>
      <ul>
        <li><strong>Estimated Price:</strong> ₹${customerData.estimate} L</li>
        <li><strong>Base Price per Room:</strong> ₹48,000</li>
        <li><strong>Package Multiplier:</strong> ${customerData.packageType === 'Luxury Lux' ? '2.5x' : '1x'}</li>
      </ul>
      
      <p><strong>Note:</strong> Please follow up with this customer within 24 hours.</p>
    `
  };

  try {
    // Using EmailJS service for free email sending
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'service_demo', // You'll need to set this up in EmailJS
        template_id: 'template_demo', // You'll need to set this up in EmailJS  
        user_id: 'demo_user', // You'll need to set this up in EmailJS
        template_params: {
          to_email: emailData.to,
          subject: emailData.subject,
          message: emailData.html.replace(/<[^>]*>/g, ''), // Convert HTML to plain text
          from_name: 'Artisan Studio Website'
        }
      })
    });

    if (response.ok) {
      console.log('Customer data sent to company email successfully');
      return true;
    } else {
      console.error('Failed to send email:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error sending customer data email:', error);
    return false;
  }
};
