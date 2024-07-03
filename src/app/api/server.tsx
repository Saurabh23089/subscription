// src/app/api/server.ts
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27',
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// POST Request for Checkout session
app.post('/api/checkout_session', async (req:Request, res:Response) => {
  if (req.method === 'POST') {
   

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: "Hobby",
              },
              unit_amount: 12 * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/canceled',
      });

      console.log(session);
      console.log(session.url);

      res.status(200).json({ url: session.url });
    } catch (err) {
      const error = err as { statusCode?: number; message: string };
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
});

// POST request for Billing Portal session
app.post('/api/create-portal-session', async (req:Request, res:Response) => {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: "cus_QP5ohB40E3pcVH",
      return_url: "http://localhost:3000",
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    const error = err as { message: string };
    res.status(500).json({ error: error.message });
  }
});

// Health check route
app.get('/api/health', (req:Request, res:Response) => {
  console.log(process.env.STRIPE_SECRET_KEY);
  
  res.status(200).send('Server is running!');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Webhooks
// app.post('/api/webhook', express.json({ type: 'application/json' }), (req, res) => {
//   let event: Stripe.Event | null = null;
//   const sig = req.headers['stripe-signature'];

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOKS as string);
//     console.log(event);
//   } catch (err) {
//     const error = err as { message: string };
//     console.log(`⚠️  Webhook signature verification failed.`, error.message);
//     return res.status(400).json({ "Signature Verification Failed": error.message });
//   }
// });

export default app;
