import{r as m,u as j,j as e,a as f,c as g}from"./index-F_APLYFk.js";import{S as v,a as P,L as b,b as y,c as F}from"./styles-CCVzVJod.js";import{B as l}from"./index-BGmgU-6m.js";import{F as r}from"./index-BcKRyQvd.js";import{I as s}from"./index-CF94sgcy.js";import{M as S}from"./index-CuE4LayX.js";import{s as c}from"./index-BSshCDlB.js";import"./styled-components.browser.esm-Dscn1jK2.js";import"./Serializer-CQbcCsmu.js";import"./useSize-CS2hrim6.js";import"./AntdIcon-Dm9H8mJU.js";import"./index-Cz3MuDBw.js";import"./context-BBgDGUKR.js";import"./render-BLHg8_GC.js";import"./index-ZuMCXK86.js";import"./useForm-ByqIYigZ.js";import"./row-BsPN2-51.js";import"./responsiveObserver-Ds-bgV4Y.js";import"./useLocale-Ds0JCdav.js";import"./ExclamationCircleFilled-CJs6dt2B.js";import"./SearchOutlined-DT7IAkrq.js";import"./InfoCircleFilled-D7yE8Sak.js";import"./KeyCode-BGAGjcbr.js";import"./PurePanel-B5Kw681a.js";import"./useNotification-B5cApIMQ.js";const Y=()=>{const[a]=r.useForm(),[t,o]=m.useState(!1),[d,i]=m.useState(!1),p=j(),u=async n=>{i(!0);try{await g.post("/send-email",n),o(!0),a.resetFields()}catch(x){console.error("Erro ao enviar mensagem:",x),c.error({message:"Erro ao enviar a mensagem. Por favor, tente novamente."})}finally{i(!1)}},h=n=>{c.error({message:"Por favor, preencha todos os campos obrigatórios."})};return e.jsxs(v,{children:[e.jsx("h1",{children:"Entre em Contato"}),e.jsx("p",{children:"Você pode entrar em contato utilizando nosso formulário de contato, ou pelos nossos outros meios."}),e.jsxs(P,{children:[d?e.jsxs(b,{children:[e.jsx(f,{})," "]}):e.jsxs(y,{form:a,name:"contact-form",onFinish:u,onFinishFailed:h,layout:"vertical",children:[e.jsx("h2",{children:"Formulário de contato"}),e.jsx(r.Item,{label:"Nome",name:"name",rules:[{required:!0,message:"Por favor, insira seu nome!"}],children:e.jsx(s,{})}),e.jsx(r.Item,{label:"Email",name:"email",rules:[{required:!0,message:"Por favor, insira seu email!"},{type:"email",message:"Por favor, insira um email válido!"}],children:e.jsx(s,{})}),e.jsx(r.Item,{label:"Mensagem",name:"message",rules:[{required:!0,message:"Por favor, insira sua mensagem!"}],children:e.jsx(s.TextArea,{})}),e.jsx(r.Item,{children:e.jsx(l,{htmlType:"submit",children:"Enviar Mensagem"})})]}),e.jsxs(F,{children:[e.jsx("h2",{children:"Informações de Contato"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Caixa Postal:"}),"  Av. Paulista 1106 - Bela Vista, São Paulo - SP ",e.jsx("br",{})," SL01 Andar 16, 01310-914"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Telefone:"})," (11) 5194-6100"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," contato@marquei.com.br"]})]})]}),t&&e.jsx(S,{title:"Mensagem Enviada",open:t,onCancel:()=>o(!1),footer:[e.jsx(l,{onClick:()=>{o(!1),p("/")},children:"Fechar"},"fechar")],children:e.jsx("p",{children:"Sua mensagem foi enviada com sucesso! Em breve será respondida !"})})]})};export{Y as default};
