import{r as n,j as t}from"./index-BjWOWftK.js";import{a as f}from"./api-yj2qoLPl.js";import{A as j}from"./AuthModal-D1-hlBBe.js";import"./index-BrP1Cg1Z.js";import"./Styles-HDwQP3Lk.js";import"./styled-components.browser.esm-0XG6BcNo.js";import"./Serializer-CQbcCsmu.js";import"./index-DWnRouz4.js";import"./useSize-xGuuOV2H.js";import"./AntdIcon-CQBeZWiu.js";import"./index-10_tvuH-.js";import"./context-CsxF_MV5.js";import"./render-Dc9fgLFB.js";import"./index-xwEKfmQR.js";import"./useForm-BVlqLGy1.js";import"./row-xbO0cgu3.js";import"./responsiveObserver-eh3CkRQ8.js";import"./useLocale-B5fEOMjY.js";import"./ExclamationCircleFilled-BXHKs-a4.js";import"./index-DZhypcJC.js";import"./InfoCircleFilled-CN7YLSSN.js";import"./KeyCode-iNboPXT1.js";import"./PurePanel-vSTbxOUV.js";import"./index-Dtquuxsa.js";import"./SearchOutlined-DC5n_389.js";import"./index-C7SteZcr.js";import"./CalendarOutlined-fGf3BKFZ.js";import"./ClockCircleOutlined-vEkn-5q0.js";import"./index-CrIh86xN.js";import"./Overflow-vieoZhrC.js";import"./CheckOutlined-BorBS3ox.js";import"./index-DmbuE59p.js";import"./index-JyjWfW4x.js";import"./index-DREpUMdt.js";import"./index-Chjiymov.js";import"./index-BNxrNzwE.js";import"./index-voIPXOLj.js";import"./useNotification-C_uzqUJr.js";import"./WarningOutlined-B45VRAgE.js";const x="_planos_1czrp_1",g="_plansGrid_1czrp_41",z="_planCard_1czrp_50",v="_mostSold_1czrp_59",A="_mostSoldLabel_1czrp_66",C="_price_1czrp_77",M="_originalPrice_1czrp_82",N="_perMonth_1czrp_87",L="_duration_1czrp_91",i={planos:x,plansGrid:g,planCard:z,mostSold:v,mostSoldLabel:A,price:C,originalPrice:M,perMonth:N,duration:L},Pr=n.memo(({maxProfessionals:l})=>{const[p,c]=n.useState([]),[m,a]=n.useState(!1),[d,u]=n.useState({servicePlan:"",servicePrice:0,serviceId:""}),P=()=>{},_=r=>{u({servicePlan:r.plan,servicePrice:r.price,serviceId:r.id,service_link:r.preapproval_plan_id}),a(!0)},h=r=>{let s=r.filter(o=>o.plan!=="Plano Teste");return l===1?s=s.filter(o=>["Pro","Premium"].includes(o.plan)):l===5&&(s=s.filter(o=>o.plan==="Premium")),s.sort((o,e)=>o.plan==="Plus"?-1:e.plan==="Plus"?1:o.plan==="Pro"&&e.plan!=="Plus"?-1:e.plan==="Pro"&&o.plan!=="Plus"?1:o.plan==="Premium"&&!["Plus","Pro"].includes(e.plan)?-1:e.plan==="Premium"&&!["Plus","Pro"].includes(o.plan)?1:0)},S=async()=>{try{const r=await f.get("/services"),s=h(r.data,l);c(s)}catch(r){console.error("Erro ao buscar os planos:",r)}};return n.useEffect(()=>{S()},[]),t.jsx("div",{children:t.jsx("div",{className:i.planos,children:p.map((r,s)=>t.jsxs("div",{className:`${i.planCard} ${r.mostSold?i.mostSold:""}`,children:[r.mostSold&&t.jsx("div",{className:i.mostSoldLabel,children:"MAIS VENDIDO!"}),t.jsx("h2",{children:r.plan}),t.jsxs("div",{className:i.price,children:[t.jsxs("span",{className:i.originalPrice,children:["R$",r.originalPrice]}),"R$",r.price," ",t.jsx("span",{className:i.perMonth,children:"por mês"})]}),t.jsxs("div",{className:i.duration,children:["Por ",r.persons," profissional(is) da saúde, durante ",r.duration," meses."]}),t.jsx("button",{onClick:()=>_(r),children:"Contratar Agora"}),t.jsx(j,{isVisible:m,onClose:()=>a(!1),onLoginSuccess:P,selectedService:d})]},s))})})});export{Pr as default};
