import{g as z,m as L,K as F,r as k,C as A,S as B,_ as U,N as K,aa as R}from"./useSize-xGuuOV2H.js";import{r}from"./index-BjWOWftK.js";import{C as W,L as X,d as Y}from"./render-Dc9fgLFB.js";import{C as Q,E as q}from"./ExclamationCircleFilled-BXHKs-a4.js";import{I as J}from"./InfoCircleFilled-CN7YLSSN.js";import{c as j}from"./AntdIcon-CQBeZWiu.js";import{N as V,u as Z,a as ee}from"./useNotification-C_uzqUJr.js";import{C as ne}from"./KeyCode-iNboPXT1.js";const te=n=>{const{componentCls:e,iconCls:s,boxShadow:t,colorText:o,colorSuccess:c,colorError:d,colorWarning:v,colorInfo:a,fontSizeLG:l,motionEaseInOutCirc:u,motionDurationSlow:i,marginXS:g,paddingXS:p,borderRadiusLG:y,zIndexPopup:f,contentPadding:b,contentBg:P}=n,h=`${e}-notice`,x=new F("MessageMoveIn",{"0%":{padding:0,transform:"translateY(-100%)",opacity:0},"100%":{padding:p,transform:"translateY(0)",opacity:1}}),N=new F("MessageMoveOut",{"0%":{maxHeight:n.height,padding:p,opacity:1},"100%":{maxHeight:0,padding:0,opacity:0}}),C={padding:p,textAlign:"center",[`${e}-custom-content > ${s}`]:{verticalAlign:"text-bottom",marginInlineEnd:g,fontSize:l},[`${h}-content`]:{display:"inline-block",padding:b,background:P,borderRadius:y,boxShadow:t,pointerEvents:"all"},[`${e}-success > ${s}`]:{color:c},[`${e}-error > ${s}`]:{color:d},[`${e}-warning > ${s}`]:{color:v},[`${e}-info > ${s},
      ${e}-loading > ${s}`]:{color:a}};return[{[e]:Object.assign(Object.assign({},k(n)),{color:o,position:"fixed",top:g,width:"100%",pointerEvents:"none",zIndex:f,[`${e}-move-up`]:{animationFillMode:"forwards"},[`
        ${e}-move-up-appear,
        ${e}-move-up-enter
      `]:{animationName:x,animationDuration:i,animationPlayState:"paused",animationTimingFunction:u},[`
        ${e}-move-up-appear${e}-move-up-appear-active,
        ${e}-move-up-enter${e}-move-up-enter-active
      `]:{animationPlayState:"running"},[`${e}-move-up-leave`]:{animationName:N,animationDuration:i,animationPlayState:"paused",animationTimingFunction:u},[`${e}-move-up-leave${e}-move-up-leave-active`]:{animationPlayState:"running"},"&-rtl":{direction:"rtl",span:{direction:"rtl"}}})},{[e]:{[`${h}-wrapper`]:Object.assign({},C)}},{[`${e}-notice-pure-panel`]:Object.assign(Object.assign({},C),{padding:0,textAlign:"start"})}]},T=z("Message",n=>{const e=L(n,{height:150});return[te(e)]},n=>({zIndexPopup:n.zIndexPopupBase+10,contentBg:n.colorBgElevated,contentPadding:`${(n.controlHeightLG-n.fontSize*n.lineHeight)/2}px ${n.paddingSM}px`}));var oe=function(n,e){var s={};for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&e.indexOf(t)<0&&(s[t]=n[t]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(n);o<t.length;o++)e.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(n,t[o])&&(s[t[o]]=n[t[o]]);return s};const se={info:r.createElement(J,null),success:r.createElement(Q,null),error:r.createElement(W,null),warning:r.createElement(q,null),loading:r.createElement(X,null)},D=n=>{let{prefixCls:e,type:s,icon:t,children:o}=n;return r.createElement("div",{className:j(`${e}-custom-content`,`${e}-${s}`)},t||se[s],r.createElement("span",null,o))},re=n=>{const{prefixCls:e,className:s,type:t,icon:o,content:c}=n,d=oe(n,["prefixCls","className","type","icon","content"]),{getPrefixCls:v}=r.useContext(A),a=e||v("message"),[,l]=T(a);return r.createElement(V,Object.assign({},d,{prefixCls:a,className:j(s,l,`${a}-notice-pure-panel`),eventKey:"pure",duration:null,content:r.createElement(D,{prefixCls:a,type:t,icon:o},c)}))},ae=re;function ie(n,e){return{motionName:e??`${n}-move-up`}}function S(n){let e;const s=new Promise(o=>{e=n(()=>{o(!0)})}),t=()=>{e==null||e()};return t.then=(o,c)=>s.then(o,c),t.promise=s,t}var le=function(n,e){var s={};for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&e.indexOf(t)<0&&(s[t]=n[t]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(n);o<t.length;o++)e.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(n,t[o])&&(s[t[o]]=n[t[o]]);return s};const ce=8,ue=3,de=n=>{let{children:e,prefixCls:s}=n;const[,t]=T(s);return r.createElement(ee,{classNames:{list:t,notice:t}},e)},pe=(n,e)=>{let{prefixCls:s,key:t}=e;return r.createElement(de,{prefixCls:s,key:t},n)},me=r.forwardRef((n,e)=>{const{top:s,prefixCls:t,getContainer:o,maxCount:c,duration:d=ue,rtl:v,transitionName:a,onAllRemoved:l}=n,{getPrefixCls:u,getPopupContainer:i,message:g}=r.useContext(A),p=t||u("message"),y=()=>({left:"50%",transform:"translateX(-50%)",top:s??ce}),f=()=>j({[`${p}-rtl`]:v}),b=()=>ie(p,a),P=r.createElement("span",{className:`${p}-close-x`},r.createElement(ne,{className:`${p}-close-icon`})),[h,x]=Z({prefixCls:p,style:y,className:f,motion:b,closable:!1,closeIcon:P,duration:d,getContainer:()=>(o==null?void 0:o())||(i==null?void 0:i())||document.body,maxCount:c,onAllRemoved:l,renderNotifications:pe});return r.useImperativeHandle(e,()=>Object.assign(Object.assign({},h),{prefixCls:p,message:g})),x});let M=0;function G(n){const e=r.useRef(null);return B(),[r.useMemo(()=>{const t=a=>{var l;(l=e.current)===null||l===void 0||l.close(a)},o=a=>{if(!e.current){const E=()=>{};return E.then=()=>{},E}const{open:l,prefixCls:u,message:i}=e.current,g=`${u}-notice`,{content:p,icon:y,type:f,key:b,className:P,style:h,onClose:x}=a,N=le(a,["content","icon","type","key","className","style","onClose"]);let C=b;return C==null&&(M+=1,C=`antd-message-${M}`),S(E=>(l(Object.assign(Object.assign({},N),{key:C,content:r.createElement(D,{prefixCls:u,type:f,icon:y},p),placement:"top",className:j(f&&`${g}-${f}`,P,i==null?void 0:i.className),style:Object.assign(Object.assign({},i==null?void 0:i.style),h),onClose:()=>{x==null||x(),E()}})),()=>{t(C)}))},d={open:o,destroy:a=>{var l;a!==void 0?t(a):(l=e.current)===null||l===void 0||l.destroy()}};return["info","success","warning","error","loading"].forEach(a=>{const l=(u,i,g)=>{let p;u&&typeof u=="object"&&"content"in u?p=u:p={content:u};let y,f;typeof i=="function"?f=i:(y=i,f=g);const b=Object.assign(Object.assign({onClose:f,duration:y},p),{type:a});return o(b)};d[a]=l}),d},[]),r.createElement(me,Object.assign({key:"message-holder"},n,{ref:e}))]}function ge(n){return G(n)}let m=null,O=n=>n(),$=[],I={};function _(){const{prefixCls:n,getContainer:e,duration:s,rtl:t,maxCount:o,top:c}=I,d=n??R().getPrefixCls("message"),v=(e==null?void 0:e())||document.body;return{prefixCls:d,getContainer:()=>v,duration:s,rtl:t,maxCount:o,top:c}}const fe=r.forwardRef((n,e)=>{const[s,t]=r.useState(_),[o,c]=G(s),d=R(),v=d.getRootPrefixCls(),a=d.getIconPrefixCls(),l=d.getTheme(),u=()=>{t(_)};return r.useEffect(u,[]),r.useImperativeHandle(e,()=>{const i=Object.assign({},o);return Object.keys(i).forEach(g=>{i[g]=function(){return u(),o[g].apply(o,arguments)}}),{instance:i,sync:u}}),r.createElement(K,{prefixCls:v,iconPrefixCls:a,theme:l},c)});function w(){if(!m){const n=document.createDocumentFragment(),e={fragment:n};m=e,O(()=>{Y(r.createElement(fe,{ref:s=>{const{instance:t,sync:o}=s||{};Promise.resolve().then(()=>{!e.instance&&t&&(e.instance=t,e.sync=o,w())})}}),n)});return}m.instance&&($.forEach(n=>{const{type:e,skipped:s}=n;if(!s)switch(e){case"open":{O(()=>{const t=m.instance.open(Object.assign(Object.assign({},I),n.config));t==null||t.then(n.resolve),n.setCloseFn(t)});break}case"destroy":O(()=>{m==null||m.instance.destroy(n.key)});break;default:O(()=>{var t;const o=(t=m.instance)[e].apply(t,U(n.args));o==null||o.then(n.resolve),n.setCloseFn(o)})}}),$=[])}function ve(n){I=Object.assign(Object.assign({},I),n),O(()=>{var e;(e=m==null?void 0:m.sync)===null||e===void 0||e.call(m)})}function ye(n){const e=S(s=>{let t;const o={type:"open",config:n,resolve:s,setCloseFn:c=>{t=c}};return $.push(o),()=>{t?O(()=>{t()}):o.skipped=!0}});return w(),e}function Ce(n,e){const s=S(t=>{let o;const c={type:n,args:e,resolve:t,setCloseFn:d=>{o=d}};return $.push(c),()=>{o?O(()=>{o()}):c.skipped=!0}});return w(),s}function be(n){$.push({type:"destroy",key:n}),w()}const xe=["success","info","warning","error","loading"],Oe={open:ye,destroy:be,config:ve,useMessage:ge,_InternalPanelDoNotUseOrYouWillBeFired:ae},H=Oe;xe.forEach(n=>{H[n]=function(){for(var e=arguments.length,s=new Array(e),t=0;t<e;t++)s[t]=arguments[t];return Ce(n,s)}});const Se=H;export{Se as m};
