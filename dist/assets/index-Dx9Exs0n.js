import{r as m,s as d,L as X,j as a}from"./index-xvO6EYLJ.js";const Y="Left",H="Right",q="Up",$="Down",O={delta:10,preventScrollOnSwipe:!1,rotationAngle:0,trackMouse:!1,trackTouch:!0,swipeDuration:1/0,touchEventOptions:{passive:!0}},y={first:!0,initial:[0,0],start:0,swiping:!1,xy:[0,0]},R="mousemove",I="mouseup",B="touchend",G="touchmove",N="touchstart";function F(t,o,s,r){return t>o?s>0?H:Y:r>0?$:q}function P(t,o){if(o===0)return t;const s=Math.PI/180*o,r=t[0]*Math.cos(s)+t[1]*Math.sin(s),f=t[1]*Math.cos(s)-t[0]*Math.sin(s);return[r,f]}function K(t,o){const s=n=>{const e="touches"in n;e&&n.touches.length>1||t((c,i)=>{i.trackMouse&&!e&&(document.addEventListener(R,r),document.addEventListener(I,S));const{clientX:u,clientY:h}=e?n.touches[0]:n,l=P([u,h],i.rotationAngle);return i.onTouchStartOrOnMouseDown&&i.onTouchStartOrOnMouseDown({event:n}),Object.assign(Object.assign(Object.assign({},c),y),{initial:l.slice(),xy:l,start:n.timeStamp||0})})},r=n=>{t((e,c)=>{const i="touches"in n;if(i&&n.touches.length>1)return e;if(n.timeStamp-e.start>c.swipeDuration)return e.swiping?Object.assign(Object.assign({},e),{swiping:!1}):e;const{clientX:u,clientY:h}=i?n.touches[0]:n,[l,T]=P([u,h],c.rotationAngle),v=l-e.xy[0],w=T-e.xy[1],j=Math.abs(v),p=Math.abs(w),k=(n.timeStamp||0)-e.start,z=Math.sqrt(j*j+p*p)/(k||1),A=[v/(k||1),w/(k||1)],E=F(j,p,v,w),L=typeof c.delta=="number"?c.delta:c.delta[E.toLowerCase()]||O.delta;if(j<L&&p<L&&!e.swiping)return e;const M={absX:j,absY:p,deltaX:v,deltaY:w,dir:E,event:n,first:e.first,initial:e.initial,velocity:z,vxvy:A};M.first&&c.onSwipeStart&&c.onSwipeStart(M),c.onSwiping&&c.onSwiping(M);let C=!1;return(c.onSwiping||c.onSwiped||c[`onSwiped${E}`])&&(C=!0),C&&c.preventScrollOnSwipe&&c.trackTouch&&n.cancelable&&n.preventDefault(),Object.assign(Object.assign({},e),{first:!1,eventData:M,swiping:!0})})},f=n=>{t((e,c)=>{let i;if(e.swiping&&e.eventData){if(n.timeStamp-e.start<c.swipeDuration){i=Object.assign(Object.assign({},e.eventData),{event:n}),c.onSwiped&&c.onSwiped(i);const u=c[`onSwiped${i.dir}`];u&&u(i)}}else c.onTap&&c.onTap({event:n});return c.onTouchEndOrOnMouseUp&&c.onTouchEndOrOnMouseUp({event:n}),Object.assign(Object.assign(Object.assign({},e),y),{eventData:i})})},g=()=>{document.removeEventListener(R,r),document.removeEventListener(I,S)},S=n=>{g(),f(n)},x=(n,e)=>{let c=()=>{};if(n&&n.addEventListener){const i=Object.assign(Object.assign({},O.touchEventOptions),e.touchEventOptions),u=[[N,s,i],[G,r,Object.assign(Object.assign({},i),e.preventScrollOnSwipe?{passive:!1}:{})],[B,f,i]];u.forEach(([h,l,T])=>n.addEventListener(h,l,T)),c=()=>u.forEach(([h,l])=>n.removeEventListener(h,l))}return c},D={ref:n=>{n!==null&&t((e,c)=>{if(e.el===n)return e;const i={};return e.el&&e.el!==n&&e.cleanUpTouch&&(e.cleanUpTouch(),i.cleanUpTouch=void 0),c.trackTouch&&n&&(i.cleanUpTouch=x(n,c)),Object.assign(Object.assign(Object.assign({},e),{el:n}),i)})}};return o.trackMouse&&(D.onMouseDown=s),[D,x]}function W(t,o,s,r){return!o.trackTouch||!t.el?(t.cleanUpTouch&&t.cleanUpTouch(),Object.assign(Object.assign({},t),{cleanUpTouch:void 0})):t.cleanUpTouch?o.preventScrollOnSwipe!==s.preventScrollOnSwipe||o.touchEventOptions.passive!==s.touchEventOptions.passive?(t.cleanUpTouch(),Object.assign(Object.assign({},t),{cleanUpTouch:r(t.el,o)})):t:Object.assign(Object.assign({},t),{cleanUpTouch:r(t.el,o)})}function J(t){const{trackMouse:o}=t,s=m.useRef(Object.assign({},y)),r=m.useRef(Object.assign({},O)),f=m.useRef(Object.assign({},r.current));f.current=Object.assign({},r.current),r.current=Object.assign(Object.assign({},O),t);let g;for(g in O)r.current[g]===void 0&&(r.current[g]=O[g]);const[S,x]=m.useMemo(()=>K(U=>s.current=U(s.current,r.current),{trackMouse:o}),[o]);return s.current=W(s.current,r.current,f.current,x),S}const Q=d.header`
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
`;function cn(){const[t,o]=m.useState(!1),s=J({onSwipedLeft:()=>o(!1),preventDefaultTouchmoveEvent:!0,trackMouse:!0});return a.jsxs(Q,{children:[a.jsx(V,{onClick:()=>o(!t),children:"☰"}),a.jsxs(Z,{...s,isOpen:t,children:[a.jsxs(_,{children:[a.jsx(nn,{children:"Marquei"}),a.jsx(en,{onClick:()=>o(!1),children:"×"})]}),a.jsx(b,{to:"/",onClick:()=>o(!1),children:"Home"}),a.jsx(b,{to:"/resources",onClick:()=>o(!1),children:"Recursos"}),a.jsx(b,{to:"/planos",onClick:()=>o(!1),children:"Planos"}),a.jsx(b,{to:"/search-professionals",onClick:()=>o(!1),children:"Encontre o profissionais"}),a.jsx(b,{to:"/como-usar",onClick:()=>o(!1),children:"Como usar?"}),a.jsx(b,{to:"/cadastro",onClick:()=>o(!1),children:"Contrate!"})]})]})}export{cn as default};
