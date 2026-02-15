const {query_insert_payment, query_verify_payment} = require("../db/payment_queries")

async function insert_payment(req, res ,next) {
    try {
        const booking_id = req.body;
        await query_insert_payment(booking_id);
        res.json(("Message : Payment Successful(Not Verified)"))
    }
    catch(err)
    {
        next(err);
    }
}

async function verify_payment(req, res , next) {
    try {
        const booking_id = req.body;
        await verify_payment(booking_id);
        res.json(("Message : Payment Verified"));
    }
    catch(err)
    {
        next(err);
    }
}

module.exports ={
    insert_payment,
    verify_payment
}