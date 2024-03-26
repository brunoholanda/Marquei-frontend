import{r as n,u as le,j as e,L as V,B as v}from"./index-DtAKxO-I.js";import{R as F}from"./index-BFpPU777.js";import{l as ce}from"./logo-CeuNbcvV.js";import{c as de}from"./computerPhone-D9JZ0YD9.js";import{F as t}from"./index-DVTGV1Ty.js";import{S}from"./index-DsB5NFMg.js";import{I as f}from"./index-Bh7spuOb.js";import{C as d}from"./CheckOutlined-R07Mhy7g.js";import{C}from"./KeyCode-BDlL2ZxM.js";import{C as me}from"./index-BZp-_p2x.js";import{T as ue}from"./index-CFnU9gTT.js";import{B as pe}from"./context-DBlOovQj.js";import{M as he}from"./index-53RB1vmR.js";import{m as j}from"./index-ckeLVLhX.js";import"./useSize-CI_ZKiRx.js";import"./AntdIcon-yIvRgVWP.js";import"./Serializer-CQbcCsmu.js";import"./index-BMUJ3kY3.js";import"./render-DxYmgcxZ.js";import"./row-Pvs6HpoF.js";import"./responsiveObserver-CzKOeKup.js";import"./useLocale-CKM3KW2_.js";import"./ExclamationCircleFilled-BDkHAKsa.js";import"./PurePanel-DTnqM39y.js";import"./Overflow-CxvXknPO.js";import"./SearchOutlined-Bb9Je5JO.js";import"./index-GgFpFduT.js";import"./InfoCircleFilled-D2hARdve.js";import"./useNotification-CiPFwKzO.js";const{Option:u}=S,Ue=()=>{const[g]=t.useForm(),[y,O]=n.useState(!1),[R,w]=n.useState(!1),M=le(),[p,z]=n.useState("cpf"),[$,E]=n.useState("Digite o CPF"),[k,N]=n.useState("Nome completo"),[T,_]=n.useState([]),[B,I]=n.useState(!1),[P,J]=n.useState({lengthValid:!1,lowercaseValid:!1,specialCharValid:!1}),L=s=>{const r=s.target.value,o=r.length>=8,a=/[a-z]/.test(r),i=/[^A-Za-z0-9]/.test(r);J({lengthValid:o,lowercaseValid:a,specialCharValid:i})},U=async()=>{try{await g.validateFields(),I(!1),A(g.getFieldsValue())}catch{I(!0)}},Z=s=>{_(s)},G={medico:1,dentista:2,psicologo:3,fisioterapeuta:4,nutricionista:5,fonoaudiologo:6},H=s=>s==="cnpj"?"99.999.999/9999-99":"999.999.999-99";function W(s){if(s=s.replace(/[^\d]+/g,""),s.length!==11||/^(\d)\1{10}$/.test(s))return!1;let r=0,o;for(let a=1;a<=9;a++)r=r+parseInt(s.substring(a-1,a))*(11-a);if(o=r*10%11,(o===10||o===11)&&(o=0),o!==parseInt(s.substring(9,10)))return!1;r=0;for(let a=1;a<=10;a++)r=r+parseInt(s.substring(a-1,a))*(12-a);return o=r*10%11,(o===10||o===11)&&(o=0),o===parseInt(s.substring(10,11))}function K(s){if(s=s.replace(/[^\d]+/g,""),s.length!==14||/^(\d)\1+$/.test(s))return!1;let r=s.length-2,o=s.substring(0,r);const a=s.substring(r);let i=0,l=r-7;for(let c=r;c>=1;c--)i+=o.charAt(r-c)*l--,l<2&&(l=9);let x=i%11<2?0:11-i%11;if(x!==parseInt(a.charAt(0)))return!1;r=r+1,o=s.substring(0,r),i=0,l=r-7;for(let c=r;c>=1;c--)i+=o.charAt(r-c)*l--,l<2&&(l=9);return x=i%11<2?0:11-i%11,x===parseInt(a.charAt(1))}const Q=(s,r)=>{const o=r.replace(/[^\d]/g,"");return s==="cnpj"?K(o):W(o)};n.useEffect(()=>{p==="cnpj"?(E("Digite o CNPJ"),N("Razão a Social da sua Empresa")):(E("Digite o número do seu CPF"),N("Nome completo"))},[p]);const X=s=>/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(s),Y=async(s,r)=>r.length<8?Promise.reject(new Error("")):/[A-Z]/.test(r)?/[^A-Za-z0-9]/.test(r)?Promise.resolve():Promise.reject(new Error("")):Promise.reject(new Error("")),ee=async(s,r)=>{const o=await fetch(`${v}/user-specialty/associate`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:s,specialties:r})});if(!o.ok){const a=await o.json();throw new Error(a.message||"Erro ao associar especialidades")}},se=async s=>{try{if(!(await fetch(`${v}/send-welcome-email`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s})})).ok)throw new Error("Não foi possível enviar o e-mail de boas-vindas.");j.success("E-mail de boas-vindas enviado com sucesso!")}catch(r){j.error(r.message)}},A=async s=>{const{idNumber:r,nome:o,email:a,phone:i,address:l,password:x,confirmPassword:c,profession:oe}=s,ae=oe.map(h=>G[h]),te={nome:o,cnpj:r,telefone:i,endereco:l,service_id:4},D={email:a,password:x};try{if(x!==c)throw new Error("As senhas não coincidem.");if(!X(a)){j.error("Por favor, insira um email válido.");return}const h=await fetch(`${v}/companies`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({companyData:te,userData:D})});if(!h.ok){const b=(await h.json()).error||"Erro no registro";throw new Error(b)}const ie=(await h.json()).user.id;await ee(ie,ae),j.success("Registro bem-sucedido!");const q=await fetch(`${v}/auth/generate-temp-token`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:D.email})});if(!q.ok){const b=(await q.json()).error||"Erro ao obter o Token de Acesso Temporário";throw new Error(b)}g.resetFields(),w(!0),await se(s.email)}catch(h){j.error(h.message)}},re=s=>{O(s.target.checked)},m={labelCol:{span:24},wrapperCol:{span:24}};return n.useEffect(()=>{g.setFieldsValue({profession:T})},[T,g]),e.jsxs("div",{className:"register",children:[e.jsxs("div",{className:"formulario",children:[e.jsx("h2",{children:"Experimentar gratuitamente 😊"}),e.jsx("p",{children:"Não solicitamos método de pagamento 💰"}),e.jsxs(t,{form:g,onFinish:A,children:[e.jsxs(t.Item,{name:"profession",label:"",rules:[{required:!0,message:"Por favor, selecione sua profissão!"}],children:[e.jsx("p",{style:{fontSize:"1rem"},children:"Você ou sua clínica são compostos por?"}),e.jsxs(S,{mode:"multiple",placeholder:"Selecione a especialidade",onChange:Z,maxTagCount:6,className:"dynamic-width-select",style:{minHeight:"auto"},children:[e.jsx(u,{value:"medico",children:"Médico"}),e.jsx(u,{value:"dentista",children:"Dentista"}),e.jsx(u,{value:"psicologo",children:"Psicólogo"}),e.jsx(u,{value:"fisioterapeuta",children:"Fisioterapeuta"}),e.jsx(u,{value:"nutricionista",children:"Nutricionista"}),e.jsx(u,{value:"fonoaudiologo",children:"Fonoaudiólogo"})]})]}),e.jsx(t.Item,{...m,name:"idType",label:"Tipo de documento",rules:[{required:!0,message:"Por favor, selecione o tipo de documento!"}],children:e.jsxs(S,{placeholder:"Selecione um tipo",onChange:s=>z(s),children:[e.jsx(u,{value:"cnpj",children:"CNPJ"}),e.jsx(u,{value:"cpf",children:"CPF"})]})}),e.jsx(t.Item,{...m,name:"idNumber",label:$,rules:[{required:!0,message:`Por favor, insira o número do ${p.toUpperCase()}!`},()=>({validator(s,r){return Q(p,r)?Promise.resolve():Promise.reject(new Error(`O número do ${p.toUpperCase()} é inválido.`))}})],children:e.jsx(F,{mask:H(p),placeholder:p==="cnpj"?"00.000.000/0000-00":"000.000.000-00",children:s=>e.jsx(f,{...s})})}),e.jsx(t.Item,{...m,name:"nome",label:k,rules:[{required:!0,message:"Por favor, insira seu nome!"}],children:e.jsx(f,{placeholder:k})}),e.jsx(t.Item,{...m,name:"email",label:"Email",rules:[{required:!0,message:"Por favor, insira seu email!"},{type:"email",message:"Por favor, insira um email válido!"}],children:e.jsx(f,{placeholder:"exemplo@dominio.com"})}),e.jsx(t.Item,{...m,name:"phone",label:"Telefone",rules:[{required:!0,message:"Por favor, insira seu telefone!"}],children:e.jsx(F,{mask:"(99) 9 9999-9999",children:s=>e.jsx(f,{...s,placeholder:"(99) 9 9999-9999"})})}),e.jsx(t.Item,{...m,name:"address",label:"Endereço Basico",rules:[{required:!0,message:"Por favor, insira seu endereço!"}],children:e.jsx(f,{placeholder:"Endereço"})}),e.jsx(t.Item,{...m,name:"password",label:"Senha",rules:[{required:!0,message:"Por favor, insira sua senha!"},{validator:Y}],children:e.jsx(f.Password,{placeholder:"Senha",onChange:L})}),e.jsxs("div",{className:"validade-password",children:[e.jsxs("p",{children:[P.lengthValid?e.jsx(d,{style:{color:"green"}}):e.jsx(C,{style:{color:"red"}})," A senha deve conter pelo menos 8 dígitos;"]}),e.jsxs("p",{children:[P.lowercaseValid?e.jsx(d,{style:{color:"green"}}):e.jsx(C,{style:{color:"red"}})," Deve conter pelo menos uma letra maiúscula;"]}),e.jsxs("p",{children:[P.specialCharValid?e.jsx(d,{style:{color:"green"}}):e.jsx(C,{style:{color:"red"}})," Deve conter pelo menos um caractere especial."]})]}),e.jsx(t.Item,{...m,name:"confirmPassword",label:"Confirmar Senha",dependencies:["password"],rules:[{required:!0,message:"Por favor, confirme sua senha!"},({getFieldValue:s})=>({validator(r,o){return!o||s("password")===o?Promise.resolve():Promise.reject(new Error("As senhas não coincidem."))}})],children:e.jsx(f.Password,{placeholder:"Confirme sua senha"})}),e.jsx(t.Item,{name:"agreement",valuePropName:"checked",children:e.jsxs(me,{checked:y,onChange:re,children:["Li e aceito os"," ",e.jsx(V,{to:"/terms-of-use",className:"link",target:"_blank",children:"Termos de Uso"})," ","e"," ",e.jsx(V,{to:"/privacy-policy",className:"link",target:"_blank",children:"Política de Privacidade"})]})}),e.jsx(t.Item,{children:e.jsx(ue,{title:"Por favor, preencha todos os campos obrigatórios antes de submeter.",open:B,placement:"top",children:e.jsx(pe,{type:"primary",onClick:U,disabled:!y,className:y?"":"button-disabled",children:"Testar agora"})})})]}),e.jsxs(he,{title:"Cadastro Atendido Com Sucesso :)",open:R,onOk:()=>{w(!1),M("/login")},onCancel:()=>w(!1),okText:"Usar agora !",cancelButtonProps:{style:{display:"none"}},children:[e.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:"20px"},children:e.jsx("div",{style:{fontSize:"50px",color:"green"},children:"😀"})}),"Seu cadastro foi recebido com sucesso! Agora você pode desfrutar do poder do nosso sistema !"]})]}),e.jsxs("div",{className:"marketing",children:[e.jsx("img",{src:ce,alt:"logo da pagina"}),e.jsx("h1",{children:"O Marquei.com é o software gestor de agendamentos para profissionais da saúde."}),e.jsx("p",{children:"Convidamos você a experimentar tudo o que podemos oferecer para melhorar seus atendimentos e a gestão do seu dia a dia de trabalho."}),e.jsx("p",{children:"Experimente o Marquei por 7 dias, sem qualquer compromisso, e mergulhe em nossas soluções:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[" ",e.jsx(d,{}),"Agenda médica e agendamento online"]}),e.jsxs("li",{children:[" ",e.jsx(d,{}),"Agenda 24 horas"]}),e.jsxs("li",{children:[" ",e.jsx(d,{}),"Gestão financeira"]}),e.jsxs("li",{children:[" ",e.jsx(d,{}),"Gestão de estoque"]}),e.jsxs("li",{children:[" ",e.jsx(d,{}),"Prescrição digital"]}),e.jsxs("li",{children:[" ",e.jsx(d,{}),"Declarações digitais"]})]}),e.jsx("p",{children:"Preencha seu cadastro para começar o teste. Não solicitamos informações de pagamento e nosso suporte está disponível para esclarecer suas dúvidas durante o horário comercial."}),e.jsx("img",{className:"marketing-img",src:de,alt:"imagem do sistema marquei agendamentos online"})]})]})};export{Ue as default};
