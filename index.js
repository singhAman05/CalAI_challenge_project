const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");
app.use(express.json());
const port = process.env.SERVER_PORT;
app.use(cors());

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_SECRET_KEY;
const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

//STRIPE PAYMENT OPTION
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
app.post("/create-checkout-session", async (req, res) => {
  const { title, category, price, linkImg } = req.body;

  try {
    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
              description: category,
              images: [linkImg],
            },
            unit_amount: Math.round(price * 100), // price in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success", // Redirect URL after successful payment
      cancel_url: "http://localhost:3000/cancel", // Redirect URL if payment is canceled
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send("Error creating checkout session");
  }
});

//SENDING EMAIL
// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true", // Convert to boolean
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Your password
  },
});

// Function to send welcome email
async function sendWelcomeEmail(email) {
  try {
    // Create email message
    const mailOptions = {
      from: "Aman <amanshankarsingh2001@gmail.com>", // Sender address
      to: email, // Receiver address
      subject: "Welcome to Our App!", // Subject line
      html: "<p>Welcome to Our App!</p>", // HTML body (can be more complex)
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    return { success: true, message: "Welcome email sent successfully." };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, message: "Failed to send welcome email." };
  }
}

// Example route for user registration
app.post("/register", async (req, res) => {
  // Your user registration logic here
  const { email } = req.body;

  try {
    // Simulate user registration, then send welcome email
    await sendWelcomeEmail(email);

    // Return success response
    res
      .status(200)
      .json({ success: true, message: "User registered successfully." });
  } catch (error) {
    console.error("Error registering user:", error);
    // Return error response
    res
      .status(500)
      .json({ success: false, message: "Failed to register user." });
  }
});

//SEND THANKYOU MAIL
app.post("/send-email", async (req, res) => {
  const { email } = req.body;

  // Create email message
  const mailOptions = {
    from: "Aman <amanshankarsingh2001@gmail.com>", // Sender address
    to: email, // Receiver address
    subject: "Thank You for Your Purchase!", // Subject line
    html: "<p>Thank you for shopping with us!</p>", // HTML body (can be more complex)
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

//PAYPAL TOKEN GENERATION
const generateToken = async () => {
  try {
    const tokenResponse = await axios.post(
      "https://api.sandbox.paypal.com/v1/oauth2/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // console.log(tokenResponse.data);
    return tokenResponse.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error.message);
  }
};

//CREATING ORDER
app.post("/create-order", async (req, res) => {
  const url = "https://api-m.sandbox.paypal.com/v2/checkout/orders";
  const { amount } = req.body;
  const data = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: amount,
        },
      },
    ],
    application_context: {
      brand_name: "PRACTICE INC",
      locale: "en-US",
      return_url: "https://fastidious-pixie-4a8646.netlify.app/success", // This is the returnUrl
      cancel_url: "https://fastidious-pixie-4a8646.netlify.app/cancel", // Your cancel URL
    },
  };
  const accessToken = await generateToken();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.post(url, data, { headers });
    console.log("Order Created:", response.data);
    const { links } = response.data;
    const paypalRedirect = links.find((link) => link.rel === "approve");
    console.log(response.data.id);
    if (paypalRedirect) {
      res.json({ orderId: response.id, approvalUrl: paypalRedirect.href });
    } else {
      res.status(500).json({ error: "Failed to get PayPal redirect URL" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

//CAPTURING ORDER
app.post("/capture-order", async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ error: "Order ID is required" });
  }

  const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`;
  const data = {
    note_to_payer: "Thank you for your purchase!",
  };

  const accessToken = await generateToken(); // Assuming this function generates the access token
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.post(url, data, { headers });
    console.log("Order Captured:", response.data);
    res.json({ message: "Order captured successfully" });
  } catch (error) {
    console.error("Error capturing order:", error.response.data);
    res.status(500).json({ error: "Failed to capture order" });
  }
});

app.get("/", async (req, res) => {
  res.send("hello world");
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
