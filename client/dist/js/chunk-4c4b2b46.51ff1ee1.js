(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c4b2b46"],{2895:function(e,t,r){"use strict";t["a"]={main:function(){return"/api/v1/users"},alone:function(e){return"/api/v1/users/".concat(e)},trash:function(e){return"/api/v1/users/".concat(e,"/trash")},restore:function(e){return"/api/v1/users/".concat(e,"/restore")},trashed:function(){return"/api/v1/users/trashed"},uploadImage:function(e){return"/api/v1/users/".concat(e,"/uploadImage")}}},afa6:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("user",[e.user.data.name?r("html-head",{attrs:{title:e.user.data.name}}):e._e(),r("page-header",{attrs:{to:{name:"users.index"}},scopedSlots:e._u([{key:"title",fn:function(){return[r("span",{domProps:{textContent:e._s("Edit User")}})]},proxy:!0}])}),e.user.isFetching?r("edit-skeleton"):e._e(),r("v-row",{class:{"d-none":e.user.isFetching}},[r("v-col",{staticClass:"mx-auto",attrs:{cols:"12",lg:"6"}},[r("validation-observer",{ref:"validation"},[r("v-form",{ref:"form",attrs:{enctype:"multipart/form-data",disabled:e.user.isFetching},on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[r("v-card",{attrs:{elevation:"0"}},[r("v-card-title",{domProps:{textContent:e._s("Edit Information")}}),r("v-card-text",[r("form-errors",{attrs:{error:e.user.errors.message}}),r("validation-provider",{attrs:{vid:"firstName"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("v-text-field",{attrs:{"error-messages":a,label:"First Name",name:"firstName",outlined:""},on:{input:function(t){return e.user.prestine(!1)}},model:{value:e.user.data.firstName,callback:function(t){e.$set(e.user.data,"firstName",t)},expression:"user.data.firstName"}})]}}])}),r("validation-provider",{attrs:{vid:"lastName"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("v-text-field",{attrs:{"error-messages":a,label:"Last Name",name:"lastName",outlined:""},on:{input:function(t){return e.user.prestine(!1)}},model:{value:e.user.data.lastName,callback:function(t){e.$set(e.user.data,"lastName",t)},expression:"user.data.lastName"}})]}}])}),r("validation-provider",{attrs:{vid:"email"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("v-text-field",{attrs:{"error-messages":a,label:"E-mail",name:"email",outlined:""},on:{input:function(t){return e.user.prestine(!1)}},model:{value:e.user.data.email,callback:function(t){e.$set(e.user.data,"email",t)},expression:"user.data.email"}})]}}])}),r("validation-provider",{attrs:{vid:"role"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("role-selector",{attrs:{errors:a},on:{input:function(t){return e.user.prestine(!1)}},model:{value:e.user.data.role,callback:function(t){e.$set(e.user.data,"role",t)},expression:"user.data.role"}})]}}])})],1),r("v-card-actions",{staticClass:"d-flex justify-end"},[r("v-btn",{attrs:{color:"primary",type:"submit",loading:e.user.isFetching,disabled:e.user.isPrestine}},[e._v("Save")])],1)],1)],1)],1)],1),r("v-col",{attrs:{cols:"12",lg:"6"}},[r("image-uploader",{attrs:{src:e.user.data.image,title:"Edit Image",url:e.api.uploadImage(e.$route.params.id)}})],1)],1)],1)},s=[],n=r("1da1"),u=r("5530"),i=(r("96cf"),r("d3b7"),r("3ca3"),r("ddb0"),r("2895")),o=r("e279"),d=r("2f62"),c={components:{EditSkeleton:function(){return r.e("chunk-249382b5").then(r.bind(null,"98c1"))}},computed:Object(u["a"])({},Object(d["c"])({auth:"auth/auth"})),data:function(){return{api:i["a"],user:new o["a"]}},methods:Object(u["a"])(Object(u["a"])({},Object(d["b"])({setSnackbar:"snackbar/set",setAuth:"auth/set"})),{},{submit:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.user.request({method:"patch",url:i["a"].alone(e.$route.params.id),data:e.user.readyData(e.$refs.form.$el)});case 2:if(r=t.sent,console.log(e.$refs),r){t.next=6;break}return t.abrupt("return",e.$refs.validation.setErrors(e.user.errors.details));case 6:e.setSnackbar({model:!0,text:"User updated",timeout:3e3}),r._id===e.auth.user._id&&e.setAuth({user:Object(u["a"])({},e.user.data)});case 8:case"end":return t.stop()}}),t)})))()}}),mounted:function(){this.user.getResource(i["a"].alone(this.$route.params.id)),this.user.load(!1)}},l=c,f=r("2877"),m=r("6544"),p=r.n(m),v=r("8336"),b=r("b0af"),h=r("99d9"),g=r("62ad"),x=r("4bd4"),k=r("0fd9"),_=r("8654"),N=Object(f["a"])(l,a,s,!1,null,null,null);t["default"]=N.exports;p()(N,{VBtn:v["a"],VCard:b["a"],VCardActions:h["a"],VCardText:h["c"],VCardTitle:h["d"],VCol:g["a"],VForm:x["a"],VRow:k["a"],VTextField:_["a"]})},e279:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var a=r("d4ec"),s=r("262e"),n=r("2caf"),u=r("63c1"),i=function(e){Object(s["a"])(r,e);var t=Object(n["a"])(r);function r(e){var s;return Object(a["a"])(this,r),s=t.call(this,e),s.data={_id:"",image:"",firstName:"",lastName:"",email:"",role:"",username:"",password:"",updatedAt:"",createdAt:"",creator:"",deletedAt:"",verified:""},s}return r}(u["a"])}}]);
//# sourceMappingURL=chunk-4c4b2b46.51ff1ee1.js.map