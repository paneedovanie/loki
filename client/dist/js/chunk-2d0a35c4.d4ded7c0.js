(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a35c4"],{"029e":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-card",[s("v-card-title",{domProps:{textContent:e._s("Edit Permissions")}}),s("v-card-text",[s("v-treeview",{attrs:{items:e.categorizedPermissions,"item-key":"_id","multiple-active":"",selectable:"",disabled:""},on:{input:function(t){return e.resource.prestine(!1)}},scopedSlots:e._u([{key:"label",fn:function(t){var n=t.item;return[n.name?[s("span",{domProps:{textContent:e._s(n.name)}})]:[s("div",[s("h4",{staticClass:"ma-0",domProps:{textContent:e._s(n.code)}}),s("p",{staticClass:"ma-0",domProps:{textContent:e._s(n.description)}})])]]}}]),model:{value:e.activePermissions,callback:function(t){e.activePermissions=t},expression:"activePermissions"}})],1),s("v-card-actions",[s("v-btn",{attrs:{color:"primary",type:"button",disabled:e.resource.isPrestine},on:{click:e.submit}},[e._v("Save")])],1)],1)},r=[],i=s("1da1"),a=s("5530"),o=(s("96cf"),s("d81d"),s("4c6e")),c=s("2f62"),u=s("63c1"),d={props:["categorizedPermissions","permissions"],computed:Object(a["a"])(Object(a["a"])({},Object(c["c"])({auth:"auth/auth"})),{},{activePermissions:{get:function(){return this.permissions.map((function(e){return e._id}))},set:function(e){this.newPermissions=e}}}),data:function(){return{resource:new u["a"],newPermissions:[]}},methods:Object(a["a"])(Object(a["a"])({},Object(c["b"])({setSnackbar:"snackbar/set",setAuth:"auth/set"})),{},{submit:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.resource.request({method:"post",url:o["a"].permission.main(e.$route.params.id),data:{permissions:e.newPermissions}});case 2:s=t.sent,s&&(e.setSnackbar({model:!0,text:"Role permissions updated",timeout:3e3}),e.resource.prestine());case 4:case"end":return t.stop()}}),t)})))()}})},m=d,p=s("2877"),l=s("6544"),b=s.n(l),v=s("8336"),f=s("b0af"),h=s("99d9"),w=s("eb2a"),P=Object(p["a"])(m,n,r,!1,null,null,null);t["default"]=P.exports;b()(P,{VBtn:v["a"],VCard:f["a"],VCardActions:h["a"],VCardText:h["c"],VCardTitle:h["d"],VTreeview:w["a"]})}}]);
//# sourceMappingURL=chunk-2d0a35c4.d4ded7c0.js.map