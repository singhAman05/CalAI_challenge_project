const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
const port = process.env.SERVER_PORT;
app.use(express.json());
app.use(cors());
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

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
