(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c4bb16c"],{2895:function(t,e,a){"use strict";e["a"]={main:function(){return"/api/v1/users"},alone:function(t){return"/api/v1/users/".concat(t)},trash:function(t){return"/api/v1/users/".concat(t,"/trash")},restore:function(t){return"/api/v1/users/".concat(t,"/restore")},trashed:function(){return"/api/v1/users/trashed"},uploadImage:function(t){return"/api/v1/users/".concat(t,"/uploadImage")}}},b5e9:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("user",[t.user.data.name?a("html-head",{attrs:{title:t.user.data.name}}):t._e(),a("page-header",{attrs:{to:{name:"users.index"}},scopedSlots:t._u([{key:"title",fn:function(){return[a("span",{domProps:{textContent:t._s("User Information")}})]},proxy:!0}])}),a("v-row",[a("v-col",{staticClass:"mx-auto",attrs:{cols:"12",sm:"8",lg:"6"}},[t.user.isFetching?a("show-skeleton"):a("v-card",{attrs:{elevation:"0"}},[a("v-row",[a("v-col",{staticClass:"mx-auto",attrs:{cols:"auto"}},[a("v-avatar",{staticClass:"ma-7",attrs:{size:"164",tile:""}},[a("img",{attrs:{src:t.user.data.image}})])],1)],1),a("v-card-title",{domProps:{textContent:t._s(t.user.data.firstName+" "+t.user.data.lastName)}}),a("v-card-subtitle",{domProps:{textContent:t._s(""+t.user.data.roleDetails.name)}}),a("v-card-text",[a("p",[t._v("E-mail: "),a("span",{domProps:{textContent:t._s(t.user.data.email)}})]),a("p",[t._v("Registered: "),a("span",{domProps:{textContent:t._s(t.user.data.createdAt)}})])]),a("v-card-actions",[a("option-buttons",{attrs:{edit:!0,trash:!0,name:"user",id:t.user.data._id}})],1)],1)],1)],1)],1)},s=[],n=(a("d3b7"),a("3ca3"),a("ddb0"),a("2895")),o=a("e279"),u={components:{ShowSkeleton:function(){return a.e("chunk-26d2cbf5").then(a.bind(null,"b461"))}},data:function(){return{user:new o["a"]}},mounted:function(){this.user.getResource(n["a"].alone(this.$route.params.id)),this.user.load(!1)}},i=u,c=a("2877"),d=a("6544"),l=a.n(d),m=a("8212"),p=a("b0af"),f=a("99d9"),v=a("62ad"),h=a("0fd9"),b=Object(c["a"])(i,r,s,!1,null,null,null);e["default"]=b.exports;l()(b,{VAvatar:m["a"],VCard:p["a"],VCardActions:f["a"],VCardSubtitle:f["b"],VCardText:f["c"],VCardTitle:f["d"],VCol:v["a"],VRow:h["a"]})},e279:function(t,e,a){"use strict";a.d(e,"a",(function(){return u}));var r=a("d4ec"),s=a("262e"),n=a("2caf"),o=a("63c1"),u=function(t){Object(s["a"])(a,t);var e=Object(n["a"])(a);function a(t){var s;return Object(r["a"])(this,a),s=e.call(this,t),s.data={_id:"",image:"",firstName:"",lastName:"",email:"",role:"",username:"",password:"",updatedAt:"",createdAt:"",creator:"",deletedAt:"",verified:""},s}return a}(o["a"])}}]);
//# sourceMappingURL=chunk-4c4bb16c.75cdba97.js.map