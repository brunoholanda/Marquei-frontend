import{r as o,d as n,c as d,j as s}from"./index-F_APLYFk.js";const c=()=>{const[t,r]=o.useState(null),{id:a}=n();return o.useEffect(()=>{d.get(`/logs_atestados/${a}`).then(e=>{r(e.data)}).catch(e=>{console.error("Erro ao buscar informações do atestado:",e)})},[a]),t?s.jsxs("div",{style:{margin:"50px"},children:[s.jsx("h1",{children:"Informações do Atestado"}),s.jsxs("p",{children:["No sistema Marquei existe o registro de uma ",s.jsxs("b",{children:[" ",t.text]})]})]}):s.jsx("p",{children:"Carregando informações do atestado..."})};export{c as default};
