import{u as S,r as n,j as s}from"./index-kPzU05gx.js";import{a as v}from"./api-p_bhudRe.js";import{A as N}from"./AuthModal-CTc-rfhF.js";import{B as p}from"./index-BSp-sa5F.js";import{c as y}from"./computerPhone-D9JZ0YD9.js";import R from"./index-BzdHb1N4.js";import{C as o}from"./ExclamationCircleFilled-C5haNHtp.js";import"./index-DPBYgAbq.js";import"./Styles-CGctwYhX.js";import"./styled-components.browser.esm-BWH_c5t_.js";import"./Serializer-CQbcCsmu.js";import"./index-COTnBvfG.js";import"./useSize-Dir-JjEK.js";import"./AntdIcon-rDAQJIgd.js";import"./index-DvbXQ1GL.js";import"./context-Cu6KQni0.js";import"./render-CJmks47J.js";import"./index-DSAf5tNC.js";import"./useForm-sTvtv3Iy.js";import"./row-BdR9_GnZ.js";import"./responsiveObserver-BuWZJpCK.js";import"./useLocale-D_rXO8QB.js";import"./index-DmsyNvo6.js";import"./InfoCircleFilled-aimHxtz3.js";import"./KeyCode-Bp2GxRS5.js";import"./PurePanel-DZZoC6Qu.js";import"./index-DdU0LtvV.js";import"./SearchOutlined-BKygTbfa.js";import"./index-BUWDoS_L.js";import"./CalendarOutlined-FfBpZXtG.js";import"./ClockCircleOutlined---JEIzSM.js";import"./Overflow-DH1nb5VS.js";import"./index-CDd_3z3j.js";import"./CheckOutlined-CJXAI-D_.js";import"./index-Bg0REs51.js";import"./index-jIhnTVqN.js";import"./index-Chjiymov.js";import"./index-C_g5XK6A.js";import"./index-BfF3jSoh.js";import"./context-Cq6TeAM8.js";import"./WarningOutlined-CuxWXMQ9.js";const z="_containerPlanos_xjbtb_1",A="_planos_xjbtb_5",C="_planos__title_xjbtb_11",M="_planos__divider_xjbtb_19",q="_planCard_xjbtb_24",F="_mostSold_xjbtb_33",L="_mostSoldLabel_xjbtb_36",E="_price_xjbtb_51",I="_originalPrice_xjbtb_54",O="_perMonth_xjbtb_59",k="_duration_xjbtb_64",w="_testeMarquei_xjbtb_74",i={containerPlanos:z,planos:A,planos__title:C,planos__divider:M,planCard:q,mostSold:F,mostSoldLabel:L,price:E,originalPrice:I,perMonth:O,duration:k,testeMarquei:w},Rs=({maxProfessionals:l})=>{const d=S(),[m,x]=n.useState([]),[u,c]=n.useState(!1),[h,j]=n.useState({servicePlan:"",servicePrice:0,serviceId:""}),_=()=>{},f=r=>{j({servicePlan:r.plan,servicePrice:r.price,serviceId:r.id,service_link:r.preapproval_plan_id}),c(!0)},g=r=>{let t=r.filter(e=>e.plan!=="Plano Teste");return l===1?t=t.filter(e=>["Pro","Premium"].includes(e.plan)):l===5&&(t=t.filter(e=>e.plan==="Premium")),t.sort((e,a)=>e.plan==="Plus"?-1:a.plan==="Plus"?1:e.plan==="Pro"&&a.plan!=="Plus"?-1:a.plan==="Pro"&&e.plan!=="Plus"?1:e.plan==="Premium"&&!["Plus","Pro"].includes(a.plan)?-1:a.plan==="Premium"&&!["Plus","Pro"].includes(e.plan)?1:0)},P=async()=>{try{const r=await v.get("/services"),t=g(r.data,l);x(t)}catch(r){console.error("Erro ao buscar os planos:",r)}};n.useEffect(()=>{P()},[]);const b=()=>d("/cadastro");return s.jsxs("div",{className:i.containerPlanos,children:[s.jsxs("div",{className:i.planos__title,children:[s.jsx("h3",{children:"NOSSOS PLANOS"}),s.jsx("h2",{children:"O marquei é projetado para seu negócio crescer"})]}),s.jsx("div",{className:i.planos,children:m.map((r,t)=>s.jsxs("div",{className:i.planCard,children:[r.mostSold&&s.jsx("div",{className:i.mostSoldLabel,children:"MAIS VENDIDO!"}),s.jsx("h2",{children:r.plan}),s.jsxs("div",{className:i.price,children:[s.jsxs("span",{className:i.originalPrice,children:["R$",r.originalPrice]}),"R$",r.price," ",s.jsx("span",{className:i.perMonth,children:"por mês"})]}),s.jsx(p,{onClick:()=>f(r),children:"Contratar Agora"}),s.jsx("div",{className:i.planos__divider}),["Plus"].includes(r.plan)&&s.jsx("p",{children:"Ideal para profissionais que trabalham sozinhos !"}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Até ",r.persons," profissional(is) da saúde."]}),["Pro","Premium"].includes(r.plan)&&s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Suporte prioritário"]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Descontos por indicação"]})]}),["Premium"].includes(r.plan)&&s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Personalização de recursos da Plataforma"]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Pesquisa NPS automática;"]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Funções especificas da área de atuação"]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Expansão no número de usuários"]})]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Prontuário digital e emissão de documentos"]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Agenda 24 Horas"]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Administração Financeira"]}),s.jsxs("div",{className:i.duration,children:[s.jsx(o,{style:{fontSize:"20px",color:"#3f51b5",marginRight:"10px"}}),"Gerenciamento de Agenda Intuitivo"]}),s.jsx(N,{isVisible:u,onClose:()=>c(!1),onLoginSuccess:_,selectedService:h})]},t))}),s.jsxs("div",{className:i.testeMarquei,children:[s.jsxs("div",{children:[s.jsx("p",{children:"O Marquei É grátis por 7 dias, aproveite e ..."}),s.jsx(p,{onClick:b,children:"Crie seu cadastro !"})]}),s.jsx("div",{children:s.jsx("img",{src:y,alt:"imagem do sistema marquei agendamentos online"})})]}),s.jsxs("div",{className:i.planos__title,children:[s.jsx("h3",{children:"Confira as perguntas mais frequentes..."}),s.jsx(R,{})]})]})};export{Rs as default};
