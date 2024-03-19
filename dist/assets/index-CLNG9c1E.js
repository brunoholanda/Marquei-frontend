import{r as a,j as s,a as S,B as g,L as v}from"./index-BjWOWftK.js";import{S as C,a as E,b}from"./styles-IeZ1eE_I.js";import{a as L}from"./api-yj2qoLPl.js";import{L as N}from"./styles-IZQvhEu5.js";import{I as l}from"./index-Dtquuxsa.js";import{B as d}from"./context-CsxF_MV5.js";import{s as m}from"./index-DmCwQh6m.js";import{C as P}from"./CompassOutlined-4MCepfqJ.js";import"./styled-components.browser.esm-0XG6BcNo.js";import"./Serializer-CQbcCsmu.js";import"./index-DWnRouz4.js";import"./useSize-xGuuOV2H.js";import"./AntdIcon-CQBeZWiu.js";import"./index-10_tvuH-.js";import"./index-xwEKfmQR.js";import"./render-Dc9fgLFB.js";import"./useForm-BVlqLGy1.js";import"./row-xbO0cgu3.js";import"./responsiveObserver-eh3CkRQ8.js";import"./useLocale-B5fEOMjY.js";import"./ExclamationCircleFilled-BXHKs-a4.js";import"./SearchOutlined-DC5n_389.js";import"./KeyCode-iNboPXT1.js";import"./InfoCircleFilled-CN7YLSSN.js";import"./useNotification-C_uzqUJr.js";const Z=()=>{const[o,p]=a.useState([]),[r,t]=a.useState(""),[i,c]=a.useState(""),[h,n]=a.useState(!1),[u,x]=a.useState(!1),j=async()=>{if(!r&&!i){m.error({message:"Por favor, insira uma especialidade ou cidade para a pesquisa."});return}n(!0),x(!0);try{const e=await L.get("/publicProfessionals/search",{params:{especialidade:r,cidade:i}});p(e.data)}catch(e){console.error("Erro ao buscar profissionais",e),m.error({message:"Erro ao buscar profissionais"})}finally{n(!1)}},y=()=>{c("")},f=()=>{t("")};return s.jsxs(C,{children:[s.jsx("h2",{children:"Pesquise por profissionais na sua localidade ou por Especialidade."}),s.jsxs(E,{children:[s.jsxs("div",{className:"input-group",children:[s.jsx("label",{htmlFor:"speciality",children:"Especialidade"}),s.jsx(l,{id:"speciality",placeholder:"Ex. Fisioterapeuta",value:r,onChange:e=>t(e.target.value),onFocus:y})]}),s.jsxs("div",{className:"input-group",children:[s.jsx("label",{htmlFor:"city",children:"Cidade"}),s.jsx(l,{id:"city",placeholder:"Cidade",value:i,onChange:e=>c(e.target.value),onFocus:f})]}),s.jsx("div",{className:"search-button",children:s.jsx(d,{type:"primary",onClick:j,children:"Pesquisar"})})]}),h?s.jsxs(N,{children:[s.jsx(S,{})," "]}):s.jsx(b,{children:o.length>0?o.map(e=>s.jsxs("div",{className:"doctors-card",children:[e.foto&&s.jsx("img",{src:`${g}/${e.foto}`,alt:"Perfil"}),s.jsxs("div",{className:"doctors-infos",children:[s.jsx("h3",{children:e.nome}),s.jsxs("p",{children:[" ",s.jsxs("strong",{children:[" ",e.especialidade||"Não informada"]})]}),s.jsxs("p",{children:[s.jsx(P,{})," ",`${e.endereco}, ${e.numero}, ${e.bairro||""}, ${e.cidade} - ${e.uf}`]})]}),s.jsx("div",{className:"doctors-mais",children:s.jsx(v,{to:`/publicProfessionals/${e.id}`,children:s.jsx(d,{type:"primary",children:"Ver mais"})})})]},e.id)):u&&s.jsx("p",{children:"Nenhum profissional encontrado."})})]})};export{Z as default};
