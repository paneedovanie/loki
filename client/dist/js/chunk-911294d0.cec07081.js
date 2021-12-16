(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-911294d0"],{"0346":function(t,e,a){"use strict";e["a"]={main:function(){return"/api/v1/products"},alone:function(t){return"/api/v1/products/".concat(t)},single:function(t){return"/api/v1/products/".concat(t,"/public")},trash:function(t){return"/api/v1/products/".concat(t,"/trash")},restore:function(t){return"/api/v1/products/".concat(t,"/restore")},trashed:function(){return"/api/v1/products/trashed"},category:{main:function(){return"/api/v1/categories"},alone:function(t){return"/api/v1/categories/".concat(t)},trash:function(t){return"/api/v1/categories/".concat(t,"/trash")},restore:function(t){return"/api/v1/categories/".concat(t,"/restore")},trashed:function(){return"/api/v1/categories/trashed"},getGroupByParent:function(){return"/api/v1/categories/getGroupByParent"}},variation:{main:function(){return"/api/v1/products/variations"},alone:function(t){return"/api/v1/products/variations/".concat(t)},trash:function(t){return"/api/v1/products/variations/".concat(t,"/trash")},restore:function(t){return"/api/v1/products/variations/".concat(t,"/restore")},trashed:function(){return"/api/v1/products/variations/trashed"}}}},"0f9b":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("user",[a("html-head",{attrs:{title:"Add Product"}}),a("page-header",{scopedSlots:t._u([{key:"title",fn:function(){return[a("span",{domProps:{textContent:t._s("Show Product")}})]},proxy:!0}])}),t.product.isFetching||t.product.isLoading?t._e():a("v-card",{attrs:{elevation:"0"}},[a("v-card-text",[a("v-row",[a("v-col",[a("div",{staticClass:"d-flex justify-center"},[a("v-avatar",{staticClass:"mb-3",attrs:{size:"400",tile:""}},[a("img",{ref:"image",attrs:{src:t.getImage}})])],1)]),a("v-col",[a("div",{staticClass:"black--text text-h3",domProps:{textContent:t._s(t.product.data.name)}}),a("div",{staticClass:"text-caption text--disabled",domProps:{textContent:t._s(t.product.data.quantity+" "+t.product.data.unit)}}),a("p",{staticClass:"mt-5 text--secondary text-subtitle-2",domProps:{textContent:t._s(t.product.data.description)}}),t.hasVariations?[a("h2",{staticClass:"text-subtitle-2 text--disabled"},[t._v("Variations")]),t._l(t.product.data.variations,(function(e){return a("v-tooltip",{key:e.name,attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(r){var n=r.on,i=r.attrs;return[a("v-btn",t._g(t._b({attrs:{icon:""},on:{click:function(a){return t.setSelected(e)}}},"v-btn",i,!1),n),[a("v-avatar",{attrs:{size:"30"}},[a("img",{attrs:{src:e.image,alt:e.description}})])],1)]}}],null,!0)},[a("span",{domProps:{textContent:t._s(e.description)}})])}))]:t._e(),a("v-row",{staticClass:"mt-3"},[a("v-col",[a("h3",{staticClass:"text-subtitle-2 text--disabled"},[t._v("Quantity:")]),a("div",{staticClass:"text-h4 black--text",domProps:{textContent:t._s("N/A")}})]),a("v-col",[a("div",{staticClass:"text-subtitle-2 text--disabled"},[t._v("Price:")]),a("div",{staticClass:"text-h4 black--text",domProps:{textContent:t._s(t.getPrice)}})])],1)],2)],1)],1)],1)],1)},n=[],i=a("b85c"),s=a("0346"),o=a("8b64"),c={data:function(){return{api:s["a"],product:new o["a"],selected:null}},computed:{getImage:function(){return this.selected?this.selected.image:this.product.data.image},getPrice:function(){if(this.selected)return this.selected.price;if(0===this.product.data.variations.length)return this.product.data.price;var t,e=0,a=0,r=Object(i["a"])(this.product.data.variations);try{for(r.s();!(t=r.n()).done;){var n=t.value;(e>n.price||0===e)&&(e=n.price),a<n.price&&(a=n.price)}}catch(s){r.e(s)}finally{r.f()}return e!==a?e+"~"+a:e},hasVariations:function(){return 0!==this.product.data.variations.length}},methods:{setSelected:function(t){this.selected=t}},mounted:function(){this.product.getResource(s["a"].alone(this.$route.params.id)),this.product.load(!1)}},u=c,d=a("2877"),p=a("6544"),l=a.n(p),v=a("8212"),f=a("8336"),h=a("b0af"),m=a("99d9"),b=a("62ad"),g=a("0fd9"),x=a("3a2f"),C=Object(d["a"])(u,r,n,!1,null,null,null);e["default"]=C.exports;l()(C,{VAvatar:v["a"],VBtn:f["a"],VCard:h["a"],VCardText:m["c"],VCol:b["a"],VRow:g["a"],VTooltip:x["a"]})},"8b64":function(t,e,a){"use strict";a.d(e,"a",(function(){return o}));var r=a("d4ec"),n=a("262e"),i=a("2caf"),s=a("63c1"),o=function(t){Object(n["a"])(a,t);var e=Object(i["a"])(a);function a(t){var n;return Object(r["a"])(this,a),n=e.call(this,t),n.data={_id:"",code:"",name:"",description:"",price:"",varieties:[],quantity:"",unit:"",updatedAt:"",createdAt:"",creator:"",deletedAt:""},n}return a}(s["a"])}}]);
//# sourceMappingURL=chunk-911294d0.cec07081.js.map