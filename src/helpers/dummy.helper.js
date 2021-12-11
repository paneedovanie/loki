const 
  { rword } = require( 'rword' ),
  { loremIpsum } = require("lorem-ipsum"),
  randomEmail = require('random-email')

module.exports.name = function () { 
  return rword.generate( 1, { capitalize: 'first' } ) 
}

module.exports.word = function ( options ) { 
  return rword.generate( 1, options)
}

module.exports.string = function ( count, options ) { 
  return rword.generate( count, options ) 
}

module.exports.sentence = function ( options ) {
  return loremIpsum( options )
}

module.exports.email = function ( options ) {
  return randomEmail( options )
}

module.exports.number = function ( options ) {
  const
    MIN = options.min || 0,
    MAX = options.max || 10

  return Math.random() * (MAX - MIN) + MIN;
}