import{r as a,j as s,a as S,B as g,L as v,c as C}from"./index-xvO6EYLJ.js";import{S as E,a as b,b as L}from"./styles-0aJ0mVQa.js";import{L as N}from"./styles-07yWa0TW.js";import{I as l}from"./index-CedHbxzm.js";import{B as d}from"./context-DdBxAEa7.js";import{s as m}from"./index-aY9mIxQK.js";import{C as P}from"./CompassOutlined-Dxi4GOaC.js";import"./index-B3RoWMnv.js";import"./useSize-6WP4OJO1.js";import"./AntdIcon-D_LLieO3.js";import"./index-CCtKJevy.js";import"./index-C-c4zHbE.js";import"./render-DABMoBew.js";import"./row-cNkTQF-q.js";import"./responsiveObserver-DGOH8gk1.js";import"./useLocale-Bsp9xcRv.js";import"./ExclamationCircleFilled-D1rgX5dR.js";import"./SearchOutlined-2JrLTji_.js";import"./KeyCode-Buyvp17p.js";import"./InfoCircleFilled-BPS8A9lc.js";import"./useNotification-CnkbSI_l.js";const Q=()=>{const[o,p]=a.useState([]),[r,t]=a.useState(""),[i,c]=a.useState(""),[h,n]=a.useState(!1),[u,x]=a.useState(!1),j=async()=>{if(!r&&!i){m.error({message:"Por favor, insira uma especialidade ou cidade para a pesquisa."});return}n(!0),x(!0);try{const e=await C.get("/publicProfessionals/search",{params:{especialidade:r,cidade:i}});p(e.data)}catch(e){console.error("Erro ao buscar profissionais",e),m.error({message:"Erro ao buscar profissionais"})}finally{n(!1)}},y=()=>{c("")},f=()=>{t("")};return s.jsxs(E,{children:[s.jsx("h2",{children:"Pesquise por profissionais na sua localidade ou por Especialidade."}),s.jsxs(b,{children:[s.jsxs("div",{className:"input-group",children:[s.jsx("label",{htmlFor:"speciality",children:"Especialidade"}),s.jsx(l,{id:"speciality",placeholder:"Ex. Fisioterapeuta",value:r,onChange:e=>t(e.target.value),onFocus:y})]}),s.jsxs("div",{className:"input-group",children:[s.jsx("label",{htmlFor:"city",children:"Cidade"}),s.jsx(l,{id:"city",placeholder:"Cidade",value:i,onChange:e=>c(e.target.value),onFocus:f})]}),s.jsx("div",{className:"search-button",children:s.jsx(d,{type:"primary",onClick:j,children:"Pesquisar"})})]}),h?s.jsxs(N,{children:[s.jsx(S,{})," "]}):s.jsx(L,{children:o.length>0?o.map(e=>s.jsxs("div",{className:"doctors-card",children:[e.foto&&s.jsx("img",{src:`${g}/${e.foto}`,alt:"Perfil"}),s.jsxs("div",{className:"doctors-infos",children:[s.jsx("h3",{children:e.nome}),s.jsxs("p",{children:[" ",s.jsxs("strong",{children:[" ",e.especialidade||"Não informada"]})]}),s.jsxs("p",{children:[s.jsx(P,{})," ",`${e.endereco}, ${e.numero}, ${e.bairro||""}, ${e.cidade} - ${e.uf}`]})]}),s.jsx("div",{className:"doctors-mais",children:s.jsx(v,{to:`/publicProfessionals/${e.id}`,children:s.jsx(d,{type:"primary",children:"Ver mais"})})})]},e.id)):u&&s.jsx("p",{children:"Nenhum profissional encontrado."})})]})};export{Q as default};
