"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[6575],{922719:(e,t,n)=>{n.d(t,{CC:()=>a,Ll:()=>s,XF:()=>r});let i=(e,t,n)=>({x:Math.floor(e*Math.cos(n)),y:Math.floor(t*Math.sin(n))}),a=(e,t)=>i(t/2,e/2,2*Math.random()*Math.PI),r=(e,t)=>Math.floor(Math.random()*(t-e+1))+e,s=e=>["@-webkit-keyframes","@keyframes"].map(t=>e.map(e=>t+" "+e).join("\n")).join("\n")},775089:(e,t,n)=>{n.r(t),n.d(t,{default:()=>C});var i=n(667294),a=n(883119),r=n(214877),s=n(103322);function o(e,t,n){var i;return(t="symbol"==typeof(i=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!=typeof i)return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?i:String(i))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}let l={};function u(e){let t=l[e];return t&&t.screenWidth===window.innerWidth||(l[e]={screenWidth:window.innerWidth}),l[e]}let m=e=>{let t=e.__id||e.id;return"string"==typeof t&&t||null};class p{constructor(){o(this,"idMap",new Map),o(this,"objMap",new WeakMap)}get(e){let t=m(e);return this.objMap.get(e)??(t?this.idMap.get(t):void 0)}has(e){let t=m(e);return this.objMap.has(e)??(!!t&&this.idMap.has(t))}set(e,t){let n=m(e);n&&this.idMap.set(n,t),this.objMap.set(e,t)}reset(){this.idMap=new Map,this.objMap=new WeakMap}}var d=n(547643),c=n(667677),h=n(213377),f=n(406893),y=n(340523),b=n(5859),_=n(554786),g=n(953565),x=n(84768),w=n(785893);function v({analyticsData:e,children:t,idx:n,isMeasuring:a,masonryV2ExpName:r,masonryV2ExpGroup:o}){let l=(0,_.ZP)(),{isAuthenticated:u}=(0,b.B)(),m=(0,x.MM)();return(0,i.useEffect)(()=>{if(e.current[n]){let{fetchTimestamp:t,measureTimestamp:i,hasRendered:s,pageCount:p}=e.current[n]??{},d={deviceType:l,experimentName:r,experimentGroup:o,handlerId:m,isAuthenticated:u,pageCount:p};a&&!i&&(e.current[n].measureTimestamp=Date.now(),(0,g.LY)("webapp.masonry.itemMeasureStart",Date.now()-t,{tags:d})),a||s||((0,g.LY)("webapp.masonry.itemRenderStart",Date.now()-i,{tags:d}),e.current[n].hasRendered=!0)}},[a]),(0,w.jsx)(s.Z,{name:"MasonryItem",children:t})}function C(e){let{align:t,cacheKey:n,id:o,isGridCentered:l=!0,items:m,layout:C,loadItems:M,masonryRef:$,renderItem:S,scrollContainerRef:j,virtualize:E=!0,_getColumnSpanConfig:k,_dynamicHeights:R,useLoadingState:I}=e,W=(0,_.ZP)(),{isAuthenticated:A,isRTL:D}=(0,b.B)(),{logContextEvent:L}=(0,r.v)(),N=(0,y.F)(),Z="desktop"===W,F=(0,x.MM)(),T=(0,i.useRef)(m.map(()=>({fetchTimestamp:Date.now(),measureTimestamp:Date.now(),hasRendered:!1,pageCount:0}))),{_loadingStateItems:O,_renderLoadingStateItems:P}=(0,c.Z)({useLoadingState:I}),B=e.columnWidth??h.yF,z=e.gutterWidth??(Z?h.oX:1),V=e.minCols??h.yc,G=e.serverRender??!!Z,H="flexible"===C||"desktop"!==W,X=G?"serverRenderedFlexible":"flexible",Y=(0,i.useRef)(0),K=B+z,Q=function(e){if(null==e)return;let t=u(e);return t.positionCache||(t.positionCache=new p),t.positionCache}(n),U=function(e){if(null==e)return;let t=u(e);return t.measurementCache||(t.measurementCache=new p),t.measurementCache}(n),q=(0,i.useCallback)(()=>j?.current||window,[j]),J=(0,i.useRef)(!0),{anyEnabled:ee}=N.checkExperiment("web_masonry_ssr_container_query"),et=l&&J.current?"gridCentered":"",{className:en,styles:ei}=function(e){let t=`m_${Object.keys(e).reduce((t,n)=>{let i=e[n];return null==i||"object"==typeof i||"function"==typeof i?t:"boolean"==typeof i?t+(i?"t":"f"):t+i},"").replace(/\:/g,"\\:")}`,{flexible:n,gutterWidth:i,isRTL:a,itemWidth:r,maxColumns:s,minColumns:o,items:l,_getColumnSpanConfig:u}=e,m=u?l.map((e,t)=>({index:t,columnSpanConfig:u(e)??1})).filter(e=>1!==e.columnSpanConfig):[],p=r+i,d=Array.from({length:s+1-o},(e,t)=>t+o).map(e=>{let l=e===o?0:e*p,u=e===s?null:(e+1)*p-1,{styles:d,numberOfVisibleItems:c}=m.reduce((a,s)=>{let{columnSpanConfig:o}=s,l=Math.min(function({columnCount:e,columnSpanConfig:t}){return"number"==typeof t?t:t[e<=2?"sm":e<=4?"md":e<=8?"lg":"xl"]??1}({columnCount:e,columnSpanConfig:o}),e),u=null!=s.index&&a.numberOfVisibleItems>=l+s.index,m=n?100/e*l:r*l+i*(l-1),{numberOfVisibleItems:p}=a;return u?p-=l-1:s.index<p&&(p+=1),{styles:a.styles.concat(function({className:e,index:t,columnSpanConfig:n,visible:i,width:a,flexible:r}){let s="number"==typeof n?n:btoa(JSON.stringify(n));return r?`
      .${e} .static[data-column-span="${s}"]:nth-child(${t+1}) {
        visibility: ${i?"visible":"hidden"} !important;
        position: ${i?"inherit":"absolute"} !important;
        width: ${a}% !important;
      }`:`
      .${e} .static[data-column-span="${s}"]:nth-child(${t+1}) {
        visibility: ${i?"visible":"hidden"} !important;
        position: ${i?"inherit":"absolute"} !important;
        width: ${a}px !important;
      }`}({className:t,index:s.index,columnSpanConfig:o,visible:u,width:m,flexible:n})),numberOfVisibleItems:p}},{styles:"",numberOfVisibleItems:e}),h=n?`
      .${t} .static {
        box-sizing: border-box;
        width: calc(100% / ${e}) !important;
      }
    `:`
      .${t} {
        max-width: ${e*p}px;
      }

      .${t} .static {
        width: ${r}px !important;
      }
    `;return{minWidth:l,maxWidth:u,styles:`
      .${t} .static:nth-child(-n+${c}) {
        position: static !important;
        visibility: visible !important;
        float: ${a?"right":"left"};
        display: block;
      }

      .${t} .static {
        padding: 0 ${i/2}px;
      }

      ${h}

      ${d}
    `}}),c=d.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @container (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),h=d.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @media (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),f=e.enableContainerQuery?`
    ${c.join("")}
    @supports not (container-type: inline-size) {
      ${h.join("")}
    }
  `:h.join("");return{className:t,styles:`
    .masonryContainer {
      container-type: inline-size;
    }

    .gridCentered {
      margin-left: auto;
      margin-right: auto;
    }

    .${t} .static {
      position: absolute !important;
      visibility: hidden !important;
    }

    ${f}
  `}}({gutterWidth:z,flexible:H,items:m,isRTL:D,itemWidth:B,maxColumns:e.maxColumns??Math.max(m.length,h.g5),minColumns:V,enableContainerQuery:ee,_getColumnSpanConfig:k}),ea=`${et} ${en}`.trim(),{anyEnabled:er,expName:es,group:eo,isMeasureAllEnabled:el}=(0,d.Z)(),eu=(0,i.useMemo)(()=>!U||m.every(e=>!U.has(e)),[]),em=eo&&eu,ep=(0,i.useRef)(),ed=(0,i.useRef)(m.length),ec=(0,i.useRef)(0);(0,i.useEffect)(()=>{em&&m.forEach((e,t)=>{T.current[t]||(T.current[t]={fetchTimestamp:Date.now(),measureTimestamp:0,hasRendered:!1,pageCount:ec.current})}),ed.current=m.length,ec.current+=1},[m]),(0,i.useEffect)(()=>{J.current&&(J.current=!1)},[]),(0,i.useEffect)(()=>{let e=()=>Y.current+=1;return em&&(ep.current=Date.now(),window.addEventListener("scroll",e)),()=>{if(em){let t=T.current;window.removeEventListener("scroll",e);let n=t.filter(e=>!!e.measureTimestamp).length,i=t.filter(e=>e.hasRendered).length,a=ed.current,r={deviceType:W,experimentName:es,experimentGroup:eo,handlerId:F,isAuthenticated:A};(0,g.LY)("webapp.masonry.timeSpent",ep.current?Date.now()-ep.current:0,{tags:r}),(0,g.S0)("webapp.masonry.itemsFetched",a,{tags:r}),(0,g.S0)("webapp.masonry.itemsMeasured",n,{tags:r}),(0,g.S0)("webapp.masonry.itemsMeasuredPercentage",Math.floor(n/a*100),{tags:r}),(0,g.S0)("webapp.masonry.itemsRendered",i,{tags:r}),(0,g.S0)("webapp.masonry.itemsRenderedPercentage",Math.floor(i/a*100),{tags:r}),(0,g.S0)("webapp.masonry.scrollCount",Y.current,{tags:r})}}},[]);let eh=(0,i.useCallback)(e=>em?(0,w.jsx)(v,{analyticsData:T,idx:e.itemIdx,isMeasuring:e.isMeasuring,masonryV2ExpGroup:eo,masonryV2ExpName:es,children:(0,w.jsx)(s.Z,{name:"MasonryItem",children:S(e)})}):(0,w.jsx)(s.Z,{name:"MasonryItem",children:S(e)}),[S]);return(0,w.jsx)("div",{className:"masonryContainer","data-test-id":"masonry-container",id:o,children:(0,w.jsxs)("div",{className:ea,children:[G&&J.current?(0,w.jsx)(f.Z,{"data-test-id":"masonry-ssr-styles",unsafeCSS:ei}):null,(0,w.jsx)(a.xu,{"data-test-id":"max-width-container",marginBottom:0,marginEnd:"auto",marginStart:"auto",marginTop:0,maxWidth:e.maxColumns?K*e.maxColumns:void 0,children:er?(0,w.jsx)(a.GX,{ref:e=>{$&&($.current=e)},_dynamicHeights:R,_getColumnSpanConfig:k,_logTwoColWhitespace:e=>{(0,g.S0)("webapp.masonry.twoColWhitespace",e,{sampleRate:1,tags:{columnWidth:B,minCols:V}}),L({event_type:14705,component:14468,aux_data:{whitespace_px:e}})},_measureAll:el,align:t,columnWidth:B,gutterWidth:z,items:m,layout:H?X:C??"basic",loadItems:M,measurementStore:U,minCols:V,positionStore:Q,renderItem:eh,scrollContainer:q,virtualBufferFactor:.3,virtualize:E}):(0,w.jsx)(a.Rk,{ref:e=>{$&&($.current=e)},_dynamicHeights:R,_getColumnSpanConfig:k,_loadingStateItems:O,_logTwoColWhitespace:e=>{(0,g.S0)("webapp.masonry.twoColWhitespace",e,{sampleRate:1,tags:{columnWidth:B,minCols:V}}),L({event_type:14705,component:14468,aux_data:{whitespace_px:e}})},_renderLoadingStateItems:P,align:t,columnWidth:B,gutterWidth:z,items:m,layout:H?X:C??"basic",loadItems:M,measurementStore:U,minCols:V,positionStore:Q,renderItem:eh,scrollContainer:q,virtualBufferFactor:.3,virtualize:E})})]})})}},547643:(e,t,n)=>{n.d(t,{Z:()=>s});var i=n(340523),a=n(5859),r=n(84768);function s(e){let{isAuthenticated:t}=(0,a.B)(),{expName:n,anyEnabled:s,group:o}=function({experimentsClient:e,handlerId:t,isAuthenticated:n,skipActivation:i}){let{checkExperiment:a}=e,r=a(n?"web_masonry_v2_auth":"web_masonry_v2_unauth",{dangerouslySkipActivation:i});return r.group?{expName:n?"web_masonry_v2_auth":"web_masonry_v2_unauth",...r}:"www/[username]/[slug].js"!==t||n?"www/pin/[id].js"!==t||n?{expName:"",anyEnabled:!1,group:""}:{expName:"web_masonry_v2_unauth_pin",...a("web_masonry_v2_unauth_pin",{dangerouslySkipActivation:i})}:{expName:"web_masonry_v2_unauth_board",...a("web_masonry_v2_unauth_board",{dangerouslySkipActivation:i})}}({experimentsClient:(0,i.F)(),handlerId:(0,r.MM)(),isAuthenticated:t,skipActivation:e?.skipActivation??!1});return{expName:n,anyEnabled:s,group:o,isMeasureAllEnabled:"enabled_measure_all"===o||"enabled_measure_all_impression_fix"===o,isImpressionFixEnabled:"control_impression_fix"===o||"enabled_impression_fix"===o||"enabled_measure_all_impression_fix"===o}}},667677:(e,t,n)=>{n.d(t,{Z:()=>d});var i=n(667294),a=n(883119),r=n(876594),s=n(922719),o=n(406893),l=n(785893);let u=`pulsing {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}`,m={backgroundColor:r._VP,animation:"pulsing 2s ease-out 0.5s infinite",borderRadius:r.Ev2};function p({data:e}){let{height:t}=e;return(0,l.jsxs)(i.Fragment,{children:[(0,l.jsx)(o.Z,{unsafeCSS:(0,s.Ll)([u])}),(0,l.jsx)(a.xu,{dangerouslySetInlineStyle:{__style:m},"data-test-id":"skeleton-pin",children:(0,l.jsx)(a.xu,{height:t})})]})}function d({useLoadingState:e,numOfPins:t=50}){let n=(0,i.useMemo)(()=>Array.from({length:t}).reduce((e,t,n)=>[...e,{height:n%2==0?356:236}],[]),[t]);return{_loadingStateItems:e?n:void 0,_renderLoadingStateItems:e?({data:e})=>(0,l.jsx)(p,{data:e}):void 0}}}}]);
//# sourceMappingURL=https://sm.pinimg.com/webapp/6575-c8cd47bf958a8a67.mjs.map