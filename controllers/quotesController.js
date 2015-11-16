var Quote = require('../models/Quote');

// INDEX
function getAll(request, response) {
  Quote.find(function(error, quotes) {
    if(error) response.json({message: 'Could not find any quote'});

    response.render('partials/layout', {quotes: quotes})
    // response.json({quotes: quotes});
  });
}

// CREATE
function createQuote(request, response) {
  // console.log('in POST');
  console.log('body:',request.body.quote);
  var quote = new Quote(request.body.quote);

  quote.save(function(error) {
    if(error) response.json({messsage: 'Could not ceate quote b/c:' + error});
    // console.log(quote);
    response.redirect('/quotes')
  });
}

// SHOW
function getQuote(request, response) {
  var id = request.params.id;

  Quote.findById({_id: id}, function(error, quote) {
    if(error) response.json({message: 'Could not find quote b/c:' + error});

    response.render('partials/quotes/update', {quote: quote})
    // response.json({quote: quote});
  });
}

// UPDATE
function updateQuote(request, response) {
  var id = request.params.id;

  Quote.findById({_id: id}, function(error, quote) {
    if(error) response.json({message: 'Could not find quote b/c:' + error});

    if(request.body.quote.text) quote.text = request.body.text;
    if(request.body.quote.author) quote.author = request.body.author;

    quote.save(function(error) {
      if(error) response.json({messsage: 'Could not update quote b/c:' + error});
      console.log(request.body.quote.text)
      console.log(request.body.quote.author)
      response.redirect('/quotes')
      // response.json({message: 'Quote successfully updated'});
    });
  });
}

// DELETE
function removeQuote(request, response) {
  var id = request.params.id;

  Quote.remove({_id: id}, function(error) {
    if(error) response.json({message: 'Could not delete quote b/c:' + error});
    response.redirect('/quotes')
    // response.json({message: 'Quote successfully deleted'});
  });
}

module.exports = {
  getAll: getAll,
  createQuote: createQuote,
  getQuote: getQuote,
  updateQuote: updateQuote,
  removeQuote: removeQuote
};
