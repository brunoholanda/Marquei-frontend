import{r as a,u as A,d as E,j as t,a as z,c as x}from"./index-BQF3cPym.js";import{s as i}from"./styled-components.browser.esm-DBwtvTCP.js";import{B}from"./index-BpA3Fuot.js";import{L as k}from"./styles-BSlgAjCh.js";import{C as y}from"./index-BV6iTKco.js";import{B as c}from"./context-Fzf3q6Qk.js";import{M as w}from"./index-Bb0wNoCb.js";import{m}from"./index-DCz0qyh3.js";import"./Serializer-CQbcCsmu.js";import"./index-C0dvJG1O.js";import"./useSize-D_L_sEch.js";import"./AntdIcon-Bf-y5mt3.js";import"./index-Zqv3mRLS.js";import"./index-BCWQvPtp.js";import"./render-Evlt6hy1.js";import"./row-CXODCmak.js";import"./responsiveObserver-BFwVCCVV.js";import"./useLocale-DqFOwQe3.js";import"./ExclamationCircleFilled-Cq3JtRsb.js";import"./InfoCircleFilled-9dsj_Nm8.js";import"./KeyCode-Bfjm3k6b.js";import"./PurePanel-BVQW51Q3.js";import"./useNotification-4XyWe70T.js";const D=i.div`
    margin: 10rem auto;
    text-align: center;

`,L=i.div`
    margin: 0 3rem;
    display: flex;
    justify-content: center;
    flex-direction: column;

    p {
        font-size: 18px;
    }
`,M=i.div`
    display: flex;
    justify-content: center;

    button {
        width: 200px;
        height: 40px;
        margin: 0;
        font-size: 18px;
    }
`,N=i.div`
    button {
        width: 250px;
        height: 40px;
        margin-top: 2rem;
        font-size: 18px;
    }
`,rt=()=>{const[p,d]=a.useState(!1),[r,g]=a.useState(null),[n,C]=a.useState(null),[j,u]=a.useState(!1),S=A(),{id:l}=E();function v(e){return y.AES.decrypt(e,"%A0533266q6td9g*").toString(y.enc.Utf8)}a.useEffect(()=>{(async()=>{try{const{data:o}=await x.get(`/confirma-agendamento/${l}`),s=JSON.parse(v(o.data));g({dataConsulta:s.data,horarioConsulta:s.horario,professionalNome:s.professional_nome})}catch(o){console.error("Erro ao buscar detalhes do agendamento:",o),m.error("Erro ao buscar detalhes do agendamento")}})()},[l]);const f=e=>{C(e)},b=async()=>{if(n===null){m.error("Por favor, faça uma escolha antes de salvar.");return}d(!0);const e=n?1:2;try{await x.put(`/confirma-agendamento/${l}`,{status:e}),u(!0)}catch(o){console.error("Erro ao atualizar o status do agendamento:",o),m.error("Erro ao atualizar o status do agendamento")}finally{d(!1)}},h=()=>{u(!1),S("/")};return r?t.jsxs(D,{children:[t.jsxs(L,{children:[t.jsx("h2",{children:"Confirmação de Consulta..."}),t.jsxs("p",{children:["Você deseja confirmar sua consulta para o dia ",r.dataConsulta," às ",r.horarioConsulta," com ",r.professionalNome,"?"]}),t.jsxs(M,{children:[t.jsx(c,{type:n===!0?"primary":"default",loading:p,onClick:()=>f(!0),children:"Sim"}),t.jsx(c,{style:{marginLeft:8,marginRight:8},type:n===!1?"primary":"default",onClick:()=>f(!1),children:"Não"})]}),t.jsx(N,{children:t.jsx(c,{type:"primary",loading:p,onClick:b,children:"Salvar"})})]}),t.jsxs(w,{title:"Confirmação Recebida!",open:j,onOk:h,cancelButtonProps:{style:{display:"none"}},footer:null,children:[t.jsx("p",{style:{textAlign:"center",fontSize:"18px"},children:"Resposta enviada com sucesso, obrigado !"}),t.jsx("div",{style:{fontSize:"50px",color:"green",display:"flex",justifyContent:"center"},children:"✓"}),t.jsx(B,{style:{textAlign:"center",width:"100%",marginTop:"1rem"},type:"primary",onClick:h,children:"Conheça o Marquei 😃"})]})]}):t.jsx(k,{children:t.jsx(z,{})})};export{rt as default};
