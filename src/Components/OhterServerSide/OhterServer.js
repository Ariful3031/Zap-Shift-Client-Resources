
    // // payment related api
    // app.post('/payment-checkout-session', async (req, res) => {
    //   const paymentInfo = req.body;
    //   const amount = parseInt(paymentInfo.cost) * 100;

    //   const session = await stripe.checkout.sessions.create({
    //     line_items: [
    //       {
    //         price_data: {
    //           currency: 'usd',
    //           unit_amount: amount,
    //           product_data: {
    //             name: `please pay for:${paymentInfo.parcelName}`
    //           }
    //         },
    //         quantity: 1,
    //       },
    //     ],
    //     mode: 'payment',
    //     metadata: {
    //       parcelId: paymentInfo.parcelId,
    //       parcelName: paymentInfo.parcelName,
    //     },
    //     customer_email: paymentInfo.senderEmail,
    //     success_url: `${process.env.SITE_DOMAIN}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    //     cancel_url: `${process.env.SITE_DOMAIN}/dashboard/payment-cancelled`,
    //   });

    //   console.log(session)



    //   res.send({ url: session.url })

    // });

    // // old api
    // // app.post('/create-checkout-session', async (req, res) => {
    // //   const paymentInfo = req.body;
    // //   const amount = parseInt(paymentInfo.cost) * 100;

    // //   const session = await stripe.checkout.sessions.create({
    // //     line_items: [
    // //       {
    // //         price_data: {
    // //           currency: 'USD',

    // //           unit_amount: amount,
    // //           product_data: {
    // //             name: paymentInfo.parcelName
    // //           }
    // //         },
    // //         quantity: 1,
    // //       },
    // //     ],
    // //     customer_email: paymentInfo.senderEmail,
    // //     mode: 'payment',
    // //     metadata: {
    // //       parcelId: paymentInfo.parcelId
    // //     },
    // //     success_url: `${process.env.SITE_DOMAIN}/dashboard/payment-success`,
    // //     cancel_url: `${process.env.SITE_DOMAIN}/dashboard/payment-cancelled`,
    // //   });
    // //   console.log(session)
    // //   res.send({ url: session.url })

    // // });


    // app.patch('/payment-success', async (req, res) => {
    //   const sessionId = req.query.session_id;
    //   const session = await stripe.checkout.sessions.retrieve(sessionId)

    //   // console.log('sessioin retrieve', session)

    //   const transactionId = session.payment_intent;
    //   const query = { transactionId: transactionId }

    //   const paymentExist = await paymentsCollection.findOne(query);
    //   // console.log(paymentExist);
    //   if (paymentExist) {
    //     return res.send({
    //       message: 'already exists',
    //       transactionId,
    //       trackingId: paymentExist.trackingId
    //     })
    //   }
    //   const TrackingId = generateTrackingId()

    //   if (session.payment_status === 'paid') {
    //     const id = session.metadata.parcelId;
    //     const query = { _id: new ObjectId(id) }
    //     const update = {
    //       $set: {
    //         paymentStatus: 'paid',
    //         trackingId: TrackingId,

    //       }
    //     }
    //     console.log(update)
    //     const result = await parclesCollection.updateOne(query, update);

    //     const payment = {
    //       amount: session.amount_total / 100,
    //       currency: session.currency,
    //       customerEmail: session.customer_email,
    //       parcelId: session.metadata.parcelId,
    //       parcelName: session.metadata.parcelName,
    //       transactionId: session.payment_intent,
    //       paymentStatus: session.payment_status,
    //       paidAt: new Date(),
    //       trackingId: TrackingId,

    //     }
    //     if (session.payment_status === 'paid') {
    //       const resultPayment = await paymentsCollection.insertOne(payment)
    //       res.send({
    //         success: true,
    //         modifyParcel: result,
    //         trackingId: TrackingId,
    //         transactionId: session.payment_intent,
    //         paymentInfo: resultPayment
    //       })
    //     }
    //   }


    //   res.send({ success: true })
    // })

    // // payment histroy realted api

    // app.get('/payments', verifyFBToken, async (req, res) => {
    //   const email = req.query.email;
    //   const query = {}

    //   console.log('headers', req.headers);

    //   if (email) {
    //     query.customerEmail = email;

    //     // check email address 
    //     if (email !== req.decoded_email) {
    //       return res.status(403).send({ message: 'forbidden access' })
    //     }
    //   }
    //   const cursor = paymentsCollection.find(query).sort({ paidAt: -1 });
    //   const result = await cursor.toArray();
    //   res.send(result);
    // })