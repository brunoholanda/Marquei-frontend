import{r as y,R as p,c as Ne,u as $e,j as u}from"./index-BjWOWftK.js";import{a as ne}from"./api-yj2qoLPl.js";import{a as Ve,R as Me,b as _e,c as Oe}from"./styles-LTF4UV_V.js";import{B as le}from"./index-JyjWfW4x.js";import{R as De}from"./index-SZJkRHiF.js";import{F as H}from"./index-DWnRouz4.js";import{I as se}from"./index-Dtquuxsa.js";import{M as Le}from"./index-DZhypcJC.js";import{A as ke,_ as ue,c as z,b as Te,e as M,f as ie}from"./AntdIcon-CQBeZWiu.js";import{B as ce,g as Be,m as Pe,r as Ke,C as Ae}from"./useSize-xGuuOV2H.js";import{K as _}from"./KeyCode-iNboPXT1.js";import{p as ze}from"./PurePanel-vSTbxOUV.js";import{T as qe}from"./index-xwEKfmQR.js";import{s as A}from"./index-DmCwQh6m.js";import"./styled-components.browser.esm-0XG6BcNo.js";import"./Serializer-CQbcCsmu.js";import"./index-10_tvuH-.js";import"./context-CsxF_MV5.js";import"./render-Dc9fgLFB.js";import"./useForm-BVlqLGy1.js";import"./row-xbO0cgu3.js";import"./responsiveObserver-eh3CkRQ8.js";import"./useLocale-B5fEOMjY.js";import"./ExclamationCircleFilled-BXHKs-a4.js";import"./SearchOutlined-DC5n_389.js";import"./InfoCircleFilled-CN7YLSSN.js";import"./useNotification-C_uzqUJr.js";var We={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"}}]},name:"star",theme:"filled"};const Xe=We;var Ge=function(a,r){return y.createElement(ke,ue({},a,{ref:r,icon:Xe}))};const Je=y.forwardRef(Ge);function Qe(e,a){var r=e.disabled,t=e.prefixCls,n=e.character,h=e.characterRender,i=e.index,d=e.count,g=e.value,b=e.allowHalf,c=e.focused,f=e.onHover,m=e.onClick,I=function(w){f(w,i)},E=function(w){m(w,i)},N=function(w){w.keyCode===_.ENTER&&m(w,i)},R=i+1,s=new Set([t]);g===0&&i===0&&c?s.add("".concat(t,"-focused")):b&&g+.5>=R&&g<R?(s.add("".concat(t,"-half")),s.add("".concat(t,"-active")),c&&s.add("".concat(t,"-focused"))):(R<=g?s.add("".concat(t,"-full")):s.add("".concat(t,"-zero")),R===g&&c&&s.add("".concat(t,"-focused")));var j=typeof n=="function"?n(e):n,x=p.createElement("li",{className:z(Array.from(s)),ref:a},p.createElement("div",{onClick:r?null:E,onKeyDown:r?null:N,onMouseMove:r?null:I,role:"radio","aria-checked":g>i?"true":"false","aria-posinset":i+1,"aria-setsize":d,tabIndex:r?-1:0},p.createElement("div",{className:"".concat(t,"-first")},j),p.createElement("div",{className:"".concat(t,"-second")},j)));return h&&(x=h(x,e)),x}const Ue=p.forwardRef(Qe);function Ye(){var e=y.useRef({});function a(t){return e.current[t]}function r(t){return function(n){e.current[t]=n}}return[a,r]}function Ze(e){var a=e.pageXOffset,r="scrollLeft";if(typeof a!="number"){var t=e.document;a=t.documentElement[r],typeof a!="number"&&(a=t.body[r])}return a}function ea(e){var a,r,t=e.ownerDocument,n=t.body,h=t&&t.documentElement,i=e.getBoundingClientRect();return a=i.left,r=i.top,a-=h.clientLeft||n.clientLeft||0,r-=h.clientTop||n.clientTop||0,{left:a,top:r}}function aa(e){var a=ea(e),r=e.ownerDocument,t=r.defaultView||r.parentWindow;return a.left+=Ze(t),a.left}var ta=["prefixCls","className","defaultValue","value","count","allowHalf","allowClear","character","characterRender","disabled","direction","tabIndex","autoFocus","onHoverChange","onChange","onFocus","onBlur","onKeyDown","onMouseLeave"];function ra(e,a){var r,t=e.prefixCls,n=t===void 0?"rc-rate":t,h=e.className,i=e.defaultValue,d=e.value,g=e.count,b=g===void 0?5:g,c=e.allowHalf,f=c===void 0?!1:c,m=e.allowClear,I=m===void 0?!0:m,E=e.character,N=E===void 0?"★":E,R=e.characterRender,s=e.disabled,j=e.direction,x=j===void 0?"ltr":j,$=e.tabIndex,w=$===void 0?0:$,de=e.autoFocus,F=e.onHoverChange,O=e.onChange,D=e.onFocus,L=e.onBlur,k=e.onKeyDown,T=e.onMouseLeave,fe=Te(e,ta),me=Ye(),q=M(me,2),ve=q[0],he=q[1],B=p.useRef(null),W=function(){if(!s){var o;(o=B.current)===null||o===void 0||o.focus()}};p.useImperativeHandle(a,function(){return{focus:W,blur:function(){if(!s){var o;(o=B.current)===null||o===void 0||o.blur()}}}});var ge=ce(i||0,{value:d}),X=M(ge,2),P=X[0],pe=X[1],ye=ce(null),G=M(ye,2),be=G[0],K=G[1],J=function(o,S){var v=x==="rtl",l=o+1;if(f){var te=ve(o),re=aa(te),oe=te.clientWidth;(v&&S-re>oe/2||!v&&S-re<oe/2)&&(l-=.5)}return l},V=function(o){pe(o),O==null||O(o)},Ce=p.useState(!1),Q=M(Ce,2),Se=Q[0],U=Q[1],xe=function(){U(!0),D==null||D()},Re=function(){U(!1),L==null||L()},we=p.useState(null),Y=M(we,2),Z=Y[0],ee=Y[1],je=function(o,S){var v=J(S,o.pageX);v!==be&&(ee(v),K(null)),F==null||F(v)},ae=function(o){s||(ee(null),K(null),F==null||F(void 0)),o&&(T==null||T(o))},Ie=function(o,S){var v=J(S,o.pageX),l=!1;I&&(l=v===P),ae(),V(l?0:v),K(l?v:null)},Ee=function(o){var S=o.keyCode,v=x==="rtl",l=P;S===_.RIGHT&&l<b&&!v?(f?l+=.5:l+=1,V(l),o.preventDefault()):S===_.LEFT&&l>0&&!v||S===_.RIGHT&&l>0&&v?(f?l-=.5:l-=1,V(l),o.preventDefault()):S===_.LEFT&&l<b&&v&&(f?l+=.5:l+=1,V(l),o.preventDefault()),k==null||k(o)};p.useEffect(function(){de&&!s&&W()},[]);var Fe=new Array(b).fill(0).map(function(C,o){return p.createElement(Ue,{ref:he(o),index:o,count:b,disabled:s,prefixCls:"".concat(n,"-star"),allowHalf:f,value:Z===null?P:Z,onClick:Ie,onHover:je,key:C||o,character:N,characterRender:R,focused:Se})}),He=z(n,h,(r={},ie(r,"".concat(n,"-disabled"),s),ie(r,"".concat(n,"-rtl"),x==="rtl"),r));return p.createElement("ul",ue({className:He,onMouseLeave:ae,tabIndex:s?-1:w,onFocus:s?null:xe,onBlur:s?null:Re,onKeyDown:s?null:Ee,ref:B,role:"radiogroup"},ze(fe,{aria:!0,data:!0,attr:!0})),Fe)}const oa=p.forwardRef(ra),na=e=>{const{componentCls:a}=e;return{[`${a}-star`]:{position:"relative",display:"inline-block",color:"inherit",cursor:"pointer","&:not(:last-child)":{marginInlineEnd:e.marginXS},"> div":{transition:`all ${e.motionDurationMid}, outline 0s`,"&:hover":{transform:e.starHoverScale},"&:focus":{outline:0},"&:focus-visible":{outline:`${e.lineWidth}px dashed ${e.starColor}`,transform:e.starHoverScale}},"&-first, &-second":{color:e.starBg,transition:`all ${e.motionDurationMid}`,userSelect:"none"},"&-first":{position:"absolute",top:0,insetInlineStart:0,width:"50%",height:"100%",overflow:"hidden",opacity:0},[`&-half ${a}-star-first, &-half ${a}-star-second`]:{opacity:1},[`&-half ${a}-star-first, &-full ${a}-star-second`]:{color:"inherit"}}}},la=e=>({[`&-rtl${e.componentCls}`]:{direction:"rtl"}}),sa=e=>{const{componentCls:a}=e;return{[a]:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},Ke(e)),{display:"inline-block",margin:0,padding:0,color:e.starColor,fontSize:e.starSize,lineHeight:1,listStyle:"none",outline:"none",[`&-disabled${a} ${a}-star`]:{cursor:"default","> div:hover":{transform:"scale(1)"}}}),na(e)),{[`+ ${a}-text`]:{display:"inline-block",marginInlineStart:e.marginXS,fontSize:e.fontSize}}),la(e))}},ia=Be("Rate",e=>{const a=Pe(e,{});return[sa(a)]},e=>({starColor:e.yellow6,starSize:e.controlHeightLG*.5,starHoverScale:"scale(1.1)",starBg:e.colorFillContent}));var ca=function(e,a){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)a.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r};const ua=y.forwardRef((e,a)=>{const{prefixCls:r,className:t,rootClassName:n,style:h,tooltips:i,character:d=y.createElement(Je,null)}=e,g=ca(e,["prefixCls","className","rootClassName","style","tooltips","character"]),b=(s,j)=>{let{index:x}=j;return i?y.createElement(qe,{title:i[x]},s):s},{getPrefixCls:c,direction:f,rate:m}=y.useContext(Ae),I=c("rate",r),[E,N]=ia(I),R=Object.assign(Object.assign({},m==null?void 0:m.style),h);return E(y.createElement(oa,Object.assign({ref:a,character:d,characterRender:b},g,{className:z(t,n,N,m==null?void 0:m.className),style:R,prefixCls:I,direction:f})))}),da=ua;function fa({count:e,onChange:a,value:r}){const[t,n]=y.useState(r||0),h=i=>{let d=i-1;d<0&&(d=0),i===1&&t===0&&(d=-1),n(d),a&&a(d>=0?d:null)};return u.jsxs(Me,{children:[u.jsx(da,{count:e,onChange:h,value:t>=0?t+1:0}),u.jsx(_e,{children:Array.from({length:e},(i,d)=>u.jsx(Oe,{children:d},d))})]})}function Ba(){const{company_id:e}=Ne(),[a]=H.useForm(),[r,t]=y.useState(""),[n,h]=y.useState(!1),i=$e(),d=c=>c?c.replace(/[^\d]/g,""):"";y.useEffect(()=>{(async()=>{try{const f=await ne.get(`/companies-by-id/${e}`);t(f.data.nome)}catch(f){console.error("Erro ao buscar detalhes da empresa:",f),A.error({message:"Erro ao Buscar Empresa",description:"Não foi possível buscar os detalhes da empresa. Tente novamente mais tarde."})}})()},[e]);const g=c=>{const f={...c,telefone:d(c.telefone)};ne.post("nps-systems",{...f,company_id:e}).then(m=>{a.resetFields(),h(!0),A.success({message:"Feedback Enviado",description:"Agradecemos pelo seu feedback!"})}).catch(m=>{A.error({message:"Erro no Envio",description:"Não foi possível enviar o seu feedback. Tente novamente mais tarde."}),console.error("There was an error submitting the form:",m)})},b=()=>{h(!1),i("/")};return u.jsxs(Ve,{children:[u.jsxs("h2",{children:["Em uma escala de 0 a 10, o quanto você recomendaria ",r||"a Empresa"," para um amigo ou colega?"]}),u.jsxs(H,{form:a,onFinish:g,layout:"vertical",className:"pesquisa-form",children:[u.jsx(H.Item,{name:"nome",label:"Nome",rules:[{required:!0,message:"Por favor, insira seu nome!"}],children:u.jsx(se,{placeholder:"Digite seu nome"})}),u.jsx(H.Item,{name:"telefone",label:"Telefone (Opcional)",children:u.jsx(De,{mask:"(99) 9 9999-9999",maskChar:null,children:c=>u.jsx(se,{...c})})}),u.jsx(H.Item,{name:"nota",label:"Nota",rules:[{required:!0,message:"Por favor, avalie de 0 a 10!"}],children:u.jsx(fa,{count:11,onChange:c=>a.setFieldsValue({nota:c})})}),u.jsx(H.Item,{children:u.jsx(le,{htmlType:"submit",children:"Enviar Feedback"})})]}),u.jsxs(Le,{title:"Feedback Recebido!",open:n,onOk:b,cancelButtonProps:{style:{display:"none"}},footer:null,children:[u.jsx("p",{children:"Seu feedback foi enviado com sucesso. Agradecemos pela sua contribuição!"}),u.jsx(le,{style:{textAlign:"center",width:"100%",marginTop:"1rem"},type:"primary",onClick:b,children:"Conheça o Marquei 😃"})]})]})}export{Ba as default};
