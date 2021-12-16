import Vue from 'vue'
import variables from './variables'

Object.keys( variables ).forEach( variable => {
  window[ variable ] = variables[ variable ]
  Vue.prototype[ variable ] = window[ variable ]
})