"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[13968],{109615:(e,t,r)=>{r.d(t,{Z:()=>_});var i=r(667294),s=r(883119),n=r(587703),a=r(495473),l=r(140017),o=r(785893);let d=(0,i.lazy)(()=>r.e(77468).then(r.bind(r,673020))),c={sm:12,md:16,lg:20,xl:24};function _({isVerifiedMerchant:e,size:t,showText:r,showVerifiedIdentity:_,inspirationalBadges:u,inspirationalBadgesColor:h}){let p=(0,l.ZP)(),[m,f]=(0,i.useState)(!1),{dangerousInlineStyle:y,iconColor:x}=(0,a.Z)(!!e),g=(0,n.Z)();return(0,o.jsxs)(i.Fragment,{children:[(0,o.jsx)(s.iP,{onTap:()=>{g({component:13534,element:11717,event_type:102}),f(!0)},rounding:"circle",children:(0,o.jsxs)(s.xu,{alignItems:"center",dangerouslySetInlineStyle:y,"data-test-id":"verified-badge-icon",display:"flex",children:[(0,o.jsx)(s.JO,{accessibilityLabel:e?p.bt("Ícono de la insignia de verificación del comerciante", "Merchant verification badge icon", "merchantVerification.badge.icon", undefined, true):p.bt("Ícono de la insignia", "Badge icon", "merchantVerification.badge.icon", undefined, true),color:x,icon:"workflow-status-ok",inline:!0,size:c[t]}),r&&!_&&(0,o.jsx)(s.xu,{marginStart:2,children:(0,o.jsx)(s.xv,{color:"shopping",inline:!0,weight:"bold",children:(0,o.jsx)(s.xu,{dangerouslySetInlineStyle:y,children:p.bt("Comerciante verificado", "Verified merchant", "creator.header.verifiedMerchant", undefined, true)})})})]})}),(e||r&&!_)&&m&&(0,o.jsx)(i.Suspense,{children:(0,o.jsx)(d,{inspirationalBadges:u,inspirationalBadgesColor:h,setShowModal:f,showModal:m})})]})}},653286:(e,t,r)=>{r.d(t,{H:()=>l});var i=r(573810);let s="business.referral.referral_code",n="business.referral.offer_status",a="claimed",l={setData:({referralCode:e})=>{(0,i.Nh)(s,e)},getData:()=>(0,i.qn)(s),setSenderOfferClaimed:()=>{(0,i.Nh)(n,a)},resetStatus:()=>{(0,i.L_)(s)},shouldClaimReferral:()=>null!==(0,i.qn)(s)&&(0,i.qn)(n)!==a}},150396:(e,t,r)=>{r.d(t,{Z:()=>p});var i=r(883119),s=r(401429),n=r(930837),a=r(256683),l=r(325362),o=r(862249),d=r(554786),c=r(983983),_=r(785893);let u=new i.Ry(c.fe),h=new i.H3([u]);function p({experience:e,placementId:t}){let r=(0,d.ml)();return(0,_.jsx)(s.Z,{eligibleTypes:[14],experience:e,placementId:t,children:({complete:e,dismiss:t,experience:{display_data:s}})=>{let{titleText:d,detailedText:c,completeButton:u,dismissButton:p}=(0,a.Z)(l.Z)(s),m=r?"center":"start",f=!!u&&(0,o.Z)({url:u.uri});return(0,_.jsx)(i.mh,{zIndex:h,children:(0,_.jsx)(n.ZP,{accessibilityModalLabel:d,footer:(0,_.jsxs)(i.xu,{dangerouslySetInlineStyle:{__style:{flexWrap:"wrap-reverse"}},display:"flex",justifyContent:r?"center":"end",children:[p&&(0,_.jsx)(i.xu,{fit:!0,flex:r?"grow":"none",minWidth:r?130:void 0,padding:1,children:(0,_.jsx)(i.zx,{color:"gray",fullWidth:r,onClick:t,size:"lg",text:p.text})}),u&&(0,_.jsx)(i.xu,{fit:!0,flex:r?"grow":"none",minWidth:r?130:void 0,padding:1,children:(0,_.jsx)(i.ZP,{color:"red",fullWidth:r,href:u.uri,onClick:()=>e(),rel:f?"nofollow":"none",size:"lg",text:u.text})})]}),heading:(0,_.jsx)(i.xu,{marginTop:r?2:0,children:(0,_.jsxs)(i.kC,{justifyContent:"between",children:[(0,_.jsx)(i.X6,{accessibilityLevel:1,size:"500",children:d}),!r&&(0,_.jsx)(i.hU,{accessibilityLabel:"Dismiss modal",bgColor:"white",icon:"cancel",iconColor:"darkGray",onClick:t,size:"sm"})]})}),onDismiss:t,size:"sm",children:(0,_.jsx)(i.xu,{padding:6,children:(0,_.jsx)(i.xv,{align:m,children:c})})})})}})}},495473:(e,t,r)=>{r.d(t,{Z:()=>i});let i=e=>{let t=e?"shopping":"error";return{iconColor:t,dangerousInlineStyle:{__style:{color:t}}}}},551501:(e,t,r)=>{r.d(t,{Z:()=>a});var i=r(658583),s=r(622541),n=r(337478);function a(e,t){let r=Math.round(1e3*Math.random())+"",a=Math.round(1e3*Math.random())+"";i.t8((0,s.GS)(r),a);let l={token:`${r}-${a}`,url:e,...t&&!t.params?t.queryParams:t?.params&&{pin:t.params.pinId??void 0,isThirdPartyAd:t.params.isThirdPartyAd??void 0,csr:t.params.csrId&&!t.params.pinId?t.params.csrId:void 0,client_tracking_params:t.params.clientTrackingParams,aux_data:t.params.auxData?JSON.stringify(t.params.auxData):void 0}};return`/offsite/?${(0,n.Z)(l)}`}},979606:(e,t,r)=>{r.d(t,{Z:()=>d});var i=r(29156),s=r(460270);let n=e=>"string"!=typeof e&&e?e.state:null;var a=r(940910),l=r(998449),o=r(797258);let d=({event:e,onHistoryChange:t,href:r,history:d,target:c})=>{let _=(0,s.Z)(r),u=n(r)??{},h=(0,a.Z)(_);h===o.Z.TRUSTED_DIFFERENT_ORIGIN||"blank"===c?(0,i.Z)(_,"blank"===c):d&&h===o.Z.SAME_ORIGIN&&(d.push((0,l.Z)({url:_}),{from:d.location,...u}),t&&t({event:e}))}},931090:(e,t,r)=>{r.d(t,{Z:()=>n});var i=r(29156),s=r(551501);function n(e,t){(0,i.Z)((0,s.Z)(e,t),!0,t?.features)}},251843:(e,t,r)=>{r.d(t,{Z:()=>n});var i=r(883119),s=r(785893);function n({accessibilityLabel:e}){return(0,s.jsx)(i.kC,{alignItems:"center",justifyContent:"center",children:(0,s.jsx)(i.$j,{accessibilityLabel:e,show:!0})})}},447479:(e,t,r)=>{r.d(t,{i:()=>i});let i={AC:"ac",AUTOCOMPLETE:"autocomplete",BOARD:"blp",CONTENT_TYPE_FILTER:"content_type_filter",DIRECT_NAVIGATION:"direct_navigation",FILTER:"filter",GUIDED_SEARCH_ENTRY:"guided_search_entry",GUIDED_SEARCH_LANDING:"guided_search_landing",HASHTAG_CLOSEUP:"hashtag_closeup",HASHTAG_PINREP:"hashtag_pinrep",HOMEFEED_BUBBLE:"homefeed_bubble",HUB_PAGE:"hub_page",IDEAS_ROOT:"ideas_root",IMAGE_ONLY_ATTRIBUTION:"image_only_attribution",LANDING_PAGE_STORY:"landing_page_story",NO_RESULTS_SEARCH_STORY:"no_results_search_story",PRODUCT:"product",REMOVE:"remove",RS:"rs",SHOPPING_FILTER:"shopping_filter",SITELINKS_SEARCHBOX:"sitelinks_searchbox",SLP_REC_CURATED:"slp_rec_curated",SLP_REC_TRENDING:"slp_rec_trending",SRS:"srs",STRUCTURED_GUIDE:"structured_guide",TRENDING:"trending",TYPED:"typed",TYPO_AUTO_ORIGINAL:"typo_auto_original",TYPO_SUGGESTION:"typo_suggestion",UNKNOWN:"Unknown",VANILLA_GUIDE:"guide",VIDEO:"video"}},460270:(e,t,r)=>{r.d(t,{Z:()=>i});let i=e=>e?"string"==typeof e?e:e.pathname?e.pathname:"":""},998449:(e,t,r)=>{r.d(t,{Z:()=>n});let i=(e,t)=>0===e.lastIndexOf(t,0);var s=r(885896);let n=({url:e})=>{let t=(0,s.Z)("/");return i(e,t)?e.substr(t.length-1):e}},171966:(e,t,r)=>{r.d(t,{Z:()=>n});var i=r(372085),s=r(931090);function n(e,t){let{auxData:r,clientTrackingParams:n,hasPin:a,pinId:l,isThirdPartyAd:o}=t||{},d={pin_id:l,check_only:!0,client_tracking_params:a?n:void 0,url:e,aux_data:JSON.stringify(r)};o&&(d.third_party_ad=l,delete d.pin_id),(0,i.Z)({url:"/v3/offsite/",data:d}).then(t=>{if(t&&t.resource_response&&!t.resource_response.error){let{resource_response:e}=t,{redirect_status:r,url:i}=e.data;if(!["blocked","suspicious","porn"].includes(r)){if(window.Windows.Foundation&&window.Windows.System&&window.Windows.System.Launcher&&window.Windows.System.Launcher.launchUriAsync){let e=new window.Windows.Foundation.Uri(i);window.Windows.System.Launcher.launchUriAsync(e)}return}}(0,s.Z)(e,{params:a?{pinId:l,clientTrackingParams:n,auxData:r,isThirdPartyAd:o}:{pinId:l}})})}},762631:(e,t,r)=>{r.d(t,{Z:()=>i});function i({top:e,right:t,bottom:r,left:i,windowHeight:s,windowWidth:n,threshold:a=0}){return e>=0+a&&i>=0+a&&r<=s-a&&t<=n-a}},185791:(e,t,r)=>{r.d(t,{Z:()=>g});var i=r(667294),s=r(545007),n=r(616550),a=r(883119),l=r(207229),o=r(587703),d=r(140017),c=r(340523),_=r(71328),u=r(494125),h=r(149722),p=r(762631),m=r(969300),f=r(785893);let y={__style:{textOverflow:"ellipsis",whiteSpace:"nowrap"}},x={HOME:1,BOARD:2};function g({currentTabIndex:e,tabBoards:t}){let r=(0,i.useRef)(null),g=(0,i.useRef)(!1),{width:b,height:v}=(0,l.Z)()||{width:0,height:0},S=(0,i.useRef)([]),I=(0,n.k6)(),E=(0,d.ZP)(),A=(0,h.Z)(),{checkExperiment:P}=(0,c.F)(),w=P("m10n_measurement_pinterest_tag_us").anyEnabled,T=(0,o.Z)(),j=(0,s.I0)(),Z=(e,t)=>j((0,m.r)(e,t)),R=t.length?[{href:"/",text:(0,f.jsx)(a.xu,{children:E.bt("Todas", "All", "homefeed.moreIdeasTab.homefeedTab", undefined, true)}),tabType:x.HOME},...t.filter(e=>e).map(({id:e,name:t},r)=>({href:`/?boardId=${String(e)}`,text:(0,f.jsx)(a.xu,{dangerouslySetInlineStyle:y,maxWidth:100,overflow:"hidden",children:t}),boardId:e,tabType:x.BOARD,ref:S.current[r]}))]:null,O=e=>e===x.HOME?11081:11082,N=(0,i.useRef)([]),H=(0,i.useCallback)(()=>{S&&S.current.length&&S.current.forEach((e,r)=>{if(e?.current){let{id:i,name:s}=t[r]||{},n=e.current.getBoundingClientRect();(0,p.Z)({left:n.left,right:n.right,top:n.top,bottom:n.bottom,windowHeight:v,windowWidth:b})&&i&&!N.current.includes(i)&&(T({event_type:13,view_type:1,view_parameter:92,component:13184,element:O(x.BOARD),object_id_str:i,aux_data:{board_id:i,tab_title:s,referrer:19}}),N.current.push(i))}})},[S,T,t,v,b]),D=(0,_.Z)(()=>{H()},50);(0,u.Z)(()=>{S.current=Array(t.length).fill().map((e,t)=>S.current[t]||(0,i.createRef)())}),(0,i.useEffect)(()=>{H();let e=r.current;return e&&e.addEventListener("scroll",D),()=>{e?.removeEventListener("scroll",D)}},[H,D]),(0,i.useEffect)(()=>(A.isAuth&&w&&window.pintrk&&window.pintrk("track","pagevisit",{lead_type:"Pinterest mobile homefeed",em:A.email}),()=>{g.current&&(window.cancelAnimationFrame(g.current),g.current=null)}));let L=e=>{let t=R?.[e];t&&(Z(t.boardId,e),T({event_type:101,view_type:1,view_parameter:92,component:13184,element:O(t.tabType),aux_data:{index:e.toString(),board_id:t.boardId,referrer:19},object_id_str:t.boardId}))},U=e=>R?{pathname:(R[e]||R[0]).href,state:(R[e]||R[0]).locationState||void 0}:{};if(!R)return null;let C=R.map(e=>({href:e.href,text:e.text,ref:e.ref}));return(0,f.jsx)(a.xu,{ref:r,"data-test-id":"more-ideas-tabs",fit:!0,marginBottom:1,marginTop:1,overflow:"scrollX",children:(0,f.jsx)(a.mQ,{activeTabIndex:e,onChange:({activeTabIndex:e})=>{L(e);let{pathname:t,state:r}=U(e);I.push(t,r)},tabs:C})})}},490166:(e,t,r)=>{r.d(t,{Z:()=>n});var i=r(883119),s=r(785893);function n({children:e,onMouseEnter:t,onMouseLeave:r,onTouch:n,rounding:a,fullWidth:l=!1,pressState:o="none",accessibilityLabel:d,role:c}){let _=(Array.isArray(o)?o:[o]).includes("compress");return(0,s.jsx)(i.iP,{accessibilityLabel:d,fullWidth:l,onMouseEnter:t&&(({event:e})=>t(e)),onMouseLeave:r&&(({event:e})=>r(e)),onTap:n&&(({event:e})=>n(e)),role:c,rounding:a,tapStyle:_?"compress":"none",children:e})}},407053:(e,t,r)=>{r.d(t,{AA:()=>n,E9:()=>y,EU:()=>b,IO:()=>g,KH:()=>c,Lg:()=>h,QR:()=>d,Uw:()=>s,ZR:()=>v,dx:()=>p,dy:()=>o,eA:()=>u,eV:()=>m,fo:()=>f,k7:()=>a,rT:()=>x,tz:()=>_,u9:()=>S,zR:()=>l,zu:()=>i});let i="OPEN_UNAUTH",s="openUnauthType",n="_isAfterLogin",a="_lastVisitedPages",l="_lastVisitedPagesBeforeLogin",o="_lastVisitedBoardPages",d="_lastVisitedPagesBeforeNavPage",c="_lastVisitedSessionPages",_="_unauthVisitedPages",u=100,h="_inviteCodeRedemption",p="_inviteCodeRedemptionList",m="_paidTrafficLand",f="_unauthReferrerString",y="unauthTopicsFollowed",x=["US","CA","NZ","AU"],g=new Set(["GB","IE"]),b=new Set(["AT","BE","CH","DE","DK","ES","FR","IT","NL","NO","PT","SE"]),v=new Set(["BR","MX","AR","CL","CO","PE"]),S="ad_img"},844998:(e,t,r)=>{r.d(t,{E:()=>a,S:()=>l});var i=r(667294),s=r(191313);let n="_loggingInNotHome",a=e=>{e?(0,s.Nh)(n,1):(0,s.L_)(n)},l=()=>{let[e,t]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{t(!0)},[]),e&&(0,s.qn)(n)}},932942:(e,t,r)=>{r.r(t),r.d(t,{HomePage:()=>eO,default:()=>eH});var i=r(667294),s=r(545007),n=r(616550),a=r(240684),l=r(883119),o=r(216167),d=r(324358),c=r(653286),_=r(510989),u=r(401429),h=r(150396),p=r(220585),m=r(73006),f=r(219651),y=r(810961),x=r(82531),g=r(200201),b=r(454514),v=r(140017),S=r(165706),I=r(179425),E=r(11453),A=r(340523),P=r(297329),w=r(603642),T=r(438555),j=r(5859),Z=r(757640),R=r(608516),O=r(251843),N=r(191313),H=r(573810),D=r(627408),L=r(217058),U=r(13848),C=r(624797),k=r(554786),M=r(149722),z=r(801690),F=r(237040),B=r(989418),W=r(254292),G=r(982388),V=r(185791),q=r(407053),Y=r(464421),K=r(844998),J=r(26353),$=r(170568),X=r(19447),Q=r(137842),ee=r(953565),et=r(118923),er=r(832853),ei=r(785893);function es(e,t,r){var i;return(t="symbol"==typeof(i=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,t||"default");if("object"!=typeof i)return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?i:String(i))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}let en=(0,a.ZP)({resolved:{},chunkName:()=>"app-www-pages-duplo-CoreActionsHeader",isReady(e){let t=this.resolve(e);return!0===this.resolved[t]&&!!r.m[t]},importAsync:()=>r.e(30157).then(r.bind(r,114800)),requireAsync(e){let t=this.resolve(e);return this.resolved[t]=!1,this.importAsync(e).then(e=>(this.resolved[t]=!0,e))},requireSync(e){return r(this.resolve(e))},resolve:()=>114800}),ea=(0,a.ZP)({resolved:{},chunkName:()=>"app-www-stories-FullWidthPinStory",isReady(e){let t=this.resolve(e);return!0===this.resolved[t]&&!!r.m[t]},importAsync:()=>r.e(63956).then(r.bind(r,953879)),requireAsync(e){let t=this.resolve(e);return this.resolved[t]=!1,this.importAsync(e).then(e=>(this.resolved[t]=!0,e))},requireSync(e){return r(this.resolve(e))},resolve:()=>953879}),el=(0,a.ZP)({resolved:{},chunkName:()=>"app-www-Homefeed-HomefeedMoreIdeasTabContent",isReady(e){let t=this.resolve(e);return!0===this.resolved[t]&&!!r.m[t]},importAsync:()=>r.e(26451).then(r.bind(r,770356)),requireAsync(e){let t=this.resolve(e);return this.resolved[t]=!1,this.importAsync(e).then(e=>(this.resolved[t]=!0,e))},requireSync(e){return r(this.resolve(e))},resolve:()=>770356}),eo=(0,a.ZP)({resolved:{},chunkName:()=>"app-www-stories-LandingPageStory-LandingPageStory",isReady(e){let t=this.resolve(e);return!0===this.resolved[t]&&!!r.m[t]},importAsync:()=>r.e(44985).then(r.bind(r,575800)),requireAsync(e){let t=this.resolve(e);return this.resolved[t]=!1,this.importAsync(e).then(e=>(this.resolved[t]=!0,e))},requireSync(e){return r(this.resolve(e))},resolve:()=>575800}),ed=(0,i.lazy)(()=>r.e(94189).then(r.bind(r,94189))),ec=(0,i.lazy)(()=>Promise.all([r.e(47639),r.e(24698)]).then(r.bind(r,647639))),e_=(0,i.lazy)(()=>r.e(13236).then(r.bind(r,413236))),eu=(0,i.lazy)(()=>r.e(94629).then(r.bind(r,994629))),eh=(0,i.lazy)(()=>r.e(92524).then(r.bind(r,423113))),ep=(0,i.lazy)(()=>r.e(90813).then(r.bind(r,990813))),em={feedKey:J.xJ,trafficSource:J.WV,resourceName:J.om,feedItemProps:e=>({viewParameter:92,viewType:1,onFeedItemClick:()=>{e.onFeedItemClick&&e.onFeedItemClick()}}),pullToRefresh:!0},ef=()=>({includeBackgroundImages:!0,includeVideos:!0,pins:Object.values((0,X.AF)())}),ey=()=>{let e=(0,s.I0)(),t=(0,s.v9)(({feeds:e})=>e[J.xJ]),r=(0,s.v9)(({session:e})=>e.firstHomeFeedRequestAfterNux);(0,i.useEffect)(()=>{t&&t.length>0&&r&&e((0,$.H5)(!1))},[e,t,r])},ex=()=>{let{isGraphQLEnabledInGeneral:e}=(0,F.nF)(),{locale:t}=(0,j.B)(),r=(0,X.AF)();return({feedItems:i,prevFeedItems:s,finishedRefresh:n,unauthLandingPinStateForAuthHomefeed:{pinId:a,feedItem:l}})=>{if(!i.length)return null;if(n&&s.length>0){let e=(e,t)=>e.slice(0,t).map(e=>e.id),r=e(s,5),n=e(i,5),a={appType:"mweb",language:t&&t.slice(0,2)||"unknown",locale:t||"unknown"};(0,ee.nP)("home_product.homefeed.refresh",{sampleRate:1,tags:a}),JSON.stringify(r)===JSON.stringify(n)&&(0,ee.nP)("home_product.homefeed.refresh.no_change",{sampleRate:1,tags:a})}if(a&&!e){if(s.length>0&&s[0]!==i[0])return(0,N.L_)(q.zR),{feedItem:null,pinId:null};if((0===s.length||s[0]===i[0]&&s.length!==i.length||!l)&&r[a]&&!i.slice(0,5).some(({id:e})=>e===a))return{feedItem:{id:a,type:"pin",trackingParams:i[0].trackingParams},pinId:a}}return null}},eg=e=>{let{feedKey:t,feedItemProps:r,pullToRefresh:i}=em,{webMobileHomeFeedTakoverExperience:a}=e,o=(0,n.TH)(),d=(0,n.k6)(),c=(0,n.$B)(),_=(0,s.v9)(({session:e})=>e.firstHomeFeedRequestAfterNux),{checkExperiment:u}=(0,A.F)(),h={...e,location:o,history:d,match:c},p=(0,s.v9)(({feeds:e})=>e[t]??[]),m=!_,f={...J.HH,...m?{first_page_size:"25",page_size:"10"}:{in_nux:_},in_local_navigation:u("hfp_nav_tabs_unity_mweb").anyEnabled},y=(0,Z.Z)({name:J.om,options:f}),x=ef(),g=u("mweb_first_hf_load_in_nux_fix",{dangerouslySkipActivation:!0}).group||"";_&&g&&(0,ee.nP)("home_product.homefeed.has_in_nux_flag",{sampleRate:.1,tags:{appType:"mweb",group:g}}),ey();let b=ex(),v=y.data?.length?y.data[0]:null;if(a&&a.display_data?.in_checklist_education&&a.display_data?.num_columns_requested===2){let e={type:"fullWidthBreakIn",value:{index:0,content:v?.id&&(0,ei.jsx)(Q.Z,{storyId:v.id,children:e=>(0,ei.jsx)(ea,{slotIndex:0,storyData:e,viewParameter:3833,viewType:604})})}},s=p.slice(1),{isAtEnd:n,isFetching:a,fetchMore:o,refresh:d}=y;return(0,ei.jsx)(l.xu,{"data-test-id":"homefeed",children:(0,ei.jsx)(B.Zt,{authHomefeedComponentDidUpdate:b,feedItemProps:r&&r(h),feedItems:s,feedItemsAdjustment:e,feedKey:t,pagination:{hasNext:!n,isLoadingNext:a,loadNext:()=>o(),refetch:()=>d()},pullToRefresh:i,trafficSource:J.WV,visuallyCompleteProfilerOptions:x})})}return m&&!a?.display_data?(0,ei.jsx)(l.xu,{"data-test-id":"homefeed-ssr",children:(0,ei.jsx)(B.iK,{authHomefeedComponentDidUpdate:b,feedItemProps:r&&r(h),feedKey:J.xJ,pullToRefresh:i,resource:y,serverRender:!0,trafficSource:J.WV,visuallyCompleteProfilerOptions:x})}):(0,ei.jsx)(l.xu,{"data-test-id":"homefeed",children:(0,ei.jsx)(B.iK,{authHomefeedComponentDidUpdate:b,feedItemProps:r&&r(h),feedKey:t,pullToRefresh:i,resource:y,trafficSource:J.WV,visuallyCompleteProfilerOptions:x})})},eb=(0,i.lazy)(()=>r.e(23690).then(r.bind(r,223690))),ev=(0,er.Z)(()=>r.e(23690).then(r.bind(r,223690)),{ssr:!1}),eS=(0,i.lazy)(()=>r.e(60206).then(r.bind(r,60206))),eI=(0,er.Z)(()=>r.e(60206).then(r.bind(r,60206)),{ssr:!1}),eE=(0,i.lazy)(()=>r.e(31819).then(r.bind(r,131819))),eA=(0,er.Z)(()=>r.e(31819).then(r.bind(r,131819)),{ssr:!1}),eP=(0,i.lazy)(()=>r.e(94425).then(r.bind(r,994425))),ew=(0,er.Z)(()=>r.e(94425).then(r.bind(r,994425)),{ssr:!1}),eT=(0,i.lazy)(()=>r.e(99302).then(r.bind(r,799302))),ej=(0,er.Z)(()=>r.e(99302).then(r.bind(r,799302)),{ssr:!1}),eZ=(0,i.lazy)(()=>r.e(58838).then(r.bind(r,58838))),eR=(0,er.Z)(()=>r.e(58838).then(r.bind(r,58838)),{ssr:!1});class eO extends i.PureComponent{constructor(...e){super(...e),es(this,"state",{...(0,Y.H)(),currentTabIndex:"number"==typeof this.props.selectedTabIndex?this.props.selectedTabIndex:G.e,showUnlinkTokenExpiredModal:!1,showDeleteAccountSurveyModal:!1,showYipModal:!1,shouldDismissCoreActionsHeader:!1}),es(this,"claimReferral",e=>{(0,L.My)("mweb.partner.referral.claim.attempt");let t=c.H.getData();o.Z.create("ReferralClaimResource",{referralCode:t,receiverUserId:e}).callUpdate().then(()=>{c.H.setSenderOfferClaimed(),(0,L.My)("mweb.partner.referral.claim.success"),this.props.showToast(({hideToast:e})=>(0,ei.jsx)(b.ZP,{duration:5e3,href:"/business/install_app",onHide:e,text:this.props.i18n.bt("Solicitaste una oferta. Lanza anuncios para comenzar.", "You’ve claimed an offer. Launch ads to get started.", "business_hub.offer_toast.success", undefined, true)}))}).catch(()=>{c.H.resetStatus(),(0,L.My)("mweb.partner.referral.claim.error"),this.props.showToast(({hideToast:e})=>(0,ei.jsx)(b.ZP,{duration:5e3,onHide:e,text:this.props.i18n.bt("Lo sentimos, no cumples los requisitos para solicitar esta oferta", "Sorry, you don’t qualify for this offer", "business_hub.offer_toast.error", undefined, true),type:"error"}))})}),es(this,"renderOptInInterestPicker",()=>{let{everythingFeedExperience:e,isLimitedLogin:t,lazyComponentEnabled:r}=this.props,{extraPlpImages:i,extraBlpImages:s}=this.state,n=!t&&e&&504192===e.experience_id,a=n&&e&&e.display_data&&e.display_data.full_screen_modal;return e&&n?(0,ei.jsx)(_.Z,{name:"SafeSuspense_HomePage_OptInInterestPicker",children:a?(0,ei.jsx)(e=>r?(0,ei.jsx)(eR,{...e}):(0,ei.jsx)(R.Z,{children:(0,ei.jsx)(eZ,{...e})}),{experience:e,extraImageInfo:i.length>0?i:s,viewParameter:92,viewType:1}):(0,ei.jsx)(e=>r?(0,ei.jsx)(ew,{...e}):(0,ei.jsx)(R.Z,{children:(0,ei.jsx)(eP,{...e})}),{experience:e,viewParameter:92,viewType:1})}):null})}static getDerivedStateFromProps(e){let{selectedTabIndex:t}=e;return"number"==typeof t?{currentTabIndex:t}:null}componentDidMount(){let{currentUserId:e,dispatchViewedSharedPins:t,isPartner:r,location:i,pwtStaticContext:s,i18n:n,isAuthenticated:a,showToast:l,history:o}=this.props,{sharedPinData:_}=this.state;(0,K.E)(!1),(0,d.Z)(),_&&Object.keys(_).length>0&&t(_),r&&e&&c.H.shouldClaimReferral()&&this.claimReferral(e),a&&(0,P.S$)({appLoadName:"home_feed_pinteractive",clientNavName:"home_feed_render"},s),i.state?.unlinkTokenInvalid&&this.setState({showUnlinkTokenExpiredModal:!0}),i.state?.isCloseAccountReasonOpen&&this.setState({showDeleteAccountSurveyModal:!0}),i.state?.showError&&l(({hideToast:e})=>(0,ei.jsx)(b.ZP,{duration:5e3,onHide:e,text:n.bt("No encontramos esa idea. Intenta buscar una parecida.", "We can’t find that idea! Try searching for one just like it.", " - ", undefined, true),type:"error"})),(0,C.mB)(i.search).show_yip_modal&&(o.replace("/"),this.setState({showYipModal:!0}))}render(){let{checkExperiment:e,currentUserId:t,currentUsername:r,everythingFeedExperience:s,history:n,i18n:a,isAuthenticated:o,isEligibleForCoreActionsHeader:d,isPartner:c,location:g,moreIdeasStory:b,newUserWelcomeStoryExperience:v,webMobileHomeFeedTakoverExperience:E,selectedTabBoardId:A,tabBoards:P,lazyComponentEnabled:w}=this.props,{currentTabIndex:T,showUnlinkTokenExpiredModal:j,showDeleteAccountSurveyModal:Z,showYipModal:N,shouldDismissCoreActionsHeader:H}=this.state,L=(0,C.mB)(g.search),U=L&&L.boardId||A;if(s)switch(s.experience_id){case 40002:case 10105:return(0,ei.jsx)(_.Z,{name:"SafeSuspense_HomePage_Nux",children:(0,ei.jsx)(R.Z,{fallback:(0,ei.jsx)(O.Z,{accessibilityLabel:this.props.i18n.bt("Cargando educación de nuevo usuario", "Loading new user education", "Loading spinner", undefined, true)}),children:c?(0,ei.jsx)(w?eA:eE,{experience:s}):(0,ei.jsx)(w?eI:eS,{experience:s})})});case 500681:return(0,ei.jsx)(_.Z,{name:"SafeSuspense_HomePage_ContactUpdate",children:w?(0,ei.jsx)(ev,{fallback:(0,ei.jsx)(O.Z,{accessibilityLabel:this.props.i18n.bt("Cargando experiencia", "Loading experience", "loading experience spinner", undefined, true)})}):(0,ei.jsx)(R.Z,{fallback:(0,ei.jsx)(O.Z,{accessibilityLabel:this.props.i18n.bt("Cargando experiencia", "Loading experience", "loading experience spinner", undefined, true)}),children:(0,ei.jsx)(eb,{})})})}let k=o&&e("mweb_hf_core_actions_header").anyEnabled&&d;return(0,ei.jsx)(z.Z,{viewParameter:92,viewType:1,children:(0,ei.jsx)(D.Z,{view:1,viewParameter:92,children:(0,ei.jsxs)(I.default,{dataLayoutShiftBoundaryId:"AuthHomePageContainer",hasFixedHeader:!0,children:[(0,ei.jsx)(W.Z,{text:a.bt("Inicio", "Home", "HomePage.HiddenAccessibilityHeader", undefined, true)}),!!P?.length&&(0,ei.jsx)(S.FixedHeader,{hideOnScroll:o,noPadding:!0,overrideTop:0,children:(0,ei.jsx)(l.xu,{paddingY:1,children:(0,ei.jsx)(V.Z,{currentTabIndex:T,tabBoards:P||[]})})}),b&&(0,ei.jsx)(l.xu,{marginEnd:-4,marginStart:-4,paddingY:2,children:(0,ei.jsx)(Q.Z,{storyId:b.id,children:e=>(0,ei.jsx)(ea,{slotIndex:0,storyData:e,viewParameter:92,viewType:1},b.id)})}),!!P&&!!P.length&&!!U&&T!==G.e&&(0,ei.jsx)(el,{boardId:U})||(0,ei.jsxs)(i.Fragment,{children:[(0,ei.jsx)(m.Z,{experience:s}),(0,ei.jsx)(p.Z,{placementId:40001}),(0,ei.jsx)(f.Z,{experience:s}),(0,ei.jsx)(h.Z,{placementId:s?.placement_id}),(0,ei.jsx)(x.Z,{placementId:1000544}),(0,ei.jsx)(y.Z,{placementId:1000558}),(0,ei.jsx)(u.Z,{eligibleIds:[500726,500866,500735,500833,501182,501275,501385,501358,501908,501909,503291],experience:s,children:(0,ei.jsx)(R.Z,{children:(0,ei.jsx)(e_,{experience:s})})}),s&&(0,ei.jsx)(u.Z,{eligibleIds:[505326],experience:s,children:({complete:e,dismiss:t})=>(0,ei.jsx)(i.Suspense,{children:(0,ei.jsx)(ep,{complete:e,dismiss:t})})}),s&&(0,ei.jsx)(u.Z,{eligibleIds:[505801],experience:s,children:({complete:e})=>(0,ei.jsx)(i.Suspense,{children:(0,ei.jsx)(eh,{complete:e})})}),v?.display_data?.story&&v.display_data.showUpdatedLandingPageStory&&(0,ei.jsx)(eo,{isMoreIdeasTabsVisible:!!P?.length,newUserWelcomeStoryExperience:v}),(0,ei.jsxs)(l.xu,{marginTop:P?.length||b?0:2,children:[!H&&k&&(0,ei.jsx)(en,{onDismiss:()=>{this.setState({shouldDismissCoreActionsHeader:!0})},username:r||""}),(0,ei.jsx)(eg,{webMobileHomeFeedTakoverExperience:E})]})]}),j&&(0,ei.jsx)(R.Z,{children:(0,ei.jsx)(l.xu,{"data-test-id":"unlink-expired-token",children:(0,ei.jsx)(eu,{onDismiss:()=>{n.replace("/"),this.setState({showUnlinkTokenExpiredModal:!1})}})})}),Z&&(0,ei.jsx)(R.Z,{children:(0,ei.jsx)(ed,{isPartner:c,onDismiss:()=>{n.replace("/"),this.setState({showDeleteAccountSurveyModal:!1})},userId:t,username:r})}),N&&(0,ei.jsx)(_.Z,{name:"SafeSuspense_LoadingSpinner",children:w?(0,ei.jsx)(ej,{onModalDismiss:()=>{this.setState({showYipModal:!1})}}):(0,ei.jsx)(R.Z,{children:(0,ei.jsx)(eT,{onModalDismiss:()=>{this.setState({showYipModal:!1})}})})}),this.renderOptInInterestPicker()]})})})}}let eN=[];function eH(){let e;let t=(0,v.ZP)(),r=(0,s.I0)(),i=(0,M.Z)(),{showToast:a}=(0,U.F9)(),l=(0,T.Z)(),o=(0,n.k6)(),d=(0,n.TH)(),{checkExperiment:c}=(0,A.F)(),_="true"===(0,H.qn)("completedMiniRenux"),u=(0,g._)({id:40001,extraContext:_?{completed_mini_renux:_}:void 0,shouldUsePlacedExperience:!1}),h=(0,g._)({id:1000115}),p=(0,g._)({id:1000411}),m=(0,s.v9)(({feeds:e})=>e.homefeed),f=(0,s.v9)(({homefeedTabUI:e})=>e.activeTabBoardId),y=(0,s.v9)(({homefeedTabUI:e})=>e.activeTabIndex),{isAuth:x,isLimitedLogin:b}=i,S=i.isAuth?i.id:void 0,I=i.isAuth?i.username:void 0,P=!!i.isAuth&&i.isPartner,j=(0,k.HG)(),O=Array.isArray(m)?m:[],N=!j&&O[0]&&"story"===O[0].type?O[0]:null,D=(0,s.v9)(({stories:e})=>N?e[N.id]:null),L=D&&D.story_type&&D.story_type.startsWith("boards_more_ideas_feed_upsell")?D:null,{data:C}=(0,Z.Z)(c("hfp_nav_tabs_unity_mweb").anyEnabled?null:{name:"MoreIdeasTabsBoardsResource",options:{redux_normalize_feed:!0}});e=c("hfp_nav_tabs_unity_mweb").anyEnabled?O.find(({type:e})=>"home_feed_tabs"===e)?.tabs:C;let{data:z}=(0,Z.Z)(x&&c("mweb_hf_core_actions_header",{dangerouslySkipActivation:!0}).anyEnabled?{name:"UserResource",options:{user_id:i.id,field_set_key:"core_actions_header"}}:null),F=(0,k.ml)(),B=(0,E.jr)(i),W=(0,et.b)();return(0,ei.jsxs)(w.Z,{measureGridVisuallyComplete:!0,surface:"homefeed",children:[B&&(0,ei.jsx)(R.Z,{children:(0,ei.jsx)(ec,{})}),(0,ei.jsx)(eO,{checkExperiment:c,currentUserId:S,currentUsername:I,dispatchViewedSharedPins:e=>r((0,$.dz)(e)),everythingFeedExperience:u,history:o,i18n:t,isAuthenticated:x,isEligibleForCoreActionsHeader:z?.is_eligible_for_core_actions_header,isLimitedLogin:b,isMobile:F,isPartner:P,lazyComponentEnabled:W,location:d,moreIdeasStory:L,newUserWelcomeStoryExperience:p,pwtStaticContext:l,selectedTabBoardId:f,selectedTabIndex:y,showToast:a,tabBoards:e??eN,webMobileHomeFeedTakoverExperience:h})]})}},26353:(e,t,r)=>{r.d(t,{EP:()=>o,HH:()=>l,WV:()=>n,om:()=>a,xJ:()=>s});var i=r(288240);let s="homefeed",n="feed_home",a="UserHomefeedResource",l={field_set_key:"mobile_grid_item",prepend:!1},o=(0,i.Z)(l)},969300:(e,t,r)=>{r.d(t,{r:()=>i});let i=(e,t)=>({type:"SET_ACTIVE_HOMEFEED_TAB",payload:{boardId:e,index:t}})},170568:(e,t,r)=>{r.d(t,{Cp:()=>d,FK:()=>o,H5:()=>b,MI:()=>m,O0:()=>p,QZ:()=>l,W:()=>x,WF:()=>_,Wz:()=>v,a5:()=>u,dz:()=>y,e0:()=>h,e2:()=>a,iW:()=>g,n1:()=>n,rm:()=>c,xu:()=>f});var i=r(741983),s=r(389638);let n=()=>({type:"DISMISS_UNAUTH_SAVE"}),a=()=>({type:"COMPLETE_UNAUTH_SAVE_ACTION"}),l=e=>({type:"SET_UNAUTH_SAVE_PIN_ID",payload:{unauthSavePinId:e}}),o=()=>({type:"HIDE_NAV_FOOTER"}),d=()=>({type:"SHOW_NAV_FOOTER"}),c=e=>({type:"SET_LOGIN_SIGNUP_FROM",payload:{from:e}}),_=()=>({type:"SHOW_REPIN_ANIMATION"}),u=()=>({type:"HIDE_REPIN_ANIMATION"}),h=e=>({type:"SET_NUM_SIGNUP_STEPS",payload:{steps:e}}),p=()=>({type:"SET_OWN_PROFILE_PINS_REFRESH"}),m=e=>({type:"SHOW_BIZ_NUX_HOMEFEED_LOADER",payload:e}),f=e=>({type:"SET_VIEWED_IMAGE",payload:{viewedImageSignature:e}}),y=e=>({type:"SET_VIEWED_SHARED_PINS",payload:{pins:e}}),x=()=>({type:"DISMISS_UNAUTH_APP_UPSELL"}),g=e=>e?{type:"LOGGED_OUT_USER_INFO_FOUND",payload:e}:{type:"LOGGED_OUT_USER_INFO_NOT_FOUND"},b=e=>({type:"UPDATE_USER_FIRST_HOME_FEED_REQUEST_AFTER_NUX",payload:e}),v=(e,t)=>({type:"SET_LANDING_PAGE_TYPE",payload:e?(0,i.bo)(e)?"today":(0,i.dr)(e)?"ideas":t&&(0,i.dZ)(e,t)?"own_section":t&&(0,i.J)(e,t)?"own_board":(0,i.OJ)(e)?"section":(0,i.am)(e)?"board":(0,i.L6)(e)?"closeup":(0,i.C$)(e)?"home":(0,s.Z)(e)?"profile":(0,i.En)(e)?"search":(0,i.$V)(e)?"topic":"":""})},70982:(e,t,r)=>{r.d(t,{KF:()=>c,ZN:()=>l,fv:()=>d,kE:()=>u,yA:()=>o});var i=r(216167),s=r(372085),n=r(386129);function a(e,t,r,s){return i.Z.create("UserFollowResource",{user_id:e,invite_code:s||void 0,aux_data:t?{pin_id:t}:void 0,client_tracking_params:r})}function l(e,t=null,r,i){return s=>{a(e,t,r,i).callCreate().catch(()=>s((0,n.P_)(e,!1))),s((0,n.P_)(e,!0))}}function o(e,t=null,r,i){return async s=>{s((0,n.P_)(e,!0)),await a(e,t,r,i).callCreate().catch(t=>{throw s((0,n.P_)(e,!1)),t})}}function d(e,t=null,r){return i=>{a(e,t,r).callDelete().catch(()=>i((0,n.P_)(e,!0))),i((0,n.P_)(e,!1))}}function c(e,t=null,r){return async i=>{i((0,n.P_)(e,!1)),await a(e,t,r).callDelete().catch(t=>{throw i((0,n.P_)(e,!0)),t})}}let _=(e,t)=>({type:"USER_BULK_FOLLOW",payload:{ids:e,value:t}}),u=e=>t=>{e.length>0&&((0,s.Z)({url:"/v3/users/follow/",method:"PUT",data:{followee_ids:e.join(",")}}).catch(()=>t(_(e,!1))),t(_(e,!0)))}},137842:(e,t,r)=>{r.d(t,{Z:()=>s});var i=r(545007);function s({children:e,storyId:t}){let r=(0,i.v9)(({stories:e})=>e[t]);return r&&e(r)}}}]);
//# sourceMappingURL=https://sm.pinimg.com/webapp/13968.es_419-93de322c1cb1f563.mjs.map