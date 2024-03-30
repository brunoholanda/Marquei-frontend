import{r as m,L as X,j as a}from"./index-BejUs57K.js";import{s as d}from"./styled-components.browser.esm-BDisp2Ny.js";import"./Serializer-CQbcCsmu.js";const Y="Left",H="Right",q="Up",$="Down",O={delta:10,preventScrollOnSwipe:!1,rotationAngle:0,trackMouse:!1,trackTouch:!0,swipeDuration:1/0,touchEventOptions:{passive:!0}},y={first:!0,initial:[0,0],start:0,swiping:!1,xy:[0,0]},R="mousemove",I="mouseup",B="touchend",G="touchmove",N="touchstart";function F(t,c,s,r){return t>c?s>0?H:Y:r>0?$:q}function P(t,c){if(c===0)return t;const s=Math.PI/180*c,r=t[0]*Math.cos(s)+t[1]*Math.sin(s),f=t[1]*Math.cos(s)-t[0]*Math.sin(s);return[r,f]}function K(t,c){const s=n=>{const e="touches"in n;e&&n.touches.length>1||t((o,i)=>{i.trackMouse&&!e&&(document.addEventListener(R,r),document.addEventListener(I,S));const{clientX:u,clientY:h}=e?n.touches[0]:n,l=P([u,h],i.rotationAngle);return i.onTouchStartOrOnMouseDown&&i.onTouchStartOrOnMouseDown({event:n}),Object.assign(Object.assign(Object.assign({},o),y),{initial:l.slice(),xy:l,start:n.timeStamp||0})})},r=n=>{t((e,o)=>{const i="touches"in n;if(i&&n.touches.length>1)return e;if(n.timeStamp-e.start>o.swipeDuration)return e.swiping?Object.assign(Object.assign({},e),{swiping:!1}):e;const{clientX:u,clientY:h}=i?n.touches[0]:n,[l,T]=P([u,h],o.rotationAngle),v=l-e.xy[0],w=T-e.xy[1],j=Math.abs(v),p=Math.abs(w),k=(n.timeStamp||0)-e.start,z=Math.sqrt(j*j+p*p)/(k||1),A=[v/(k||1),w/(k||1)],E=F(j,p,v,w),L=typeof o.delta=="number"?o.delta:o.delta[E.toLowerCase()]||O.delta;if(j<L&&p<L&&!e.swiping)return e;const M={absX:j,absY:p,deltaX:v,deltaY:w,dir:E,event:n,first:e.first,initial:e.initial,velocity:z,vxvy:A};M.first&&o.onSwipeStart&&o.onSwipeStart(M),o.onSwiping&&o.onSwiping(M);let C=!1;return(o.onSwiping||o.onSwiped||o[`onSwiped${E}`])&&(C=!0),C&&o.preventScrollOnSwipe&&o.trackTouch&&n.cancelable&&n.preventDefault(),Object.assign(Object.assign({},e),{first:!1,eventData:M,swiping:!0})})},f=n=>{t((e,o)=>{let i;if(e.swiping&&e.eventData){if(n.timeStamp-e.start<o.swipeDuration){i=Object.assign(Object.assign({},e.eventData),{event:n}),o.onSwiped&&o.onSwiped(i);const u=o[`onSwiped${i.dir}`];u&&u(i)}}else o.onTap&&o.onTap({event:n});return o.onTouchEndOrOnMouseUp&&o.onTouchEndOrOnMouseUp({event:n}),Object.assign(Object.assign(Object.assign({},e),y),{eventData:i})})},g=()=>{document.removeEventListener(R,r),document.removeEventListener(I,S)},S=n=>{g(),f(n)},x=(n,e)=>{let o=()=>{};if(n&&n.addEventListener){const i=Object.assign(Object.assign({},O.touchEventOptions),e.touchEventOptions),u=[[N,s,i],[G,r,Object.assign(Object.assign({},i),e.preventScrollOnSwipe?{passive:!1}:{})],[B,f,i]];u.forEach(([h,l,T])=>n.addEventListener(h,l,T)),o=()=>u.forEach(([h,l])=>n.removeEventListener(h,l))}return o},D={ref:n=>{n!==null&&t((e,o)=>{if(e.el===n)return e;const i={};return e.el&&e.el!==n&&e.cleanUpTouch&&(e.cleanUpTouch(),i.cleanUpTouch=void 0),o.trackTouch&&n&&(i.cleanUpTouch=x(n,o)),Object.assign(Object.assign(Object.assign({},e),{el:n}),i)})}};return c.trackMouse&&(D.onMouseDown=s),[D,x]}function W(t,c,s,r){return!c.trackTouch||!t.el?(t.cleanUpTouch&&t.cleanUpTouch(),Object.assign(Object.assign({},t),{cleanUpTouch:void 0})):t.cleanUpTouch?c.preventScrollOnSwipe!==s.preventScrollOnSwipe||c.touchEventOptions.passive!==s.touchEventOptions.passive?(t.cleanUpTouch(),Object.assign(Object.assign({},t),{cleanUpTouch:r(t.el,c)})):t:Object.assign(Object.assign({},t),{cleanUpTouch:r(t.el,c)})}function J(t){const{trackMouse:c}=t,s=m.useRef(Object.assign({},y)),r=m.useRef(Object.assign({},O)),f=m.useRef(Object.assign({},r.current));f.current=Object.assign({},r.current),r.current=Object.assign(Object.assign({},O),t);let g;for(g in O)r.current[g]===void 0&&(r.current[g]=O[g]);const[S,x]=m.useMemo(()=>K(U=>s.current=U(s.current,r.current),{trackMouse:c}),[c]);return s.current=W(s.current,r.current,f.current,x),S}const Q=d.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background-color: var(--azul);
`,V=d.div`
  font-size: 35px;
  cursor: pointer;
  color: var(--branco);

`,Z=d.nav`
  position: fixed;
  top: 0;
  left: ${({isOpen:t})=>t?"0":"-100%"};
  height: 100vh;
  width: 150px;
  transition: left 0.3s;
  padding: 15px;
  background-color: var(--azul);
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.7);
  z-index: 2;
`,_=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`,nn=d.div`
  font-size: 28px;
  color: var(--branco);
`,en=d.div`
  cursor: pointer;
`,b=d(X)`
  display: block;
  padding: 8px 0;
  text-decoration: none;
  color: var(--branco);
`;d.img`
  height: 50px; // Ajuste conforme necessário
  width: auto; // Mantém a proporção da imagem
  display: block; // Garante que a imagem será exibida
`;function sn(){const[t,c]=m.useState(!1),s=J({onSwipedLeft:()=>c(!1),preventDefaultTouchmoveEvent:!0,trackMouse:!0});return a.jsxs(Q,{children:[a.jsx(V,{onClick:()=>c(!t),children:"☰"}),a.jsxs(Z,{...s,isOpen:t,children:[a.jsxs(_,{children:[a.jsx(nn,{children:"Marquei"}),a.jsx(en,{onClick:()=>c(!1),children:"×"})]}),a.jsx(b,{to:"/",onClick:()=>c(!1),children:"Home"}),a.jsx(b,{to:"/resources",onClick:()=>c(!1),children:"Recursos"}),a.jsx(b,{to:"/planos",onClick:()=>c(!1),children:"Planos"}),a.jsx(b,{to:"/search-professionals",onClick:()=>c(!1),children:"Encontre o profissionais"}),a.jsx(b,{to:"/como-usar",onClick:()=>c(!1),children:"Como usar?"}),a.jsx(b,{to:"/cadastro",onClick:()=>c(!1),children:"Contrate!"})]})]})}export{sn as default};
