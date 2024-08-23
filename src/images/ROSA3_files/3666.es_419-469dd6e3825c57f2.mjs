"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[3666],{762587:e=>{e.exports=function(e,a,n,l){a=a||"&",n=n||"=";var i={};if("string"!=typeof e||0===e.length)return i;var t=/\+/g;e=e.split(a);var r=1e3;l&&"number"==typeof l.maxKeys&&(r=l.maxKeys);var s=e.length;r>0&&s>r&&(s=r);for(var o=0;o<s;++o){var d,u,c,p,m=e[o].replace(t,"%20"),g=m.indexOf(n);(g>=0?(d=m.substr(0,g),u=m.substr(g+1)):(d=m,u=""),c=decodeURIComponent(d),p=decodeURIComponent(u),Object.prototype.hasOwnProperty.call(i,c))?Array.isArray(i[c])?i[c].push(p):i[c]=[i[c],p]:i[c]=p}return i}},712361:e=>{var a=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,n,l,i){return(n=n||"&",l=l||"=",null===e&&(e=void 0),"object"==typeof e)?Object.keys(e).map(function(i){var t=encodeURIComponent(a(i))+l;return Array.isArray(e[i])?e[i].map(function(e){return t+encodeURIComponent(a(e))}).join(n):t+encodeURIComponent(a(e[i]))}).join(n):i?encodeURIComponent(a(i))+l+encodeURIComponent(a(e)):""}},817673:(e,a,n)=>{a.decode=a.parse=n(762587),a.encode=a.stringify=n(712361)},969548:(e,a,n)=>{var l;n.r(a),n.d(a,{default:()=>t});let i={argumentDefinitions:[],kind:"Fragment",metadata:null,name:"CloseupLink_pin",selections:[{alias:null,args:null,kind:"ScalarField",name:"advertiserId",storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"attributionSourceId",storageKey:null},{alias:null,args:null,concreteType:"Board",kind:"LinkedField",name:"board",plural:!1,selections:[{alias:null,args:null,kind:"ScalarField",name:"url",storageKey:null}],storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"campaignId",storageKey:null},{alias:null,args:null,concreteType:"PinCarouselData",kind:"LinkedField",name:"carouselData",plural:!1,selections:[{alias:null,args:null,concreteType:"PinCarouselSlot",kind:"LinkedField",name:"carouselSlots",plural:!0,selections:[{alias:"entityId",args:null,kind:"ScalarField",name:"id",storageKey:null}],storageKey:null},l={alias:null,args:null,kind:"ScalarField",name:"entityId",storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"index",storageKey:null}],storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"description",storageKey:null},l,{alias:null,args:null,kind:"ScalarField",name:"gridTitle",storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"isDownstreamPromotion",storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"isPromoted",storageKey:null},{alias:null,args:null,concreteType:"User",kind:"LinkedField",name:"pinner",plural:!1,selections:[{alias:null,args:null,kind:"ScalarField",name:"username",storageKey:null}],storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"pinPromotionId",storageKey:null},{alias:null,args:null,concreteType:"User",kind:"LinkedField",name:"promoter",plural:!1,selections:[l],storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"promotedIsLeadAd",storageKey:null},{alias:null,args:null,concreteType:"PromotedLeadForm",kind:"LinkedField",name:"promotedLeadForm",plural:!1,selections:[{alias:null,args:null,kind:"ScalarField",name:"leadFormId",storageKey:null}],storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"storyPinDataId",storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"title",storageKey:null},{alias:null,args:null,kind:"ScalarField",name:"trackingParams",storageKey:null},{args:null,kind:"FragmentSpread",name:"useGetStringifiedCommerceAuxData_pin"}],type:"Pin",abstractKey:null};i.hash="745c3a480603a026639c745fb9f1fa52";let t=i},498594:(e,a,n)=>{var l,i,t;n.r(a),n.d(a,{default:()=>s});let r={argumentDefinitions:[],kind:"Fragment",metadata:null,name:"CollageChips_pin",selections:[{alias:null,args:null,concreteType:"AggregatedPinData",kind:"LinkedField",name:"aggregatedPinData",plural:!1,selections:[{alias:null,args:null,concreteType:"PinTagChipImagesPerSpec",kind:"LinkedField",name:"pinTagsChips",plural:!0,selections:[{alias:"entityId",args:null,kind:"ScalarField",name:"id",storageKey:null},{alias:null,args:null,concreteType:"Thumbnails",kind:"LinkedField",name:"image",plural:!1,selections:[l={alias:null,args:null,kind:"ScalarField",name:"height",storageKey:null},i={alias:null,args:null,kind:"ScalarField",name:"url",storageKey:null},t={alias:null,args:null,kind:"ScalarField",name:"width",storageKey:null}],storageKey:null}],storageKey:null}],storageKey:null},{alias:null,args:null,concreteType:"CollectionPin",kind:"LinkedField",name:"collectionPin",plural:!1,selections:[{alias:null,args:null,concreteType:"CollectionPinItem",kind:"LinkedField",name:"itemData",plural:!0,selections:[{alias:null,args:null,kind:"ScalarField",name:"pinId",storageKey:null},{alias:null,args:[{kind:"Literal",name:"spec",value:"750x"}],concreteType:"Thumbnails",kind:"LinkedField",name:"images",plural:!1,selections:[i,t,l],storageKey:'images(spec:"750x")'}],storageKey:null}],storageKey:null},{args:null,kind:"FragmentSpread",name:"CollageChips_pin2"}],type:"Pin",abstractKey:null};r.hash="ccfee94118043ad859460cc7806b13e4";let s=r},387944:(e,a,n)=>{n.r(a),n.d(a,{default:()=>i});let l={argumentDefinitions:[],kind:"Fragment",metadata:null,name:"CollageChips_pin2",selections:[{args:null,kind:"FragmentSpread",name:"CloseupLink_pin"}],type:"Pin",abstractKey:null};l.hash="df1a502b4660ea1f2f0f126f142daec4";let i=l},551501:(e,a,n)=>{n.d(a,{Z:()=>r});var l=n(658583),i=n(622541),t=n(337478);function r(e,a){let n=Math.round(1e3*Math.random())+"",r=Math.round(1e3*Math.random())+"";l.t8((0,i.GS)(n),r);let s={token:`${n}-${r}`,url:e,...a&&!a.params?a.queryParams:a?.params&&{pin:a.params.pinId??void 0,isThirdPartyAd:a.params.isThirdPartyAd??void 0,csr:a.params.csrId&&!a.params.pinId?a.params.csrId:void 0,client_tracking_params:a.params.clientTrackingParams,aux_data:a.params.auxData?JSON.stringify(a.params.auxData):void 0}};return`/offsite/?${(0,t.Z)(s)}`}},627879:(e,a,n)=>{n.d(a,{Z:()=>r});var l=n(372085),i=n(288240),t=n(569372);let r=async({clientTrackingParams:e,href:a,isMounted:n,pinId:r,spamCheckCallback:s})=>{let o=await function(e){let a=(0,i.Z)(e),n=t.y8.get("ApiResource",a);if(n)return n;let r=(0,l.Z)(e);return t.y8.add("ApiResource",a,r),r}({url:"/v3/offsite/",data:{check_only:!0,client_tracking_params:e,pin_id:r,url:a}});if(!o.resource_response.error&&n){let{message:e,redirect_status:a,url:n}=o.resource_response.data||{};s({blocked:["blocked","suspicious","porn"].includes(a),message:e,redirectStatus:a,sanitized_url:n})}}},921247:(e,a,n)=>{n.d(a,{Z:()=>l});function l({isOffsiteUrl:e,event:a}){return!e&&(a.metaKey||a.ctrlKey)}},979606:(e,a,n)=>{n.d(a,{Z:()=>d});var l=n(29156),i=n(460270);let t=e=>"string"!=typeof e&&e?e.state:null;var r=n(940910),s=n(998449),o=n(797258);let d=({event:e,onHistoryChange:a,href:n,history:d,target:u})=>{let c=(0,i.Z)(n),p=t(n)??{},m=(0,r.Z)(c);m===o.Z.TRUSTED_DIFFERENT_ORIGIN||"blank"===u?(0,l.Z)(c,"blank"===u):d&&m===o.Z.SAME_ORIGIN&&(d.push((0,s.Z)({url:c}),{from:d.location,...p}),a&&a({event:e}))}},931090:(e,a,n)=>{n.d(a,{Z:()=>t});var l=n(29156),i=n(551501);function t(e,a){(0,l.Z)((0,i.Z)(e,a),!0,a?.features)}},794977:(e,a,n)=>{n.d(a,{Z:()=>i});var l=n(467139);function i({location:e,pinId:a,surface:n}){return!!n&&!l.ZF.includes(n)||e.pathname.includes(a)}},340370:(e,a,n)=>{n.d(a,{Z:()=>g});var l=n(667294),i=n(616550),t=n(627879),r=n(921247),s=n(979606),o=n(794977),d=n(96761),u=n(460270),c=n(862249),p=n(557874),m=n(953565);function g(e){let{clientTrackingParams:a,externalData:n,href:g,onHistoryChange:_,target:y}=e,[h,k]=(0,l.useState)(null),[f,b]=(0,l.useState)(!1),I=(0,i.k6)(),v=(0,i.TH)(),P=(0,u.Z)(g),x=(0,c.Z)({url:P}),{showWarning:w}=(0,p.s)()??{},{pin:S,surface:A}=n||{},T=a||S?.trackingParams,F=(0,d.Z)();return(0,l.useEffect)(()=>(b(!0),()=>{b(!1)}),[]),(0,l.useEffect)(()=>{x&&S&&null===h&&f&&(!S.promoter||S.isDownstreamPromotion)&&(0,o.Z)({location:v,pinId:S.entityId,surface:A})&&(0,t.Z)({clientTrackingParams:T,isMounted:f,pinId:S.entityId,spamCheckCallback:e=>k(e),href:P})},[T,S,A,P,x,f,v,h]),({event:e})=>{if(!(0,r.Z)({isOffsiteUrl:x,event:e})){if(e.preventDefault(),!g||"string"==typeof g&&g.startsWith("#")){(0,m.nP)("link_navigation_empty_href",{sampleRate:1,tags:{route:v.pathname,href:g}});return}x||n?.dangerouslyForceOffsiteUrl?F({auxData:n?.auxData,clientTrackingParams:T,pin:n?.pin&&{attributionSourceId:n.pin.attributionSourceId,campaignId:n.pin.campaignId,isPromoted:n.pin.isPromoted,pinPromotionId:n.pin.pinPromotionId,isThirdPartyAd:n.pin.isThirdPartyAd,advertiserId:n.pin.advertiserId,destinationUrl:n.pin.destinationUrl,link:n.pin.link,domain:n.pin.domain},pinId:n?.pin?.entityId,queryParams:n?.queryParams,showWarning:w,spamCheck:h,url:P}):(0,s.Z)({event:e,href:g,history:I,onHistoryChange:_,target:"blank"===y?"blank":null})}}}},96761:(e,a,n)=>{n.d(a,{Z:()=>g});var l=n(453880),i=n(934378),t=n(263032),r=n(86785),s=n(214877),o=n(551501),d=n(931090),u=n(171966);let c=(e,a,n)=>{let l=document.createElement("a");l.setAttribute("href",a),l.setAttribute("target","_blank"),l.setAttribute("rel","noopener nofollow noreferrer"),l.style.cursor="pointer",l.style.display="block",l.setAttribute(i.$N.ATTRIBUTION_SOURCE_ID,e),l.setAttribute(i.$N.ATTRIBUTE_DESTINATION,n),l.setAttribute(i.$N.ATTRIBUTE_ON,n),l.click()},p=(e,a,n,l,r,s,o)=>{let d=(0,t.m_)(e,[n,l,r],!0,s,o),u=document.createElement("a");u.setAttribute("href",a),u.setAttribute("target","_blank"),u.setAttribute("rel","noopener nofollow noreferrer"),u.style.cursor="pointer",u.style.display="block",u.setAttribute(i.NR.SOURCE,d),u.click()},m=()=>{let{logContextEvent:e}=(0,s.v)();return({attributionSourceId:a,auxData:n,campaignId:i,clientTrackingParams:t,href:s,isPromoted:d,pinId:u,pinPromotionId:m,isThirdPartyAd:g,advertiserId:_,destinationUrl:y,link:h,domain:k})=>{if(!d)return!1;let f=(0,l.Z)(),b=(0,o.Z)(s,{params:{pinId:u,csrId:null,clientTrackingParams:t,auxData:n,isThirdPartyAd:g}}),I=f?.userAgent.browserName??"";if((0,r.G6)(I)){let{group:n}=f?.experimentsClient.checkExperiment("m10n_event_conversion_measurement")??{},l=f?.userAgent.browserVersion?f.userAgent.browserVersion:"0.0",r=parseFloat(l.split(".")[0]+"."+l.split(".")[1]);if(a&&r>=14.1&&["enabled_safari"].includes(n))return c(a,b,s),e({event_type:101,clientTrackingParams:t,object_id_str:u||"",aux_data:{pin_id:u||"",click_measurement_ppid:m||"",click_measurement_campaign_id:i||"",is_pcm:!0,attribution_source_id:a,page_url:s}}),!0}else if((0,r.i7)(I)&&window.document.featurePolicy?.allowsFeature("attribution-reporting"))return p(a,b,y,h,k,i,_),e({event_type:101,clientTrackingParams:t,object_id_str:u||"",aux_data:{pin_id:u||"",click_measurement_ppid:m||"",click_measurement_campaign_id:i||"",is_arapi:!0,attribution_source_id:a,page_url:s}}),!0;return!1}},g=e=>{let a=m();return({auxData:n,clientTrackingParams:l,pin:i,pinId:t,queryParams:r,showWarning:s,spamCheck:o,url:c})=>{if("undefined"!=typeof window&&window.Windows){(0,u.Z)(c,{clientTrackingParams:l,pinId:t,hasPin:!!i,auxData:n,isThirdPartyAd:i?.isThirdPartyAd});return}if(!i&&!e?.isFromClickthroughLink){(0,d.Z)(c,r?{queryParams:r}:{params:{pinId:t}});return}if(o?.blocked){s?.(o);return}i&&a({attributionSourceId:i.attributionSourceId,auxData:n,campaignId:i.campaignId?String(i.campaignId):null,clientTrackingParams:l,href:c,isPromoted:i.isPromoted,pinId:t,pinPromotionId:i.pinPromotionId?String(i.pinPromotionId):null,isThirdPartyAd:i.isThirdPartyAd,advertiserId:i.advertiserId?i.advertiserId:null,destinationUrl:i.destinationUrl,link:i.link,domain:i.domain})||(0,d.Z)(c,{params:{clientTrackingParams:l,auxData:n,pinId:t,isThirdPartyAd:i?.isThirdPartyAd}})}}},460270:(e,a,n)=>{n.d(a,{Z:()=>l});let l=e=>e?"string"==typeof e?e:e.pathname?e.pathname:"":""},998449:(e,a,n)=>{n.d(a,{Z:()=>t});let l=(e,a)=>0===e.lastIndexOf(a,0);var i=n(885896);let t=({url:e})=>{let a=(0,i.Z)("/");return l(e,a)?e.substr(a.length-1):e}},171966:(e,a,n)=>{n.d(a,{Z:()=>t});var l=n(372085),i=n(931090);function t(e,a){let{auxData:n,clientTrackingParams:t,hasPin:r,pinId:s,isThirdPartyAd:o}=a||{},d={pin_id:s,check_only:!0,client_tracking_params:r?t:void 0,url:e,aux_data:JSON.stringify(n)};o&&(d.third_party_ad=s,delete d.pin_id),(0,l.Z)({url:"/v3/offsite/",data:d}).then(a=>{if(a&&a.resource_response&&!a.resource_response.error){let{resource_response:e}=a,{redirect_status:n,url:l}=e.data;if(!["blocked","suspicious","porn"].includes(n)){if(window.Windows.Foundation&&window.Windows.System&&window.Windows.System.Launcher&&window.Windows.System.Launcher.launchUriAsync){let e=new window.Windows.Foundation.Uri(l);window.Windows.System.Launcher.launchUriAsync(e)}return}}(0,i.Z)(e,{params:r?{pinId:s,clientTrackingParams:t,auxData:n,isThirdPartyAd:o}:{pinId:s}})})}},392071:(e,a,n)=>{n.d(a,{Z:()=>m}),n(167912);var l,i,t=n(883119),r=n(207012),s=n(807023),o=n(340523),d=n(182074),u=n(785893);let c={chip:{marginRight:1,flex:"1 1 0"},chipInner:{paddingBottom:"100%"},chipContainer:{marginRight:-1}},p=void 0!==l?l:l=n(498594);function m({pinKey:e,enableCloseupLink:a}){let l=(0,r.Z)(p,e),{checkExperiment:m}=(0,o.F)(),{anyEnabled:g}=m("aid_web_collection_pin_data"),{childDataKey__DEPRECATED:_}=(0,s.Q)(void 0!==i?i:i=n(387944),l,{useLegacyAdapter:e=>({})}),{aggregatedPinData:y,collectionPin:h}=l,{pinTagsChips:k}=y||{},{itemData:f}=h||{},b=k&&k.length>=3?k.slice(0,3):[],I=f&&f.length>=3?f.slice(0,3):[];return g?(0,u.jsx)(t.xu,{dangerouslySetInlineStyle:{__style:c.chipContainer},display:"flex",children:I.map(e=>{let n=e.images||{},l=(0,u.jsx)(t.Ee,{alt:"",fit:"cover",naturalHeight:n.height??1,naturalWidth:n.width??1,role:"presentation",src:n.url??""});return(0,u.jsx)(t.xu,{dangerouslySetInlineStyle:{__style:c.chip},"data-test-id":"collageChip",children:(0,u.jsx)(t.xu,{dangerouslySetInlineStyle:{__style:c.chipInner},position:"relative",children:(0,u.jsx)(t.xu,{bottom:!0,left:!0,position:"absolute",right:!0,top:!0,children:(0,u.jsx)(t.zd,{height:"100%",wash:!0,width:"100%",children:a?(0,u.jsx)(d.Z,{collageChipId:e.pinId??"",pinKey:_,sizing:"fullSize",children:l}):l})})})},e.pinId)})}):(0,u.jsx)(t.xu,{dangerouslySetInlineStyle:{__style:c.chipContainer},display:"flex",children:b.map(e=>{let n=e.image||{},l=(0,u.jsx)(t.Ee,{alt:"",fit:"cover",naturalHeight:n.height??1,naturalWidth:n.width??1,role:"presentation",src:n.url??""});return(0,u.jsx)(t.xu,{dangerouslySetInlineStyle:{__style:c.chip},"data-test-id":"collageChip",children:(0,u.jsx)(t.xu,{dangerouslySetInlineStyle:{__style:c.chipInner},position:"relative",children:(0,u.jsx)(t.xu,{bottom:!0,left:!0,position:"absolute",right:!0,top:!0,children:(0,u.jsx)(t.zd,{height:"100%",wash:!0,width:"100%",children:a?(0,u.jsx)(d.Z,{collageChipId:e.entityId??"",pinKey:_,sizing:"fullSize",children:l}):l})})})},e.entityId)})})}},182074:(e,a,n)=>{n.d(a,{Z:()=>k}),n(167912);var l,i=n(883119),t=n(598356),r=n(214877),s=n(207012),o=n(140017),d=n(340370),u=n(340523),c=n(5859),p=n(427514),m=n(268127),g=n(149722),_=n(879977),y=n(785893);let h=void 0!==l?l:l=n(969548);function k({sizing:e="default",children:a,collageChipId:n,componentType:l,contextLogData:k,elementType:f,disableA11yLabel:b,isEggsUi:I,pinKey:v,derivedSaveButtonOptionsSavedInfo:P,productTagParentPinId:x,viewParameter:w,viewType:S}){let A=(0,o.ZP)(),{isRTL:T}=(0,c.B)(),F=(0,s.Z)(h,v),{logContextEvent:Z}=(0,r.v)(),K=(0,_.E)(),{checkExperiment:C}=(0,u.F)(),{isAuth:L}=(0,g.Z)(),j=C("web_easy_gift_guide_saving",{dangerouslySkipActivation:!0}).anyEnabled,D=K.contextLogData?.story_type==="product_tagged_shopping_module_upsell",U=["polished_stacked_closeup"].includes(!T&&C(L?"closeup_auth_related_pins_above_fold_2024_dweb":"closeup_unauth_related_pins_above_fold_2024_dweb").group||""),E=L&&C("closeup_dweb_remove_magnifying_glass").anyEnabled,{carouselData:z,entityId:R}=F,O=!!F.promotedIsLeadAd,N={},M=`/pin/${n||R}/`,W=(0,t.Xx)();if(W?.variantUrl&&(M=`/pin/${W.variantUrl}/`),z){let{carouselSlots:e,entityId:a}=z,n=z.index??0;M=`/pin/${R}/`,N={carousel_slot_id:e?.[n]&&e[n].entityId,carousel_data_id:a,carousel_slot_index:n}}let B=(0,m.Z)(F);N={...N,...B({default:k?.commerce_data})};let $=()=>{let e={};if(O)Z({event_type:8948,view_type:S||K.viewType,view_parameter:w||K.viewParameter,component:null,object_id_str:F.entityId,clientTrackingParams:F?.trackingParams,aux_data:{closeup_navigation_type:"click",lead_form_id:F.promotedLeadForm?.leadFormId,is_lead_ad:1}}),Z({event_type:12,view_type:S||K.viewType,view_parameter:w||K.viewParameter,component:null,object_id_str:F.entityId,clientTrackingParams:F?.trackingParams,aux_data:{lead_form_id:F.promotedLeadForm?.leadFormId,is_lead_ad:1,...B()}});else{let a={...k,...B({default:k?.commerce_data})};Z({event_type:101,component:l||K.componentType,element:f,object_id_str:R,clientTrackingParams:F?.trackingParams,view_type:S||K.viewType,view_parameter:w||K.viewParameter,aux_data:a}),D&&(e={storyPinProductEventData:{productPinIdStr:R,pinIdStr:x}}),Z({aux_data:{closeup_navigation_type:"click",...a},component:l||K.componentType,element:f,event_data:e,event_type:8948,clientTrackingParams:F?.trackingParams,object_id_str:R,view_type:S||K.viewType,view_parameter:w||K.viewParameter})}},H={pathname:M,state:{trackingParams:F?.trackingParams,...P&&{board:P},...j&&{fromEggsBoard:I}}},G=(0,d.Z)({href:H,clientTrackingParams:F?.trackingParams,externalData:{auxData:N,pin:F&&{advertiserId:F.advertiserId,attributionSourceId:F.attributionSourceId,board:F.board&&{url:F.board.url},campaignId:F.campaignId,entityId:F.entityId,isDownstreamPromotion:F.isDownstreamPromotion,isPromoted:F.isPromoted,pinner:F.pinner&&{username:F.pinner.username},pinPromotionId:F.pinPromotionId,promoter:F.promoter&&{entityId:F.promoter.entityId},storyPinDataId:F.storyPinDataId,trackingParams:F.trackingParams}}});return(0,y.jsx)(i.Tg,{accessibilityLabel:b?void 0:(0,p.Z)(A.bt("Página del Pin {{ pinTitle }}", "{{ pinTitle }} pin page", "pinRep.closeupLink.tapArea.accessibilityLabel", undefined, true),{pinTitle:F.gridTitle||F.title||F.description||""}),fullHeight:"fullSize"===e,fullWidth:"fullSize"===e,href:M,mouseCursor:U||E?void 0:"zoomIn",onTap:({event:e,dangerouslyDisableOnNavigation:a})=>{a(),$(),G({event:e})},rounding:2,children:a})}},557874:(e,a,n)=>{n.d(a,{Z:()=>y,s:()=>_});var l=n(667294),i=n(342513),t=n(608575),r=n(883119),s=n(930837),o=n(140017),d=n(339001),u=n(785893);let c=()=>{let e=(0,o.ZP)(),{dismissWarning:a}=_()??{};return(0,u.jsx)(r.xu,{paddingX:3,children:(0,u.jsx)(r.zx,{color:"red",fullWidth:!0,onClick:a,text:e.bt("OK", "Okay", "Dismiss a modal stating that clicking through to a link has been blocked", undefined, true)})})},p=()=>{let e=(0,o.ZP)();return(0,u.jsx)(r.xv,{inline:!0,weight:"bold",children:(0,u.jsx)(r.rU,{display:"inlineBlock",href:"https://policy.pinterest.com/community-guidelines#section-spam",target:"blank",underline:"hover",children:e.bt("Más información", "Learn more", "Link text leading to policy website", undefined, true)})})},m=({message:e,sanitized_url:a})=>{let n=(0,o.ZP)(),{dismissWarning:l}=_()??{};return(0,u.jsx)(s.ZP,{accessibilityModalLabel:n.bt("Bloqueamos este enlace", "We have blocked this link", "Modal label when clicking a spammy link", undefined, true),footer:(0,u.jsx)(c,{}),heading:n.bt("¡Atención!", "Heads up!", "Modal heading when clicking through to a link has been blocked", undefined, true),onDismiss:l,children:(0,u.jsxs)(r.xu,{padding:6,children:[(0,u.jsx)(r.xv,{children:(0,d.nk)("{{ message }} {{ learnMore }}",{message:e,learnMore:(0,u.jsx)(p,{},"learnMoreLink")})}),(0,u.jsxs)(r.xu,{alignItems:"center",display:"flex",marginTop:4,children:[(0,u.jsx)(r.xu,{marginEnd:3,children:(0,u.jsx)(r.JO,{accessibilityLabel:n.bt("Dirección de enlace bloqueada", "Blocked link address", "Icon label preceding a block url", undefined, true),color:"error",icon:"report",inline:!0,size:24})}),(0,u.jsx)(r.xv,{inline:!0,lineClamp:1,weight:"bold",children:t.parse(a).hostname})]})]})})},{Provider:g,useMaybeHook:_}=(0,i.Z)("SpammyClickthrough");function y({children:e}){let[a,n]=(0,l.useState)(null),i=(0,l.useCallback)(()=>{n(null)},[n]),t=(0,l.useCallback)(e=>{n(e)},[n]),r=(0,l.useMemo)(()=>({dismissWarning:i,showWarning:t}),[i,t]);return(0,u.jsxs)(g,{value:r,children:[a&&(0,u.jsx)(m,{...a}),e]})}}}]);
//# sourceMappingURL=https://sm.pinimg.com/webapp/3666.es_419-469dd6e3825c57f2.mjs.map