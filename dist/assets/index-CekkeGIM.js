import{s as de,r as n,d as ce,u as me,j as o,c as d}from"./index-xvO6EYLJ.js";import{h}from"./moment-gy9AvL1k.js";import{R as pe}from"./index-C_mO3fzo.js";import{H as ue}from"./Holidays-DY22AVYA.js";import{s as fe}from"./commonMailDomains-C8uuVB4t.js";import{F as m}from"./index-B3RoWMnv.js";import{I as v}from"./index-CedHbxzm.js";import{S as w}from"./index-CwA9H1rK.js";import{R as T}from"./index-BOx8mipG.js";import{D as he}from"./index-Ci5EgdtF.js";import{T as ge}from"./index-BFjzDzeC.js";import{B as ye}from"./context-DdBxAEa7.js";import{M as xe}from"./index-CvA9nhkX.js";import{m as f}from"./index-BiTWdfWv.js";import"./cjs-kBAy7uz9.js";import"./useSize-6WP4OJO1.js";import"./AntdIcon-D_LLieO3.js";import"./index-CCtKJevy.js";import"./index-C-c4zHbE.js";import"./render-DABMoBew.js";import"./row-cNkTQF-q.js";import"./responsiveObserver-DGOH8gk1.js";import"./useLocale-Bsp9xcRv.js";import"./ExclamationCircleFilled-D1rgX5dR.js";import"./SearchOutlined-2JrLTji_.js";import"./KeyCode-Buyvp17p.js";import"./PurePanel-Bcv7kPDi.js";import"./Overflow-nAuBfdjZ.js";import"./CheckOutlined-BkcGHlRB.js";import"./index-BzGy6KWA.js";import"./CalendarOutlined-BOhopRP9.js";import"./ClockCircleOutlined-9RLiDPs1.js";import"./InfoCircleFilled-BPS8A9lc.js";import"./useNotification-CnkbSI_l.js";const be=de.div`
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

`,{Option:_}=w,{TextArea:ve}=v,ta=()=>{const[g]=m.useForm(),[$,I]=n.useState(!1),[P,A]=n.useState([]),[q,O]=n.useState([]),[B,z]=n.useState([]),[i,W]=n.useState(null),[L,V]=n.useState([]),[Se,N]=n.useState(0),{company_id:y}=ce(),[M,H]=n.useState([]),[S,G]=n.useState([]),[Ee,Q]=n.useState({}),[R,De]=n.useState([]),[x,J]=n.useState(null),K=e=>{J(e.target.value)},U=e=>{const a=e.target.value,r=fe(a);H(r)},X=e=>{g.setFieldsValue({email:e}),H([])},Y=new ue;Y.init("BR");const Z=e=>Y.getHolidays(e.year()).some(r=>{const s=new Date(r.date);return s.getDate()===e.date()&&s.getMonth()===e.month()&&s.getFullYear()===e.year()}),k={Segunda:1,Terça:2,Quarta:3,Quinta:4,Sexta:5,Sábado:6,Domingo:0};n.useEffect(()=>{i&&(async()=>{try{let a={professional_id:i};S.length>0&&x&&(a.endereco_id=x);const r=await d.get("/dias-semanais",{params:a});A(r.data)}catch(a){console.error("Erro ao buscar dias da semana",a)}})()},[i,x,S.length]);const ee=e=>{const a=e.day(),r=P.find(s=>k[s.dia]===a);return!r||!r.ativo?!0:Z(e)};n.useEffect(()=>{i&&(async()=>{try{const a=await d.get(`/professional-intervals/professional/${i}`);N(a.data.intervalo)}catch(a){console.error("Erro ao buscar intervalo do profissional",a)}})()},[i]),n.useEffect(()=>{i&&(async()=>{try{const r=(await d.get(`/enderecos/professional/${i}`)).data||[];if(G(r),r.length===1){const s=r[0].id,l=R.reduce((c,u)=>(c[u.id]=s,c),{});Q(l)}}catch(a){console.error("Erro ao carregar endereços:",a),f.error("Erro ao carregar endereços.")}})()},[i,R]);const ae=(e,a,r)=>{if(!e)return[];const s=e.day(),l=P.find(t=>k[t.dia]===s),c=[];if(!l||!l.ativo)return[...Array(24).keys()];const u=l.startam?parseInt(l.startam.split(":")[0],10):0,b=l.endam?parseInt(l.endam.split(":")[0],10):11,F=l.startpm?parseInt(l.startpm.split(":")[0],10):12,D=l.endpm?parseInt(l.endpm.split(":")[0],10):23;for(let t=0;t<24;t++)(t<u||t>=b&&t<F||t>D)&&c.push(t);return a.forEach(t=>{c.includes(t)||c.push(t);for(let p=1;p<r;p++){const j=t+p;j<24&&!c.includes(j)&&c.push(j)}}),c},oe=async e=>{const a=e.format("DD/MM/YYYY");if(i)try{const s=(await d.get(`/professional-intervals/professional/${i}`)).data.intervalo,l=parseInt(s.split(":")[0],10),u=(await d.get("/agendamentos/occupied-hours",{params:{data:a,professional_id:i}})).data.map(b=>h(b.horario,"HH:mm").hour());O(ae(e,u,l))}catch(r){console.error("Erro ao buscar horários agendados ou intervalo do profissional",r),f.error("Erro ao buscar horários agendados ou intervalo do profissional")}},re=async e=>{I(!0);try{const a={nome:e.nome,celular:e.celular.replace(/\D/g,""),client_email:e.email,planodental:e.planodental,company_id:y},r=e.data.format("DD/MM/YYYY"),s=e.horario.format("HH:mm"),l={...e,data:r,horario:s,professional_id:i,company_id:y},u=(await d.get(`/professional-intervals/professional/${i}`)).data.intervalo,D=h(s,"HH:mm").add(h.duration(u)).format("HH:mm");l.end_time=D;let t=await d.get(`/clients/email/${a.client_email}?company_id=${a.company_id}`).catch(p=>p.response);if(t&&t.status===404&&(t=await d.post("/clients",a)),t&&t.data&&t.data.id){l.client_id=t.data.id;const p=await d.post("/agendamentos",l);p.data&&p.data.error?f.error(p.data.error):(f.success("Agendamento feito com sucesso!"),g.resetFields(),E(!0))}else throw new Error(t.data.message||"Erro ao criar ou recuperar o cliente.")}catch(a){console.error("Erro no processo de agendamento:",a),f.error(a.message||"Erro ao enviar o agendamento")}finally{I(!1)}},[te,E]=n.useState(!1),se=me(),[ne,C]=n.useState([]);n.useEffect(()=>{(async()=>{if(!i){C([]);return}try{const r=(await d.get(`/disabledDates?professional_id=${i}`)).data.map(s=>({date:h(s.date,"DD/MM/YYYY"),allDay:s.allday,startTime:s.starttime,endTime:s.endtime}));C(r)}catch(a){console.error("Erro ao buscar datas desabilitadas",a)}})()},[i]);const ie=e=>{const a=ne.find(r=>e.isSame(r.date,"day"));return e&&(e<h().startOf("day")||ee(e)||a&&a.allDay)};n.useEffect(()=>{(async()=>{try{const a=await d.get(`/public-professionals?company_id=${y}`);if(a.status!==200)throw new Error("Falha ao buscar dados dos profissionais");z(a.data)}catch(a){console.error("Error fetching professionals:",a)}})()},[y]);const le=async e=>{try{const a=await d.get(`/professionals/${e}/planos`);if(a.status===200)return a.data;throw new Error("Falha ao buscar planos de saúde do profissional")}catch(a){return console.error("Erro ao buscar planos de saúde",a),f.error("Erro ao buscar planos de saúde"),[]}};return o.jsx(be,{children:o.jsxs(m,{form:g,name:"agendamento",layout:"vertical",onFinish:re,children:[o.jsx(m.Item,{name:"nome",label:"Nome e Sobrenome",rules:[{required:!0,message:"Por favor, insira seu nome!"}],children:o.jsx(v,{placeholder:"Seu nome e sobrenome"})}),o.jsx(m.Item,{name:"email",label:"E-mail",rules:[{required:!0,message:"Por favor, insira seu e-mail!"},{type:"email",message:"Por favor, insira um e-mail válido!"}],children:o.jsx(v,{placeholder:"Seu e-mail",onChange:U})}),M.length>0&&o.jsx("div",{style:{marginTop:"0.5rem",background:"#f7f7f7",padding:"0.5rem"},children:M.map((e,a)=>o.jsx("div",{onClick:()=>X(e),style:{cursor:"pointer",padding:"0.5rem"},children:e},a))}),o.jsx(w,{showSearch:!0,style:{width:200,marginBottom:20},placeholder:"Selecione um profissional",optionFilterProp:"children",onChange:async e=>{if(e){W(e);const a=await le(e);V(a),g.setFieldsValue({planodental:""})}},filterOption:(e,a)=>a.children.toLowerCase().indexOf(e.toLowerCase())>=0,value:i,children:B.map(e=>o.jsx(_,{value:e.id,children:e.nome},e.id))}),o.jsx("div",{style:{margin:"10px 0"},children:o.jsx(T.Group,{onChange:K,value:x,children:S.map(e=>o.jsx(T,{value:e.id,children:`${e.rua}, ${e.numero} - ${e.cidade}/${e.uf}`},e.id))})}),o.jsx(m.Item,{name:"data",label:"Data",rules:[{required:!0,message:"Por favor, selecione uma data!"}],children:o.jsx(he,{format:"DD/MM/YYYY",disabledDate:ie,onChange:oe})}),o.jsx(m.Item,{name:"horario",label:"Horário",rules:[{required:!0,message:"Por favor, selecione um horário!"}],children:o.jsx(ge,{format:"HH:mm",minuteStep:5,disabledHours:()=>q})}),o.jsx(m.Item,{name:"planodental",rules:[{required:!0,message:"Por favor, selecione um plano dental!"}],children:o.jsx(w,{placeholder:"Selecione seu plano dental",children:L.map(e=>o.jsx(_,{value:e.nome,children:e.nome},e.id))})}),o.jsx(m.Item,{name:"celular",label:"Celular",rules:[{required:!0,message:"Por favor, insira seu número de celular!"}],children:o.jsx(pe,{mask:"(99) 9 9999-9999",placeholder:"(99) 9 9999-9999",children:e=>o.jsx(v,{...e,type:"tel"})})}),o.jsx(m.Item,{name:"motivo",label:"Motivo da Consulta",rules:[{required:!0,message:"Por favor, descreva o motivo da consulta!"}],children:o.jsx(ve,{placeholder:"Descreva o motivo da consulta em poucas palavras",rows:4,maxLength:90})}),o.jsx(m.Item,{children:o.jsx(ye,{type:"primary",htmlType:"submit",loading:$,children:"Agendar"})}),o.jsxs(xe,{title:"Agendamento Recebido!",open:te,onOk:()=>{E(!1),se("/")},onCancel:()=>E(!1),okText:"Fechar",cancelButtonProps:{style:{display:"none"}},children:[o.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:"20px"},children:o.jsx("div",{style:{fontSize:"50px",color:"green"},children:"✓"})}),"Seu agendamento foi recebido com sucesso! Agora é só aguardar que entraremos em contato com você em até 24 horas antes da consulta. Fique à vontade para entrar em contato com a clínica."]})]})})};export{ta as default};
