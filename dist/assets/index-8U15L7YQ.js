import{r as l,c as ae,u as oe,j as o}from"./index-BjWOWftK.js";import{h as f}from"./moment-gy9AvL1k.js";import{R as re}from"./index-SZJkRHiF.js";import{a as d}from"./api-yj2qoLPl.js";import{H as te}from"./Holidays-cu-aYy69.js";import{s as se}from"./styled-components.browser.esm-0XG6BcNo.js";import{s as ne}from"./commonMailDomains-C8uuVB4t.js";import{F as m}from"./index-DWnRouz4.js";import{I as x}from"./index-Dtquuxsa.js";import{S as w}from"./index-CrIh86xN.js";import{D as ie}from"./index-C7SteZcr.js";import{T as le}from"./index-DmbuE59p.js";import{B as de}from"./context-CsxF_MV5.js";import{M as me}from"./index-DZhypcJC.js";import{m as h}from"./index-voIPXOLj.js";import"./cjs-BuFYNCHu.js";import"./Serializer-CQbcCsmu.js";import"./useSize-xGuuOV2H.js";import"./AntdIcon-CQBeZWiu.js";import"./index-10_tvuH-.js";import"./index-xwEKfmQR.js";import"./render-Dc9fgLFB.js";import"./useForm-BVlqLGy1.js";import"./row-xbO0cgu3.js";import"./responsiveObserver-eh3CkRQ8.js";import"./useLocale-B5fEOMjY.js";import"./ExclamationCircleFilled-BXHKs-a4.js";import"./SearchOutlined-DC5n_389.js";import"./KeyCode-iNboPXT1.js";import"./PurePanel-vSTbxOUV.js";import"./Overflow-vieoZhrC.js";import"./CheckOutlined-BorBS3ox.js";import"./CalendarOutlined-fGf3BKFZ.js";import"./ClockCircleOutlined-vEkn-5q0.js";import"./InfoCircleFilled-CN7YLSSN.js";import"./useNotification-C_uzqUJr.js";const ce=se.div`
 background-color: #f4f7fb;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 40rem; 
  margin: 8rem auto 2rem auto;

  .ant-form-vertical {
    margin: 3rem;
}
  .ant-form-item {
    margin-bottom: 16px; 
  }

  .ant-input,
  .ant-picker,
  .ant-select-selector {
    border-radius: 5px; 
    height: 40px; 
  }

  .ant-form-item-label > label {
    font-weight: bold; 
    font-size: 16px;
  }

  .ant-btn-primary {
    background-color: #4CAF50;
    border-color: #4CAF50;
    border-radius: 5px;
    font-weight: bold;
    height: 40px;
    width: 100%;
  }

  .ant-modal-content {
    border-radius: 10px; // Bordas arredondadas para o modal
  }

  .ant-modal-header {
    border-bottom: none; // Remove a borda inferior do cabeçalho do modal
  }

  .ant-modal-footer {
    border-top: none; // Remove a borda superior do rodapé do modal
  }

  @media (max-width: 768px) {
    padding: .2rem 0; // Reduz o preenchimento para telas menores
    max-width: 92%; // Ocupa toda a largura da tela

    .ant-form-vertical {
    margin: 1rem;
}
    .ant-input,
    .ant-picker,
    .ant-select-selector {
      height: 36px; // Reduz a altura dos inputs para economizar espaço
    }

    .ant-btn-primary {
      height: 36px;
    }
  }

`,{Option:F}=w,{TextArea:pe}=x,Ke=()=>{const[g]=m.useForm(),[k,j]=l.useState(!1),[E,C]=l.useState([]),[T,_]=l.useState([]),[A,q]=l.useState([]),[i,$]=l.useState(null),[O,B]=l.useState([]),[ue,z]=l.useState(0),{company_id:b}=ae(),[I,P]=l.useState([]),L=e=>{const a=e.target.value,t=ne(a);P(t)},V=e=>{g.setFieldsValue({email:e}),P([])},M=new te;M.init("BR");const N=e=>M.getHolidays(e.year()).some(t=>{const s=new Date(t.date);return s.getDate()===e.date()&&s.getMonth()===e.month()&&s.getFullYear()===e.year()}),H={Segunda:1,Terça:2,Quarta:3,Quinta:4,Sexta:5,Sábado:6,Domingo:0};l.useEffect(()=>{i&&(async()=>{try{const a=await d.get(`/dias-semanais?professional_id=${i}`);C(a.data)}catch(a){console.error("Erro ao buscar dias da semana",a)}})()},[i]);const W=e=>{const a=e.day(),t=E.find(s=>H[s.dia]===a);return!t||!t.ativo?!0:N(e)};l.useEffect(()=>{i&&(async()=>{try{const a=await d.get(`/professional-intervals/professional/${i}`);z(a.data.intervalo)}catch(a){console.error("Erro ao buscar intervalo do profissional",a)}})()},[i]);const Q=(e,a,t)=>{if(!e)return[];const s=e.day(),n=E.find(r=>H[r.dia]===s),p=[];if(!n||!n.ativo)return[...Array(24).keys()];const u=n.startam?parseInt(n.startam.split(":")[0],10):0,y=n.endam?parseInt(n.endam.split(":")[0],10):11,R=n.startpm?parseInt(n.startpm.split(":")[0],10):12,S=n.endpm?parseInt(n.endpm.split(":")[0],10):23;for(let r=0;r<24;r++)(r<u||r>=y&&r<R||r>S)&&p.push(r);return a.forEach(r=>{p.includes(r)||p.push(r);for(let c=1;c<t;c++){const D=r+c;D<24&&!p.includes(D)&&p.push(D)}}),p},G=async e=>{const a=e.format("DD/MM/YYYY");if(i)try{const s=(await d.get(`/professional-intervals/professional/${i}`)).data.intervalo,n=parseInt(s.split(":")[0],10),u=(await d.get("/agendamentos/occupied-hours",{params:{data:a,professional_id:i}})).data.map(y=>f(y.horario,"HH:mm").hour());_(Q(e,u,n))}catch(t){console.error("Erro ao buscar horários agendados ou intervalo do profissional",t),h.error("Erro ao buscar horários agendados ou intervalo do profissional")}},J=async e=>{j(!0);try{const a={nome:e.nome,celular:e.celular.replace(/\D/g,""),client_email:e.email,planodental:e.planodental,company_id:b},t=e.data.format("DD/MM/YYYY"),s=e.horario.format("HH:mm"),n={...e,data:t,horario:s,professional_id:i,company_id:b},u=(await d.get(`/professional-intervals/professional/${i}`)).data.intervalo,S=f(s,"HH:mm").add(f.duration(u)).format("HH:mm");n.end_time=S;let r=await d.get(`/clients/email/${a.client_email}?company_id=${a.company_id}`).catch(c=>c.response);if(r&&r.status===404&&(r=await d.post("/clients",a)),r&&r.data&&r.data.id){n.client_id=r.data.id;const c=await d.post("/agendamentos",n);c.data&&c.data.error?h.error(c.data.error):(h.success("Agendamento feito com sucesso!"),g.resetFields(),v(!0))}else throw new Error(r.data.message||"Erro ao criar ou recuperar o cliente.")}catch(a){console.error("Erro no processo de agendamento:",a),h.error(a.message||"Erro ao enviar o agendamento")}finally{j(!1)}},[K,v]=l.useState(!1),U=oe(),[X,Y]=l.useState([]);l.useEffect(()=>{(async()=>{if(!i){Y([]);return}try{const t=(await d.get(`/disabledDates?professional_id=${i}`)).data.map(s=>({date:f(s.date,"DD/MM/YYYY"),allDay:s.allday,startTime:s.starttime,endTime:s.endtime}));Y(t)}catch(a){console.error("Erro ao buscar datas desabilitadas",a)}})()},[i]);const Z=e=>{const a=X.find(t=>e.isSame(t.date,"day"));return e&&(e<f().startOf("day")||W(e)||a&&a.allDay)};l.useEffect(()=>{(async()=>{try{const a=await d.get(`/public-professionals?company_id=${b}`);if(a.status!==200)throw new Error("Falha ao buscar dados dos profissionais");q(a.data)}catch(a){console.error("Error fetching professionals:",a)}})()},[b]);const ee=async e=>{try{const a=await d.get(`/professionals/${e}/planos`);if(a.status===200)return a.data;throw new Error("Falha ao buscar planos de saúde do profissional")}catch(a){return console.error("Erro ao buscar planos de saúde",a),h.error("Erro ao buscar planos de saúde"),[]}};return o.jsx(ce,{children:o.jsxs(m,{form:g,name:"agendamento",layout:"vertical",onFinish:J,children:[o.jsx(m.Item,{name:"nome",label:"Nome e Sobrenome",rules:[{required:!0,message:"Por favor, insira seu nome!"}],children:o.jsx(x,{placeholder:"Seu nome e sobrenome"})}),o.jsx(m.Item,{name:"email",label:"E-mail",rules:[{required:!0,message:"Por favor, insira seu e-mail!"},{type:"email",message:"Por favor, insira um e-mail válido!"}],children:o.jsx(x,{placeholder:"Seu e-mail",onChange:L})}),I.length>0&&o.jsx("div",{style:{marginTop:"0.5rem",background:"#f7f7f7",padding:"0.5rem"},children:I.map((e,a)=>o.jsx("div",{onClick:()=>V(e),style:{cursor:"pointer",padding:"0.5rem"},children:e},a))}),o.jsx(w,{showSearch:!0,style:{width:200,marginBottom:20},placeholder:"Selecione um profissional",optionFilterProp:"children",onChange:async e=>{if(e){$(e);const a=await ee(e);B(a),g.setFieldsValue({planodental:""})}},filterOption:(e,a)=>a.children.toLowerCase().indexOf(e.toLowerCase())>=0,value:i,children:A.map(e=>o.jsx(F,{value:e.id,children:e.nome},e.id))}),o.jsx(m.Item,{name:"data",label:"Data",rules:[{required:!0,message:"Por favor, selecione uma data!"}],children:o.jsx(ie,{format:"DD/MM/YYYY",disabledDate:Z,onChange:G})}),o.jsx(m.Item,{name:"horario",label:"Horário",rules:[{required:!0,message:"Por favor, selecione um horário!"}],children:o.jsx(le,{format:"HH:mm",minuteStep:5,disabledHours:()=>T})}),o.jsx(m.Item,{name:"planodental",rules:[{required:!0,message:"Por favor, selecione um plano dental!"}],children:o.jsx(w,{placeholder:"Selecione seu plano dental",children:O.map(e=>o.jsx(F,{value:e.nome,children:e.nome},e.id))})}),o.jsx(m.Item,{name:"celular",label:"Celular",rules:[{required:!0,message:"Por favor, insira seu número de celular!"}],children:o.jsx(re,{mask:"(99) 9 9999-9999",placeholder:"(99) 9 9999-9999",children:e=>o.jsx(x,{...e,type:"tel"})})}),o.jsx(m.Item,{name:"motivo",label:"Motivo da Consulta",rules:[{required:!0,message:"Por favor, descreva o motivo da consulta!"}],children:o.jsx(pe,{placeholder:"Descreva o motivo da consulta em poucas palavras",rows:4,maxLength:90})}),o.jsx(m.Item,{children:o.jsx(de,{type:"primary",htmlType:"submit",loading:k,children:"Agendar"})}),o.jsxs(me,{title:"Agendamento Recebido!",open:K,onOk:()=>{v(!1),U("/")},onCancel:()=>v(!1),okText:"Fechar",cancelButtonProps:{style:{display:"none"}},children:[o.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:"20px"},children:o.jsx("div",{style:{fontSize:"50px",color:"green"},children:"✓"})}),"Seu agendamento foi recebido com sucesso! Agora é só aguardar que entraremos em contato com você em até 24 horas antes da consulta. Fique à vontade para entrar em contato em nosso número (83) 9 9631-1573."]})]})})};export{Ke as default};
