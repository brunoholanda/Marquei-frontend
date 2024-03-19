import{r as m,L as X,j as a}from"./index-BjWOWftK.js";import{s as d}from"./styled-components.browser.esm-0XG6BcNo.js";import"./Serializer-CQbcCsmu.js";const Y="Left",H="Right",q="Up",$="Down",b={delta:10,preventScrollOnSwipe:!1,rotationAngle:0,trackMouse:!1,trackTouch:!0,swipeDuration:1/0,touchEventOptions:{passive:!0}},y={first:!0,initial:[0,0],start:0,swiping:!1,xy:[0,0]},R="mousemove",I="mouseup",B="touchend",G="touchmove",N="touchstart";function F(t,c,s,r){return t>c?s>0?H:Y:r>0?$:q}function P(t,c){if(c===0)return t;const s=Math.PI/180*c,r=t[0]*Math.cos(s)+t[1]*Math.sin(s),f=t[1]*Math.cos(s)-t[0]*Math.sin(s);return[r,f]}function K(t,c){const s=n=>{const e="touches"in n;e&&n.touches.length>1||t((i,o)=>{o.trackMouse&&!e&&(document.addEventListener(R,r),document.addEventListener(I,S));const{clientX:u,clientY:h}=e?n.touches[0]:n,l=P([u,h],o.rotationAngle);return o.onTouchStartOrOnMouseDown&&o.onTouchStartOrOnMouseDown({event:n}),Object.assign(Object.assign(Object.assign({},i),y),{initial:l.slice(),xy:l,start:n.timeStamp||0})})},r=n=>{t((e,i)=>{const o="touches"in n;if(o&&n.touches.length>1)return e;if(n.timeStamp-e.start>i.swipeDuration)return e.swiping?Object.assign(Object.assign({},e),{swiping:!1}):e;const{clientX:u,clientY:h}=o?n.touches[0]:n,[l,T]=P([u,h],i.rotationAngle),v=l-e.xy[0],w=T-e.xy[1],O=Math.abs(v),p=Math.abs(w),E=(n.timeStamp||0)-e.start,z=Math.sqrt(O*O+p*p)/(E||1),A=[v/(E||1),w/(E||1)],k=F(O,p,v,w),L=typeof i.delta=="number"?i.delta:i.delta[k.toLowerCase()]||b.delta;if(O<L&&p<L&&!e.swiping)return e;const M={absX:O,absY:p,deltaX:v,deltaY:w,dir:k,event:n,first:e.first,initial:e.initial,velocity:z,vxvy:A};M.first&&i.onSwipeStart&&i.onSwipeStart(M),i.onSwiping&&i.onSwiping(M);let C=!1;return(i.onSwiping||i.onSwiped||i[`onSwiped${k}`])&&(C=!0),C&&i.preventScrollOnSwipe&&i.trackTouch&&n.cancelable&&n.preventDefault(),Object.assign(Object.assign({},e),{first:!1,eventData:M,swiping:!0})})},f=n=>{t((e,i)=>{let o;if(e.swiping&&e.eventData){if(n.timeStamp-e.start<i.swipeDuration){o=Object.assign(Object.assign({},e.eventData),{event:n}),i.onSwiped&&i.onSwiped(o);const u=i[`onSwiped${o.dir}`];u&&u(o)}}else i.onTap&&i.onTap({event:n});return i.onTouchEndOrOnMouseUp&&i.onTouchEndOrOnMouseUp({event:n}),Object.assign(Object.assign(Object.assign({},e),y),{eventData:o})})},g=()=>{document.removeEventListener(R,r),document.removeEventListener(I,S)},S=n=>{g(),f(n)},x=(n,e)=>{let i=()=>{};if(n&&n.addEventListener){const o=Object.assign(Object.assign({},b.touchEventOptions),e.touchEventOptions),u=[[N,s,o],[G,r,Object.assign(Object.assign({},o),e.preventScrollOnSwipe?{passive:!1}:{})],[B,f,o]];u.forEach(([h,l,T])=>n.addEventListener(h,l,T)),i=()=>u.forEach(([h,l])=>n.removeEventListener(h,l))}return i},D={ref:n=>{n!==null&&t((e,i)=>{if(e.el===n)return e;const o={};return e.el&&e.el!==n&&e.cleanUpTouch&&(e.cleanUpTouch(),o.cleanUpTouch=void 0),i.trackTouch&&n&&(o.cleanUpTouch=x(n,i)),Object.assign(Object.assign(Object.assign({},e),{el:n}),o)})}};return c.trackMouse&&(D.onMouseDown=s),[D,x]}function W(t,c,s,r){return!c.trackTouch||!t.el?(t.cleanUpTouch&&t.cleanUpTouch(),Object.assign(Object.assign({},t),{cleanUpTouch:void 0})):t.cleanUpTouch?c.preventScrollOnSwipe!==s.preventScrollOnSwipe||c.touchEventOptions.passive!==s.touchEventOptions.passive?(t.cleanUpTouch(),Object.assign(Object.assign({},t),{cleanUpTouch:r(t.el,c)})):t:Object.assign(Object.assign({},t),{cleanUpTouch:r(t.el,c)})}function J(t){const{trackMouse:c}=t,s=m.useRef(Object.assign({},y)),r=m.useRef(Object.assign({},b)),f=m.useRef(Object.assign({},r.current));f.current=Object.assign({},r.current),r.current=Object.assign(Object.assign({},b),t);let g;for(g in b)r.current[g]===void 0&&(r.current[g]=b[g]);const[S,x]=m.useMemo(()=>K(U=>s.current=U(s.current,r.current),{trackMouse:c}),[c]);return s.current=W(s.current,r.current,f.current,x),S}const Q=d.header`
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
`,j=d(X)`
  display: block;
  padding: 8px 0;
  text-decoration: none;
  color: var(--branco);
`;d.img`
  height: 50px; // Ajuste conforme necessário
  width: auto; // Mantém a proporção da imagem
  display: block; // Garante que a imagem será exibida
`;function sn(){const[t,c]=m.useState(!1),s=J({onSwipedLeft:()=>c(!1),preventDefaultTouchmoveEvent:!0,trackMouse:!0});return a.jsxs(Q,{children:[a.jsx(V,{onClick:()=>c(!t),children:"☰"}),a.jsxs(Z,{...s,isOpen:t,children:[a.jsxs(_,{children:[a.jsx(nn,{children:"Marquei"}),a.jsx(en,{onClick:()=>c(!1),children:"×"})]}),a.jsx(j,{to:"/",onClick:()=>c(!1),children:"Home"}),a.jsx(j,{to:"/resources",onClick:()=>c(!1),children:"Recursos"}),a.jsx(j,{to:"/planos",onClick:()=>c(!1),children:"Planos"}),a.jsx(j,{to:"/search-professionals",onClick:()=>c(!1),children:"Encontre o profissionais"}),a.jsx(j,{to:"/cadastro",onClick:()=>c(!1),children:"Contrate!"})]})]})}export{sn as default};
