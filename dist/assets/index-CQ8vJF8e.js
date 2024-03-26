import{r as s,e as f,j as e,c as I}from"./index-xvO6EYLJ.js";import{M as q}from"./index-CvA9nhkX.js";import{B as u}from"./context-DdBxAEa7.js";import{I as O}from"./index-CedHbxzm.js";import{m as h}from"./index-BiTWdfWv.js";import{L as y}from"./LinkOutlined-CzegR9PT.js";import{S as b}from"./styles-D-jSTfo2.js";import{A as w,_ as A}from"./AntdIcon-D_LLieO3.js";import{R as B,B as D,X as N,Y as R}from"./BarChart-y9Z_RTAZ.js";import{y as P,B as M}from"./generateCategoricalChart-BH2akA22.js";import{T}from"./Table-DdA01Fes.js";import{C as x}from"./CheckOutlined-BkcGHlRB.js";import"./useSize-6WP4OJO1.js";import"./render-DABMoBew.js";import"./ExclamationCircleFilled-D1rgX5dR.js";import"./InfoCircleFilled-BPS8A9lc.js";import"./index-CCtKJevy.js";import"./KeyCode-Buyvp17p.js";import"./PurePanel-Bcv7kPDi.js";import"./useLocale-Bsp9xcRv.js";import"./index-C-c4zHbE.js";import"./SearchOutlined-2JrLTji_.js";import"./useNotification-CnkbSI_l.js";import"./debounce-DRGp1tTx.js";import"./index-B-vtmrfF.js";import"./index-CwA9H1rK.js";import"./Overflow-nAuBfdjZ.js";import"./useForceUpdate-CtnoV0Za.js";import"./responsiveObserver-DGOH8gk1.js";import"./index-CzRmZwE6.js";import"./EllipsisOutlined-CTBf3xVj.js";import"./index-Cr1x6K6x.js";import"./index-CLQ4veT2.js";import"./index-BzGy6KWA.js";import"./Dropdown-Bm-fWAKP.js";import"./index-BOx8mipG.js";var z={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM305.8 637.7c3.1 3.1 8.1 3.1 11.3 0l138.3-137.6L583 628.5c3.1 3.1 8.2 3.1 11.3 0l275.4-275.3c3.1-3.1 3.1-8.2 0-11.3l-39.6-39.6a8.03 8.03 0 00-11.3 0l-230 229.9L461.4 404a8.03 8.03 0 00-11.3 0L266.3 586.7a8.03 8.03 0 000 11.3l39.5 39.7z"}}]},name:"line-chart",theme:"outlined"};const E=z;var $=function(t,a){return s.createElement(w,A({},t,{ref:a,icon:E}))};const _=s.forwardRef($),V=({isResearchModalVisible:i,onResearchModalClose:t})=>{const{authData:a}=f(),l=a.companyID,o=()=>`${window.location.origin}/#/pesquisa-satisfacao/${l}`,r=()=>{navigator.clipboard.writeText(o()).then(()=>{h.success("Link copiado para a área de transferência!"),t()}).catch(m=>{h.error("Falha ao copiar o link."),console.error("Erro ao copiar o link:",m)})};return e.jsxs(q,{title:"Link da pesquisa para seus clientes !",open:i,onOk:r,onCancel:t,footer:[e.jsx(u,{type:"primary",onClick:r,children:"Copiar Link"},"copy"),e.jsx(u,{onClick:t,children:"Fechar"},"close")],children:[e.jsx("p",{children:"O link a seguir pode ser compartilhado com seus clientes para que eles realizem uma pesquisa de satisfação na escala NPS."}),e.jsxs("p",{children:[e.jsx(y,{})," Copie e compartilhe este link com seus clientes:"]}),e.jsx("p",{style:{color:"red"},children:"Caso queira o envio automático do link, contrate o Plano Premium."}),e.jsx(O,{value:o(),readOnly:!0})]})},F="/assets/nps-ByNDzI_O.png";function qe(){const[i,t]=s.useState([]),[a,l]=s.useState(0),[o,r]=s.useState(!1),{authData:m}=f(),p=m.companyID,j=s.useRef(null),g=({customers:d})=>{const n=[{title:"Nome do Cliente",dataIndex:"nome",key:"nome"},{title:"Telefone",dataIndex:"telefone",key:"telefone"},{title:"Nota",dataIndex:"nota",key:"nota"}];return e.jsx(T,{dataSource:d,columns:n,pagination:{pageSize:5}})};s.useEffect(()=>{(async()=>{try{const c=(await I.get(`nps-systems?company_id=${p}`)).data;t(c);const v=c.reduce((S,L)=>S+L.nota,0);l(c.length>0?v/c.length:0)}catch(n){console.error("There was an error fetching the customer data:",n)}})()},[p]);const C=[{name:"Média",value:a}],k=a<=6.5?"#ee3557":a<=8.5?"#58b4af":"#8ec63d";return e.jsxs(b,{children:[e.jsxs("h2",{children:["NPS: A métrica que sua clínica precisa para reter clientes ",e.jsx(_,{})]}),e.jsxs("p",{children:[e.jsx(x,{})," No botão abaixo você pode compartilhar o link da pesquisa com seus clientes."]}),e.jsxs("p",{children:[e.jsx(x,{})," Se você é um cliente Premiuim a pesquisa será enviada automaticamente"]}),e.jsxs(u,{style:{marginBottom:"50px"},type:"primary",onClick:()=>r(!0),children:[e.jsx(y,{})," Gerar Link da Pesquisa."]}),e.jsx("h3",{children:"Aqui está sua nota na escala NPS:"}),e.jsx("img",{src:F,alt:"escala nps com carinhas",ref:j,style:{width:"80%",height:"auto",margin:"1rem auto"}}),e.jsx("div",{style:{width:"80%",height:"110px",margin:"1rem auto"},children:e.jsx(B,{children:e.jsxs(D,{data:C,layout:"vertical",children:[e.jsx(N,{type:"number",domain:[0,10]}),e.jsx(R,{type:"category",dataKey:"name"}),e.jsx(P,{}),e.jsx(M,{dataKey:"value",fill:k})]})})}),e.jsx("h3",{children:"Aqui está os clientes que avaliaram:"}),e.jsx(g,{customers:i}),o&&e.jsx(V,{isResearchModalVisible:o,onResearchModalClose:()=>r(!1),companyID:p})]})}export{qe as default};
