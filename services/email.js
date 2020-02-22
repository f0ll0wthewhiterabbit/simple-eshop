const nodemailer = require('nodemailer')

exports.sendRegistrationEmail = async user => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    })

    const info = await transporter.sendMail({
      from: '"SimplEshop 🛒" <info@simpleshop.com>',
      to: process.env.MAIL_ADDRESS_ADMIN,
      subject: 'New registration ✔',
      text: 'The new user has just registered in the store.',
      html: `
        <h1>The new user has just registered in the store.</h1>
        <h3>User details:</h3>
        <ul>
          <li><b>First Name</b>: ${user.firstName}</li>
          <li><b>Last Name</b>: ${user.lastName}</li>
          <li><b>Email:</b> ${user.email}</li>
          <li><b>Registered at</b>: ${user.createdAt.toLocaleString()}</li>
        </ul>
      `,
    })

    console.log('Message sent: %s', info.messageId)
  } catch (err) {
    console.error('Error while sending registration email:', err)
  }
}

exports.sendDeleteAccountEmail = async userEmail => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    })

    const info = await transporter.sendMail({
      from: '"SimplEshop 🛒" <support@simpleshop.com>',
      to: userEmail,
      subject: 'Account deletion',
      text: 'A request to delete your account has been sent to the administrator.',
      html: `
        <h3>A request to delete your account has been sent to the administrator.</h3>
        <p>Unfortunately, your account will be deleted after confirmation.</p>
        <p>In case you want to cancel the deletion, contact with our support.</p>
      `,
    })

    console.log('Message sent: %s', info.messageId)
  } catch (err) {
    console.error('Error while sending delete account email:', err)
  }
}
