const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    wallet: {
        type: String,
        required: true,
    },
    tansactiontype: {
        type: String,
        required: true
    },
    comment: {
        type: String,
    },
    owner: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Transaction = mongoose.model("transactions", TransactionSchema);
module.exports = Transaction;
