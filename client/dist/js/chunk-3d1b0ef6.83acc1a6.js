(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d1b0ef6"],{"0346":function(t,e,r){"use strict";e["a"]={main:function(){return"/api/v1/products"},alone:function(t){return"/api/v1/products/".concat(t)},single:function(t){return"/api/v1/products/".concat(t,"/public")},trash:function(t){return"/api/v1/products/".concat(t,"/trash")},restore:function(t){return"/api/v1/products/".concat(t,"/restore")},trashed:function(){return"/api/v1/products/trashed"},category:{main:function(){return"/api/v1/categories"},alone:function(t){return"/api/v1/categories/".concat(t)},trash:function(t){return"/api/v1/categories/".concat(t,"/trash")},restore:function(t){return"/api/v1/categories/".concat(t,"/restore")},trashed:function(){return"/api/v1/categories/trashed"},getGroupByParent:function(){return"/api/v1/categories/getGroupByParent"}},variation:{main:function(){return"/api/v1/products/variations"},alone:function(t){return"/api/v1/products/variations/".concat(t)},trash:function(t){return"/api/v1/products/variations/".concat(t,"/trash")},restore:function(t){return"/api/v1/products/variations/".concat(t,"/restore")},trashed:function(){return"/api/v1/products/variations/trashed"}}}},b312:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("user",[r("html-head",{attrs:{title:"Product Categories"}}),r("page-header",{scopedSlots:t._u([{key:"title",fn:function(){return[t._v("Product Categories")]},proxy:!0}])}),r("v-row",[r("v-col",{attrs:{cols:"12",lg:"6"}},[t.resources.isFetching?t._e():r("category-form",{attrs:{type:"product"},on:{submitted:t.getResources},model:{value:t.edit,callback:function(e){t.edit=e},expression:"edit"}})],1),r("v-col",{attrs:{cols:"12",lg:"6"}},[t.resources?[t.resources.isFetching?t._e():r("category-crud-card",{attrs:{api:t.api.category,changed:t.getResources,resources:t.resources},on:{onClickEdit:t.addValueToEdit}})]:t._e()],2)],1)],1)},n=[],o=r("0346"),c=r("eaca"),s={data:function(){return{api:o["a"],headers:[{text:"Name",align:"start",value:"name"},{text:"Created",align:"start",value:"createdAt"},{text:"Actions",align:"end",value:"actions"}],resources:new c["a"],edit:{}}},methods:{getResources:function(){this.resources.getResources({method:"get",url:o["a"].category.getGroupByParent(),params:{q:{type:"product"}}})},addValueToEdit:function(t){this.edit=t}},mounted:function(){this.getResources(),this.resources.load(!1)}},i=s,u=r("2877"),d=r("6544"),p=r.n(d),l=r("62ad"),v=r("0fd9"),f=Object(u["a"])(i,a,n,!1,null,null,null);e["default"]=f.exports;p()(f,{VCol:l["a"],VRow:v["a"]})}}]);
//# sourceMappingURL=chunk-3d1b0ef6.83acc1a6.js.map