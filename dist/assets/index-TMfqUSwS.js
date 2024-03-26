import{s as t,b as F,r as s,c as h,j as e}from"./index-xvO6EYLJ.js";import{C as $}from"./index-DP7lvv-f.js";import{F as x}from"./index-B3RoWMnv.js";import{I as E}from"./index-CedHbxzm.js";import{B as I}from"./context-DdBxAEa7.js";import{i as A,W as k}from"./index-CnZdoO9C.js";import{S as z}from"./index-Cr1x6K6x.js";import"./AntdIcon-D_LLieO3.js";import"./useSize-6WP4OJO1.js";import"./index-BFLBf8DF.js";import"./KeyCode-Buyvp17p.js";import"./EllipsisOutlined-CTBf3xVj.js";import"./Overflow-nAuBfdjZ.js";import"./index-CCtKJevy.js";import"./PlusOutlined-CE9PvlLX.js";import"./Dropdown-Bm-fWAKP.js";import"./index-C-c4zHbE.js";import"./render-DABMoBew.js";import"./row-cNkTQF-q.js";import"./responsiveObserver-DGOH8gk1.js";import"./useLocale-Bsp9xcRv.js";import"./ExclamationCircleFilled-D1rgX5dR.js";import"./SearchOutlined-2JrLTji_.js";const M=t($)`
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  margin: 2rem;
`,R=t(x)`
  width: 30rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  display: center;
  .ant-form-item-label > label {
    color: #333; 
  }
`;t.div`
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  button {
    margin-bottom: .8rem;
  }

`;const T=t.div`
  width: 800px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;

  button {
    margin-bottom: .8rem;
  }

`,u=t.div`
  width: 500px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  margin: 2rem;
  padding: 1rem;
  border-radius: 8px;
  border: ${({selected:n})=>n?"3px solid #3f51b5":"none"}; /* Altere a cor e o estilo conforme necessário */
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px 0 rgba(0,0,0,0.3);
  }
`;t(E)`
  border-radius: 4px;
`;t(I)`
  width: 100%;
  background-color: #4CAF50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;const ne=()=>{const n=F(),{serviceId:i}=n.state||{serviceId:null},[f]=x.useForm(),[l,y]=s.useState(null),[D,g]=s.useState(null),[a,P]=s.useState({plan:"",monthlyPrice:0,anualPrice:0}),[p,b]=s.useState(null),[j,c]=s.useState(!1);s.useEffect(()=>{A("TEST-c12efe3e-56fd-49b6-a560-dd5d3b700102",{locale:"pt-BR"}),i&&v(i)},[i]);const v=async r=>{try{const o=await h.get(`/service_details/${r}`);P({plan:o.data.plan,monthlyPrice:o.data.price,anualPrice:o.data.anualPrice,persons:o.data.persons})}catch(o){console.error("Erro ao carregar detalhes do serviço:",o)}},m=(r,o)=>{const d={title:`Plano ${a.plan}`,unit_price:r==="monthly"?a.monthlyPrice:a.anualPrice,description:`Plano ${a.plan} - ${r==="monthly"?"Mensal":"Anual"}`};y(r),g(null),c(!0),C(d)},S=()=>a.monthlyPrice*12-a.anualPrice,w=async r=>{},C=async r=>{try{const d=(await h.post("/create_preference",{itemDetails:r})).data.id;b(d),c(!1)}catch(o){console.error("Erro ao criar a preferência de pagamento:",o),c(!1)}};return e.jsxs(M,{title:`Finalizar Compra - Plano ${a.plan}`,bordered:!1,children:[e.jsxs("h3",{children:["Com o ",a.plan," você terá acesso a todas as funcionalidades do sistemas ja existentes, recebera atualizações constantes e ainda terá suporte garantido, você ainda pode optar pelo pagamento anual e garantir uma oferta de desconto imperdivel !"]}),e.jsxs(R,{form:f,layout:"vertical",onFinish:w,children:[e.jsxs(T,{children:[e.jsxs(u,{selected:l==="anual",onClick:()=>m("anual"),children:[e.jsx("h2",{children:e.jsxs("strong",{children:["Plano ",a.plan," Anual 🤩"]})}),e.jsxs("h3",{children:["Use 12 meses pagando por 10 e Economize R$ ",S().toFixed(2)," ao ano !"]}),e.jsxs("h2",{children:["Pagando Apenas R$ ",(a.anualPrice/12).toFixed(2)," por mês"]}),e.jsxs("div",{children:[a.persons," profissional(is) teram acesso a plataforma"]})]}),e.jsxs(u,{selected:l==="monthly",onClick:()=>m("monthly"),children:[e.jsx("h2",{children:e.jsxs("strong",{children:["Plano ",a.plan," Mensal 💸"]})}),e.jsx("h3",{children:"Pagamento sem desconto mês a mês"}),e.jsxs("h2",{children:["R$ ",a.monthlyPrice," por mês"]}),e.jsxs("div",{children:[a.persons," profissional(is) teram acesso a plataforma"]})]})]}),j?e.jsx(z,{size:"large"}):l&&p&&e.jsx(k,{initialization:{preferenceId:p}})]})]})};export{ne as default};
