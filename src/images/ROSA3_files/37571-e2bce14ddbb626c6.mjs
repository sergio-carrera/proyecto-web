"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[37571],{552341:(e,t,a)=>{a.d(t,{Z:()=>r});var s=a(149722);let r=()=>{let e=(0,s.Z)();return!!e.isAuth&&e.isPartner}},135987:(e,t,a)=>{a.d(t,{FE:()=>b,lG:()=>T,d9:()=>O});var s=a(667294),r=a(545007),i=a(616550),n=a(552341),u=a(516018),l=a(340523),c=a(149722),d=a(953565);let o=()=>{let e=(0,c.Z)(),{checkExperiment:t}=(0,l.F)(),a=(0,n.Z)()&&t("web_m10n_business_reporting_business_entity_service").anyEnabled,[r,i]=(0,s.useState)({isReady:!1}),o=(0,s.useCallback)(async({entityId:e,actingBusinessId:t,favorites:s})=>{a&&(await (0,u.yo)({entityId:e,actingBusinessId:t,favorites:s}),i(e=>{let a={...e,actingBusinessId:t};return s&&(a.favoriteAdAccounts={favoriteAdAccountsMap:{...e.favoriteAdAccounts?.favoriteAdAccountsMap||{},[s.actingBusinessId]:{advertiserId:s.adAccounts}}}),a}))},[a]);return(0,s.useEffect)(()=>{a&&e.isAuth&&!r.isReady&&(async()=>{let t=!1;try{let t=await (0,u.SF)({entityId:e.id});i(e=>({...e,...t}))}catch{t=!0}finally{(0,d.nP)("globalAccountSwitcher.getFavoriteAdAccounts",{sampleRate:1,tags:{businessId:e.id,hasError:t}}),i(e=>({...e,isReady:!0}))}})()},[r.isReady,a,e]),{accountSwitcherConfig:r,setConfig:o}};var _=a(354500),p=a(214877),m=a(342513),A=a(741983),E=a(389638),S=a(624797),g=a(938927),I=a(442279),C=a(575333);let N=(0,I.P1)(C.Z,({viewerIsProfileOwnerOrProfileManager:e})=>e??void 0);var y=a(454535),h=a(785893);let{Provider:f,useHook:O}=(0,m.Z)("AccountSwitcherContext"),T=e=>e.search&&(0,S.mB)(e.search).advertiserId,b=({children:e})=>{let t=(0,i.TH)(),{params:{userBizId:a,businessHierarchyId:l,advertiserId:d,username:m}}=(0,i.$B)(),S=T(t),I=(0,c.Z)(),C=r.v9(N)?.data||void 0,O=(0,y.rc)(C),[b,R]=(0,s.useState)(""),[w,v]=(0,s.useState)(null),[U,P]=(0,s.useState)(!1),[D,$]=(0,s.useState)(null),L=new URLSearchParams(t.search),[B,M]=(0,s.useState)(L.has("actingBusinessId")?null:{id:I.id||"",name:I.fullName||"",img:I.imageMediumUrl||""}),[G,Z]=(0,s.useState)(!1),F=(0,n.Z)(),{logContextEvent:H}=(0,p.v)(),{accountSwitcherConfig:k,setConfig:z}=o();(0,s.useEffect)(()=>{l?R(l):R("")},[l]);let V=(0,s.useCallback)(async({id:e,username:t})=>{let a=await (0,u.bG)({user_id:e,username:t});a&&$({type:e?_.Oz.BUSINESS_ACCOUNT:_.Oz.PROFILE,id:e||a.id,name:a.full_name,img:a.image_medium_url,username:t,ownerImg:a.image_medium_url,ownerFullName:a.full_name}),Z(!1)},[]),x=(0,y.rc)(m);(0,s.useEffect)(()=>{(0,E.Z)(t)&&D&&x!==m&&m===I.username&&(V({username:I.username}),M({id:I.id||"",name:I.fullName||"",img:I.imageMediumUrl||""}),v({type:_.nt,id:I.id}))},[t,x,V,D,m,I.fullName,I.id,I.imageMediumUrl,I.username]),(0,s.useEffect)(()=>{let e=async({businessId:e,assetId:t})=>{if(!e){Z(!1);return}try{let e={asset:{name:""},type:"AD_ACCOUNT"};if(I.isAuth){let{data:{data:a={[t]:e}}={}}=await (0,g.pI)({businessId:I.id,assetIds:[t],resourceType:"AD_ACCOUNT"})||{},{asset:s,type:r}=a[t]||e;$({id:t,name:s.name,img:"",type:r,ownerImg:a[t].owner.image_medium_url,ownerFullName:a[t].owner.full_name})}}catch{$({id:I.id||"",name:I.fullName||"",img:I.imageMediumUrl||"",type:_.Oz.BUSINESS_ACCOUNT,ownerImg:I.imageMediumUrl||"",ownerFullName:I.fullName||""})}Z(!1)},s=async({id:e})=>{let t=await (0,u.p)({hierarchyId:e});$({id:e,name:t?.data?t.data.name:"",img:t?.data?t.data.img_medium_url:"",type:_.Oz.BUSINESS_HIERARCHY,ownerImg:t?.data?t.data.img_medium_url:"",ownerFullName:t?.data?t.data.name:""}),Z(!1)};if(I.isAuth&&F){let r=D&&D.username&&D.username!==m,i=!0===C&&C!==O;if((!D||r||i)&&!G){let r=(0,A.z6)(t)||(0,A.h3)(t),i=d||!!S&&!r;Z(!0),l?s({id:l}):a?V({id:a}):(0,E.Z)(t)&&m&&C?V({username:m}):i?e({businessId:I.id,assetId:d||S||""}):D&&D.id===I.id||($({type:_.Oz.BUSINESS_ACCOUNT,id:I.id||"",name:I.fullName||"",img:I.imageMediumUrl||"",ownerImg:I.imageMediumUrl||"",ownerFullName:I.fullName||""}),Z(!1))}}},[D,I,l,a,m,d,S,B,F,t,V,G,C,O]);let j=(0,s.useMemo)(()=>({activePanel:w,selectedHierarchyId:b,switcherOpen:U,openAccountSwitcher:()=>{if(H({event_type:101,view_type:608,component:14346}),!w){if((0,A.z6)(t))v({type:_.v8});else{let e=new URLSearchParams(t.search).get("actingBusinessId");v({type:_.nt,id:e??B?.id})}}P(!0)},closeAccountSwitcher:()=>{v(D&&!(0,A.z6)(t)?{type:_.nt,id:B?.id}:{type:_.v8}),P(!1)},openAssetPanel:e=>{v({type:_.nt,id:e})},closeAssetPanel:()=>{v(D&&!(0,A.z6)(t)?{type:_.nt,id:B?.id}:{type:_.v8})},activateBusinessPanel:()=>{v({type:_.v8})},actingBusiness:B,selectedAccount:D,setSelectedAccount:$,setActingBusiness:M,accountSwitcherConfig:k,setConfig:z}),[w,b,U,B,D,k,z,H,t]);return(0,h.jsx)(f,{value:j,children:e})}},593882:(e,t,a)=>{a.d(t,{C:()=>S,H:()=>g});var s=a(667294),r=a(552341),i=a(354500),n=a(516018),u=a(29156),l=a(250304),c=a(24691),d=a(342513),o=a(372085),_=a(244413),p=a(149722),m=a(186966),A=a(785893);let{Provider:E,useHook:S}=(0,d.Z)("BusinessHierarchyContext"),g=({children:e})=>{let[t,a]=(0,s.useState)([]),[d,S]=(0,s.useState)(!1),[g,I]=(0,s.useState)(!1),[C,N]=(0,s.useState)({}),[y,h]=(0,s.useState)(null),[f,O]=(0,s.useState)([]),[T,b]=(0,s.useState)({}),R=(0,m.Z)(),w=(0,s.useRef)(R),v=(0,p.Z)(),U=(0,r.Z)(),P=(0,s.useRef)({}),D=(0,s.useCallback)((e,t)=>{let a;t===i.Oz.BUSINESS_HIERARCHY?a=(0,c.Z)(l.Q6.DASHBOARD,"","",e):t===i.Oz.BUSINESS_ACCOUNT&&(a=(0,c.Z)(l.Q6.DASHBOARD,e));let s=(0,_.Z)({site:"www",path:a});(0,u.Z)(s)},[]),$=(0,s.useCallback)(async e=>{if(!U)return[];if(I(!0),P.current[e])return I(!1),P.current[e];{let{data:t}=(await (0,o.Z)({url:"ads/v4/business_access/business_hierarchies/",data:{search_by:["FULL_NAME","BUSINESS_ID"],search_value:e}})).resource_response,a=t&&t.map(e=>(e.children&&(e.children=e.children.map(e=>(e.user.entity_type=i.Oz.USER_ACCOUNT,e))),e))||[],s=/^\d+$/.test(e),r=RegExp(e.toLowerCase(),"g"),u=[];y||h(u=await w.current());let l=(y??u).filter(t=>s?t.id.includes(e):t.user.full_name.toLowerCase().match(r)).map(n.IT),c=[...a.map(e=>e.id),...l.map(e=>e.id)],d=s?(v.id||"").includes(e):(v.fullName||"").toLowerCase().match(r);return v.isAuth&&d&&c.push(v.id),P.current[e]=c,I(!1),c}},[U,w,v.id,v.fullName,v.isAuth,y]),{id:L="",username:B="",email:M="",fullName:G="",imageSmallUrl:Z="",imageMediumUrl:F="",isAuth:H}=v,k=async e=>{if((!H||!U||y)&&!e)return;S(!0);let t=[];try{let{data:e}=(await (0,o.Z)({url:"ads/v4/business_access/business_hierarchies/"})).resource_response;t=e&&e.map(e=>(e.children&&(e.children=e.children.map(e=>(e.user.entity_type=i.Oz.USER_ACCOUNT,e))),e))||[],a(t)}catch{a([])}try{let e=[];y||(e=await w.current(),h(e));let a=y??e;O(a.map(n.IT)),b(a.reduce((e,t)=>(e[t.id]=t.business_roles||[],e),{})),N((0,n.WP)({id:L,username:B,email:M,fullName:G,imageSmallUrl:Z,imageMediumUrl:F})),P.current[""]=[...t.map(e=>e.id),...a.map(n.IT).map(e=>e.id),L],S(!1)}catch{S(!1)}},z=(0,s.useCallback)(k,[L,B,M,G,Z,F,H,U,y]),V=(0,s.useCallback)(e=>t.some(t=>t.id===e||t.children.some(t=>t.id===e||t.user.id===e)),[t]),x=(0,s.useCallback)(e=>t.map(e=>"BUSINESS_HIERARCHY"===e.entity_type?e:null).find(t=>!!t&&t.children.some(t=>t.user.id===e)),[t]),j=(0,s.useMemo)(()=>({businessHierarchies:[...C.id&&!V(C.id)?[C]:[],...t,...f.filter(e=>!V(e.id))],switchAccount:D,searchAccounts:$,loadingAccounts:d,isSearchingAccounts:g,fetchData:z,getParentHierarchyForIdIfExists:x,viewerRolesOfEachEmployer:T}),[t,D,$,f,d,g,C,z,V,x,T]);return(0,A.jsx)(E,{value:j,children:e})}},516018:(e,t,a)=>{a.d(t,{IT:()=>d,SF:()=>A,Vq:()=>c,WP:()=>o,Yu:()=>m,bG:()=>p,p:()=>_,yo:()=>E});var s=a(216167),r=a(354500),i=a(372085),n=a(288673),u=a(562967),l=a(785893);let c=e=>({id:e.id,entity_type:r.Oz.BUSINESS_ACCOUNT,user:{id:e.user.id,entity_type:r.Oz.USER_ACCOUNT,username:e.user.username,email:e.user.email,full_name:e.user.full_name,image_small_url:e.user.image_small_url,image_medium_url:e.user.image_medium_url}}),d=e=>({id:e.id,entity_type:r.Oz.BUSINESS_ACCOUNT,requires_mfa_for_roles:e.requires_mfa_for_roles,user:{id:e.user.id,entity_type:r.Oz.USER_ACCOUNT,username:e.user.username,email:e.user.email,full_name:e.user.full_name,image_small_url:e.user.image_small_url,image_medium_url:e.user.image_medium_url}}),o=e=>({id:e.id,entity_type:r.Oz.BUSINESS_ACCOUNT,user:{id:e.id,entity_type:r.Oz.USER_ACCOUNT,username:e.username,email:e.email,full_name:e.fullName,image_small_url:e.imageSmallUrl,image_medium_url:e.imageMediumUrl}}),_=async({hierarchyId:e})=>(await (0,i.Z)({url:`ads/v4/business_access/business_hierarchy/${e}/`})).resource_response,p=async({user_id:e,username:t})=>{if(!t&&!e)return null;let{resource_response:{data:a}}=await s.Z.create("UserResource",{user_id:e,username:t}).callGet();return a},m=(0,l.jsx)("hr",{style:{borderTop:"1px solid #e9e9e9"}}),A=async({entityId:e})=>{let t=(await (0,n.FO)([{entity_type:"BIZ_USER",entity_id:e,property_keys:["GLOBAL_ACCOUNT_SWITCHER_CONFIG"]}]))[0];return t&&t.properties?t.properties.GLOBAL_ACCOUNT_SWITCHER_CONFIG:{}},E=async({entityId:e,actingBusinessId:t,favorites:a})=>{let s={};(0,u.k)(t)||(s.actingBusinessId=t),a&&(s.favoriteAdAccounts={favoriteAdAccountsMap:{[a.actingBusinessId]:{advertiserId:a.adAccounts}}}),Object.keys(s).length>0&&await (0,n.RM)([{entity_type:"BIZ_USER",entity_id:e,properties:{GLOBAL_ACCOUNT_SWITCHER_CONFIG:s}}])}},24691:(e,t,a)=>{a.d(t,{Z:()=>i});let s="/business/business-manager/",r="/business/business-hierarchy/",i=(e,t,a,i)=>{switch(e){case"DASHBOARD":return i?`${r}${String(i)}/dashboard/`:`${s}${String(t)}/dashboard/`;case"PEOPLE":return`${s}${String(t)}/employees/`;case"PARTNERS":return`${s}${String(t)}/partners/`;case"AD_ACCOUNTS":return`${s}${String(t)}/ad-accounts/`;case"HISTORY":return`${s}${String(t)}/history/`;case"PEOPLE_DETAIL":return`${s}${String(t)}/employees/${String(a)}/details/`;case"PARTNERS_DETAIL":return`${s}${String(t)}/partners/${String(a)}/details/`;case"SHARED_PARTNERS_DETAIL":return`${s}${String(t)}/shared/${String(a)}/details/`;case"AD_ACCOUNTS_DETAIL":return`${s}${String(t)}/ad-accounts/${String(a)}/details/`;case"PENDING_AD_ACCOUNTS_DETAIL":return`${s}${String(t)}/ad-accounts/pending/${String(a)}/details/`;case"PEOPLE_INVITES":return`${s}${String(t)}/employees/invites/`;case"PEOPLE_PENDING_TAB":return`${s}${String(t)}/employees/pending/`;case"PARTNERS_PENDING_TAB":return`${s}${String(t)}/partners/pending/`;case"AD_ACCOUNTS_PENDING_TAB":return`${s}${String(t)}/ad-accounts/pending`;case"AD_ACCOUNTS_CEE_MIGRATION":return`${s}${String(t)}/ad-accounts/cee-migration`;case"PARTNERS_INVITE_PAGE":return`${s}${String(t)}/partners/invites/`;case"PARTNERS_REQUEST_PAGE":return`${s}${String(t)}/partners/requests/`;case"PROFILES":return`${s}${String(t)}/profiles/`;case"PROFILES_DETAIL":return`${s}${String(t)}/profiles/${String(a)}/details/`;case"BUSINESS_SECURITY":return`${s}${String(t)}/security/`;case"SUPPORT_TOOL":return`${s}${String(t)}/support/`;case"ASSET_GROUPS":return a?`${s}${String(t)}/asset-groups/?asset_group_id=${String(a)}`:`${s}${String(t)}/asset-groups/`;case"INVOICE_MANAGEMENT":return`${s}${String(t)}/invoice-management/`;case"BUSINESS_HIERARCHY":return`${r}${String(i)}/hierarchy/`;case"BUSINESS_HIERARCHY_BUSINESS_SECURITY":return`${r}${String(i)}/business_security/`;case"MANAGERS":return`${r}${String(i)}/managers/`;case"AUDIENCES":return`${s}${String(t)}/audiences/`;case"SHARED_TAGS":return`${s}${String(t)}/shared-tags/`;case"CATALOGS":return`${s}${String(t)}/catalogs/`;case"BRAND_SAFETY":return`${s}${String(t)}/brand-safety/`;default:return s}}},654960:(e,t,a)=>{a.d(t,{Z:()=>r});var s=a(598228);let r=()=>{let{hostname:e}=window.location,t=e.includes("pinterdev")&&!e.includes("ads.pinterdev"),a=e.includes("pinterest")&&(e.startsWith("www")||e.startsWith("latest")||e.startsWith("testing"));return t||a?e:e.includes("ads-latest")?"latest.pinterest.com":s.Vi}},389638:(e,t,a)=>{a.d(t,{Z:()=>i});var s=a(616550);let r=["/BingSiteAuth.xml","/about","/add-account","/ads","/ads.txt","/age_verification","/all","/app-ads.txt","/apple-app-site-association","/apple-app-site-association.p7m","/attribution_source","/bot.html","/branded-pins","/browserbutton","/buy-it","/careers","/categories","/close-account","/content-claiming","/convert-business","/convert-personal","/create-business","/create-linked-business","/create-personal","/creation-inspiration","/creator-onboarding-landing","/csrf_error","/ct.html","/deactivate-account","/deed6a3ef3a44d41bb3ae2bad137db84.txt","/developers","/discover","/edit","/email_verification_error","/engagement","/explore","/favicon.ico","/fb.html","/flyup-instant-loading-indicator-app-shell.html","/following","/getWebPushKey","/google_gdn.html","/google_search.html","/googlef5dc42d6e03f6e61.html","/guidedsearch","/help","/holidays-celebrations","/homefeed","/idea-ads-tool","/idea-pin-builder","/ideas","/inbox","/install-shuffles","/invited","/jobs","/lens-search","/login","/logout","/manifest.json","/manifest.webapp","/me","/messages","/mobile","/notifications","/oauth","/app-factory-oauth","/appealed-pin","/oembed.json","/offline.html","/offsite","/opensearch.xml","/parent_contact_info","/parental-passcode","/pin-builder","/pin-creation-tool","/pin-editor","/pin_catalog","/pin_redirect","/pinterest-wellbeing","/pinterest-predicts","/pinterestlens","/pinterestlenstryon","/pinterestwellbeing","/policy","/product-catalogs","/public-beta","/quick-instant-loading-indicator-app-shell.html","/recently-viewed","/refresh_stored_accounts","/refresh_token","/report","/reports-and-violations","/request-data","/robots.txt","/safe-redirect","/search","/settings","/shopping","/signup","/socialmanager","/story-pin-builder","/story_feed","/sw-shell.html","/sw.html","/sw.js","/switch_account","/terms","/today","/topics","/transparent.html","/unauth-profile","/unlink","/upload-image","/upload-image-lens-history","/upload-lens-image","/upload-profile-image","/verified","/verify","/videos","/web-custom-svg","/web-mentorship","/welcome","/windows-app-web-link","/your-shop"];function i(e){return!!(0,s.LX)(e.pathname,{path:"/:username/",exact:!0})&&!r.includes(e.pathname.replace(/\/$/,""))}},186966:(e,t,a)=>{a.d(t,{Z:()=>r});var s=a(372085);function r(){return async()=>{let e=await (0,s.Z)({url:"/ads/v4/business_access/businesses/me/employers/"}),t=e.resource_response?e.resource_response.data:{data:[]};return await Promise.all(t&&t.data||[])}}},665407:(e,t,a)=>{a.d(t,{By:()=>i,di:()=>u,s8:()=>n});var s=a(250304),r=a(372085);let i=async({limit:e,sortBy:t="FULL_NAME",sortDirection:a="ASCENDING",searchBy:i="FULL_NAME",searchTerm:n="",startIndex:u=0})=>{let l=e&&e<s.xX?e:s.xX;return(await (0,r.Z)({url:"ads/v4/business_access/businesses/me/get_pinterest_support_businesses",data:{sort_by:t,sort_ascending:"ASCENDING"===a,search_by:i,search_value:n,start_index:u,page_size:l}})).resource_response},n=async e=>(await (0,r.Z)({url:`ads/v4/business_access/businesses/${e}/get_pinterest_support_access`})).resource_response,u=async()=>(await (0,r.Z)({url:"ads/v4/pinterest_support_managed_advertisers",data:{add_fields:"advertiser.owner_user()"}})).resource_response},575333:(e,t,a)=>{a.d(t,{Z:()=>s});let s=({businessAccess:e})=>e??{}},939341:(e,t,a)=>{a.d(t,{I:()=>S,a:()=>A});var s=a(667294),r=a(616550),i=a(516018),n=a(700280),u=a(342513),l=a(340523),c=a(149722),d=a(665407),o=a(130371);let _=()=>{let{checkExperiment:e}=(0,l.F)(),t=(0,c.Z)(),a=!!(t.isAuth&&t.isPartner&&e("web_m10n_pin_support_tool").anyEnabled),{state:r,receiveAdAccounts:i}=(0,o.Z)(a),{managedBusinessesMap:n,error:u,fetching:_}=r,p=!!u||n.size>0,m=(0,s.useCallback)(async()=>{let e=await (0,d.di)();i(e?.data??[])},[i]);return(0,s.useEffect)(()=>{p||_||m()},[m,p,_]),n};var p=a(785893);let{Provider:m,useMaybeHook:A}=(0,u.Z)("PinSupportToolContext"),E=()=>{let{search:e}=(0,r.TH)();return(0,s.useMemo)(()=>new URLSearchParams(e),[e])},S=({children:e,viewerAdvertiser:t})=>{let{checkExperiment:a}=(0,l.F)(),r=(0,c.Z)(),u=r.isAuth&&r.isPartner&&a("web_m10n_pin_support_tool").anyEnabled,{state:d,actions:A}=(0,o.Z)(u),S=_(),g=[...S.values()].map(e=>(0,i.Vq)(e)),{sterling_on_steroids_ldap:I}=(0,n.u)(),{activeAdAccount:C,headerVisible:N}=d,y=r.isAuth&&!!I,{changeClient:h,changeAdAccount:f,toggleHeaderVisibility:O}=A;(0,s.useEffect)(()=>{u&&(y&&!N&&O(!0),!y&&N&&O(!1))},[O,y,u,N]);let T=E(),b=T.get("managedClientId"),R=T.get("advertiserId")||t?.id;(0,s.useEffect)(()=>{b&&R?f(R,b):b&&h(b)},[h,f,b,R]);let w=S.get(C?.clientId||""),v=(w?.managedAdAccounts||new Map).get(C?.adAccountId||""),U=[...S.values()];return(0,p.jsx)(m,{value:{managedBusinesses:U,managedBusinessAccounts:g,headerVisible:d.headerVisible,activeClient:w,activeAdAccount:v,viewerAdvertiser:t,changeClient:h,changeAdAccount:f,toggleHeaderVisibility:O},children:e})}},130371:(e,t,a)=>{a.d(t,{Z:()=>c});var s=a(667294),r=a(573810);let i=e=>[...e.map(e=>({id:e.business.id,ownedAndManagedAdAccounts:e.business.ad_account_count,user:e.business.pinterest_support_business,managedAdAccounts:e.advertisers.reduce((e,t)=>e.set(t.id,t),new Map)}))].sort(({user:{username:e}},{user:{username:t}})=>e.localeCompare(t)).map(e=>{let t=[...e.managedAdAccounts.values()].sort(({name:e},{name:t})=>e.localeCompare(t));return e.managedAdAccounts=t.reduce((e,t)=>e.set(t.id,t),new Map),e}).reduce((e,t)=>e.set(t.id,t),new Map),n={managedBusinessesMap:new Map,headerVisible:!1,activeAdAccount:{clientId:void 0,adAccountId:void 0},fetching:!1,error:!1},u=(e,t)=>{switch(t.type){case"LOAD_AD_ACCOUNTS":return{...e,managedBusinessesMap:t.payload.managedBusinesses};case"SET_ACTIVE_CLIENT":case"SET_ACTIVE_AD_ACCOUNT":return{...e,activeAdAccount:t.payload};case"TOGGLE_HEADER_VISIBILITY":return{...e,headerVisible:t.payload};default:return e}},l=({dispatch:e,isEnabled:t,state:a})=>{let{headerVisible:r}=a;return{changeClient:(0,s.useCallback)(a=>{t&&e({type:"SET_ACTIVE_CLIENT",payload:{clientId:a,adAccountId:null}})},[t,e]),changeAdAccount:(0,s.useCallback)((a,s)=>{t&&e({type:"SET_ACTIVE_AD_ACCOUNT",payload:{adAccountId:a,clientId:s}})},[t,e]),toggleHeaderVisibility:(0,s.useCallback)(a=>{t&&e({type:"TOGGLE_HEADER_VISIBILITY",payload:a??!r})},[t,e,r])}},c=e=>{let[t,a]=(0,s.useReducer)(u,n),c=l({dispatch:a,isEnabled:e,state:t}),{activeAdAccount:d}=t;return(0,s.useEffect)(()=>{let e=JSON.parse((0,r.qn)("psToolAdAccount",!1));e&&a({type:"SET_ACTIVE_AD_ACCOUNT",payload:e})},[]),(0,s.useEffect)(()=>{(0,r.Nh)("psToolAdAccount",JSON.stringify(d))},[d]),{state:t,actions:c,receiveAdAccounts:(0,s.useCallback)(e=>{a({type:"LOAD_AD_ACCOUNTS",payload:{managedBusinesses:i(e)}})},[a])}}},897295:(e,t,a)=>{a.d(t,{Z:()=>o,f:()=>d});var s=a(667294),r=a(372085),i=a(340523),n=a(5859),u=a(238299);let l="ADVERTISER",c=(e,t)=>e&&e[t]&&e[t][0]&&e[t][0].preferences,d=async e=>{let t;try{let a=(await (0,r.Z)({method:"GET",url:`/ads/v4/preferences/${e}/`,data:{level:l,key:"CAMPAIGN_TOOL_PREFERENCE"}})).resource_response.data;t=c(a,l)}catch{return null}return t&&(0,u.TT)(t)?t:null},o=()=>{let[e,t]=(0,s.useState)(null),a=(0,i.F)(),{advertiser:r}=(0,n.B)();return(0,s.useEffect)(()=>{(0,u.UM)(a,{skipActivation:!0})&&(async()=>{r&&t(await d(r.id))})()},[r,a]),e}},520719:(e,t,a)=>{a.d(t,{$o:()=>n,GW:()=>s,Jo:()=>i,MS:()=>S,Q8:()=>A,VX:()=>p,Zo:()=>l,aD:()=>c,b2:()=>o,g2:()=>_,s4:()=>u,tK:()=>E,ym:()=>d,zQ:()=>m});let s="/business/hub/?show_vmp=true",r=["FR"],i=["US","GB","CA","AU","DE","FR"].concat(["ES","IT","AT","CH","NL","BR","MX"]).filter(e=>!r.includes(e)),n={APPROVED:"approved",PENDING:"pending",DISAPPROVED:"declined",APPEAL_PENDING:"appeal_pending"},u=Object.freeze({APPLIED:"APPLIED",ACCEPTED:"ACCEPTED",NON_COMPLIANT:"NON_COMPLIANT",SUSPENDED:"SUSPENDED",CANCELLED:"CANCELLED"}),l=Object.freeze({UNSTARTED:"workflow-status-unstarted",IN_PROGRESS:"workflow-status-in-progress",ACCEPTED:"check-circle",ATTENTION:"workflow-status-warning",REJECTED:"workflow-status-problem",RECOMMENDED:"info-circle"}),c=Object.freeze({UNSTARTED:"dark",IN_PROGRESS:"success",ACCEPTED:"success",ATTENTION:"warning",REJECTED:"error",RECOMMENDED:"subtle"}),d="Verified merchant program not yet available in this country",o=2e3,_={can_appeal:!0,is_appeal:!1,appeal_count:0,appeal_comment:"",shipping_policy_url:"",return_policy_url:"",review_status:2,review_reasons:[]},p=Object.freeze({ACCOUNT_AGE:"ACCOUNT_AGE",DOMAIN_AGE:"DOMAIN_AGE",PROFILE_IMAGE:"PROFILE_IMAGE",PROFILE_COVER_IMAGE:"PROFILE_COVER_IMAGE",BIO:"BIO",SHOP_TAB:"SHOP_TAB",PINNER_FEEDBACK:"PINNER_FEEDBACK"}),m=[p.ACCOUNT_AGE,p.DOMAIN_AGE,p.PROFILE_IMAGE,p.PROFILE_COVER_IMAGE,p.BIO,p.SHOP_TAB,p.PINNER_FEEDBACK],A=Object.freeze({PASS:"PASS",FAIL:"FAIL"}),E=30,S=.5}}]);
//# sourceMappingURL=https://sm.pinimg.com/webapp/37571-e2bce14ddbb626c6.mjs.map