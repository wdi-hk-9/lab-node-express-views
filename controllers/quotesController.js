var Quote = require('../models/Quote');


// INDEX
function getAll(request, response) {
  Quote.find(function(error, quotes) {
    if (error) response.json({message: 'Could not find any quote'});

    // response.json({quotes: quotes});
    response.render('quotes/index', {quotes: quotes});
  });
}

// NEW
function newQuote(request, response) {
  response.render('quotes/new');
}

// CREATE
function createQuote(request, response) {
  console.log('in POST');
  console.log('body:',request.body.quote);
  var quote = new Quote(request.body.quote);

  quote.save(function(error) {
    if (error) response.json({messsage: 'Could not ceate quote b/c:' + error});
    // console.log(quote);
    // response.json(quote);
    response.redirect('/quotes')
  });
}

// SHOW
function getQuote(request, response) {
  var id = request.params.id;

  Quote.findById({_id: id}, function(error, quote) {
    if (error) response.json({message: 'Could not find quote b/c:' + error});

    // response.json({quote: quote});
    response.render('/quotes/:id', {quote: quote});
  });
}

// UPDATE
function updateQuote(request, response) {
  var id = request.params.id;

  Quote.findById({_id: id}, function(error, quote) {
    if (error) response.json({message: 'Could not find quote b/c:' + error});

    if(request.body.quote.text) quote.text = request.body.quote.text;
    if(request.body.quote.author) quote.author = request.body.quote.author;

    quote.save(function(error) {
      if (error) response.json({messsage: 'Could not update quote b/c:' + error});

      // response.json({message: 'Quote successfully updated'});
      response.redirect('/quotes');
    });
  });
}

// DELETE
function removeQuote(request, response) {
  var id = request.params.id;

  Quote.remove({_id: id}, function(error) {
    if (error) response.json({message: 'Could not delete quote b/c:' + error});

    // response.json({message: 'Quote successfully deleted'});
    response.redirect('/quotes');
  });
}

module.exports = {
  getAll: getAll,
  newQuote: newQuote,
  createQuote: createQuote,
  getQuote: getQuote,
  updateQuote: updateQuote,
  removeQuote: removeQuote
};
