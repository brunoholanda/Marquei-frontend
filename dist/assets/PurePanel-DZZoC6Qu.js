import{d as M}from"./AntdIcon-rDAQJIgd.js";import{r as o}from"./index-kPzU05gx.js";import{Q as w,E as D,C as T}from"./useSize-Dir-JjEK.js";var L=`accept acceptCharset accessKey action allowFullScreen allowTransparency
    alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge
    charSet checked classID className colSpan cols content contentEditable contextMenu
    controls coords crossOrigin data dateTime default defer dir disabled download draggable
    encType form formAction formEncType formMethod formNoValidate formTarget frameBorder
    headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity
    is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media
    mediaGroup method min minLength multiple muted name noValidate nonce open
    optimum pattern placeholder poster preload radioGroup readOnly rel required
    reversed role rowSpan rows sandbox scope scoped scrolling seamless selected
    shape size sizes span spellCheck src srcDoc srcLang srcSet start step style
    summary tabIndex target title type useMap value width wmode wrap`,j=`onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown
    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick
    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown
    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel
    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough
    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata
    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError`,k="".concat(L," ").concat(j).split(/[\s\n]+/),z="aria-",I="data-";function h(t,e){return t.indexOf(e)===0}function H(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n;e===!1?n={aria:!0,data:!0,attr:!0}:e===!0?n={aria:!0}:n=M({},e);var r={};return Object.keys(t).forEach(function(a){(n.aria&&(a==="role"||h(a,z))||n.data&&h(a,I)||n.attr&&k.includes(a))&&(r[a]=t[a])}),r}function W(t){return e=>o.createElement(w,{theme:{token:{motion:!1,zIndexPopupBase:0}}},o.createElement(t,Object.assign({},e)))}const K=(t,e,n,r)=>W(l=>{const{prefixCls:v,style:C}=l,c=o.useRef(null),[P,y]=o.useState(0),[b,S]=o.useState(0),[u,E]=D(!1,{value:l.open}),{getPrefixCls:x}=o.useContext(T),p=x(e||"select",v);o.useEffect(()=>{if(E(!0),typeof ResizeObserver<"u"){const m=new ResizeObserver(s=>{const i=s[0].target;y(i.offsetHeight+8),S(i.offsetWidth)}),g=setInterval(()=>{var s;const i=n?`.${n(p)}`:`.${p}-dropdown`,f=(s=c.current)===null||s===void 0?void 0:s.querySelector(i);f&&(clearInterval(g),m.observe(f))},10);return()=>{clearInterval(g),m.disconnect()}}},[]);let d=Object.assign(Object.assign({},l),{style:Object.assign(Object.assign({},C),{margin:0}),open:u,visible:u,getPopupContainer:()=>c.current});r&&(d=r(d));const O={paddingBottom:P,position:"relative",minWidth:b};return o.createElement("div",{ref:c,style:O},o.createElement(t,Object.assign({},d)))});export{K as g,H as p,W as w};
