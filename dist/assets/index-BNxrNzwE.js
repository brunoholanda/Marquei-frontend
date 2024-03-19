import{r as a}from"./index-BjWOWftK.js";import{c as S}from"./AntdIcon-CQBeZWiu.js";import{g as P,m as j,K as D,r as L,C as T,o as X}from"./useSize-xGuuOV2H.js";import{i as O,c as I}from"./render-Dc9fgLFB.js";function G(t,n,i){var e=i||{},o=e.noTrailing,c=o===void 0?!1:o,m=e.noLeading,u=m===void 0?!1:m,x=e.debounceMode,d=x===void 0?void 0:x,r,h=!1,$=0;function p(){r&&clearTimeout(r)}function w(f){var s=f||{},l=s.upcomingOnly,C=l===void 0?!1:l;p(),h=!C}function y(){for(var f=arguments.length,s=new Array(f),l=0;l<f;l++)s[l]=arguments[l];var C=this,v=Date.now()-$;if(h)return;function g(){$=Date.now(),n.apply(C,s)}function b(){r=void 0}!u&&d&&!r&&g(),p(),d===void 0&&v>t?u?($=Date.now(),c||(r=setTimeout(d?b:g,t))):g():c!==!0&&(r=setTimeout(d?b:g,d===void 0?t-v:t))}return y.cancel=w,y}function H(t,n,i){var e=i||{},o=e.atBegin,c=o===void 0?!1:o;return G(t,n,{debounceMode:c!==!1})}const _=new D("antSpinMove",{to:{opacity:1}}),B=new D("antRotate",{to:{transform:"rotate(405deg)"}}),R=t=>({[`${t.componentCls}`]:Object.assign(Object.assign({},L(t)),{position:"absolute",display:"none",color:t.colorPrimary,fontSize:0,textAlign:"center",verticalAlign:"middle",opacity:0,transition:`transform ${t.motionDurationSlow} ${t.motionEaseInOutCirc}`,"&-spinning":{position:"static",display:"inline-block",opacity:1},"&-nested-loading":{position:"relative",[`> div > ${t.componentCls}`]:{position:"absolute",top:0,insetInlineStart:0,zIndex:4,display:"block",width:"100%",height:"100%",maxHeight:t.contentHeight,[`${t.componentCls}-dot`]:{position:"absolute",top:"50%",insetInlineStart:"50%",margin:-t.dotSize/2},[`${t.componentCls}-text`]:{position:"absolute",top:"50%",width:"100%",paddingTop:(t.dotSize-t.fontSize)/2+2,textShadow:`0 1px 2px ${t.colorBgContainer}`,fontSize:t.fontSize},[`&${t.componentCls}-show-text ${t.componentCls}-dot`]:{marginTop:-(t.dotSize/2)-10},"&-sm":{[`${t.componentCls}-dot`]:{margin:-t.dotSizeSM/2},[`${t.componentCls}-text`]:{paddingTop:(t.dotSizeSM-t.fontSize)/2+2},[`&${t.componentCls}-show-text ${t.componentCls}-dot`]:{marginTop:-(t.dotSizeSM/2)-10}},"&-lg":{[`${t.componentCls}-dot`]:{margin:-(t.dotSizeLG/2)},[`${t.componentCls}-text`]:{paddingTop:(t.dotSizeLG-t.fontSize)/2+2},[`&${t.componentCls}-show-text ${t.componentCls}-dot`]:{marginTop:-(t.dotSizeLG/2)-10}}},[`${t.componentCls}-container`]:{position:"relative",transition:`opacity ${t.motionDurationSlow}`,"&::after":{position:"absolute",top:0,insetInlineEnd:0,bottom:0,insetInlineStart:0,zIndex:10,width:"100%",height:"100%",background:t.colorBgContainer,opacity:0,transition:`all ${t.motionDurationSlow}`,content:'""',pointerEvents:"none"}},[`${t.componentCls}-blur`]:{clear:"both",opacity:.5,userSelect:"none",pointerEvents:"none","&::after":{opacity:.4,pointerEvents:"auto"}}},"&-tip":{color:t.spinDotDefault},[`${t.componentCls}-dot`]:{position:"relative",display:"inline-block",fontSize:t.dotSize,width:"1em",height:"1em","&-item":{position:"absolute",display:"block",width:(t.dotSize-t.marginXXS/2)/2,height:(t.dotSize-t.marginXXS/2)/2,backgroundColor:t.colorPrimary,borderRadius:"100%",transform:"scale(0.75)",transformOrigin:"50% 50%",opacity:.3,animationName:_,animationDuration:"1s",animationIterationCount:"infinite",animationTimingFunction:"linear",animationDirection:"alternate","&:nth-child(1)":{top:0,insetInlineStart:0},"&:nth-child(2)":{top:0,insetInlineEnd:0,animationDelay:"0.4s"},"&:nth-child(3)":{insetInlineEnd:0,bottom:0,animationDelay:"0.8s"},"&:nth-child(4)":{bottom:0,insetInlineStart:0,animationDelay:"1.2s"}},"&-spin":{transform:"rotate(45deg)",animationName:B,animationDuration:"1.2s",animationIterationCount:"infinite",animationTimingFunction:"linear"}},[`&-sm ${t.componentCls}-dot`]:{fontSize:t.dotSizeSM,i:{width:(t.dotSizeSM-t.marginXXS/2)/2,height:(t.dotSizeSM-t.marginXXS/2)/2}},[`&-lg ${t.componentCls}-dot`]:{fontSize:t.dotSizeLG,i:{width:(t.dotSizeLG-t.marginXXS)/2,height:(t.dotSizeLG-t.marginXXS)/2}},[`&${t.componentCls}-show-text ${t.componentCls}-text`]:{display:"block"}})}),A=P("Spin",t=>{const n=j(t,{spinDotDefault:t.colorTextDescription});return[R(n)]},t=>({contentHeight:400,dotSize:t.controlHeightLG/2,dotSizeSM:t.controlHeightLG*.35,dotSizeLG:t.controlHeight}));var F=function(t,n){var i={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(i[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,e=Object.getOwnPropertySymbols(t);o<e.length;o++)n.indexOf(e[o])<0&&Object.prototype.propertyIsEnumerable.call(t,e[o])&&(i[e[o]]=t[e[o]]);return i};let N=null;function K(t,n){const{indicator:i}=n,e=`${t}-dot`;return i===null?null:O(i)?I(i,{className:S(i.props.className,e)}):O(N)?I(N,{className:S(N.props.className,e)}):a.createElement("span",{className:S(e,`${t}-dot-spin`)},a.createElement("i",{className:`${t}-dot-item`,key:1}),a.createElement("i",{className:`${t}-dot-item`,key:2}),a.createElement("i",{className:`${t}-dot-item`,key:3}),a.createElement("i",{className:`${t}-dot-item`,key:4}))}function V(t,n){return!!t&&!!n&&!isNaN(Number(n))}const q=t=>{const{spinPrefixCls:n,spinning:i=!0,delay:e=0,className:o,rootClassName:c,size:m="default",tip:u,wrapperClassName:x,style:d,children:r,hashId:h}=t,$=F(t,["spinPrefixCls","spinning","delay","className","rootClassName","size","tip","wrapperClassName","style","children","hashId"]),[p,w]=a.useState(()=>i&&!V(i,e));a.useEffect(()=>{if(i){const z=H(e,()=>{w(!0)});return z(),()=>{var E;(E=z==null?void 0:z.cancel)===null||E===void 0||E.call(z)}}w(!1)},[e,i]);const y=a.useMemo(()=>typeof r<"u",[r]),{direction:f,spin:s}=a.useContext(T),l=S(n,s==null?void 0:s.className,{[`${n}-sm`]:m==="small",[`${n}-lg`]:m==="large",[`${n}-spinning`]:p,[`${n}-show-text`]:!!u,[`${n}-rtl`]:f==="rtl"},o,c,h),C=S(`${n}-container`,{[`${n}-blur`]:p}),v=X($,["indicator","prefixCls"]),g=Object.assign(Object.assign({},s==null?void 0:s.style),d),b=a.createElement("div",Object.assign({},v,{style:g,className:l,"aria-live":"polite","aria-busy":p}),K(n,t),u&&y?a.createElement("div",{className:`${n}-text`},u):null);return y?a.createElement("div",Object.assign({},v,{className:S(`${n}-nested-loading`,x,h)}),p&&a.createElement("div",{key:"loading"},b),a.createElement("div",{className:C,key:"container"},r)):b},M=t=>{const{prefixCls:n}=t,{getPrefixCls:i}=a.useContext(T),e=i("spin",n),[o,c]=A(e),m=Object.assign(Object.assign({},t),{spinPrefixCls:e,hashId:c});return o(a.createElement(q,Object.assign({},m)))};M.setDefaultIndicator=t=>{N=t};const Y=M;export{Y as S};
