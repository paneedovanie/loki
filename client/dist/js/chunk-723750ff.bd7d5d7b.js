(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-723750ff"],{e56a:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var a=r("d4ec"),n=r("262e"),o=r("2caf"),s=r("63c1"),i=function(e){Object(n["a"])(r,e);var t=Object(o["a"])(r);function r(e){var n;return Object(a["a"])(this,r),n=t.call(this,e),n.data={_id:"",name:"",updatedAt:"",createdAt:"",creator:"",deletedAt:""},n}return r}(s["a"])},ebe9:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("user",[r("html-head",{attrs:{title:"Add Role"}}),r("page-header",{scopedSlots:e._u([{key:"title",fn:function(){return[r("span",{domProps:{textContent:e._s("Add Role")}})]},proxy:!0}])}),r("v-row",[r("v-col",{attrs:{cols:"12",lg:"6"}},[r("validation-observer",{ref:"validation"},[r("v-form",{ref:"form",attrs:{enctype:"multipart/form-data",disabled:e.role.isFetching},on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[r("v-card",{attrs:{elevation:"0"}},[r("v-card-title",{domProps:{textContent:e._s("Add Role")}}),r("v-card-text",[r("form-errors",{attrs:{error:e.role.errors.message}}),r("validation-provider",{attrs:{vid:"name",name:"Name"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("v-text-field",{attrs:{"error-messages":a,label:"Name",name:"name",outlined:""},on:{input:function(t){return e.role.prestine(!1)}},model:{value:e.role.data.name,callback:function(t){e.$set(e.role.data,"name",t)},expression:"role.data.name"}})]}}])})],1),r("v-card-actions",{staticClass:"d-flex justify-end"},[r("v-btn",{attrs:{color:"primary",type:"submit",loading:e.role.isFetching,disabled:e.role.isPrestine}},[e._v("Save")])],1)],1)],1)],1)],1)],1)],1)},n=[],o=r("1da1"),s=r("5530"),i=(r("96cf"),r("4c6e")),d=r("e56a"),c=r("2f62"),l={computed:Object(s["a"])({},Object(c["c"])({auth:"auth/auth"})),data:function(){return{role:new d["a"]}},methods:Object(s["a"])(Object(s["a"])({},Object(c["b"])({setSnackbar:"snackbar/set"})),{},{submit:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.role.request({method:"post",url:i["a"].main(),data:e.role.readyData(e.$refs.form.$el)});case 2:if(r=t.sent,r){t.next=5;break}return t.abrupt("return",e.$refs.validation.setErrors(e.role.errors.details));case 5:e.setSnackbar({model:!0,text:"Role created",timeout:3e3}),e.$router.push({name:"roles.edit",params:{id:r._id}});case 7:case"end":return t.stop()}}),t)})))()}}),mounted:function(){this.role.fetch(!1),this.role.load(!1)}},u=l,f=r("2877"),m=r("6544"),b=r.n(m),p=r("8336"),v=r("b0af"),h=r("99d9"),x=r("62ad"),w=r("4bd4"),j=r("0fd9"),k=r("8654"),O=Object(f["a"])(u,a,n,!1,null,null,null);t["default"]=O.exports;b()(O,{VBtn:p["a"],VCard:v["a"],VCardActions:h["a"],VCardText:h["c"],VCardTitle:h["d"],VCol:x["a"],VForm:w["a"],VRow:j["a"],VTextField:k["a"]})}}]);
//# sourceMappingURL=chunk-723750ff.bd7d5d7b.js.map