import{r as e,j as i,c as j}from"./index-DtAKxO-I.js";import{A as x}from"./AuthModal-CxLRBDi8.js";import"./index-DKKNANKo.js";import"./Styles-B5msiCGj.js";import"./styled-components.browser.esm-Bk05TAV1.js";import"./Serializer-CQbcCsmu.js";import"./index-DVTGV1Ty.js";import"./useSize-CI_ZKiRx.js";import"./AntdIcon-yIvRgVWP.js";import"./index-BMUJ3kY3.js";import"./context-DBlOovQj.js";import"./render-DxYmgcxZ.js";import"./index-CFnU9gTT.js";import"./row-Pvs6HpoF.js";import"./responsiveObserver-CzKOeKup.js";import"./useLocale-CKM3KW2_.js";import"./ExclamationCircleFilled-BDkHAKsa.js";import"./index-53RB1vmR.js";import"./InfoCircleFilled-D2hARdve.js";import"./KeyCode-BDlL2ZxM.js";import"./PurePanel-DTnqM39y.js";import"./index-Bh7spuOb.js";import"./SearchOutlined-Bb9Je5JO.js";import"./index-gnFUhh9P.js";import"./CalendarOutlined-BHHeKPdf.js";import"./ClockCircleOutlined-yAqJ-m-N.js";import"./index-DsB5NFMg.js";import"./Overflow-CxvXknPO.js";import"./CheckOutlined-R07Mhy7g.js";import"./index-Cpu2Yaof.js";import"./index-_akqntwb.js";import"./ReCAPTCHAUtil-Bq0XrcWm.js";import"./index-BD1vRKR1.js";import"./index-DmqRj2CN.js";import"./index-ckeLVLhX.js";import"./useNotification-CiPFwKzO.js";import"./WarningOutlined-DektOd_F.js";const g="_planos_1czrp_1",z="_plansGrid_1czrp_41",v="_planCard_1czrp_50",A="_mostSold_1czrp_59",C="_mostSoldLabel_1czrp_66",M="_price_1czrp_77",N="_originalPrice_1czrp_82",L="_perMonth_1czrp_87",I="_duration_1czrp_91",s={planos:g,plansGrid:z,planCard:v,mostSold:A,mostSoldLabel:C,price:M,originalPrice:N,perMonth:L,duration:I},ur=e.memo(({maxProfessionals:p,maxEnderecosPermitidos:n})=>{const[c,m]=e.useState([]),[d,a]=e.useState(!1),[u,P]=e.useState({servicePlan:"",servicePrice:0,serviceId:""}),_=()=>{},f=r=>{P({servicePlan:r.plan,servicePrice:r.price,serviceId:r.id,service_link:r.preapproval_plan_id}),a(!0)},h=r=>{let t=r.filter(o=>o.plan!=="Plano Teste");return p===1?t=t.filter(o=>["Pro","Premium"].includes(o.plan)):p===5&&(t=t.filter(o=>o.plan==="Premium")),n===1?t=t.filter(o=>["Plus","Pro","Premium"].includes(o.plan)):n===2?t=t.filter(o=>["Pro","Premium"].includes(o.plan)):n===3&&(t=t.filter(o=>o.plan==="Premium")),t.sort((o,l)=>o.plan==="Plus"?-1:l.plan==="Plus"?1:o.plan==="Pro"&&l.plan!=="Plus"?-1:l.plan==="Pro"&&o.plan!=="Plus"?1:o.plan==="Premium"&&!["Plus","Pro"].includes(l.plan)?-1:l.plan==="Premium"&&!["Plus","Pro"].includes(o.plan)?1:0)},S=async()=>{try{const r=await j.get("/services"),t=h(r.data,p,n);m(t)}catch(r){console.error("Erro ao buscar os planos:",r)}};return e.useEffect(()=>{S()},[]),i.jsx("div",{children:i.jsx("div",{className:s.planos,children:c.map((r,t)=>i.jsxs("div",{className:`${s.planCard} ${r.mostSold?s.mostSold:""}`,children:[r.mostSold&&i.jsx("div",{className:s.mostSoldLabel,children:"MAIS VENDIDO!"}),i.jsx("h2",{children:r.plan}),i.jsxs("div",{className:s.price,children:[i.jsxs("span",{className:s.originalPrice,children:["R$",r.originalPrice]}),"R$",r.price," ",i.jsx("span",{className:s.perMonth,children:"por mês"})]}),i.jsxs("div",{className:s.duration,children:["Por ",r.persons," profissional(is) da saúde, durante ",r.duration," meses."]}),i.jsx("button",{onClick:()=>f(r),children:"Contratar Agora"}),i.jsx(x,{isVisible:d,onClose:()=>a(!1),onLoginSuccess:_,selectedService:u})]},t))})})});export{ur as default};
