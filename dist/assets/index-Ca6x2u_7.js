import{r as o,d as f,j as e}from"./index-BjWOWftK.js";import{a as I}from"./api-yj2qoLPl.js";import{M as q}from"./index-DZhypcJC.js";import{B as u}from"./context-CsxF_MV5.js";import{I as O}from"./index-Dtquuxsa.js";import{m as h}from"./index-voIPXOLj.js";import{L as y}from"./LinkOutlined-BuwQFSXi.js";import{S as b}from"./styles-LTF4UV_V.js";import{A as w,_ as A}from"./AntdIcon-CQBeZWiu.js";import{R as B,B as D,X as N,Y as R}from"./BarChart-CdxIXJ59.js";import{y as P,B as M}from"./generateCategoricalChart-deYiZtec.js";import{T}from"./Table-DssO-p4r.js";import{C as x}from"./CheckOutlined-BorBS3ox.js";import"./useSize-xGuuOV2H.js";import"./Serializer-CQbcCsmu.js";import"./render-Dc9fgLFB.js";import"./ExclamationCircleFilled-BXHKs-a4.js";import"./InfoCircleFilled-CN7YLSSN.js";import"./index-10_tvuH-.js";import"./KeyCode-iNboPXT1.js";import"./PurePanel-vSTbxOUV.js";import"./useLocale-B5fEOMjY.js";import"./index-xwEKfmQR.js";import"./SearchOutlined-DC5n_389.js";import"./useNotification-C_uzqUJr.js";import"./styled-components.browser.esm-0XG6BcNo.js";import"./debounce-CalKGcIM.js";import"./index-DREpUMdt.js";import"./index-Chjiymov.js";import"./index-CrIh86xN.js";import"./Overflow-vieoZhrC.js";import"./useForceUpdate-DA-qGIrz.js";import"./responsiveObserver-eh3CkRQ8.js";import"./index-z7srBD_T.js";import"./EllipsisOutlined-CWuHYn8k.js";import"./index-BNxrNzwE.js";import"./index-DICP50cq.js";import"./Dropdown-C_ydlxYW.js";var z={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM305.8 637.7c3.1 3.1 8.1 3.1 11.3 0l138.3-137.6L583 628.5c3.1 3.1 8.2 3.1 11.3 0l275.4-275.3c3.1-3.1 3.1-8.2 0-11.3l-39.6-39.6a8.03 8.03 0 00-11.3 0l-230 229.9L461.4 404a8.03 8.03 0 00-11.3 0L266.3 586.7a8.03 8.03 0 000 11.3l39.5 39.7z"}}]},name:"line-chart",theme:"outlined"};const E=z;var $=function(t,a){return o.createElement(w,A({},t,{ref:a,icon:E}))};const _=o.forwardRef($),V=({isResearchModalVisible:i,onResearchModalClose:t})=>{const{authData:a}=f(),l=a.companyID,s=()=>`${window.location.origin}/#/pesquisa-satisfacao/${l}`,r=()=>{navigator.clipboard.writeText(s()).then(()=>{h.success("Link copiado para a área de transferência!"),t()}).catch(m=>{h.error("Falha ao copiar o link."),console.error("Erro ao copiar o link:",m)})};return e.jsxs(q,{title:"Link da pesquisa para seus clientes !",open:i,onOk:r,onCancel:t,footer:[e.jsx(u,{type:"primary",onClick:r,children:"Copiar Link"},"copy"),e.jsx(u,{onClick:t,children:"Fechar"},"close")],children:[e.jsx("p",{children:"O link a seguir pode ser compartilhado com seus clientes para que eles realizem uma pesquisa de satisfação na escala NPS."}),e.jsxs("p",{children:[e.jsx(y,{})," Copie e compartilhe este link com seus clientes:"]}),e.jsx("p",{style:{color:"red"},children:"Caso queira o envio automático do link, contrate o Plano Premium."}),e.jsx(O,{value:s(),readOnly:!0})]})},F="/assets/nps-ByNDzI_O.png";function be(){const[i,t]=o.useState([]),[a,l]=o.useState(0),[s,r]=o.useState(!1),{authData:m}=f(),p=m.companyID,j=o.useRef(null),g=({customers:d})=>{const n=[{title:"Nome do Cliente",dataIndex:"nome",key:"nome"},{title:"Telefone",dataIndex:"telefone",key:"telefone"},{title:"Nota",dataIndex:"nota",key:"nota"}];return e.jsx(T,{dataSource:d,columns:n,pagination:{pageSize:5}})};o.useEffect(()=>{(async()=>{try{const c=(await I.get(`nps-systems?company_id=${p}`)).data;t(c);const v=c.reduce((S,L)=>S+L.nota,0);l(c.length>0?v/c.length:0)}catch(n){console.error("There was an error fetching the customer data:",n)}})()},[p]);const C=[{name:"Média",value:a}],k=a<=6.5?"#ee3557":a<=8.5?"#58b4af":"#8ec63d";return e.jsxs(b,{children:[e.jsxs("h2",{children:["NPS: A métrica que sua clínica precisa para reter clientes ",e.jsx(_,{})]}),e.jsxs("p",{children:[e.jsx(x,{})," No botão abaixo você pode compartilhar o link da pesquisa com seus clientes."]}),e.jsxs("p",{children:[e.jsx(x,{})," Se você é um cliente Premiuim a pesquisa será enviada automaticamente"]}),e.jsxs(u,{style:{marginBottom:"50px"},type:"primary",onClick:()=>r(!0),children:[e.jsx(y,{})," Gerar Link da Pesquisa."]}),e.jsx("h3",{children:"Aqui está sua nota na escala NPS:"}),e.jsx("img",{src:F,alt:"escala nps com carinhas",ref:j,style:{width:"80%",height:"auto",margin:"1rem auto"}}),e.jsx("div",{style:{width:"80%",height:"110px",margin:"1rem auto"},children:e.jsx(B,{children:e.jsxs(D,{data:C,layout:"vertical",children:[e.jsx(N,{type:"number",domain:[0,10]}),e.jsx(R,{type:"category",dataKey:"name"}),e.jsx(P,{}),e.jsx(M,{dataKey:"value",fill:k})]})})}),e.jsx("h3",{children:"Aqui está os clientes que avaliaram:"}),e.jsx(g,{customers:i}),s&&e.jsx(V,{isResearchModalVisible:s,onResearchModalClose:()=>r(!1),companyID:p})]})}export{be as default};
