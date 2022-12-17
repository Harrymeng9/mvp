const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mvp');

let transactionSchema = new mongoose.Schema({
  date: String,
  category: String,
  amount: Number
});

let Transaction = mongoose.model('Transaction', transactionSchema);

var saveToDB = (month, category, amount) => {
  var uniqueTransaction = new Transaction({ date: month, category: category, amount: amount });
  uniqueTransaction.save((err, data) => {
    if (err) {
      console.err(err);
    }
    console.log('Data saved into database!');
  });
};

var updateTarget = (month, category, amount) => {

  // console.log('testing', Transaction.find({month:month, category:'Target'}));
  Transaction.find({month:month, category:'Target'})
    .then((result)=> {
      console.log('applehere',result);
      if (result.length === 0) {
        saveToDB(month, category, amount);
      } else {
        Transaction.updateOne({amount: result[0].amount}, {$set: {amount: amount}}, function(err, res) {
          if (err) throw err;
          console.log('res', res);
        });

      }
    })
  // Transaction.findOneAndUpdate({date: month, category: 'Target'}, {amount: amount}, {new:true});
};


var getFromDB = (selectedMonth) => {

 return Transaction.aggregate([
    { $match: { date: selectedMonth} },
    { $group: { _id: "$category", total: { $sum: "$amount" } } }

  ], function(err, result) {
    return result;
  });
};

module.exports.saveToDB = saveToDB;
module.exports.getFromDB = getFromDB;
module.exports.updateTarget = updateTarget;