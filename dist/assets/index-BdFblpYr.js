import{b as F,r as s,c as h,j as e}from"./index-DtAKxO-I.js";import{s as t}from"./styled-components.browser.esm-Bk05TAV1.js";import{C as $}from"./index-B5uQozZW.js";import{F as x}from"./index-DVTGV1Ty.js";import{I as E}from"./index-Bh7spuOb.js";import{B as I}from"./context-DBlOovQj.js";import{i as A,W as k}from"./index-DKKNANKo.js";import{S as z}from"./index-DmqRj2CN.js";import"./Serializer-CQbcCsmu.js";import"./AntdIcon-yIvRgVWP.js";import"./useSize-CI_ZKiRx.js";import"./index-67dYQnXs.js";import"./KeyCode-BDlL2ZxM.js";import"./EllipsisOutlined-DPUGTPVO.js";import"./Overflow-CxvXknPO.js";import"./index-BMUJ3kY3.js";import"./PlusOutlined-BxpqDW30.js";import"./Dropdown-zyi7t3e9.js";import"./index-CFnU9gTT.js";import"./render-DxYmgcxZ.js";import"./row-Pvs6HpoF.js";import"./responsiveObserver-CzKOeKup.js";import"./useLocale-CKM3KW2_.js";import"./ExclamationCircleFilled-BDkHAKsa.js";import"./SearchOutlined-Bb9Je5JO.js";const M=t($)`
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
`;const le=()=>{const n=F(),{serviceId:i}=n.state||{serviceId:null},[f]=x.useForm(),[l,y]=s.useState(null),[D,g]=s.useState(null),[o,P]=s.useState({plan:"",monthlyPrice:0,anualPrice:0}),[p,b]=s.useState(null),[j,c]=s.useState(!1);s.useEffect(()=>{A("TEST-c12efe3e-56fd-49b6-a560-dd5d3b700102",{locale:"pt-BR"}),i&&v(i)},[i]);const v=async r=>{try{const a=await h.get(`/service_details/${r}`);P({plan:a.data.plan,monthlyPrice:a.data.price,anualPrice:a.data.anualPrice,persons:a.data.persons})}catch(a){console.error("Erro ao carregar detalhes do serviço:",a)}},m=(r,a)=>{const d={title:`Plano ${o.plan}`,unit_price:r==="monthly"?o.monthlyPrice:o.anualPrice,description:`Plano ${o.plan} - ${r==="monthly"?"Mensal":"Anual"}`};y(r),g(null),c(!0),C(d)},S=()=>o.monthlyPrice*12-o.anualPrice,w=async r=>{},C=async r=>{try{const d=(await h.post("/create_preference",{itemDetails:r})).data.id;b(d),c(!1)}catch(a){console.error("Erro ao criar a preferência de pagamento:",a),c(!1)}};return e.jsxs(M,{title:`Finalizar Compra - Plano ${o.plan}`,bordered:!1,children:[e.jsxs("h3",{children:["Com o ",o.plan," você terá acesso a todas as funcionalidades do sistemas ja existentes, recebera atualizações constantes e ainda terá suporte garantido, você ainda pode optar pelo pagamento anual e garantir uma oferta de desconto imperdivel !"]}),e.jsxs(R,{form:f,layout:"vertical",onFinish:w,children:[e.jsxs(T,{children:[e.jsxs(u,{selected:l==="anual",onClick:()=>m("anual"),children:[e.jsx("h2",{children:e.jsxs("strong",{children:["Plano ",o.plan," Anual 🤩"]})}),e.jsxs("h3",{children:["Use 12 meses pagando por 10 e Economize R$ ",S().toFixed(2)," ao ano !"]}),e.jsxs("h2",{children:["Pagando Apenas R$ ",(o.anualPrice/12).toFixed(2)," por mês"]}),e.jsxs("div",{children:[o.persons," profissional(is) teram acesso a plataforma"]})]}),e.jsxs(u,{selected:l==="monthly",onClick:()=>m("monthly"),children:[e.jsx("h2",{children:e.jsxs("strong",{children:["Plano ",o.plan," Mensal 💸"]})}),e.jsx("h3",{children:"Pagamento sem desconto mês a mês"}),e.jsxs("h2",{children:["R$ ",o.monthlyPrice," por mês"]}),e.jsxs("div",{children:[o.persons," profissional(is) teram acesso a plataforma"]})]})]}),j?e.jsx(z,{size:"large"}):l&&p&&e.jsx(k,{initialization:{preferenceId:p}})]})]})};export{le as default};
