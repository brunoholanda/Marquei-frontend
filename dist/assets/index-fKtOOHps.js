import{r as o,R as we,j as n,d as dt,B as at}from"./index-BjWOWftK.js";import{a as ie}from"./api-yj2qoLPl.js";import{e as A,d as M,f as te,c as oe,b as Ee,_ as B,h as ut,A as Me}from"./AntdIcon-CQBeZWiu.js";import{B as fe}from"./context-CsxF_MV5.js";import{u as Mt}from"./useForm-BVlqLGy1.js";import{s as ft}from"./styled-components.browser.esm-0XG6BcNo.js";import{g as gt,a as Te,b as _t,T as Qe}from"./Table-DssO-p4r.js";import{D as Nt,g as Lt,i as At,M as qe}from"./index-DZhypcJC.js";import{F as ke}from"./index-DWnRouz4.js";import{E as Tt,I as Pe}from"./index-Dtquuxsa.js";import{S as se}from"./index-CrIh86xN.js";import{s as De}from"./index-DmCwQh6m.js";import{W as vt}from"./WhatsAppOutlined-DhTNyo2x.js";import{D as pt}from"./Styles-HDwQP3Lk.js";import{F as $t,H as zt,z as Dt,_ as Ft,B as We,g as Yt,T as xe,m as nt,y as Xt,C as ht,E as rt}from"./useSize-xGuuOV2H.js";import{K as Ge,C as Zt}from"./KeyCode-iNboPXT1.js";import{P as Bt,g as Fe}from"./index-10_tvuH-.js";import{a as Ht,R as Vt}from"./index-z7srBD_T.js";import{S as it}from"./SwapOutlined-AtpSfL35.js";import{i as Wt,T as Ct}from"./index-xwEKfmQR.js";import{E as wt,C as Gt}from"./ExclamationCircleOutlined-CMpo733E.js";import{C as Ut}from"./ClockCircleOutlined-vEkn-5q0.js";import{T as st}from"./index-Ccg1QiO6.js";import"./render-Dc9fgLFB.js";import"./Serializer-CQbcCsmu.js";import"./PurePanel-vSTbxOUV.js";import"./useForceUpdate-DA-qGIrz.js";import"./responsiveObserver-eh3CkRQ8.js";import"./useLocale-B5fEOMjY.js";import"./index-BNxrNzwE.js";import"./index-DICP50cq.js";import"./Dropdown-C_ydlxYW.js";import"./Overflow-vieoZhrC.js";import"./EllipsisOutlined-CWuHYn8k.js";import"./SearchOutlined-DC5n_389.js";import"./ExclamationCircleFilled-BXHKs-a4.js";import"./InfoCircleFilled-CN7YLSSN.js";import"./row-xbO0cgu3.js";import"./CheckOutlined-BorBS3ox.js";import"./useNotification-C_uzqUJr.js";import"./index-C7SteZcr.js";import"./CalendarOutlined-fGf3BKFZ.js";import"./index-DmbuE59p.js";import"./PlusOutlined-OWyJAdgg.js";var Ue=["crossOrigin","decoding","draggable","loading","referrerPolicy","sizes","srcSet","useMap","alt"],$e=o.createContext(null),lt=0;function Kt(t,e){var a=o.useState(function(){return lt+=1,String(lt)}),r=A(a,1),i=r[0],c=o.useContext($e),s={data:e,canPreview:t};return o.useEffect(function(){if(c)return c.register(i,s)},[]),o.useEffect(function(){c&&c.register(i,s)},[t,e]),i}function Qt(t){return new Promise(function(e){var a=document.createElement("img");a.onerror=function(){return e(!1)},a.onload=function(){return e(!0)},a.src=t})}function xt(t){var e=t.src,a=t.isCustomPlaceholder,r=t.fallback,i=o.useState(a?"loading":"normal"),c=A(i,2),s=c[0],u=c[1],f=o.useRef(!1),g=s==="error";o.useEffect(function(){var l=!0;return Qt(e).then(function(p){!p&&l&&u("error")}),function(){l=!1}},[e]),o.useEffect(function(){a&&!f.current?u("loading"):g&&u("normal")},[e]);var h=function(){u("normal")},v=function(p){f.current=!1,s==="loading"&&p!==null&&p!==void 0&&p.complete&&(p.naturalWidth||p.naturalHeight)&&(f.current=!0,h())},w=g&&r?{src:r}:{onLoad:h,src:e};return[v,w,s]}function ct(t,e,a,r){var i=e+a,c=(a-r)/2;if(a>r){if(e>0)return te({},t,c);if(e<0&&i<r)return te({},t,-c)}else if(e<0||i>r)return te({},t,e<0?c:-c);return{}}function qt(t,e,a,r){var i=gt(),c=i.width,s=i.height,u=null;return t<=c&&e<=s?u={x:0,y:0}:(t>c||e>s)&&(u=M(M({},ct("x",a,t,c)),ct("y",r,e,s))),u}var ze={x:0,y:0,rotate:0,scale:1,flipX:!1,flipY:!1};function Jt(t,e,a,r){var i=o.useRef(null),c=o.useRef([]),s=o.useState(ze),u=A(s,2),f=u[0],g=u[1],h=function(p){g(ze),r&&!$t(ze,f)&&r({transform:ze,action:p})},v=function(p,m){i.current===null&&(c.current=[],i.current=zt(function(){g(function(d){var x=d;return c.current.forEach(function(y){x=M(M({},x),y)}),i.current=null,r==null||r({transform:x,action:m}),x})})),c.current.push(M(M({},f),p))},w=function(p,m,d,x){var y=t.current,W=y.width,E=y.height,k=y.offsetWidth,F=y.offsetHeight,G=y.offsetLeft,b=y.offsetTop,_=p,j=f.scale*p;j>a?(_=a/f.scale,j=a):j<e&&(_=e/f.scale,j=e);var H=d??innerWidth/2,T=x??innerHeight/2,$=_-1,U=$*W*.5,ae=$*E*.5,V=$*(H-f.x-G),K=$*(T-f.y-b),N=f.x-(V-U),Q=f.y-(K-ae);if(p<1&&j===1){var Y=k*j,X=F*j,q=gt(),ne=q.width,O=q.height;Y<=ne&&X<=O&&(N=0,Q=0)}v({x:N,y:Q,scale:j},m)};return{transform:f,resetTransform:h,updateTransform:v,dispatchZoomChange:w}}var eo=function(e){var a=e.visible,r=e.maskTransitionName,i=e.getContainer,c=e.prefixCls,s=e.rootClassName,u=e.icons,f=e.countRender,g=e.showSwitch,h=e.showProgress,v=e.current,w=e.transform,l=e.count,p=e.scale,m=e.minScale,d=e.maxScale,x=e.closeIcon,y=e.onSwitchLeft,W=e.onSwitchRight,E=e.onClose,k=e.onZoomIn,F=e.onZoomOut,G=e.onRotateRight,b=e.onRotateLeft,_=e.onFlipX,j=e.onFlipY,H=e.toolbarRender,T=o.useContext($e),$=u.rotateLeft,U=u.rotateRight,ae=u.zoomIn,V=u.zoomOut,K=u.close,N=u.left,Q=u.right,Y=u.flipX,X=u.flipY,q="".concat(c,"-operations-operation");o.useEffect(function(){var I=function(Z){Z.keyCode===Ge.ESC&&E()};return a&&window.addEventListener("keydown",I),function(){window.removeEventListener("keydown",I)}},[a]);var ne=[{icon:X,onClick:j,type:"flipY"},{icon:Y,onClick:_,type:"flipX"},{icon:$,onClick:b,type:"rotateLeft"},{icon:U,onClick:G,type:"rotateRight"},{icon:V,onClick:F,type:"zoomOut",disabled:p===m},{icon:ae,onClick:k,type:"zoomIn",disabled:p===d}],O=ne.map(function(I){var P,Z=I.icon,J=I.onClick,S=I.type,ce=I.disabled;return o.createElement("div",{className:oe(q,(P={},te(P,"".concat(c,"-operations-operation-").concat(S),!0),te(P,"".concat(c,"-operations-operation-disabled"),!!ce),P)),onClick:J,key:S},Z)}),le=o.createElement("div",{className:"".concat(c,"-operations")},O);return o.createElement(Dt,{visible:a,motionName:r},function(I){var P=I.className,Z=I.style;return o.createElement(Bt,{open:!0,getContainer:i??document.body},o.createElement("div",{className:oe("".concat(c,"-operations-wrapper"),P,s),style:Z},x===null?null:o.createElement("button",{className:"".concat(c,"-close"),onClick:E},x||K),g&&o.createElement(o.Fragment,null,o.createElement("div",{className:oe("".concat(c,"-switch-left"),te({},"".concat(c,"-switch-left-disabled"),v===0)),onClick:y},N),o.createElement("div",{className:oe("".concat(c,"-switch-right"),te({},"".concat(c,"-switch-right-disabled"),v===l-1)),onClick:W},Q)),o.createElement("div",{className:"".concat(c,"-footer")},h&&o.createElement("div",{className:"".concat(c,"-progress")},f?f(v+1,l):"".concat(v+1," / ").concat(l)),H?H(le,M({icons:{flipYIcon:O[0],flipXIcon:O[1],rotateLeftIcon:O[2],rotateRightIcon:O[3],zoomOutIcon:O[4],zoomInIcon:O[5]},actions:{onFlipY:j,onFlipX:_,onRotateLeft:b,onRotateRight:G,onZoomOut:F,onZoomIn:k},transform:w},T?{current:v,total:l}:{})):le)))})},Oe=1,to=1,oo=["fallback","src","imgRef"],ao=["prefixCls","src","alt","fallback","movable","onClose","visible","icons","rootClassName","closeIcon","getContainer","current","count","countRender","scaleStep","minScale","maxScale","transitionName","maskTransitionName","imageRender","imgCommonProps","toolbarRender","onTransform","onChange"],no=function(e){var a=e.fallback,r=e.src,i=e.imgRef,c=Ee(e,oo),s=xt({src:r,fallback:a}),u=A(s,2),f=u[0],g=u[1];return we.createElement("img",B({ref:function(v){i.current=v,f(v)}},c,g))},St=function(e){var a=e.prefixCls,r=e.src,i=e.alt,c=e.fallback,s=e.movable,u=s===void 0?!0:s,f=e.onClose,g=e.visible,h=e.icons,v=h===void 0?{}:h,w=e.rootClassName,l=e.closeIcon,p=e.getContainer,m=e.current,d=m===void 0?0:m,x=e.count,y=x===void 0?1:x,W=e.countRender,E=e.scaleStep,k=E===void 0?.5:E,F=e.minScale,G=F===void 0?1:F,b=e.maxScale,_=b===void 0?50:b,j=e.transitionName,H=j===void 0?"zoom":j,T=e.maskTransitionName,$=T===void 0?"fade":T,U=e.imageRender,ae=e.imgCommonProps,V=e.toolbarRender,K=e.onTransform,N=e.onChange,Q=Ee(e,ao),Y=o.useRef(),X=o.useRef({deltaX:0,deltaY:0,transformX:0,transformY:0}),q=o.useState(!1),ne=A(q,2),O=ne[0],le=ne[1],I=o.useContext($e),P=I&&y>1,Z=I&&y>=1,J=Jt(Y,G,_,K),S=J.transform,ce=J.resetTransform,z=J.updateTransform,me=J.dispatchZoomChange,_e=o.useState(!0),he=A(_e,2),Ce=he[0],ee=he[1],D=S.rotate,L=S.scale,de=S.x,ue=S.y,Xe=oe(te({},"".concat(a,"-moving"),O));o.useEffect(function(){Ce||ee(!0)},[Ce]);var Ze=function(){ce("close")},Se=function(){me(Oe+k,"zoomIn")},Be=function(){me(Oe/(Oe+k),"zoomOut")},He=function(){z({rotate:D+90},"rotateRight")},Ve=function(){z({rotate:D-90},"rotateLeft")},ge=function(){z({flipX:!S.flipX},"flipX")},ve=function(){z({flipY:!S.flipY},"flipY")},Ne=function(C){C==null||C.preventDefault(),C==null||C.stopPropagation(),d>0&&(ee(!1),ce("prev"),N==null||N(d-1,d))},Le=function(C){C==null||C.preventDefault(),C==null||C.stopPropagation(),d<y-1&&(ee(!1),ce("next"),N==null||N(d+1,d))},Ae=function(){if(g&&O){le(!1);var C=X.current,be=C.transformX,ye=C.transformY,re=de!==be&&ue!==ye;if(!re)return;var Ie=Y.current.offsetWidth*L,je=Y.current.offsetHeight*L,Re=Y.current.getBoundingClientRect(),Pt=Re.left,Et=Re.top,tt=D%180!==0,ot=qt(tt?je:Ie,tt?Ie:je,Pt,Et);ot&&z(M({},ot),"dragRebound")}},jt=function(C){!u||C.button!==0||(C.preventDefault(),C.stopPropagation(),X.current={deltaX:C.pageX-S.x,deltaY:C.pageY-S.y,transformX:S.x,transformY:S.y},le(!0))},Je=function(C){g&&O&&z({x:C.pageX-X.current.deltaX,y:C.pageY-X.current.deltaY},"move")},Rt=function(C){if(!(!g||C.deltaY==0)){var be=Math.abs(C.deltaY/100),ye=Math.min(be,to),re=Oe+ye*k;C.deltaY>0&&(re=Oe/re),me(re,"wheel",C.clientX,C.clientY)}},kt=function(C){!g||!P||(C.keyCode===Ge.LEFT?Ne():C.keyCode===Ge.RIGHT&&Le())},Ot=function(C){g&&(L!==1?z({x:0,y:0,scale:1},"doubleClick"):me(Oe+k,"doubleClick",C.clientX,C.clientY))};o.useEffect(function(){var R,C,be,ye;if(u){be=Te(window,"mouseup",Ae,!1),ye=Te(window,"mousemove",Je,!1);try{window.top!==window.self&&(R=Te(window.top,"mouseup",Ae,!1),C=Te(window.top,"mousemove",Je,!1))}catch{}}return function(){var re,Ie,je,Re;(re=be)===null||re===void 0||re.remove(),(Ie=ye)===null||Ie===void 0||Ie.remove(),(je=R)===null||je===void 0||je.remove(),(Re=C)===null||Re===void 0||Re.remove()}},[g,O,de,ue,D,u]),o.useEffect(function(){var R=Te(window,"keydown",kt,!1);return function(){R.remove()}},[g,P,d]);var et=we.createElement(no,B({},ae,{width:e.width,height:e.height,imgRef:Y,className:"".concat(a,"-img"),alt:i,style:{transform:"translate3d(".concat(S.x,"px, ").concat(S.y,"px, 0) scale3d(").concat(S.flipX?"-":"").concat(L,", ").concat(S.flipY?"-":"").concat(L,", 1) rotate(").concat(D,"deg)"),transitionDuration:!Ce&&"0s"},fallback:c,src:r,onWheel:Rt,onMouseDown:jt,onDoubleClick:Ot}));return we.createElement(we.Fragment,null,we.createElement(Nt,B({transitionName:H,maskTransitionName:$,closable:!1,keyboard:!0,prefixCls:a,onClose:f,visible:g,classNames:{wrapper:Xe},rootClassName:w,getContainer:p},Q,{afterClose:Ze}),we.createElement("div",{className:"".concat(a,"-img-wrapper")},U?U(et,M({transform:S},I?{current:d}:{})):et)),we.createElement(eo,{visible:g,transform:S,maskTransitionName:$,closeIcon:l,getContainer:p,prefixCls:a,rootClassName:w,icons:v,countRender:W,showSwitch:P,showProgress:Z,current:d,count:y,scale:L,minScale:G,maxScale:_,toolbarRender:V,onSwitchLeft:Ne,onSwitchRight:Le,onZoomIn:Se,onZoomOut:Be,onRotateRight:He,onRotateLeft:Ve,onFlipX:ge,onFlipY:ve,onClose:f}))};function ro(t){var e=o.useState({}),a=A(e,2),r=a[0],i=a[1],c=o.useCallback(function(u,f){return i(function(g){return M(M({},g),{},te({},u,f))}),function(){i(function(g){var h=M({},g);return delete h[u],h})}},[]),s=o.useMemo(function(){return t?t.map(function(u){if(typeof u=="string")return{data:{src:u}};var f={};return Object.keys(u).forEach(function(g){["src"].concat(Ft(Ue)).includes(g)&&(f[g]=u[g])}),{data:f}}):Object.keys(r).reduce(function(u,f){var g=r[f],h=g.canPreview,v=g.data;return h&&u.push({data:v,id:f}),u},[])},[t,r]);return[s,c]}var io=["visible","onVisibleChange","getContainer","current","movable","minScale","maxScale","countRender","closeIcon","onChange","onTransform","toolbarRender","imageRender"],so=["src"],lo=function(e){var a,r=e.previewPrefixCls,i=r===void 0?"rc-image-preview":r,c=e.children,s=e.icons,u=s===void 0?{}:s,f=e.items,g=e.preview,h=e.fallback,v=ut(g)==="object"?g:{},w=v.visible,l=v.onVisibleChange,p=v.getContainer,m=v.current,d=v.movable,x=v.minScale,y=v.maxScale,W=v.countRender,E=v.closeIcon,k=v.onChange,F=v.onTransform,G=v.toolbarRender,b=v.imageRender,_=Ee(v,io),j=ro(f),H=A(j,2),T=H[0],$=H[1],U=We(0,{value:m}),ae=A(U,2),V=ae[0],K=ae[1],N=o.useState(!1),Q=A(N,2),Y=Q[0],X=Q[1],q=((a=T[V])===null||a===void 0?void 0:a.data)||{},ne=q.src,O=Ee(q,so),le=We(!!w,{value:w,onChange:function(D,L){l==null||l(D,L,V)}}),I=A(le,2),P=I[0],Z=I[1],J=o.useState(null),S=A(J,2),ce=S[0],z=S[1],me=o.useCallback(function(ee,D,L){var de=T.findIndex(function(ue){return ue.id===ee});Z(!0),z({x:D,y:L}),K(de<0?0:de),X(!0)},[T]);o.useEffect(function(){P?Y||K(0):X(!1)},[P]);var _e=function(D,L){K(D),k==null||k(D,L)},he=function(){Z(!1),z(null)},Ce=o.useMemo(function(){return{register:$,onPreview:me}},[$,me]);return o.createElement($e.Provider,{value:Ce},c,o.createElement(St,B({"aria-hidden":!P,movable:d,visible:P,prefixCls:i,closeIcon:E,onClose:he,mousePosition:ce,imgCommonProps:O,src:ne,fallback:h,icons:u,minScale:x,maxScale:y,getContainer:p,current:V,count:T.length,countRender:W,onTransform:F,toolbarRender:G,imageRender:b,onChange:_e},_)))},co=["src","alt","onPreviewClose","prefixCls","previewPrefixCls","placeholder","fallback","width","height","style","preview","className","onClick","onError","wrapperClassName","wrapperStyle","rootClassName"],mo=["src","visible","onVisibleChange","getContainer","mask","maskClassName","movable","icons","scaleStep","minScale","maxScale","imageRender","toolbarRender"],Ye=function(e){var a=e.src,r=e.alt,i=e.onPreviewClose,c=e.prefixCls,s=c===void 0?"rc-image":c,u=e.previewPrefixCls,f=u===void 0?"".concat(s,"-preview"):u,g=e.placeholder,h=e.fallback,v=e.width,w=e.height,l=e.style,p=e.preview,m=p===void 0?!0:p,d=e.className,x=e.onClick,y=e.onError,W=e.wrapperClassName,E=e.wrapperStyle,k=e.rootClassName,F=Ee(e,co),G=g&&g!==!0,b=ut(m)==="object"?m:{},_=b.src,j=b.visible,H=j===void 0?void 0:j,T=b.onVisibleChange,$=T===void 0?i:T,U=b.getContainer,ae=U===void 0?void 0:U,V=b.mask,K=b.maskClassName,N=b.movable,Q=b.icons,Y=b.scaleStep,X=b.minScale,q=b.maxScale,ne=b.imageRender,O=b.toolbarRender,le=Ee(b,mo),I=_??a,P=We(!!H,{value:H,onChange:$}),Z=A(P,2),J=Z[0],S=Z[1],ce=xt({src:a,isCustomPlaceholder:G,fallback:h}),z=A(ce,3),me=z[0],_e=z[1],he=z[2],Ce=o.useState(null),ee=A(Ce,2),D=ee[0],L=ee[1],de=o.useContext($e),ue=!!m,Xe=function(){S(!1),L(null)},Ze=oe(s,W,k,te({},"".concat(s,"-error"),he==="error")),Se=o.useMemo(function(){var ge={};return Ue.forEach(function(ve){e[ve]!==void 0&&(ge[ve]=e[ve])}),ge},Ue.map(function(ge){return e[ge]})),Be=o.useMemo(function(){return M(M({},Se),{},{src:I})},[I,Se]),He=Kt(ue,Be),Ve=function(ve){var Ne=_t(ve.target),Le=Ne.left,Ae=Ne.top;de?de.onPreview(He,Le,Ae):(L({x:Le,y:Ae}),S(!0)),x==null||x(ve)};return o.createElement(o.Fragment,null,o.createElement("div",B({},F,{className:Ze,onClick:ue?Ve:x,style:M({width:v,height:w},E)}),o.createElement("img",B({},Se,{className:oe("".concat(s,"-img"),te({},"".concat(s,"-img-placeholder"),g===!0),d),style:M({height:w},l),ref:me},_e,{width:v,height:w,onError:y})),he==="loading"&&o.createElement("div",{"aria-hidden":"true",className:"".concat(s,"-placeholder")},g),V&&ue&&o.createElement("div",{className:oe("".concat(s,"-mask"),K),style:{display:(l==null?void 0:l.display)==="none"?"none":void 0}},V)),!de&&ue&&o.createElement(St,B({"aria-hidden":!J,visible:J,prefixCls:f,onClose:Xe,mousePosition:D,src:I,alt:r,fallback:h,getContainer:ae,icons:Q,movable:N,scaleStep:Y,minScale:X,maxScale:q,rootClassName:k,imageRender:ne,imgCommonProps:Se,toolbarRender:O},le)))};Ye.PreviewGroup=lo;Ye.displayName="Image";var uo={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z"}},{tag:"path",attrs:{d:"M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z"}}]},name:"rotate-left",theme:"outlined"};const fo=uo;var go=function(e,a){return o.createElement(Me,B({},e,{ref:a,icon:fo}))};const vo=o.forwardRef(go);var po={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z"}},{tag:"path",attrs:{d:"M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z"}}]},name:"rotate-right",theme:"outlined"};const ho=po;var Co=function(e,a){return o.createElement(Me,B({},e,{ref:a,icon:ho}))};const wo=o.forwardRef(Co);var xo={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"}}]},name:"zoom-in",theme:"outlined"};const So=xo;var bo=function(e,a){return o.createElement(Me,B({},e,{ref:a,icon:So}))};const yo=o.forwardRef(bo);var Io={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"}}]},name:"zoom-out",theme:"outlined"};const jo=Io;var Ro=function(e,a){return o.createElement(Me,B({},e,{ref:a,icon:jo}))};const ko=o.forwardRef(Ro),Ke=t=>({position:t||"absolute",inset:0}),Oo=t=>{const{iconCls:e,motionDurationSlow:a,paddingXXS:r,marginXXS:i,prefixCls:c,colorTextLightSolid:s}=t;return{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",color:s,background:new xe("#000").setAlpha(.5).toRgbString(),cursor:"pointer",opacity:0,transition:`opacity ${a}`,[`.${c}-mask-info`]:Object.assign(Object.assign({},Xt),{padding:`0 ${r}px`,[e]:{marginInlineEnd:i,svg:{verticalAlign:"baseline"}}})}},Po=t=>{const{previewCls:e,modalMaskBg:a,paddingSM:r,marginXL:i,margin:c,paddingLG:s,previewOperationColorDisabled:u,previewOperationHoverColor:f,motionDurationSlow:g,iconCls:h,colorTextLightSolid:v}=t,w=new xe(a).setAlpha(.1),l=w.clone().setAlpha(.2);return{[`${e}-footer`]:{position:"fixed",bottom:i,left:{_skip_check_:!0,value:0},width:"100%",display:"flex",flexDirection:"column",alignItems:"center",color:t.previewOperationColor},[`${e}-progress`]:{marginBottom:c},[`${e}-close`]:{position:"fixed",top:i,right:{_skip_check_:!0,value:i},display:"flex",color:v,backgroundColor:w.toRgbString(),borderRadius:"50%",padding:r,outline:0,border:0,cursor:"pointer",transition:`all ${g}`,"&:hover":{backgroundColor:l.toRgbString()},[`& > ${h}`]:{fontSize:t.previewOperationSize}},[`${e}-operations`]:{display:"flex",alignItems:"center",padding:`0 ${s}px`,backgroundColor:w.toRgbString(),borderRadius:100,"&-operation":{marginInlineStart:r,padding:r,cursor:"pointer",transition:`all ${g}`,userSelect:"none",[`&:not(${e}-operations-operation-disabled):hover > ${h}`]:{color:f},"&-disabled":{color:u,cursor:"not-allowed"},"&:first-of-type":{marginInlineStart:0},[`& > ${h}`]:{fontSize:t.previewOperationSize}}}}},Eo=t=>{const{modalMaskBg:e,iconCls:a,previewOperationColorDisabled:r,previewCls:i,zIndexPopup:c,motionDurationSlow:s}=t,u=new xe(e).setAlpha(.1),f=u.clone().setAlpha(.2);return{[`${i}-switch-left, ${i}-switch-right`]:{position:"fixed",insetBlockStart:"50%",zIndex:c+1,display:"flex",alignItems:"center",justifyContent:"center",width:t.imagePreviewSwitchSize,height:t.imagePreviewSwitchSize,marginTop:-t.imagePreviewSwitchSize/2,color:t.previewOperationColor,background:u.toRgbString(),borderRadius:"50%",transform:"translateY(-50%)",cursor:"pointer",transition:`all ${s}`,userSelect:"none","&:hover":{background:f.toRgbString()},"&-disabled":{"&, &:hover":{color:r,background:"transparent",cursor:"not-allowed",[`> ${a}`]:{cursor:"not-allowed"}}},[`> ${a}`]:{fontSize:t.previewOperationSize}},[`${i}-switch-left`]:{insetInlineStart:t.marginSM},[`${i}-switch-right`]:{insetInlineEnd:t.marginSM}}},Mo=t=>{const{motionEaseOut:e,previewCls:a,motionDurationSlow:r,componentCls:i}=t;return[{[`${i}-preview-root`]:{[a]:{height:"100%",textAlign:"center",pointerEvents:"none"},[`${a}-body`]:Object.assign(Object.assign({},Ke()),{overflow:"hidden"}),[`${a}-img`]:{maxWidth:"100%",maxHeight:"70%",verticalAlign:"middle",transform:"scale3d(1, 1, 1)",cursor:"grab",transition:`transform ${r} ${e} 0s`,userSelect:"none","&-wrapper":Object.assign(Object.assign({},Ke()),{transition:`transform ${r} ${e} 0s`,display:"flex",justifyContent:"center",alignItems:"center","& > *":{pointerEvents:"auto"},"&::before":{display:"inline-block",width:1,height:"50%",marginInlineEnd:-1,content:'""'}})},[`${a}-moving`]:{[`${a}-preview-img`]:{cursor:"grabbing","&-wrapper":{transitionDuration:"0s"}}}}},{[`${i}-preview-root`]:{[`${a}-wrap`]:{zIndex:t.zIndexPopup}}},{[`${i}-preview-operations-wrapper`]:{position:"fixed",zIndex:t.zIndexPopup+1},"&":[Po(t),Eo(t)]}]},_o=t=>{const{componentCls:e}=t;return{[e]:{position:"relative",display:"inline-block",[`${e}-img`]:{width:"100%",height:"auto",verticalAlign:"middle"},[`${e}-img-placeholder`]:{backgroundColor:t.colorBgContainerDisabled,backgroundImage:"url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTQuNSAyLjVoLTEzQS41LjUgMCAwIDAgMSAzdjEwYS41LjUgMCAwIDAgLjUuNWgxM2EuNS41IDAgMCAwIC41LS41VjNhLjUuNSAwIDAgMC0uNS0uNXpNNS4yODEgNC43NWExIDEgMCAwIDEgMCAyIDEgMSAwIDAgMSAwLTJ6bTguMDMgNi44M2EuMTI3LjEyNyAwIDAgMS0uMDgxLjAzSDIuNzY5YS4xMjUuMTI1IDAgMCAxLS4wOTYtLjIwN2wyLjY2MS0zLjE1NmEuMTI2LjEyNiAwIDAgMSAuMTc3LS4wMTZsLjAxNi4wMTZMNy4wOCAxMC4wOWwyLjQ3LTIuOTNhLjEyNi4xMjYgMCAwIDEgLjE3Ny0uMDE2bC4wMTUuMDE2IDMuNTg4IDQuMjQ0YS4xMjcuMTI3IDAgMCAxLS4wMi4xNzV6IiBmaWxsPSIjOEM4QzhDIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=')",backgroundRepeat:"no-repeat",backgroundPosition:"center center",backgroundSize:"30%"},[`${e}-mask`]:Object.assign({},Oo(t)),[`${e}-mask:hover`]:{opacity:1},[`${e}-placeholder`]:Object.assign({},Ke())}}},No=t=>{const{previewCls:e}=t;return{[`${e}-root`]:Wt(t,"zoom"),"&":At(t,!0)}},bt=Yt("Image",t=>{const e=`${t.componentCls}-preview`,a=nt(t,{previewCls:e,modalMaskBg:new xe("#000").setAlpha(.45).toRgbString(),imagePreviewSwitchSize:t.controlHeightLG});return[_o(a),Mo(a),Lt(nt(a,{componentCls:e})),No(a)]},t=>({zIndexPopup:t.zIndexPopupBase+80,previewOperationColor:new xe(t.colorTextLightSolid).setAlpha(.65).toRgbString(),previewOperationHoverColor:new xe(t.colorTextLightSolid).setAlpha(.85).toRgbString(),previewOperationColorDisabled:new xe(t.colorTextLightSolid).setAlpha(.25).toRgbString(),previewOperationSize:t.fontSizeIcon*1.5}));var Lo=function(t,e){var a={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(a[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(a[r[i]]=t[r[i]]);return a};const yt={rotateLeft:o.createElement(vo,null),rotateRight:o.createElement(wo,null),zoomIn:o.createElement(yo,null),zoomOut:o.createElement(ko,null),close:o.createElement(Zt,null),left:o.createElement(Ht,null),right:o.createElement(Vt,null),flipX:o.createElement(it,null),flipY:o.createElement(it,{rotate:90})},Ao=t=>{var{previewPrefixCls:e,preview:a}=t,r=Lo(t,["previewPrefixCls","preview"]);const{getPrefixCls:i}=o.useContext(ht),c=i("image",e),s=`${c}-preview`,u=i(),[f,g]=bt(c),h=o.useMemo(()=>{var v;if(a===!1)return a;const w=typeof a=="object"?a:{},l=oe(g,(v=w.rootClassName)!==null&&v!==void 0?v:"");return Object.assign(Object.assign({},w),{transitionName:Fe(u,"zoom",w.transitionName),maskTransitionName:Fe(u,"fade",w.maskTransitionName),rootClassName:l})},[a]);return f(o.createElement(Ye.PreviewGroup,Object.assign({preview:h,previewPrefixCls:s,icons:yt},r)))},To=Ao;var mt=function(t,e){var a={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(a[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(a[r[i]]=t[r[i]]);return a};const It=t=>{const{prefixCls:e,preview:a,className:r,rootClassName:i,style:c}=t,s=mt(t,["prefixCls","preview","className","rootClassName","style"]),{getPrefixCls:u,locale:f=rt,getPopupContainer:g,image:h}=o.useContext(ht),v=u("image",e),w=u(),l=f.Image||rt.Image,[p,m]=bt(v),d=oe(i,m),x=oe(r,m,h==null?void 0:h.className),y=o.useMemo(()=>{if(a===!1)return a;const E=typeof a=="object"?a:{},{getContainer:k}=E,F=mt(E,["getContainer"]);return Object.assign(Object.assign({mask:o.createElement("div",{className:`${v}-mask-info`},o.createElement(Tt,null),l==null?void 0:l.preview),icons:yt},F),{getContainer:k||g,transitionName:Fe(w,"zoom",E.transitionName),maskTransitionName:Fe(w,"fade",E.maskTransitionName)})},[a,l]),W=Object.assign(Object.assign({},h==null?void 0:h.style),c);return p(o.createElement(Ye,Object.assign({prefixCls:v,preview:y,rootClassName:d,className:x,style:W},s)))};It.PreviewGroup=To;const $o=It;var zo={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M885.9 490.3c3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-51.6-30.7-98.1-78.3-118.4a66.1 66.1 0 00-26.5-5.4H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h129.3l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4 20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3 40.4-23.5 65.5-66.1 65.5-111 0-28.3-9.3-55.5-26.1-77.7zM184 456V172h81v284h-81zm627.2 160.4H496.8l9.6 198.4c.6 11.9-4.7 23.1-14.6 30.5-6.1 4.5-13.6 6.8-21.1 6.7a44.28 44.28 0 01-42.2-32.3L329 459.2V172h415.4a56.85 56.85 0 0133.6 51.8c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0119.6 43c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0119.6 43c0 9.7-2.3 18.9-6.9 27.3l-14 25.5 21.9 19a56.76 56.76 0 0119.6 43c0 19.1-11 37.5-28.8 48.4z"}}]},name:"dislike",theme:"outlined"};const Do=zo;var Fo=function(e,a){return o.createElement(Me,B({},e,{ref:a,icon:Do}))};const Yo=o.forwardRef(Fo);var Xo={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"}}]},name:"like",theme:"outlined"};const Zo=Xo;var Bo=function(e,a){return o.createElement(Me,B({},e,{ref:a,icon:Zo}))};const Ho=o.forwardRef(Bo),Vo=ft.div`
`,Wo=ft.div`
    margin: 4rem 3rem;
`,{Option:pe}=se,Go=()=>{const[t,e]=o.useState([]),[a,r]=o.useState(!1),[i,c]=o.useState(!1),[s,u]=o.useState(null),[f]=Mt();o.useEffect(()=>{(async()=>{try{const p=await ie.get("/companies");e(p.data)}catch(p){console.error("Erro ao buscar empresas",p)}})()},[]);const g=l=>{u(l),f.setFieldsValue({nome:l.nome,cnpj:l.cnpj,payment_type:l.payment_type,service_id:l.service_id,payment_confirm:l.payment_confirm,token_expiration:l.token_expiration||""}),c(!0)},h=async()=>{try{const l=await f.validateFields();await ie.put(`/companies/${s.company_id}`,{nome:l.nome,payment_type:l.payment_type,service_id:l.service_id,payment_confirm:l.payment_confirm}),l.token_expiration&&await ie.put(`/companies/${s.company_id}/updateTokenExpiration`,{token_expiration:l.token_expiration});const p=await ie.get("/companies");e(p.data),De.success({message:"Empresa atualizada com sucesso!"}),c(!1),f.resetFields()}catch(l){De.error({message:"Erro ao atualizar empresa!"}),console.error("Erro ao atualizar empresa",l)}},v=()=>{c(!1),f.resetFields()},w=[{title:"Nome",dataIndex:"nome",key:"name",filterDropdown:({setSelectedKeys:l,selectedKeys:p,confirm:m,clearFilters:d})=>n.jsxs("div",{style:{padding:8},children:[n.jsx(Pe,{placeholder:"Pesquisar nome",value:p[0],onChange:x=>l(x.target.value?[x.target.value]:[]),onPressEnter:()=>m(),style:{marginBottom:8,display:"block"}}),n.jsx(fe,{type:"primary",onClick:()=>m(),size:"small",style:{width:90},children:"Pesquisar"}),n.jsx(fe,{onClick:()=>d(),size:"small",style:{width:90},children:"Resetar"})]}),onFilter:(l,p)=>p.nome.toString().toLowerCase().includes(l.toLowerCase())},{title:"CNPJ/CPF",dataIndex:"cnpj",key:"cnpj",filterDropdown:({setSelectedKeys:l,selectedKeys:p,confirm:m,clearFilters:d})=>n.jsxs("div",{style:{padding:8},children:[n.jsx(Pe,{placeholder:"Pesquisar CNPJ/CPF",value:p[0],onChange:x=>l(x.target.value?[x.target.value]:[]),onPressEnter:()=>m(),style:{marginBottom:8,display:"block"}}),n.jsx(fe,{type:"primary",onClick:()=>m(),size:"small",style:{width:90,marginRight:8},children:"Pesquisar"}),n.jsx(fe,{onClick:()=>d(),size:"small",style:{width:90},children:"Resetar"})]}),onFilter:(l,p)=>p.cnpj.toString().toLowerCase().includes(l.toLowerCase())},{title:"Contato",dataIndex:"telefone",key:"telefone",render:(l,p)=>{const m=l?l.replace(/[^0-9]/g,""):"",d=m?`https://wa.me/${m}`:"javascript:void(0);";return n.jsxs(n.Fragment,{children:[l||"Não disponível",n.jsx("a",{href:d,target:"_blank",rel:"noopener noreferrer",children:n.jsx(fe,{icon:n.jsx(vt,{}),shape:"circle",style:{marginLeft:8},disabled:!m})})]})}},{title:"Plano",dataIndex:"service_id",key:"service_id"},{title:"Contrato",dataIndex:"payment_type",key:"payment_type"},{title:"Status do Pagamento",dataIndex:"payment_confirm",key:"payment_confirm",render:l=>l?"Confirmado":"Pendente"},{title:"Data de Expiração do Token",dataIndex:"token_expiration",key:"token_expiration"},{title:"Ações",key:"actions",render:(l,p)=>n.jsx(fe,{type:"primary",onClick:()=>g(p),children:"Alterar"})}];return n.jsxs(n.Fragment,{children:[n.jsxs(Vo,{children:[n.jsx("h2",{children:"Administralção de clientes"}),n.jsx(Qe,{columns:w,dataSource:t,loading:a})]}),n.jsx(qe,{title:"Editar Empresa",open:i,onOk:h,onCancel:v,children:n.jsxs(ke,{form:f,labelCol:{span:8},wrapperCol:{span:16},initialValues:{...s},children:[n.jsx(ke.Item,{label:"Nome",name:"nome",children:n.jsx(Pe,{})}),n.jsx(ke.Item,{label:"Contrato",name:"payment_type",children:n.jsxs(se,{placeholder:"Selecione o tipo de contrato",children:[n.jsx(pe,{value:"anual",children:"Anual"}),n.jsx(pe,{value:"mensal",children:"Mensal"})]})}),n.jsx(ke.Item,{label:"Plano",name:"service_id",children:n.jsxs(se,{placeholder:"Selecione o plano",children:[n.jsx(pe,{value:1,children:"Plus"}),n.jsx(pe,{value:2,children:"Pro"}),n.jsx(pe,{value:3,children:"Premium"}),n.jsx(pe,{value:4,children:"Teste"})]})}),n.jsx(ke.Item,{label:"Status do Pagamento",name:"payment_confirm",children:n.jsxs(se,{placeholder:"Selecione o status do pagamento",children:[n.jsx(pe,{value:!0,children:"Pago"}),n.jsx(pe,{value:!1,children:"Em aberto"})]})}),n.jsx(ke.Item,{label:"Acesso até",name:"token_expiration",children:n.jsx(Pe,{placeholder:"YYYY-MM-DD HH:mm:ss"})})]})})]})},Uo=()=>{const[t,e]=o.useState([]),{authData:a}=dt(),r=a.companyID,[i,c]=o.useState(!1),[s,u]=o.useState(null),[f,g]=o.useState(""),[h,v]=o.useState("");o.useEffect(()=>{(async()=>{try{const d=await ie.get(`/chamados/${r}`);console.log(d),e(d.data)}catch(d){console.error("Erro ao buscar chamados:",d)}})()},[r]);const w=m=>{var d;u(m),g(((d=m.status)==null?void 0:d.toString())||"0"),v(""),c(!0)},l=async()=>{if(!(!s||f===""))try{await ie.put(`/chamados/${s.id}`,{status:f,answer:h}),f==="2"&&s.image_path&&await ie.delete(`/chamados/${s.id}/deleteImage`),c(!1);const m=await ie.get(`/chamados/${r}`);e(m.data)}catch(m){console.error("Erro ao atualizar chamado:",m)}},p=[{title:"Número do Chamado",dataIndex:"ticket_number",key:"ticket_number"},{title:"Empresa",dataIndex:"company_name",key:"company_name"},{title:"Tipo",dataIndex:"type",key:"type"},{title:"Descrição",dataIndex:"description",key:"description",render:(m,d)=>n.jsx(n.Fragment,{children:n.jsx("span",{style:{marginRight:"10px"},children:m.substring(0,30)+(m.length>30?"...":"")})})},{title:"Status",dataIndex:"status",key:"status",render:m=>n.jsx(Ct,{title:m===null?"A Iniciar":m===1?"Em Andamento":"Concluído",children:n.jsxs("span",{children:[m===null?n.jsx(wt,{style:{color:"red",marginRight:8}}):m===1?n.jsx(Ut,{style:{color:"orange",marginRight:8}}):n.jsx(Gt,{style:{color:"green",marginRight:8}}),m===null?"A Iniciar":m===1?"Em Andamento":"Concluído"]})})},{title:"Ações",key:"actions",render:(m,d)=>n.jsx(fe,{type:"primary",onClick:()=>w(d),children:"Iniciar"})}];return o.useEffect(()=>{s!=null&&s.image_path&&console.log(`URL da imagem: ${at}${s.image_path}`)},[s]),n.jsxs(n.Fragment,{children:[n.jsx(Qe,{dataSource:t,columns:p,rowKey:"id"}),";",n.jsxs(qe,{title:"Atender Chamado",open:i,okText:"Salvar",onOk:l,onCancel:()=>c(!1),children:[n.jsx(pt,{}),n.jsx("p",{children:s==null?void 0:s.description}),(s==null?void 0:s.image_path)&&n.jsx("div",{style:{marginBottom:20,textAlign:"center"},children:n.jsx($o,{width:200,src:`${at}${s.image_path}`,alt:"Imagem do Chamado",style:{marginBottom:20}})}),n.jsxs(se,{value:f,onChange:g,style:{width:120,marginBottom:20},children:[n.jsx(se.Option,{value:"1",children:"Em andamento"}),n.jsx(se.Option,{value:"2",children:"Concluído"})]}),n.jsx(Pe.TextArea,{value:h,onChange:m=>v(m.target.value),placeholder:"Descreva a resolução"})]})]})},Ko=()=>{const[t,e]=o.useState([]),{authData:a}=dt(),r=a.companyID,[i,c]=o.useState(!1),[s,u]=o.useState(null),[f,g]=o.useState(""),[h,v]=o.useState("");o.useEffect(()=>{(async()=>{try{const d=await ie.get(`/recommendations/${r}`);console.log(d),e(d.data)}catch(d){console.error("Erro ao buscar chamados:",d)}})()},[r]);const w=m=>{var d;u(m),g(((d=m.status)==null?void 0:d.toString())||"0"),v(""),c(!0)},l=async()=>{if(!(!s||f===""||!s.id)){if(f==="2"&&!h.trim()){De.error({message:"Por favor, forneça o motivo da não adesão."});return}try{const{id:m}=s;await ie.put(`/recommendations/${m}`,{status:f,motivo:h}),e(t.map(d=>d.id===m?{...d,status:f,motivo:h}:d)),De.success({message:"Tratamento salvo com sucesso!"}),c(!1)}catch(m){console.error("Erro ao tratar recomendação chamado:",m)}}},p=[{title:"Quem indicou",dataIndex:"company_name",key:"company_name"},{title:"Indicado",dataIndex:"indicated",key:"indicated"},{title:"Especialidade",dataIndex:"especialidade",key:"especialidade"},{title:"Telefone",dataIndex:"telefone",key:"telefone",render:(m,d)=>{const x=m?m.replace(/[^0-9]/g,""):"",y=x?`https://wa.me/${x}`:"javascript:void(0);";return n.jsxs(n.Fragment,{children:[m||"Não disponível",n.jsx("a",{href:y,target:"_blank",rel:"noopener noreferrer",children:n.jsx(fe,{icon:n.jsx(vt,{}),shape:"circle",style:{marginLeft:8},disabled:!x})})]})}},{title:"Status",dataIndex:"status",key:"status",render:m=>{let d;switch(m){case"1":d={icon:n.jsx(Ho,{style:{color:"green",marginRight:8}}),text:"Aderiu"};break;case"2":d={icon:n.jsx(Yo,{style:{color:"red",marginRight:8}}),text:"Não Aderiu"};break;default:d={icon:n.jsx(wt,{style:{color:"orange",marginRight:8}}),text:"A Iniciar"}}return n.jsx(Ct,{title:d.text,children:n.jsxs("span",{children:[d.icon,d.text]})})}},{title:"Ações",key:"actions",render:(m,d)=>n.jsx(fe,{type:"primary",onClick:()=>w(d),children:"Tratar"})}];return n.jsxs(n.Fragment,{children:[n.jsx(Qe,{dataSource:t,columns:p,rowKey:"id"}),";",n.jsxs(qe,{title:"Tratar Indicação",open:i,okText:"Salvar",onOk:l,onCancel:()=>c(!1),children:[n.jsx(pt,{}),n.jsx("p",{children:s==null?void 0:s.motivo}),n.jsxs(se,{value:f,onChange:g,style:{width:120,marginBottom:20},children:[n.jsx(se.Option,{value:"1",children:"Aderiu"}),n.jsx(se.Option,{value:"2",children:"Nao aderiu"})]}),n.jsx(Pe.TextArea,{value:h,onChange:m=>v(m.target.value),placeholder:"Descreva o motivo da não adesão"})]})]})};function Ya(){const t=[{key:"1",tab:"Controle de Acesso",content:n.jsx(n.Fragment,{children:n.jsx(Go,{})})},{key:"2",tab:"Chamados",content:n.jsx(n.Fragment,{children:n.jsx(Uo,{})})},{key:"3",tab:"Indicações",content:n.jsx(n.Fragment,{children:n.jsx(Ko,{})})}];return n.jsx(Wo,{children:n.jsx(st,{defaultActiveKey:"1",children:t.map(e=>n.jsx(st.TabPane,{tab:e.tab,children:e.content},e.key))})})}export{Ya as default};
