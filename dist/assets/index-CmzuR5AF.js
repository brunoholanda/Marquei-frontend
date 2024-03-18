import{r as S,L as Y,j as a}from"./index-kPzU05gx.js";import{s as h}from"./styled-components.browser.esm-BWH_c5t_.js";import"./Serializer-CQbcCsmu.js";const A="Left",H="Right",$="Up",B="Down",O={delta:10,preventScrollOnSwipe:!1,rotationAngle:0,trackMouse:!1,trackTouch:!0,swipeDuration:1/0,touchEventOptions:{passive:!0}},y={first:!0,initial:[0,0],start:0,swiping:!1,xy:[0,0]},R="mousemove",I="mouseup",N="touchend",q="touchmove",F="touchstart";function G(t,i,s,r){return t>i?s>0?H:A:r>0?B:$}function P(t,i){if(i===0)return t;const s=Math.PI/180*i,r=t[0]*Math.cos(s)+t[1]*Math.sin(s),d=t[1]*Math.cos(s)-t[0]*Math.sin(s);return[r,d]}function K(t,i){const s=n=>{const e="touches"in n;e&&n.touches.length>1||t((c,o)=>{o.trackMouse&&!e&&(document.addEventListener(R,r),document.addEventListener(I,v));const{clientX:u,clientY:f}=e?n.touches[0]:n,l=P([u,f],o.rotationAngle);return o.onTouchStartOrOnMouseDown&&o.onTouchStartOrOnMouseDown({event:n}),Object.assign(Object.assign(Object.assign({},c),y),{initial:l.slice(),xy:l,start:n.timeStamp||0})})},r=n=>{t((e,c)=>{const o="touches"in n;if(o&&n.touches.length>1)return e;if(n.timeStamp-e.start>c.swipeDuration)return e.swiping?Object.assign(Object.assign({},e),{swiping:!1}):e;const{clientX:u,clientY:f}=o?n.touches[0]:n,[l,T]=P([u,f],c.rotationAngle),w=l-e.xy[0],m=T-e.xy[1],b=Math.abs(w),j=Math.abs(m),E=(n.timeStamp||0)-e.start,z=Math.sqrt(b*b+j*j)/(E||1),X=[w/(E||1),m/(E||1)],k=G(b,j,w,m),L=typeof c.delta=="number"?c.delta:c.delta[k.toLowerCase()]||O.delta;if(b<L&&j<L&&!e.swiping)return e;const M={absX:b,absY:j,deltaX:w,deltaY:m,dir:k,event:n,first:e.first,initial:e.initial,velocity:z,vxvy:X};M.first&&c.onSwipeStart&&c.onSwipeStart(M),c.onSwiping&&c.onSwiping(M);let C=!1;return(c.onSwiping||c.onSwiped||c[`onSwiped${k}`])&&(C=!0),C&&c.preventScrollOnSwipe&&c.trackTouch&&n.cancelable&&n.preventDefault(),Object.assign(Object.assign({},e),{first:!1,eventData:M,swiping:!0})})},d=n=>{t((e,c)=>{let o;if(e.swiping&&e.eventData){if(n.timeStamp-e.start<c.swipeDuration){o=Object.assign(Object.assign({},e.eventData),{event:n}),c.onSwiped&&c.onSwiped(o);const u=c[`onSwiped${o.dir}`];u&&u(o)}}else c.onTap&&c.onTap({event:n});return c.onTouchEndOrOnMouseUp&&c.onTouchEndOrOnMouseUp({event:n}),Object.assign(Object.assign(Object.assign({},e),y),{eventData:o})})},g=()=>{document.removeEventListener(R,r),document.removeEventListener(I,v)},v=n=>{g(),d(n)},x=(n,e)=>{let c=()=>{};if(n&&n.addEventListener){const o=Object.assign(Object.assign({},O.touchEventOptions),e.touchEventOptions),u=[[F,s,o],[q,r,Object.assign(Object.assign({},o),e.preventScrollOnSwipe?{passive:!1}:{})],[N,d,o]];u.forEach(([f,l,T])=>n.addEventListener(f,l,T)),c=()=>u.forEach(([f,l])=>n.removeEventListener(f,l))}return c},D={ref:n=>{n!==null&&t((e,c)=>{if(e.el===n)return e;const o={};return e.el&&e.el!==n&&e.cleanUpTouch&&(e.cleanUpTouch(),o.cleanUpTouch=void 0),c.trackTouch&&n&&(o.cleanUpTouch=x(n,c)),Object.assign(Object.assign(Object.assign({},e),{el:n}),o)})}};return i.trackMouse&&(D.onMouseDown=s),[D,x]}function W(t,i,s,r){return!i.trackTouch||!t.el?(t.cleanUpTouch&&t.cleanUpTouch(),Object.assign(Object.assign({},t),{cleanUpTouch:void 0})):t.cleanUpTouch?i.preventScrollOnSwipe!==s.preventScrollOnSwipe||i.touchEventOptions.passive!==s.touchEventOptions.passive?(t.cleanUpTouch(),Object.assign(Object.assign({},t),{cleanUpTouch:r(t.el,i)})):t:Object.assign(Object.assign({},t),{cleanUpTouch:r(t.el,i)})}function J(t){const{trackMouse:i}=t,s=S.useRef(Object.assign({},y)),r=S.useRef(Object.assign({},O)),d=S.useRef(Object.assign({},r.current));d.current=Object.assign({},r.current),r.current=Object.assign(Object.assign({},O),t);let g;for(g in O)r.current[g]===void 0&&(r.current[g]=O[g]);const[v,x]=S.useMemo(()=>K(U=>s.current=U(s.current,r.current),{trackMouse:i}),[i]);return s.current=W(s.current,r.current,d.current,x),v}const Q=h.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background-color: var(--azul);
`,V=h.div`
  font-size: 35px;
  cursor: pointer;
  color: var(--branco);

`,Z=h.nav`
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
`,_=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`,nn=h.div`
  font-size: 28px;
  color: var(--branco);
`,en=h.div`
  cursor: pointer;
`,p=h(Y)`
  display: block;
  padding: 8px 0;
  text-decoration: none;
  color: var(--branco);
`;function sn(){const[t,i]=S.useState(!1),s=J({onSwipedLeft:()=>i(!1),preventDefaultTouchmoveEvent:!0,trackMouse:!0});return a.jsxs(Q,{children:[a.jsx(V,{onClick:()=>i(!t),children:"☰"}),a.jsxs(Z,{...s,isOpen:t,children:[a.jsxs(_,{children:[a.jsx(nn,{children:"Menu"}),a.jsx(en,{onClick:()=>i(!1),children:"×"})]}),a.jsx(p,{to:"/",onClick:()=>i(!1),children:"Home"}),a.jsx(p,{to:"/resources",onClick:()=>i(!1),children:"Recursos"}),a.jsx(p,{to:"/planos",onClick:()=>i(!1),children:"Planos"}),a.jsx(p,{to:"/search-professionals",onClick:()=>i(!1),children:"Encontre o profissionais"}),a.jsx(p,{to:"/cadastro",onClick:()=>i(!1),children:"Contrate!"})]})]})}export{sn as default};
