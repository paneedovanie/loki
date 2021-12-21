module.exports = class {
  constructor ( data ) {
    return this.process( data )
  }

  process ( data ) {
    return new Promise(async (resolve, reject) => {
      try {
        if( Array.isArray( data ) ) {
          let list = []
          for( let i = 0; i < data.length; i++ ) {
              list.push( await this.modify( data[i] ) )
          }
          resolve( list )
        }
        else
            resolve( await this.modify( data ) )
      } catch( e ) { reject( e ); }
    })
  }

  modify ( data ) { return data }
}