import{u as b,r as n,j as s,c as v}from"./index-BejUs57K.js";import{A as N}from"./AuthModal-CnKX-FVV.js";import{B as d}from"./index-Bjjdu_Qn.js";import{c as y}from"./computerPhone-D9JZ0YD9.js";import R from"./index-BWre9flS.js";import{C as o}from"./ExclamationCircleFilled-BIgSFzZP.js";import"./index-Dcj4oQbQ.js";import"./Styles-D8I0Z3_Q.js";import"./styled-components.browser.esm-BDisp2Ny.js";import"./Serializer-CQbcCsmu.js";import"./index-DSQYWx6w.js";import"./useSize-CRxPdOae.js";import"./AntdIcon-DoQ--mR6.js";import"./index-DxMt6mpZ.js";import"./context-B7EqC6Vo.js";import"./render-CZhUZhp8.js";import"./index-qNXZvFLH.js";import"./row-0GtaHct3.js";import"./responsiveObserver-C1kZbN31.js";import"./useLocale-CC7fmsIl.js";import"./index-BdGlfXDG.js";import"./InfoCircleFilled-D2xAbk3M.js";import"./KeyCode-D4p1xH96.js";import"./PurePanel-CuzpRnpP.js";import"./index-cvZCd3Op.js";import"./SearchOutlined-CMcZmJPM.js";import"./index-v56yy83D.js";import"./CalendarOutlined-BkHhpkn_.js";import"./ClockCircleOutlined-C2xYg_xp.js";import"./index-DHdX90EX.js";import"./Overflow-KqVdY2pe.js";import"./CheckOutlined-B64fgD7x.js";import"./index-DxaFO5T4.js";import"./ReCAPTCHAUtil-C7BvWI6n.js";import"./index-0966CjeA.js";import"./index-CfPvBrCp.js";import"./index-D-SSOORw.js";import"./useNotification-Bpa0q6dt.js";import"./WarningOutlined-Cj51580d.js";const z="_containerPlanos_xjbtb_1",C="_planos_xjbtb_5",M="_planos__title_xjbtb_11",A="_planos__divider_xjbtb_19",q="_planCard_xjbtb_24",F="_mostSold_xjbtb_33",L="_mostSoldLabel_xjbtb_36",E="_price_xjbtb_51",I="_originalPrice_xjbtb_54",O="_perMonth_xjbtb_59",k="_duration_xjbtb_64",w="_testeMarquei_xjbtb_74",i={containerPlanos:z,planos:C,planos__title:M,planos__divider:A,planCard:q,mostSold:F,mostSoldLabel:L,price:E,originalPrice:I,perMonth:O,duration:k,testeMarquei:w},Ns=({maxProfessionals:l})=>{const p=b(),[m,x]=n.useState([]),[u,c]=n.useState(!1),[h,j]=n.useState({servicePlan:"",servicePrice:0,serviceId:""}),f=()=>{},_=e=>{j({servicePlan:e.plan,servicePrice:e.price,serviceId:e.id,service_link:e.preapproval_plan_id}),c(!0)},g=e=>{let t=e.filter(r=>r.plan!=="Plano Teste");return l===1?t=t.filter(r=>["Pro","Premium"].includes(r.plan)):l===5&&(t=t.filter(r=>r.plan==="Premium")),t.sort((r,a)=>r.plan==="Plus"?-1:a.plan==="Plus"?1:r.plan==="Pro"&&a.plan!=="Plus"?-1:a.plan==="Pro"&&r.plan!=="Plus"?1:r.plan==="Premium"&&!["Plus","Pro"].includes(a.plan)?-1:a.plan==="Premium"&&!["Plus","Pro"].includes(r.plan)?1:0)},P=async()=>{try{const e=await v.get("/services");let t=g(e.data,l);t=t.map(r=>({...r,mostSold:r.plan==="Pro"})),x(t)}catch(e){console.error("Erro ao buscar os planos:",e)}};n.useEffect(()=>{P()},[]);const S=()=>p("/cadastro");return s.jsxs("div",{className:i.containerPlanos,children:[s.jsxs("div",{className:i.planos__title,children:[s.jsx("h3",{children:"NOSSOS PLANOS"}),s.jsx("h2",{children:"O marquei é projetado para seu negócio crescer"})]}),s.jsx("div",{className:i.planos,children:m.map((e,t)=>s.jsxs("div",{className:i.planCard,children:[e.mostSold&&s.jsx("div",{className:i.mostSoldLabel,children:"MAIS VENDIDO!"}),s.jsx("h2",{children:e.plan}),s.jsxs("div",{className:i.price,children:[s.jsxs("span",{className:i.originalPrice,children:["R$",e.originalPrice]}),"R$",e.price," ",s.jsx("span",{className:i.perMonth,children:"por mês"})]}),s.jsx(d,{onClick:()=>_(e),children:"Contratar Agora"}),s.jsx("div",{className:i.planos__divider}),["Plus"].includes(e.plan)&&s.jsx("p",{children:"Ideal para profissionais que trabalham sozinhos !"}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Até ",e.persons," profissional(is) da saúde."]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Gestão de cadastro de clientes;"]}),["Pro","Premium"].includes(e.plan)&&s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Suporte prioritário"]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Descontos por indicação"]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Multiplos endereços;"]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Confirmação de consulta automática;"]})]}),["Premium"].includes(e.plan)&&s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Personalização de recursos da Plataforma"]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Pesquisa NPS automática;"]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Funções especificas da área de atuação"]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Expansão no número de usuários"]})]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Prontuário digital e emissão de documentos"]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Agenda 24 Horas"]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Administração Financeira"]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Gerenciamento de Agenda Intuitivo"]}),s.jsx(N,{isVisible:u,onClose:()=>c(!1),onLoginSuccess:f,selectedService:h})]},t))}),s.jsxs("div",{className:i.testeMarquei,children:[s.jsxs("div",{children:[s.jsx("p",{children:"O Marquei É grátis por 7 dias, aproveite e ..."}),s.jsx(d,{onClick:S,children:"Crie seu cadastro !"})]}),s.jsx("div",{children:s.jsx("img",{src:y,alt:"imagem do sistema marquei agendamentos online"})})]}),s.jsxs("div",{className:i.planos__title,children:[s.jsx("h3",{children:"Confira as perguntas mais frequentes..."}),s.jsx(R,{})]})]})};export{Ns as default};
