import{r,d as W,u as de,j as e,L as U,O as ue}from"./index-BjWOWftK.js";import{c as ge}from"./index-CtBWz5l5.js";import{l as me}from"./logo-branca-2-CShCdij0.js";import{t as he,g as pe,C as X,o as fe,_ as xe,c as Q,s as Se,a as ye,d as H,f as je,b as Ce,e as ve,T as ee,h as be,i as Oe,j as Y,u as we}from"./useSize-xGuuOV2H.js";import{c as te,g as oe,A as E,_ as D}from"./AntdIcon-CQBeZWiu.js";import{S as ne,L as ke,M as ze}from"./index-z7srBD_T.js";import{D as Be}from"./DashboardOutlined-CSZzWif5.js";import{T as Ne}from"./TeamOutlined-C9q0dSyj.js";import{C as Me}from"./CalculatorOutlined-BRmnjQM5.js";import{S as Te}from"./ScheduleOutlined-CgGv-3W3.js";import{H as $e}from"./HistoryOutlined-CuDR3ApQ.js";import{B as Le}from"./BarChartOutlined-Commmbr_.js";import{a as se}from"./api-yj2qoLPl.js";import{M as _}from"./index-DZhypcJC.js";import{S as F}from"./index-CrIh86xN.js";import{I as V}from"./index-Dtquuxsa.js";import{T as _e}from"./index-xwEKfmQR.js";import{U as Ie}from"./index-BGYDhtWV.js";import{B as R}from"./context-CsxF_MV5.js";import{U as Ae}from"./UploadOutlined-CfKVTpOI.js";import{m as P}from"./index-voIPXOLj.js";import{R as Re}from"./index-SZJkRHiF.js";import{D as Pe}from"./index-BAfzoE8U.js";import"./cjs-BuFYNCHu.js";import"./index-DREpUMdt.js";import"./index-Chjiymov.js";import"./Serializer-CQbcCsmu.js";import"./EllipsisOutlined-CWuHYn8k.js";import"./Overflow-vieoZhrC.js";import"./index-10_tvuH-.js";import"./KeyCode-iNboPXT1.js";import"./render-Dc9fgLFB.js";import"./ExclamationCircleFilled-BXHKs-a4.js";import"./InfoCircleFilled-CN7YLSSN.js";import"./PurePanel-vSTbxOUV.js";import"./useLocale-B5fEOMjY.js";import"./SearchOutlined-DC5n_389.js";import"./CheckOutlined-BorBS3ox.js";import"./useForceUpdate-DA-qGIrz.js";import"./useNotification-C_uzqUJr.js";function He(o,t,n){return typeof n=="boolean"?n:o.length?!0:he(t).some(a=>a.type===ne)}const Ee=o=>{const{componentCls:t,bodyBg:n,lightSiderBg:s,lightTriggerBg:a,lightTriggerColor:l}=o;return{[`${t}-sider-light`]:{background:s,[`${t}-sider-trigger`]:{color:l,background:a},[`${t}-sider-zero-width-trigger`]:{color:l,background:a,border:`1px solid ${n}`,borderInlineStart:0}}}},De=o=>{const{antCls:t,componentCls:n,colorText:s,triggerColor:a,footerBg:l,triggerBg:c,headerHeight:d,headerPadding:g,headerColor:p,footerPadding:f,triggerHeight:m,zeroTriggerHeight:C,zeroTriggerWidth:y,motionDurationMid:v,motionDurationSlow:u,fontSize:j,borderRadius:i,bodyBg:x,headerBg:S,siderBg:h}=o;return{[n]:Object.assign(Object.assign({display:"flex",flex:"auto",flexDirection:"column",minHeight:0,background:x,"&, *":{boxSizing:"border-box"},[`&${n}-has-sider`]:{flexDirection:"row",[`> ${n}, > ${n}-content`]:{width:0}},[`${n}-header, &${n}-footer`]:{flex:"0 0 auto"},[`${n}-sider`]:{position:"relative",minWidth:0,background:h,transition:`all ${v}, background 0s`,"&-children":{height:"100%",marginTop:-.1,paddingTop:.1,[`${t}-menu${t}-menu-inline-collapsed`]:{width:"auto"}},"&-has-trigger":{paddingBottom:m},"&-right":{order:1},"&-trigger":{position:"fixed",bottom:0,zIndex:1,height:m,color:a,lineHeight:`${m}px`,textAlign:"center",background:c,cursor:"pointer",transition:`all ${v}`},"&-zero-width":{"> *":{overflow:"hidden"},"&-trigger":{position:"absolute",top:d,insetInlineEnd:-y,zIndex:1,width:y,height:C,color:a,fontSize:o.fontSizeXL,display:"flex",alignItems:"center",justifyContent:"center",background:h,borderStartStartRadius:0,borderStartEndRadius:i,borderEndEndRadius:i,borderEndStartRadius:0,cursor:"pointer",transition:`background ${u} ease`,"&::after":{position:"absolute",inset:0,background:"transparent",transition:`all ${u}`,content:'""'},"&:hover::after":{background:"rgba(255, 255, 255, 0.2)"},"&-right":{insetInlineStart:-y,borderStartStartRadius:i,borderStartEndRadius:0,borderEndEndRadius:0,borderEndStartRadius:i}}}}},Ee(o)),{"&-rtl":{direction:"rtl"}}),[`${n}-header`]:{height:d,padding:g,color:p,lineHeight:`${d}px`,background:S,[`${t}-menu`]:{lineHeight:"inherit"}},[`${n}-footer`]:{padding:f,color:s,fontSize:j,background:l},[`${n}-content`]:{flex:"auto",minHeight:0}}},ae=pe("Layout",o=>[De(o)],o=>{const{colorBgLayout:t,controlHeight:n,controlHeightLG:s,colorText:a,controlHeightSM:l,marginXXS:c,colorTextLightSolid:d,colorBgContainer:g}=o,p=s*1.25;return{colorBgHeader:"#001529",colorBgBody:t,colorBgTrigger:"#002140",bodyBg:t,headerBg:"#001529",headerHeight:n*2,headerPadding:`0 ${p}px`,headerColor:a,footerPadding:`${l}px ${p}px`,footerBg:t,siderBg:"#001529",triggerHeight:s+c*2,triggerBg:"#002140",triggerColor:d,zeroTriggerWidth:s,zeroTriggerHeight:s,lightSiderBg:g,lightTriggerBg:g,lightTriggerColor:a}},{deprecatedTokens:[["colorBgBody","bodyBg"],["colorBgHeader","headerBg"],["colorBgTrigger","triggerBg"]]});var re=function(o,t){var n={};for(var s in o)Object.prototype.hasOwnProperty.call(o,s)&&t.indexOf(s)<0&&(n[s]=o[s]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,s=Object.getOwnPropertySymbols(o);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(o,s[a])&&(n[s[a]]=o[s[a]]);return n};function q(o){let{suffixCls:t,tagName:n,displayName:s}=o;return a=>r.forwardRef((c,d)=>r.createElement(a,Object.assign({ref:d,suffixCls:t,tagName:n},c)))}const J=r.forwardRef((o,t)=>{const{prefixCls:n,suffixCls:s,className:a,tagName:l}=o,c=re(o,["prefixCls","suffixCls","className","tagName"]),{getPrefixCls:d}=r.useContext(X),g=d("layout",n),[p,f]=ae(g),m=s?`${g}-${s}`:g;return p(r.createElement(l,Object.assign({className:te(n||m,a,f),ref:t},c)))}),Fe=r.forwardRef((o,t)=>{const{direction:n}=r.useContext(X),[s,a]=r.useState([]),{prefixCls:l,className:c,rootClassName:d,children:g,hasSider:p,tagName:f,style:m}=o,C=re(o,["prefixCls","className","rootClassName","children","hasSider","tagName","style"]),y=fe(C,["suffixCls"]),{getPrefixCls:v,layout:u}=r.useContext(X),j=v("layout",l),i=He(s,g,p),[x,S]=ae(j),h=te(j,{[`${j}-has-sider`]:i,[`${j}-rtl`]:n==="rtl"},u==null?void 0:u.className,c,d,S),k=r.useMemo(()=>({siderHook:{addSider:M=>{a($=>[].concat(xe($),[M]))},removeSider:M=>{a($=>$.filter(z=>z!==M))}}}),[]);return x(r.createElement(ke.Provider,{value:k},r.createElement(f,Object.assign({ref:t,className:h,style:Object.assign(Object.assign({},u==null?void 0:u.style),m)},y),g)))}),qe=q({tagName:"div",displayName:"Layout"})(Fe),Ue=q({suffixCls:"header",tagName:"header",displayName:"Header"})(J),Xe=q({suffixCls:"footer",tagName:"footer",displayName:"Footer"})(J),Ve=q({suffixCls:"content",tagName:"main",displayName:"Content"})(J),Ge=qe,I=Ge;I.Header=Ue;I.Footer=Xe;I.Content=Ve;I.Sider=ne;const G=I,We=o=>{const t=o!=null&&o.algorithm?Q(o.algorithm):Q(H),n=Object.assign(Object.assign({},Se),o==null?void 0:o.token);return ye(n,{override:o==null?void 0:o.token},t,je)},Je=We;function Qe(o){const{sizeUnit:t,sizeStep:n}=o,s=n-2;return{sizeXXL:t*(s+10),sizeXL:t*(s+6),sizeLG:t*(s+2),sizeMD:t*(s+2),sizeMS:t*(s+1),size:t*s,sizeSM:t*s,sizeXS:t*(s-1),sizeXXS:t*(s-1)}}const Ye=(o,t)=>{const n=t??H(o),s=n.fontSizeSM,a=n.controlHeight-4;return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},n),Qe(t??o)),Ce(s)),{controlHeight:a}),ve(Object.assign(Object.assign({},n),{controlHeight:a})))},Ze=Ye,w=(o,t)=>new ee(o).setAlpha(t).toRgbString(),T=(o,t)=>new ee(o).lighten(t).toHexString(),Ke=o=>{const t=oe(o,{theme:"dark"});return{1:t[0],2:t[1],3:t[2],4:t[3],5:t[6],6:t[5],7:t[4],8:t[6],9:t[5],10:t[4]}},et=(o,t)=>{const n=o||"#000",s=t||"#fff";return{colorBgBase:n,colorTextBase:s,colorText:w(s,.85),colorTextSecondary:w(s,.65),colorTextTertiary:w(s,.45),colorTextQuaternary:w(s,.25),colorFill:w(s,.18),colorFillSecondary:w(s,.12),colorFillTertiary:w(s,.08),colorFillQuaternary:w(s,.04),colorBgElevated:T(n,12),colorBgContainer:T(n,8),colorBgLayout:T(n,0),colorBgSpotlight:T(n,26),colorBgBlur:w(s,.04),colorBorder:T(n,26),colorBorderSecondary:T(n,19)}},tt=(o,t)=>{const n=Object.keys(be).map(a=>{const l=oe(o[a],{theme:"dark"});return new Array(10).fill(1).reduce((c,d,g)=>(c[`${a}-${g+1}`]=l[g],c[`${a}${g+1}`]=l[g],c),{})}).reduce((a,l)=>(a=Object.assign(Object.assign({},a),l),a),{}),s=t??H(o);return Object.assign(Object.assign(Object.assign({},s),n),Oe(o,{generateColorPalettes:Ke,generateNeutralColorPalettes:et}))},ot=tt;function nt(){const[o,t,n]=we();return{theme:o,token:t,hashId:n}}const st={defaultConfig:Y,defaultSeed:Y.token,useToken:nt,defaultAlgorithm:H,darkAlgorithm:ot,compactAlgorithm:Ze,getDesignToken:Je};var at={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-10.6 267c-14.3 19.9-28.7 35.6-41.9 45.7-10.5 8-18.6 11.4-24 11.6-9-.1-17.7-2.3-34.7-8.8-1.2-.5-2.5-1-4.2-1.6l-4.4-1.7c-17.4-6.7-27.8-10.3-41.1-13.8-18.6-4.8-37.1-7.4-56.9-7.4-20.2 0-39.2 2.5-58.1 7.2-13.9 3.5-25.6 7.4-42.7 13.8-.7.3-8.1 3.1-10.2 3.9-3.5 1.3-6.2 2.3-8.7 3.2-10.4 3.6-17 5.1-22.9 5.2-.7 0-1.3-.1-1.8-.2-1.1-.2-2.5-.6-4.1-1.3-4.5-1.8-9.9-5.1-16-9.8-14-10.9-29.4-28-45.1-49.9-27.5-38.6-53.5-89.8-66-125.7-15.4-44.8-23-87.7-23-128.6 0-60.2 17.8-106 48.4-137.1 26.3-26.6 61.7-41.5 97.8-42.3 5.9.1 14.5 1.5 25.4 4.5 8.6 2.3 18 5.4 30.7 9.9 3.8 1.4 16.9 6.1 18.5 6.7 7.7 2.8 13.5 4.8 19.2 6.6 18.2 5.8 32.3 9 47.6 9 15.5 0 28.8-3.3 47.7-9.8 7.1-2.4 32.9-12 37.5-13.6 25.6-9.1 44.5-14 60.8-15.2 4.8-.4 9.1-.4 13.2-.1 22.7 1.8 42.1 6.3 58.6 13.8-37.6 43.4-57 96.5-56.9 158.4-.3 14.7.9 31.7 5.1 51.8 6.4 30.5 18.6 60.7 37.9 89 14.7 21.5 32.9 40.9 54.7 57.8-11.5 23.7-25.6 48.2-40.4 68.8zm-94.5-572c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"}}]},name:"apple",theme:"outlined"};const rt=at;var it=function(t,n){return r.createElement(E,D({},t,{ref:n,icon:rt}))};const lt=r.forwardRef(it);var ct={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z"}}]},name:"logout",theme:"outlined"};const dt=ct;var ut=function(t,n){return r.createElement(E,D({},t,{ref:n,icon:dt}))};const gt=r.forwardRef(ut);var mt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M864 518H506V160c0-4.4-3.6-8-8-8h-26a398.46 398.46 0 00-282.8 117.1 398.19 398.19 0 00-85.7 127.1A397.61 397.61 0 0072 552a398.46 398.46 0 00117.1 282.8c36.7 36.7 79.5 65.6 127.1 85.7A397.61 397.61 0 00472 952a398.46 398.46 0 00282.8-117.1c36.7-36.7 65.6-79.5 85.7-127.1A397.61 397.61 0 00872 552v-26c0-4.4-3.6-8-8-8zM705.7 787.8A331.59 331.59 0 01470.4 884c-88.1-.4-170.9-34.9-233.2-97.2C174.5 724.1 140 640.7 140 552c0-88.7 34.5-172.1 97.2-234.8 54.6-54.6 124.9-87.9 200.8-95.5V586h364.3c-7.7 76.3-41.3 147-96.6 201.8zM952 462.4l-2.6-28.2c-8.5-92.1-49.4-179-115.2-244.6A399.4 399.4 0 00589 74.6L560.7 72c-4.7-.4-8.7 3.2-8.7 7.9V464c0 4.4 3.6 8 8 8l384-1c4.7 0 8.4-4 8-8.6zm-332.2-58.2V147.6a332.24 332.24 0 01166.4 89.8c45.7 45.6 77 103.6 90 166.1l-256.4.7z"}}]},name:"pie-chart",theme:"outlined"};const ht=mt;var pt=function(t,n){return r.createElement(E,D({},t,{ref:n,icon:ht}))};const ft=r.forwardRef(pt);var xt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z"}}]},name:"setting",theme:"outlined"};const St=xt;var yt=function(t,n){return r.createElement(E,D({},t,{ref:n,icon:St}))};const Z=r.forwardRef(yt),jt="_footer_7kxfq_2",Ct="_footer__topicos_7kxfq_8",vt="_footer__dev_7kxfq_34",bt="_content_7kxfq_45",Ot="_link_7kxfq_50",b={footer:jt,footer__topicos:Ct,footer__dev:vt,content:bt,link:Ot},wt="/assets/logo-letra-branca-XBLSv_6k.png",{Header:kt,Sider:zt}=G;function O(o,t,n,s,a){return{key:t,icon:n,children:s,label:a?e.jsx(U,{to:a,children:o}):o}}const Bt=()=>{const[o,t]=r.useState(window.innerWidth<768),{authData:n,logout:s}=W(),a=n.userSpecialties||[],[l,c]=r.useState(!1),[d,g]=r.useState([{target:".custom-menu .ant-menu-item:nth-child(6)",content:"Clique aqui para acessar as configurações do sistema."}]);r.useEffect(()=>{localStorage.getItem("tutorialShown")||(c(!0),localStorage.setItem("tutorialShown","true"))},[]),r.useEffect(()=>{const h=()=>{const k=window.innerWidth<768;t(k),k&&m(!0)};return window.addEventListener("resize",h),()=>window.removeEventListener("resize",h)},[]);const p=()=>{o||m(!f)},[f,m]=r.useState(o),C=de(),{token:{colorBgContainer:y}}=st.useToken(),v=!!sessionStorage.getItem("authToken");if(!v)return null;const u=()=>{s(),C("/login")},j=h=>{h.key==="logout"&&u()},i=22,x=[O("Agendamentos","1",e.jsx(Te,{style:{fontSize:i}}),null,"/calendario"),O("DashBoards","2",e.jsx(Be,{style:{fontSize:i}}),null,"/painel"),O("NpsSystem","3",e.jsx(ft,{style:{fontSize:i}}),null,"/nps-system"),!o&&O("Histórico","4",e.jsx($e,{style:{fontSize:i}}),null,"/allagendamentos"),O("Clientes","5",e.jsx(Ne,{style:{fontSize:i}}),null,"/clientes"),O("Configurações","6",e.jsx(Z,{style:{fontSize:i}}),null,"/configs"),!o&&O("Estoque","7",e.jsx(Le,{style:{fontSize:i}}),null,"/estoque"),O("Contabilidade","8",e.jsx(Me,{style:{fontSize:i}}),null,"/contabilidade"),(a==null?void 0:a.includes(5))&&O("Plano Alimentar","9",e.jsx(lt,{style:{fontSize:i}}),null,"/plano_alimentar"),v&&O("Sair do Sistema","logout",e.jsx(gt,{style:{fontSize:i}}),null,null),n.companyID===1&&O("Administrador","11",e.jsx(Z,{style:{fontSize:i}}),null,"/adminpanel")].filter(Boolean);if(!v)return null;const S={next:"Proceed",last:"Blz 😃",skip:"Not Now",close:"Close"};return e.jsxs(G,{style:{minHeight:"100vh"},children:[e.jsxs(zt,{collapsible:!o,collapsed:f,onCollapse:m,className:"sidebar",children:[e.jsx("div",{className:"demo-logo-vertical",children:e.jsx("img",{src:f?wt:me,alt:"logo do sistema marquei",className:f?"collapsed":""})}),e.jsx(ze,{theme:"dark",defaultSelectedKeys:["1"],mode:"inline",items:x,onClick:j,className:"custom-menu"}),!o&&e.jsx("div",{onClick:p})]}),e.jsx(G,{children:e.jsx(kt,{style:{padding:0,background:y}})}),e.jsx(ge,{run:l,steps:d,continuous:!0,showSkipButton:!0,locale:S,styles:{options:{zIndex:1e4}}})]})},Nt=Bt,{Option:K}=F,ie=({isVisible:o,onClose:t})=>{const[n,s]=r.useState(null),[a,l]=r.useState(""),[c,d]=r.useState(null),{authData:g}=W(),p=g.companyID,[f,m]=r.useState(null),[C,y]=r.useState(null);r.useEffect(()=>{o&&(s(null),l(""),m(null),y(null))},[o]);function v(i,x,S,h,k){const M=new FileReader;M.onload=$=>{const z=new Image;z.onload=()=>{const A=document.createElement("canvas");let B=z.width,N=z.height;B>N?B>x&&(N*=x/B,B=x):N>S&&(B*=S/N,N=S),A.width=B,A.height=N,A.getContext("2d").drawImage(z,0,0,B,N),A.toBlob(le=>{const ce=new File([le],i.name,{type:i.type,lastModified:Date.now()});k(ce)},i.type,h)},z.src=$.target.result},M.readAsDataURL(i)}const u=async()=>{var x,S;const i=new FormData;i.append("type",n),i.append("description",a),i.append("companyId",p),C&&i.append("image",C);try{const k=(await se.post("/chamados",i,{headers:{"Content-Type":"multipart/form-data"}})).data;d(k.ticket_number),s(null),l(""),t()}catch(h){P.error(((S=(x=h.response)==null?void 0:x.data)==null?void 0:S.message)||"Preencha todos os campos!")}},j=i=>{if(i.fileList.length===0){y(null);return}const x=i.fileList[0].originFileObj;if(!["image/png","image/jpeg","image/jpg"].includes(x.type)){P.error("Por favor, selecione um arquivo PNG, JPG ou JPEG.");return}v(x,1e3,1e3,1,S=>{const h=URL.createObjectURL(S);m(h),y(S)})};return e.jsxs(e.Fragment,{children:[e.jsxs(_,{title:"Criar Chamado 😅",open:o,onCancel:()=>{s(null),l(""),d(null),t()},footer:null,children:[e.jsxs(F,{placeholder:"Selecione uma opção",style:{width:"100%"},onChange:i=>s(i),value:n,children:[e.jsx(K,{value:"problem",children:"Relatar um problema!"}),e.jsx(K,{value:"suggestion",children:"Sugerir melhoria!"})]}),n&&e.jsxs(e.Fragment,{children:[e.jsx(V.TextArea,{rows:4,placeholder:"Descreva com detalhes",style:{marginTop:"16px"},value:a,onChange:i=>l(i.target.value)}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"5px"},children:[e.jsx("h3",{children:"Evidência"}),f&&e.jsx("img",{src:f,style:{width:"45px",marginBottom:"10px"},alt:"Logo da Empresa"}),e.jsx(_e,{title:"A imagem deve estar em PNG e ter até 500kb",children:e.jsx(Ie,{beforeUpload:()=>!1,onChange:j,fileList:C?[C]:[],children:e.jsx(R,{icon:e.jsx(Ae,{}),children:"Selecionar Logo"})})})]})]}),e.jsx(R,{style:{textAlign:"center",width:"100%",marginTop:"1rem"},type:"primary",onClick:u,children:"Abrir Chamado"})]}),c&&e.jsx(_,{title:"Chamado Criado",open:!!c,footer:null,onCancel:()=>d(null),children:e.jsxs("p",{children:["Chamado número ",c," criado com sucesso e será atendido em até 24 horas úteis."]})})]})},{Option:L}=F,Mt=({modalRecommendationisVisible:o,modalRecommendationisClose:t})=>{const[n,s]=r.useState(null),[a,l]=r.useState(""),[c,d]=r.useState(""),[g,p]=r.useState(!1),[f,m]=r.useState(!1),{authData:C}=W(),y=C.companyID,v=async()=>{var u,j;m(!0);try{const i=y;if(!n||!a.trim()||!c.trim()){P.error("Por favor, preencha todos os campos!"),m(!1);return}await se.post("/recommendations",{companyId:i,indicated:a,especialidade:n,telefone:c}),s(null),l(""),d(""),t(),p(!0)}catch(i){P.error(((j=(u=i.response)==null?void 0:u.data)==null?void 0:j.message)||"Ocorreu um erro ao enviar os dados!")}finally{m(!1)}};return e.jsxs(e.Fragment,{children:[e.jsxs(_,{title:"Indique um amigo(a) 🤝",open:o,onCancel:()=>{s(null),l(""),d(""),t()},footer:null,children:[e.jsxs(F,{placeholder:"Para quem você esta indicando",style:{width:"100%"},onChange:u=>s(u),value:n,children:[e.jsx(L,{value:"medico",children:"Médico"}),e.jsx(L,{value:"dentista",children:"Dentista"}),e.jsx(L,{value:"psicologo",children:"Psicólogo"}),e.jsx(L,{value:"fisioterapeuta",children:"Fisioterapeuta"}),e.jsx(L,{value:"nutricionista",children:"Nutricionista"})]}),n&&e.jsxs(e.Fragment,{children:[e.jsx(V,{placeholder:"Nome do Amigo",style:{marginTop:"16px"},value:a,onChange:u=>l(u.target.value)}),e.jsx(Re,{mask:"(99) 9 9999-9999",value:c,onChange:u=>d(u.target.value),children:u=>e.jsx(V,{...u,style:{marginTop:"16px"},placeholder:"Telefone do Amigo"})})]}),e.jsx(R,{loading:f,style:{textAlign:"center",width:"100%",marginTop:"1rem"},type:"primary",onClick:v,children:"Recomendar"})]}),e.jsx(_,{title:"Indicação Efetivada",open:g,onCancel:()=>p(!1),footer:null,children:e.jsx("p",{children:"Muito obrigado pela indicação, vamos entrar em contato com seu amigo(a) logo mais! Não se esqueça de reivindicar seu desconto especial por indicação!"})})]})},Tt=({freeMonthlyModalisVisible:o,freeMonthlyModalisClose:t})=>{const[n,s]=r.useState(!1),a=()=>{s(!0)};return e.jsxs(e.Fragment,{children:[e.jsxs(_,{title:"Mensalidade Grátis 💸",open:o,onCancel:()=>{t()},footer:null,children:[e.jsx(Pe,{}),e.jsx("h3",{children:"Indique um amigo e aguarde nosso contato, vamos analisar a contratação do seu amigo e então você pode receber um desconto total ou parcial no seu plano."}),e.jsx("p",{children:"Caso precise você pode abrir um chamado para acompanhar sua indicação."}),e.jsx(R,{style:{textAlign:"center",width:"100%",marginTop:"1rem"},type:"primary",onClick:a,children:"Abrir Chamado"})]}),e.jsx(ie,{isVisible:n,onClose:()=>s(!1)})]})};function vo(){return e.jsxs("div",{style:{display:"flex"},children:[e.jsx(Nt,{}),e.jsxs("div",{className:b.content,children:[e.jsx(ue,{}),e.jsx($t,{}),e.jsx(Lt,{})]})]})}function $t(){const[o,t]=r.useState(!1),[n,s]=r.useState(!1),[a,l]=r.useState(!1),c=()=>{t(!0)},d=()=>{s(!0)},g=()=>{l(!0)};return e.jsxs("div",{className:b.footer,children:[e.jsxs("div",{className:b.footer__topicos,children:[e.jsx("h3",{children:"Marquei"}),e.jsxs("div",{className:b.link,children:[e.jsx(U,{to:"/servicos/clinico",children:"Sobre"}),e.jsx("span",{onClick:c,style:{cursor:"pointer",textDecoration:"none"},children:"Sugira uma melhoria !"})]})]}),e.jsxs("div",{className:b.footer__topicos,children:[e.jsx("h3",{children:"Indique"}),e.jsxs("div",{className:b.link,children:[e.jsx("span",{onClick:d,className:b.link,children:"Indique a um amigo !"}),e.jsx("span",{onClick:g,className:b.link,children:"Mensalidade Grátis"})]})]}),e.jsxs("div",{className:b.footer__topicos,children:[e.jsx("h3",{children:"Suporte"}),e.jsxs("div",{className:b.link,children:[e.jsx(U,{to:"/ajuda",children:"Central de ajuda"}),e.jsx("span",{onClick:c,className:b.link,children:"Relate um problema"})]})]}),e.jsx(ie,{isVisible:o,onClose:()=>t(!1)}),e.jsx(Mt,{modalRecommendationisVisible:n,modalRecommendationisClose:()=>s(!1)}),e.jsx(Tt,{freeMonthlyModalisVisible:a,freeMonthlyModalisClose:()=>l(!1)})]})}function Lt(){return e.jsxs("div",{className:b.footer__dev,children:[e.jsx("p",{children:"Holanda Desenvolvimento de Software 50.509.731/0001-35"}),e.jsx("p",{children:"Copyright© Holanda Dev Software 2023. Todos os direitos reservados."})]})}export{vo as default};
