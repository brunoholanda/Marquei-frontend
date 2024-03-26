import{r,e as P,j as o,c as z}from"./index-xvO6EYLJ.js";import{H as D}from"./HistoryOutlined-1fevdiBA.js";import{W as F}from"./WarningFilled-DOBtSwHJ.js";import{T}from"./Table-DdA01Fes.js";import{m as $}from"./index-BiTWdfWv.js";import{I as H}from"./index-CedHbxzm.js";import{B as C}from"./context-DdBxAEa7.js";import{S as L}from"./SearchOutlined-2JrLTji_.js";import{T as O}from"./index-C-c4zHbE.js";import{E as R}from"./ExclamationCircleOutlined-BNjnAmee.js";import{C as _}from"./CheckCircleOutlined-DxtUa-mB.js";import{C as q}from"./CloseCircleOutlined-BuaDPVob.js";import"./AntdIcon-D_LLieO3.js";import"./useSize-6WP4OJO1.js";import"./index-CCtKJevy.js";import"./PurePanel-Bcv7kPDi.js";import"./index-CwA9H1rK.js";import"./KeyCode-Buyvp17p.js";import"./Overflow-nAuBfdjZ.js";import"./useLocale-Bsp9xcRv.js";import"./CheckOutlined-BkcGHlRB.js";import"./render-DABMoBew.js";import"./useForceUpdate-CtnoV0Za.js";import"./responsiveObserver-DGOH8gk1.js";import"./index-CzRmZwE6.js";import"./EllipsisOutlined-CTBf3xVj.js";import"./index-Cr1x6K6x.js";import"./index-CLQ4veT2.js";import"./index-BzGy6KWA.js";import"./Dropdown-Bm-fWAKP.js";import"./index-BOx8mipG.js";import"./ExclamationCircleFilled-D1rgX5dR.js";import"./InfoCircleFilled-BPS8A9lc.js";import"./useNotification-CnkbSI_l.js";const jt=()=>{const[c,w]=r.useState(window.innerWidth<768),[i,j]=r.useState([]),[k,l]=r.useState(!1),[u,d]=r.useState([]),{authData:m}=P(),f=m.companyID,[p,I]=r.useState({current:1,pageSize:10,total:0}),h=async(t=1)=>{if(l(!0),f&&m.authToken)try{const e=await z.get(`/todos-agendamentos?company_id=${f}&page=${t}&limit=${p.pageSize}`,{headers:{Authorization:`Bearer ${m.authToken}`}});if(e.status!==200)throw new Error("Falha ao buscar dados da clinica");j(e.data.data),I({...p,current:t,total:e.data.total}),l(!1)}catch(e){console.error("Erro ao buscar todos os agendamentos",e),$.error("Erro ao buscar todos os agendamentos"),l(!1)}else console.error("Company ID or auth token not found in local storage")},v=t=>{h(t)};let g;const x=(t,e,n)=>{e(),n==="nome"?d(i.filter(a=>a.nome&&a.nome.toLowerCase().includes(t[0].toLowerCase()))):n==="cpf"&&d(i.filter(a=>a.cpf&&a.cpf.includes(t[0])))},b=t=>{t(),d(i)};r.useEffect(()=>{h()},[]),r.useEffect(()=>{const t=()=>w(window.innerWidth<768);return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const E=t=>{const e=t.split(" ");return e.length>2?`${e[0]} ${e[1]}`:t},y=[{title:"Nome",dataIndex:"nome",key:"nome",render:t=>c?E(t):t},{title:"CPF",dataIndex:"cpf",key:"cpf",filterDropdown:({setSelectedKeys:t,selectedKeys:e,confirm:n,clearFilters:a})=>o.jsxs("div",{style:{padding:8},children:[o.jsx(H,{ref:s=>{g=s},placeholder:"Pesquisar CPF",value:e[0],onChange:s=>t(s.target.value?[s.target.value]:[]),onPressEnter:()=>x(e,n,"cpf"),style:{marginBottom:8,display:"block"}}),o.jsx(C,{type:"primary",onClick:()=>x(e,n,"cpf"),size:"small",style:{width:90,marginRight:8},children:"Pesquisar"}),o.jsx(C,{onClick:()=>b(a),size:"small",style:{width:90},children:"Resetar"})]}),filterIcon:t=>o.jsx(L,{style:{color:t?"#1890ff":void 0}}),onFilter:(t,e)=>e.cpf.includes(t),onFilterDropdownVisibleChange:t=>{t&&setTimeout(()=>g.select(),100)}},{title:"Data",dataIndex:"data",key:"data"},{title:"Horário",dataIndex:"horario",key:"horario"},{title:"Contato",dataIndex:"celular",key:"celular"}],S=[{title:"Status",dataIndex:"status",key:"status",render:t=>o.jsx(O,{title:t===null?"Pendente":t===1?"Confirmado":"Cancelado",children:t===null?o.jsx(R,{style:{color:"orange"}}):t===1?o.jsx(_,{style:{color:"green"}}):o.jsx(q,{style:{color:"red"}})})},{title:"Data",dataIndex:"data",key:"data"},{title:"Convênio",dataIndex:"planodental",key:"planoDental"},{title:"Motivo",dataIndex:"motivo",key:"motivo"}],A=c?y:[...y,...S];return o.jsxs("div",{className:"tabela",children:[o.jsxs("h1",{children:["Histórico  de Agendamentos  ",o.jsx(D,{})]}),o.jsxs("p",{children:["Utilize a lupa para pesquisar por Nome ou CPF ",o.jsx(F,{})]}),o.jsx(T,{columns:A,dataSource:u.length>0?u:i,rowKey:"id",loading:k,pagination:{...p,onChange:v}})]})};export{jt as default};
