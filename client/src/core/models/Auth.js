export default class {
  constructor () {
    this.token = this.getToken()
    this.user = this.getUser()
  }

  setUser ( user ) {
    this.user = user
    localStorage.setItem( 'user', JSON.stringify( user ) ) 
  }

  setToken ( token ) {
    this.token = token
    localStorage.setItem( 'token', token ) 
  }

  getUser () {
    try {
      let user = localStorage.getItem( 'user' ) 
      if( user ) user = JSON.parse( user )
      return user
    } catch ( err ) {
      localStorage.removeItem( 'user' )
      return null
    }
  }

  getToken () {
    return localStorage.getItem( 'token' )
  }

  isAuthenticated () {
    return this.token !== null && this.user !== null
  }

  logout () {
    localStorage.removeItem( 'token' )
    localStorage.removeItem( 'user' )
  }
}