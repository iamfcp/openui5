/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(g){"use strict";var o;if(g.module){o=g.module;g.module=undefined;}sap.ui.define(['jquery.sap.global','sap/ui/core/routing/HashChanger','sap/ui/base/Object','sap/ui/core/mvc/View','./matchers/Ancestor','./matchers/Interactable','./matchers/Visible','./pipelines/MatcherPipeline'],function($,H,U,V,A,I,a,M){var m=new M(),i=new I(),v=new a();var O=U.extend("sap.ui.test.OpaPlugin",{constructor:function(){var t=this;sap.ui.getCore().registerPlugin({startPlugin:function(c){t.oCore=c;},stopPlugin:function(){t.oCore=undefined;}});},getAllControls:function(c){var C,p,r=[],b=this._getCoreElements();for(p in b){if(!b.hasOwnProperty(p)){continue;}C=b[p];if(!c){r.push(C);continue;}if(C instanceof c){r.push(C);}}return r;},getView:function(s){var b=this.getAllControls(V);return b.filter(function(c){return c.getViewName()===s;})[0];},getControlInView:function(b){var s=b.viewNamespace+b.viewName,c=this.getView(s),r=[],C,d;if(!c){$.sap.log.info("Found no view with the name: "+s);return null;}if($.isArray(b.id)){$.each(b.id,function(f,h){C=c.byId(h);if(C){r.push(C);}});return r;}if(typeof b.id==="string"){return c.byId(b.id);}var e=this.getAllControlsWithTheParent(c,b.controlType);if($.type(b.id)==="regexp"){d=c.getId();e=e.filter(function(C){var u=C.getId().replace(d,"");return b.id.test(u);});}return e;},getAllControlsWithTheParent:function(p,c){var b=new A(p);return this._filterUniqueControlsByCondition(this.getAllControls(c),b);},getAllControlsInContainer:function(c,C){return this._filterUniqueControlsByCondition(c.find("*").control(),function(b){if(C){return b instanceof C;}return true;});},getMatchingControls:function(b){var r;if(b.searchOpenDialogs){r=this.getAllControlsInContainer($("#sap-ui-static"),b.controlType);}else if(b.viewName){r=this.getControlInView(b);}else if(b.id){r=this.getControlByGlobalId(b);}else if(b.controlType){r=this.getAllControlsInContainer($("body"),b.controlType);}else{r=null;}if(!r||b.visible===false){return r;}var c=[];if(b.interactable){c.push(i);}else{c.push(v);}var p=m.process({control:r,matchers:c});if(!p){if($.isArray(r)){return[];}if(r){return null;}return r;}return p;},getControlByGlobalId:function(b){var t=this,s=b.id,c=[],d=[],C=this._getCoreElements();if(typeof s==="string"){c=C[s];return c&&this._checkControlType(c,b)?c:null;}if($.type(s)==="regexp"){for(var p in C){if(!C.hasOwnProperty(p)){continue;}if(!s.test(p)){continue;}d.push(p);}}else if($.isArray(s)){d=s;}return d.map(function(e){return C[e];}).filter(function(e){return t._checkControlType(e,b)&&e&&!e.bIsDestroyed;});},_filterUniqueControlsByCondition:function(c,C){return c.filter(function(b,p,d){var k=!!C(b);return k&&d.indexOf(b)===p;});},_getCoreElements:function(){var e={};if(!this.oCore){return e;}return this.oCore.mElements||e;},_checkControlType:function(c,b){if(b.controlType){return c instanceof b.controlType;}else{return true;}}});return O;},true);if(o){g.module=o;}})(window);
