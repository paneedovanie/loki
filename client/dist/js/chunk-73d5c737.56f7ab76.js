(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-73d5c737"],{2895:function(e,t,a){"use strict";t["a"]={main:function(){return"/api/v1/users"},alone:function(e){return"/api/v1/users/".concat(e)},trash:function(e){return"/api/v1/users/".concat(e,"/trash")},restore:function(e){return"/api/v1/users/".concat(e,"/restore")},trashed:function(){return"/api/v1/users/trashed"},uploadImage:function(e){return"/api/v1/users/".concat(e,"/uploadImage")}}},dea0:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("user",[a("html-head",{attrs:{title:"Users"}}),a("page-header",{scopedSlots:e._u([{key:"title",fn:function(){return[e._v("All Users")]},proxy:!0}])}),e.resources?[a("crud-table-card",{attrs:{api:e.api,headers:e.headers,optionsChanged:e.optionsChanged,resources:e.resources,name:"user",add:!0,edit:!0,trash:!0,view:!0}})]:e._e()],2)},r=[],n=(a("841c"),a("ac1f"),a("2895")),o=a("eaca"),u={data:function(){return{api:n["a"],headers:[{text:"Image",align:"start",value:"image"},{text:"First Name",align:"start",value:"firstName"},{text:"Last Name",align:"start",value:"lastName"},{text:"Role",align:"start",value:"roleDetails.name"},{text:"Created",align:"start",value:"createdAt"},{text:"Actions",align:"end",value:"actions"}],resources:new o["a"]}},methods:{optionsChanged:function(e){this.resources.optionsChanged({method:"get",url:n["a"].main(),params:{search:this.resources.search,searchFields:"firstName,lastName",options:this.resources.options}},e)}},mounted:function(){this.resources.load(!1)}},i=u,c=a("2877"),l=Object(c["a"])(i,s,r,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-73d5c737.56f7ab76.js.map