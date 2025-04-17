// file: test-email.js

const nodemailer = require('nodemailer');

(async () => {
  try {
    // Generate a new Ethereal test account
    const testAccount = await nodemailer.createTestAccount();

    console.log('✅ New Ethereal account created:');
    console.log('  ✉️  User: ', testAccount.user);
    console.log('  🔐 Pass: ', testAccount.pass);

    // Create a transporter using the test account
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // use TLS
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Verify SMTP connection
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    // Send a test email
    const info = await transporter.sendMail({
      from: '"Test Sender" <test@example.com>',
      to: 'receiver@example.com',
      subject: 'Hello from Ethereal',
      text: 'This is a test email sent using Ethereal + Nodemailer!',
      html: '<p>This is a <strong>test email</strong> sent using <em>Ethereal</em> + Nodemailer!</p>',
    });

    console.log('✅ Test email sent!');
    console.log('📬 Message ID:', info.messageId);
    console.log('🔗 Preview URL:', nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error('❌ Error occurred:', err.message);
  }
})();
