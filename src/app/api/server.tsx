


// src/app/api/server.ts
require('dotenv').config();

const express = require('express');
// const Stripe = require('stripe');
const bodyParser = require('body-parser');
const cors = require('cors')

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2020-08-27',
// });

const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY );

// console.log(process.env.STRIPE_SECRET_KEY)

const app = express();
app.use(bodyParser.json());

app.use(cors())


// POST Request for Checkout session
app.post('/api/checkout_session', async (req, res) => {
  if (req.method === 'POST') {
    const { priceId } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
         {
            price_data:{
                currency:'usd',
                product_data:{
                    name:"Hobby"
                },
                unit_amount:12*100,
            },
            quantity:1
         }
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/canceled',
      });

      console.log(session);
      console.log(session.url);
      
    
      
      res.status(200).json({ url: session.url });
    } catch (err) {
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
});


//  POST request for Billing Portal session
app.post('/api/create-portal-session', async (req, res) => {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: "cus_QP5ohB40E3pcVH",
      return_url: "http://localhost:3000",
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  console.log(process.env.STRIPE_SECRET_KEY);
  
  res.status(200).send('Server is running!');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// webhooks

// app.post('/api/webhook',express.json({type:'application/json'}),(req:Request,res:Response) => {
  
//   let event = null;
//   const sig = req.headers['stripe-signature'] as string;
 

//   try {
//      event  = stripe.webhooks.constribe( req.body, sig,process.env.STRIPE_WEBHOOKS ) as Stripe.Event;
//      console.log(event);
//   } 
//   catch (err) {
//     console.log(`⚠️  Webhook signature verification failed.`, err.message);
//     return res.status(400).json({"Signature Verification Failed"});
//   }

// })

 
  


