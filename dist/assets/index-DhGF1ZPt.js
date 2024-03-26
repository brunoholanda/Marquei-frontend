import{r as s,e as U,j as t,c as F}from"./index-xvO6EYLJ.js";import{C as E}from"./index-CjpexEIR.js";import{B as y}from"./context-DdBxAEa7.js";import{C as M}from"./index-CLQ4veT2.js";import{S as b}from"./index-CwA9H1rK.js";import{R as Q,C as N}from"./row-cNkTQF-q.js";import{C as P}from"./index-DP7lvv-f.js";import{R,a as T}from"./RadialBarChart-hKicFYGI.js";import{L as O}from"./generateCategoricalChart-BH2akA22.js";import{D as X}from"./DashboardOutlined-CzeJLXjo.js";import"./AntdIcon-D_LLieO3.js";import"./useSize-6WP4OJO1.js";import"./render-DABMoBew.js";import"./index-BzGy6KWA.js";import"./index-CCtKJevy.js";import"./KeyCode-Buyvp17p.js";import"./PurePanel-Bcv7kPDi.js";import"./Overflow-nAuBfdjZ.js";import"./SearchOutlined-2JrLTji_.js";import"./useLocale-Bsp9xcRv.js";import"./CheckOutlined-BkcGHlRB.js";import"./responsiveObserver-DGOH8gk1.js";import"./index-BFLBf8DF.js";import"./EllipsisOutlined-CTBf3xVj.js";import"./PlusOutlined-CE9PvlLX.js";import"./Dropdown-Bm-fWAKP.js";import"./debounce-DRGp1tTx.js";import"./index-B-vtmrfF.js";const{Option:w}=b,Fe=()=>{const i=window.innerWidth<768,h=i?{width:280,height:250}:{width:530,height:300},[d,j]=s.useState("Esta semana"),[Y,B]=s.useState([]),[x,z]=s.useState(new Date().getMonth()+1),[m,S]=s.useState(!1),[k,J]=s.useState({particular:0,convenio:0}),[p,L]=s.useState(!1),[f,W]=s.useState(null),[K,_]=s.useState([]),[D,$]=s.useState(new Date().getFullYear()),{authData:l}=U(),c=l.companyID,[g,H]=s.useState({confirmed:0,cancelled:0,toConfirm:0}),I=s.useMemo(()=>{const e=new Date().getFullYear();return Array.from({length:3},(a,o)=>e-o)},[]),C=s.useCallback(e=>{j(e),S(!1)},[]),V=s.useCallback(e=>{z(e),j("Todos")},[]),A=e=>{const a=e.split("/");return new Date(a[2],a[1]-1,a[0])},q=e=>{const a=new Date;switch(a.setHours(0,0,0,0),e){case"Esta semana":const o=a.getDay(),n=new Date(a);return n.setDate(a.getDate()-o),n;case"Últimos 15 dias":return new Date(a.getFullYear(),a.getMonth(),a.getDate()-15);case"Último mês":return new Date(a.getFullYear(),a.getMonth(),a.getDate()-30);default:return null}},G=s.useMemo(()=>[{value:1,label:"Janeiro"},{value:2,label:"Fevereiro"},{value:3,label:"Março"},{value:4,label:"Abril"},{value:5,label:"Maio"},{value:6,label:"Junho"},{value:7,label:"Julho"},{value:8,label:"Agosto"},{value:9,label:"Setembro"},{value:10,label:"Outubro"},{value:11,label:"Novembro"},{value:12,label:"Dezembro"}],[]);return s.useEffect(()=>{(async()=>{if(c&&l.authToken)try{const a=await F.get(`/agendamentos?company_id=${c}`,{headers:{Authorization:`Bearer ${l.authToken}`}});if(a.status!==200)throw new Error("Falha ao buscar dados da clínica");let o=a.data;if(p&&f&&(o=o.filter(r=>r.professional_id===f)),m)o=o.filter(r=>{const v=A(r.data);return v.getMonth()+1===x&&v.getFullYear()===D});else{const r=q(d);r&&(o=o.filter(v=>A(v.data)>=r))}const n={confirmed:0,cancelled:0,toConfirm:0},u={particular:0,convenio:0};o.forEach(r=>{r.status===1?n.confirmed+=1:r.status===2?n.cancelled+=1:n.toConfirm+=1,r.planodental&&r.planodental.toLowerCase()==="particular"?u.particular+=1:u.convenio+=1}),H(n),J(u)}catch(a){console.error("Erro ao buscar dados dos agendamentos",a)}else console.error("Company ID or auth token not found in local storage")})()},[d,D,x,m,p,f,c,l.authToken]),s.useEffect(()=>{(async()=>{if(c&&l.authToken)try{const a=await F.get(`/professionals?company_id=${c}`,{headers:{Authorization:`Bearer ${l.authToken}`}}),n=E.AES.decrypt(a.data,"%A0533266q6td9g*"),u=JSON.parse(n.toString(E.enc.Utf8));a.status===200&&_(u)}catch(a){console.error("Erro ao buscar profissionais",a)}})()},[c,l.authToken]),s.useEffect(()=>{const e=[{name:"Confirmados",uv:g.confirmed,fill:"#00CED1"},{name:"Cancelados",uv:g.cancelled,fill:"#FF4500"},{name:"A Confirmar",uv:g.toConfirm,fill:"#FFD700	"}];B(e)},[g]),t.jsxs("div",{children:[t.jsxs("div",{className:"dashboard",children:[t.jsxs("h1",{children:["Gestão e Acompanhamento ",t.jsx(X,{})]}),t.jsxs("div",{className:"dashboard-buttons",children:[t.jsx(y,{type:d==="Esta semana"?"primary":"default",onClick:()=>C("Esta semana"),className:"dashboard-button",children:"Esta semana"})," ",t.jsx(y,{type:d==="Últimos 15 dias"?"primary":"default",onClick:()=>C("Últimos 15 dias"),className:"dashboard-button",children:"Últimos 15 dias"}),t.jsx(y,{type:d==="Último mês"?"primary":"default",onClick:()=>C("Último mês"),className:"dashboard-button",children:"Últimos 30 dias"})]}),t.jsx(M,{checked:m,onChange:e=>S(e.target.checked),children:"Ver outros meses"}),m&&t.jsxs(t.Fragment,{children:[t.jsx(b,{value:D,style:{width:120},onChange:e=>$(e),className:"dashboard-button",children:I.map(e=>t.jsx(w,{value:e,children:e},e))}),t.jsx(b,{value:x,style:{width:120},onChange:V,className:"dashboard-button",children:G.map(e=>t.jsx(w,{value:e.value,children:e.label},e.value))})]}),t.jsx(M,{checked:p,onChange:e=>L(e.target.checked),children:"Filtrar por Profissional"}),p&&t.jsx(b,{value:f,style:{width:200},onChange:e=>W(e),children:K.map(e=>t.jsx(w,{value:e.id,children:e.nome},e.id))})]}),t.jsx("div",{className:"dashboard-radials",children:t.jsxs(Q,{gutter:16,children:[t.jsx(N,{xs:24,md:12,children:t.jsx(P,{title:"Status dos atendimentos",children:t.jsx("div",{className:"chartContainer",style:{margin:i?"0 auto":"0"},children:t.jsxs(R,{width:h.width,height:h.height,innerRadius:"20%",outerRadius:"90%",data:Y,startAngle:180,endAngle:0,children:[t.jsx(T,{minAngle:15,label:{position:"insideStart",fill:"#fff"},background:!0,clockWise:!0,dataKey:"uv"}),t.jsx(O,{iconSize:10,width:120,height:140,layout:"vertical",verticalAlign:"middle",wrapperStyle:{top:0,left:i?0:20,lineHeight:"24px"},className:i?"legend-mobile":""})]})})})}),t.jsx(N,{xs:24,md:12,children:t.jsx(P,{title:"Particular x Convênio",children:t.jsx("div",{className:"chartContainer",style:{margin:i?"0 auto":"0"},children:t.jsxs(R,{width:h.width,height:h.height,innerRadius:"20%",outerRadius:"90%",data:[{name:"Particular",uv:k.particular,fill:"#32CD32	"},{name:"Convênio",uv:k.convenio,fill:"#7B68EE"}],startAngle:180,endAngle:0,children:[t.jsx(T,{minAngle:15,label:{position:"insideStart",fill:"#fff"},background:!0,clockWise:!0,dataKey:"uv"}),t.jsx(O,{iconSize:10,width:120,height:140,layout:"vertical",verticalAlign:"middle",wrapperStyle:{top:0,left:i?0:20,lineHeight:"24px"},className:i?"legend-mobile":""})]})})})})]})})]})};export{Fe as default};
