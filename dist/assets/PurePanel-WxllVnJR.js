import{d as O}from"./AntdIcon-Dp66s4Tk.js";import{N as M,B as w,C as D}from"./useSize-Bsl6vdet.js";import{r as n}from"./index-0Fw_r0Z0.js";var T=`accept acceptCharset accessKey action allowFullScreen allowTransparency
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
    summary tabIndex target title type useMap value width wmode wrap`,L=`onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown
    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick
    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown
    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel
    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough
    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata
    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError`,j="".concat(T," ").concat(L).split(/[\s\n]+/),k="aria-",z="data-";function h(o,t){return o.indexOf(t)===0}function F(o){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,e;t===!1?e={aria:!0,data:!0,attr:!0}:t===!0?e={aria:!0}:e=O({},t);var r={};return Object.keys(o).forEach(function(a){(e.aria&&(a==="role"||h(a,k))||e.data&&h(a,z)||e.attr&&j.includes(a))&&(r[a]=o[a])}),r}function I(o){return function(e){return n.createElement(M,{theme:{token:{motion:!1,zIndexPopupBase:0}}},n.createElement(o,Object.assign({},e)))}}function H(o,t,e,r){function a(l){const{prefixCls:v,style:C}=l,c=n.useRef(null),[P,y]=n.useState(0),[b,S]=n.useState(0),[u,E]=w(!1,{value:l.open}),{getPrefixCls:x}=n.useContext(D),p=x(t||"select",v);n.useEffect(()=>{if(E(!0),typeof ResizeObserver<"u"){const m=new ResizeObserver(s=>{const i=s[0].target;y(i.offsetHeight+8),S(i.offsetWidth)}),g=setInterval(()=>{var s;const i=e?`.${e(p)}`:`.${p}-dropdown`,f=(s=c.current)===null||s===void 0?void 0:s.querySelector(i);f&&(clearInterval(g),m.observe(f))},10);return()=>{clearInterval(g),m.disconnect()}}},[]);let d=Object.assign(Object.assign({},l),{style:Object.assign(Object.assign({},C),{margin:0}),open:u,visible:u,getPopupContainer:()=>c.current});return r&&(d=r(d)),n.createElement("div",{ref:c,style:{paddingBottom:P,position:"relative",minWidth:b}},n.createElement(o,Object.assign({},d)))}return I(a)}export{H as g,F as p,I as w};
