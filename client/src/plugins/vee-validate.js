import Vue from 'vue';
import {  ValidationObserver, ValidationProvider } from 'vee-validate';

Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)