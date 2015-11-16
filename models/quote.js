var mongoose = require('mongoose');

var QuoteSchema = mongoose.Schema({
  text: String,
  author: String
});

var Quote = module.exports = mongoose.model('Quote', QuoteSchema);

// var tindee1 = new Quote({
//   text: "<br> tells me you don't want to touch css",
//   author: "Fer Martin"
// });

// tindee1.save(function(err) {
//   if (err) console.log(err);
//   console.log('Tindee created!');
// });



