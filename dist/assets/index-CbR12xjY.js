import{r,e as z,j as o,c as D}from"./index-DtAKxO-I.js";import{H as P}from"./HistoryOutlined-DwIVZhpt.js";import{W as L}from"./WarningFilled-BuXJVxQa.js";import{T}from"./Table-CnNBZ0wE.js";import{m as F}from"./index-ckeLVLhX.js";import{I as $}from"./index-Bh7spuOb.js";import{B as C}from"./context-DBlOovQj.js";import{S as H}from"./SearchOutlined-Bb9Je5JO.js";import{T as O}from"./index-CFnU9gTT.js";import{E as R}from"./ExclamationCircleOutlined-J29f-dlc.js";import{C as _}from"./CheckCircleOutlined-Cfa16Ucb.js";import{C as q}from"./CloseCircleOutlined-BFcWlvfY.js";import"./AntdIcon-yIvRgVWP.js";import"./useSize-CI_ZKiRx.js";import"./Serializer-CQbcCsmu.js";import"./index-BMUJ3kY3.js";import"./PurePanel-DTnqM39y.js";import"./index-DsB5NFMg.js";import"./KeyCode-BDlL2ZxM.js";import"./Overflow-CxvXknPO.js";import"./useLocale-CKM3KW2_.js";import"./CheckOutlined-R07Mhy7g.js";import"./render-DxYmgcxZ.js";import"./useForceUpdate-BYOE0HjS.js";import"./responsiveObserver-CzKOeKup.js";import"./index-DO0v0281.js";import"./EllipsisOutlined-DPUGTPVO.js";import"./index-DmqRj2CN.js";import"./index-BZp-_p2x.js";import"./index-GgFpFduT.js";import"./Dropdown-zyi7t3e9.js";import"./index-DBBspAOI.js";import"./ExclamationCircleFilled-BDkHAKsa.js";import"./InfoCircleFilled-D2hARdve.js";import"./useNotification-CiPFwKzO.js";const kt=()=>{const[c,w]=r.useState(window.innerWidth<768),[s,j]=r.useState([]),[k,l]=r.useState(!1),[u,m]=r.useState([]),{authData:d}=z(),h=d.companyID,[p,E]=r.useState({current:1,pageSize:10,total:0}),f=async(t=1)=>{if(l(!0),h&&d.authToken)try{const e=await D.get(`/todos-agendamentos?company_id=${h}&page=${t}&limit=${p.pageSize}`,{headers:{Authorization:`Bearer ${d.authToken}`}});if(e.status!==200)throw new Error("Falha ao buscar dados da clinica");j(e.data.data),E({...p,current:t,total:e.data.total}),l(!1)}catch(e){console.error("Erro ao buscar todos os agendamentos",e),F.error("Erro ao buscar todos os agendamentos"),l(!1)}else console.error("Company ID or auth token not found in local storage")},I=t=>{f(t)};let g;const x=(t,e,i)=>{e(),i==="nome"?m(s.filter(a=>a.nome&&a.nome.toLowerCase().includes(t[0].toLowerCase()))):i==="cpf"&&m(s.filter(a=>a.cpf&&a.cpf.includes(t[0])))},S=t=>{t(),m(s)};r.useEffect(()=>{f()},[]),r.useEffect(()=>{const t=()=>w(window.innerWidth<768);return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const b=t=>{const e=t.split(" ");return e.length>2?`${e[0]} ${e[1]}`:t},y=[{title:"Nome",dataIndex:"nome",key:"nome",render:t=>c?b(t):t},{title:"Email",dataIndex:"email",key:"email",filterDropdown:({setSelectedKeys:t,selectedKeys:e,confirm:i,clearFilters:a})=>o.jsxs("div",{style:{padding:8},children:[o.jsx($,{ref:n=>{g=n},placeholder:"Pesquisar Email",value:e[0],onChange:n=>t(n.target.value?[n.target.value]:[]),onPressEnter:()=>x(e,i,"email"),style:{marginBottom:8,display:"block"}}),o.jsx(C,{type:"primary",onClick:()=>x(e,i,"email"),size:"small",style:{width:90,marginRight:8},children:"Pesquisar"}),o.jsx(C,{onClick:()=>S(a),size:"small",style:{width:90},children:"Resetar"})]}),filterIcon:t=>o.jsx(H,{style:{color:t?"#1890ff":void 0}}),onFilter:(t,e)=>e.email?e.email.toString().toLowerCase().includes(t.toLowerCase()):"",onFilterDropdownVisibleChange:t=>{t&&setTimeout(()=>g.select(),100)}},{title:"Data",dataIndex:"data",key:"data"},{title:"Horário",dataIndex:"horario",key:"horario"},{title:"Contato",dataIndex:"celular",key:"celular"}],A=[{title:"Status",dataIndex:"status",key:"status",render:t=>o.jsx(O,{title:t===null?"Pendente":t===1?"Confirmado":"Cancelado",children:t===null?o.jsx(R,{style:{color:"orange"}}):t===1?o.jsx(_,{style:{color:"green"}}):o.jsx(q,{style:{color:"red"}})})},{title:"Data",dataIndex:"data",key:"data"}],v=c?y:[...y,...A];return o.jsxs("div",{className:"tabela",children:[o.jsxs("h1",{children:["Histórico  de Agendamentos  ",o.jsx(P,{})]}),o.jsxs("p",{children:["Utilize a lupa para pesquisar por Nome ou CPF ",o.jsx(L,{})]}),o.jsx(T,{columns:v,dataSource:u.length>0?u:s,rowKey:"id",loading:k,pagination:{...p,onChange:I}})]})};export{kt as default};
