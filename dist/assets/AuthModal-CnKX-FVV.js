import{r as t,b as xe,u as je,e as Pe,c as M,j as e,B as f}from"./index-BejUs57K.js";import{i as ve,W as Se}from"./index-Dcj4oQbQ.js";import{p as Te,q as B,r as Ce}from"./Styles-D8I0Z3_Q.js";import{B as u}from"./index-Bjjdu_Qn.js";import{R as Ee}from"./ReCAPTCHAUtil-C7BvWI6n.js";import{M as L}from"./index-BdGlfXDG.js";import{S as O}from"./index-CfPvBrCp.js";import{I as U}from"./index-cvZCd3Op.js";import{B as we}from"./context-B7EqC6Vo.js";import{m as l}from"./index-D-SSOORw.js";import{W as q}from"./WarningOutlined-Cj51580d.js";const Ie=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,ke=["gmail.com","yahoo.com","hotmail.com","outlook.com","live.com"],Ue=({isVisible:N,onClose:F,onLoginSuccess:W,selectedService:m})=>{const[c,E]=t.useState(""),[w,J]=t.useState(""),[I,V]=t.useState(null),[h,p]=t.useState(!1),[G,k]=t.useState(!1),[d,y]=t.useState(null),H=xe(),{serviceId:x}=H.state||{serviceId:null},[r,K]=t.useState({plan:"",monthlyPrice:0,anualPrice:0}),[A,Q]=t.useState(null),[X,j]=t.useState(!1),Y=je(),[b,P]=t.useState([]),[D,Z]=t.useState(""),[ee,v]=t.useState(!1),{authData:ae}=Pe(),oe=ae.companyID,[$,S]=t.useState(""),[R,_]=t.useState(""),T=t.useRef(null),te=a=>Ie.test(a),se=a=>{if(a.includes("@")){const o=a.split("@"),s=o[1],n=ke.filter(i=>i.startsWith(s)).map(i=>o[0]+"@"+i);P(n)}else P([])},re=a=>{const o=a.target.value;E(o),se(o)},ne=a=>{E(a),P([])},ie=async a=>{try{const s=await(await fetch(`${f}/auth/check-email`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:a,company_id:oe})})).json();V(s.exists),s.exists||(l.info("Seu email não existe em nosso cadastro, por favor faça seu cadastro e aproveite 7 dias grátis para testar o Marquei"),v(!0))}catch(o){l.error("Error checking email: "+o.message)}},le=()=>{Y("/cadastro"),v(!1)},ce=async a=>{if(a.preventDefault(),!te(c)){l.error("Por favor, insira um email valido");return}p(!0),await ie(c),p(!1)},de=async a=>{if(a.preventDefault(),p(!0),!R){S("Por favor, confirme que você não é um robô."),p(!1);return}try{const o=await fetch(`${f}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:c,password:w,recaptchaToken:R})}),s=await o.json();o.ok?(sessionStorage.setItem("authToken",s.token),k(!0),W(s),C(m.serviceId)):(s.message==="Token inválido ou expirado"?(k(!0),y(null)):S("Não foi possível entrar. Verifique suas credenciais ou tente novamente mais tarde."),_(""))}catch{S("Ocorreu um problema. Por favor, tente novamente mais tarde."),T.current&&T.current.reset()}p(!1)};t.useEffect(()=>{m.serviceId&&C(m.serviceId)},[m.serviceId]),t.useEffect(()=>{ve("TEST-c12efe3e-56fd-49b6-a560-dd5d3b700102",{locale:"pt-BR"}),x&&C(x)},[x]);const C=async a=>{try{const o=await M.get(`/service_details/${a}`);K({plan:o.data.plan,monthlyPrice:o.data.price,anualPrice:o.data.anualPrice,persons:o.data.persons}),Z(o.data.preapproval_plan_id)}catch(o){console.error("Erro ao carregar detalhes do serviço:",o)}},me=async a=>{try{const s=(await M.post("/create_preference",{itemDetails:a})).data.id;Q(s),j(!1),z()}catch(o){console.error("Erro ao criar a preferência de pagamento:",o),j(!1)}},g=async(a,o)=>{const s=sessionStorage.getItem("authToken");if(a==="monthly"){if(!D){l.error("ID de plano de aprovação prévia não encontrado. Por favor, tente novamente mais tarde.");return}const n={payment_type:"mensal",payment_email:c};try{const i=await fetch(`${f}/companies/updatePaymentInfo`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(n)}),fe=await i.json();if(i.ok){const ye=`https://www.mercadopago.com/mlb/debits/new?preapproval_plan_id=${D}`;window.location.href=ye}else l.error(`Erro ao atualizar informações de pagamento: ${fe.error||"Erro desconhecido"}`)}catch(i){console.error("Erro ao enviar dados de pagamento:",i),l.error("Erro ao enviar informações de pagamento.")}}else{const n={title:`Plano ${r.plan}`,unit_price:a==="anual"?r.anualPrice:r.monthlyPrice,description:`Plano ${r.plan} - ${a==="anual"?"Anual":"Mensal"}`};y(a),j(!0),me(n)}},pe=()=>r.monthlyPrice*12-r.anualPrice,z=async()=>{const a=sessionStorage.getItem("authToken");if(!a){l.error("Você precisa estar logado para realizar o pagamento.");return}const s={payment_type:d==="monthly"?"mensal":"anual",payment_email:c};try{const n=await fetch(`${f}/companies/updatePaymentInfo`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(s)}),i=await n.json();n.ok||l.error(`Erro: ${i.error}`)}catch(n){console.error("Erro ao enviar dados de pagamento:",n),l.error("Erro ao enviar informações de pagamento.")}},ue=a=>{z()},he={visual:{borderRadius:"6px",color:"white"},texts:{action:"pay",valueProp:"security_details"}},ge=()=>G?d?e.jsxs("div",{children:[e.jsxs("h2",{children:["Você selecionou o ",d==="monthly"?"Plano Mensal":"Plano Anual"," de pagamento"]}),X?e.jsx(O,{size:"large"}):d&&A&&e.jsx(Se,{customization:he,initialization:{preferenceId:A},onPaymentSuccess:ue}),e.jsxs(Ce,{children:[e.jsxs("p",{children:["Ao clicar em Pagar você será redirecionado para o ambiente seguro do Mercado Pago, o valor a ser pago no plano anual será  ",e.jsxs("b",{children:["R$ ",r.anualPrice]})," e pode ser parcelado*"]}),e.jsx("p",{children:"Utilize o mesmo e-mail logado no pagamento !"})]}),e.jsx(we,{style:{textAlign:"center",width:"100%",marginTop:"1rem"},onClick:()=>y(null),children:"Alterar Plano de Pagamento"})]}):e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("h2",{children:"Escolha o tipo de pagamento"}),e.jsxs("p",{children:[e.jsx(q,{})," Ao pagar utilize o mesmo e-mail logado !"]}),e.jsxs(Te,{children:[e.jsxs(B,{selected:d==="anual",onClick:()=>g("anual"),children:[e.jsx("h2",{children:e.jsx("strong",{children:"Plano Anual 🤩"})}),e.jsxs("h3",{children:["Use 12 meses pagando por 10 e Economize R$ ",pe().toFixed(2)," ao ano!"]}),e.jsxs("h2",{children:["Pagando Apenas R$ ",(r.anualPrice/12).toFixed(2)," por mês"]}),e.jsxs("div",{children:[r.persons," profissional(is) teram acesso a plataforma"]}),e.jsx(u,{onClick:a=>{a.stopPropagation(),g("anual")},children:"Contratar  🤝"})]}),e.jsxs(B,{selected:d==="monthly",onClick:()=>g("monthly"),children:[e.jsx("h2",{children:e.jsx("strong",{children:"Plano Mensal 💸"})}),e.jsx("h3",{children:"Pagamento mês a mês..."}),e.jsxs("h2",{children:["R$ ",r.monthlyPrice," por mês"]}),e.jsxs("div",{children:[r.persons," profissional(is) teram acesso a plataforma"]}),e.jsx(u,{onClick:a=>{a.stopPropagation(),g("monthly")},children:"Contratar  🤝"})]})]}),e.jsxs("p",{children:[e.jsx(q,{})," Ao pagar utilize o mesmo e-mail logado !"]})]}):e.jsx("div",{children:e.jsxs("form",{onSubmit:ce,children:[e.jsx(U,{type:"email",value:c,onChange:re,placeholder:"Insira seu E-mail",required:!0,style:{marginBottom:"1rem"}}),b.length>0&&e.jsx("div",{style:{marginTop:"0.5rem",background:"#f7f7f7",padding:"0.5rem"},children:b.map((a,o)=>e.jsx("div",{style:{cursor:"pointer",padding:"0.5rem"},onClick:()=>ne(a),children:a},o))}),I&&e.jsxs(e.Fragment,{children:[e.jsx(U,{style:{marginTop:"1rem"},type:"password",value:w,onChange:a=>J(a.target.value),placeholder:"Insira sua senha",required:!0}),$&&e.jsx("div",{children:$}),e.jsx("div",{style:{display:"flex",justifyContent:"center",margin:"15px 0 10px 0"},children:e.jsx(Ee,{ref:T,onChange:a=>_(a)})}),e.jsx(u,{style:{textAlign:"center",width:"100%",marginTop:"1rem"},type:"primary",onClick:de,loading:h,children:"Login"})]}),!I&&!h&&e.jsx(u,{style:{textAlign:"center",width:"100%",height:"20px"},htmlType:"submit",loading:h,children:"Continue"})]})});return e.jsxs(e.Fragment,{children:[e.jsxs(L,{title:"Cadastre-se / Entrar",open:N,onCancel:F,footer:null,children:[e.jsxs("p",{children:["Plano ",m.servicePlan]}),e.jsx("div",{style:{textAlign:"center"},children:h?e.jsx(O,{size:"large"}):ge()})]}),e.jsxs(L,{title:"Teste Grátis 😮",open:ee,onCancel:()=>v(!1),footer:null,children:[e.jsx("p",{children:"Seu e-mail não existe em nosso cadastro, por favor faça seu cadastro e aproveite 7 dias grátis para testar o Marquei !"}),e.jsx(u,{style:{textAlign:"center",width:"100%",marginTop:"1rem"},type:"primary",onClick:le,children:"Testar Grátis Por 7 Dias 😃"})]})]})};export{Ue as A};
