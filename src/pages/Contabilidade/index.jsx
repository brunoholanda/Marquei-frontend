import { Button, Card, Checkbox, Col, DatePicker, Input, InputNumber, Modal, Row, Slider, Table, Tabs, Tooltip } from "antd";
import { useEffect, useState } from "react";
import api from 'components/api/api';
import { Bar, BarChart, CartesianGrid, Legend, RadialBar, RadialBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import './Contabilidade.css';
import { CalculatorOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { useAuth } from "context/AuthContext";

const TransactionModal = ({ type, isVisible, onClose, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isRecurrent, setIsRecurrent] = useState(false);
  const [recurrenceMonths, setRecurrenceMonths] = useState(1);
  const { authData } = useAuth();
  const companyID = authData.companyID;

  const handleSubmit = () => {
    if (!amount || isNaN(amount) || (isRecurrent && recurrenceMonths < 1)) {
      return;
    }
    onSubmit({
      amount: parseFloat(amount),
      description,
      isRecurrent,
      recurrenceMonths: isRecurrent ? recurrenceMonths : undefined,
      type
    });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setAmount('');
    setDescription('');
    setIsRecurrent(false);
    setRecurrenceMonths(1);
  };

  return (
    <Modal
      title={type === 'income' ? 'Adicionar Receita 😍' : 'Adicionar Despesa 😞'}
      visible={isVisible}
      onOk={handleSubmit}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Salvar
        </Button>,
      ]}
    >
      <Input
        prefix="R$"
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        autoFocus
      />
      <Input
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginTop: '16px' }}
      />
      <Checkbox
        checked={isRecurrent}
        onChange={(e) => setIsRecurrent(e.target.checked)}
        style={{ marginTop: '16px' }}
      >
        {type === 'income' ? 'Receita recorrente?' : 'Despesa recorrente?'}
      </Checkbox>
      {isRecurrent && (
        <InputNumber
          min={1}
          max={12}
          defaultValue={1}
          onChange={(value) => setRecurrenceMonths(value)}
          style={{ marginTop: '16px' }}
        />
      )}
    </Modal>
  );
};
const Contabilidade = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [balance, setBalance] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('income');
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0);
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlyProfit, setMonthlyProfit] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState(null);
  const { authData } = useAuth();
  const companyID = authData.companyID;

  const handleDateChange = (date) => {
    if (date) {
      setDate(date);
      const formattedMonth = date.format('MM');
      const formattedYear = date.format('YYYY');
      fetchTransactionsForMonth(formattedMonth, formattedYear);
    }
  };


  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (transactionsData, fileName) => {
    const formattedData = transactionsData.map(tx => ({
      Valor: tx.receita ? `R$ ${tx.receita}` : `R$ -${tx.despesa}`,
      Descrição: tx.descricao_receita || tx.descricao_despesa,
      Data: new Date(tx.created_at).toLocaleDateString('pt-BR')
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };


  useEffect(() => {
    fetchBalance();
  }, []);

  useEffect(() => {
    if (companyID) {
      fetchBalanceAndTransactions();
      fetchTransactions();
    }
  }, [companyID]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const fetchBalanceAndTransactions = async () => {
    try {
      const responseBalance = await api.get('/contabilidades/saldo');
      setBalance(responseBalance.data.saldo);

      const month = new Date().getMonth() + 1; // Mês corrente (1-12)
      const year = new Date().getFullYear(); // Ano corrente

      const responseTransactions = await api.get(`/contabilidades/transacoes/mes?month=${month}&year=${year}`);
      setCurrentMonthIncome(responseTransactions.data.totalReceitas);
      setCurrentMonthExpense(responseTransactions.data.totalDespesas);
    } catch (error) {
      console.error("Erro ao buscar informações", error);
    }
  };
  const fetchBalance = async () => {
    try {
      const response = await api.get('/contabilidades/saldo');
      setBalance(response.data.saldo);
    } catch (error) {
      console.error("Erro ao buscar o saldo", error);
    }
  };

  const handleTransactionSubmit = async (transactionData) => {
    try {
      const payload = {
        company_id: companyID,
        receita: transactionData.type === 'income' ? transactionData.amount : 0,
        descricao_receita: transactionData.type === 'income' ? transactionData.description : '',
        recorrencia_receita: transactionData.type === 'income' ? transactionData.isRecurrent : false,
        recorrencia_qt_receita: transactionData.type === 'income' && transactionData.isRecurrent ? transactionData.recurrenceMonths : null,
        despesa: transactionData.type === 'expense' ? transactionData.amount : 0,
        descricao_despesa: transactionData.type === 'expense' ? transactionData.description : '',
        recorrencia_despesa: transactionData.type === 'expense' ? transactionData.isRecurrent : false,
        recorrencia_qt_despesa: transactionData.type === 'expense' && transactionData.isRecurrent ? transactionData.recurrenceMonths : null
      };

      const response = await api.post('/contabilidades', payload);
      if (response.data.saldo) {
        setBalance(response.data.saldo);
      } else {
        fetchBalance();
      }
      await fetchBalanceAndTransactions();
      await fetchTransactions();

    } catch (error) {
      console.error("Erro ao enviar a transação", error.response.data);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/contabilidades/transacoes');
      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações", error);
    }
  };

  const fetchTransactionsForMonth = async (month, year) => {

    if (!companyID) {
      console.error('company_id não está disponível.');
      return;
    }

    try {
      const response = await api.get(`/contabilidades/transacoes/extrato?month=${month}&year=${year}&company_id=${companyID}`);
      setTransactions(response.data);
    } catch (error) {
      console.error("Erro ao buscar transações", error);
    }
  };


  const formattedTransactions = transactions.map(tx => ({
    ...tx,
    valor: tx.tipo === 'receita' ? `R$ ${tx.valor}` : `R$ -${tx.valor}`,
    descricao: tx.tipo === 'receita' ? tx.descricao_receita : tx.descricao_despesa,
    dataCriacao: tx.created_at
      ? new Date(tx.created_at.replace(' ', 'T').slice(0, -3)).toLocaleDateString('pt-BR')
      : 'Data não disponível'
  }));

  const columns = [
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      render: (text, record) => {
        const value = record.receita ? record.receita : -record.despesa;
        const color = record.receita ? 'blue' : 'red';
        return <span style={{ color }}>{value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>;
      },
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
      render: (text, record) => record.descricao_receita || record.descricao_despesa,
    },
    {
      title: 'Data',
      dataIndex: 'dataCriacao',
      key: 'dataCriacao'
    },
  ];
  const openModal = (type) => {
    setModalType(type);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const data = [

    {
      name: 'Saídas',
      value: currentMonthExpense,
      fill: '#FF6347',
    },
    {
      name: 'Entradas',
      value: currentMonthIncome,
      fill: '#32CD32',
    },
  ];

  const style = {
    top: '10%',
    right: 25,
    transform: 'translate(0, -50%)',
    lineHeight: '24px'
  };

  useEffect(() => {
    fetchMonthlyProfit(selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchMonthlyProfit = async (year) => {
    try {
      const response = await api.get(`/contabilidades/lucro-mensal-detalhado?year=${year}`);
      console.log(response.data);
      setMonthlyProfit(response.data);
    } catch (error) {
      console.error("Erro ao buscar o lucro mensal", error);
    }
  };


  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const formatChartData = monthlyProfit.map(item => ({
    ...item,
    month: `${item.month}/${item.year.toString().slice(2, 4)}` // Formatar como 'nov/23'
  }));


  const tabList = [
    {
      key: '1',
      tab: isMobile ? 'Resumo' : 'Resumo do Mês',  
      content: (
        <>
          <Row gutter={16}>
            <Col xs={24} md={13}>
              <Card title="Resumo do Mês">
                <p style={{ color: '#32CD32' }}>Entradas: R$ {currentMonthIncome.toFixed(2)}</p>
                <p style={{ color: '#FF6347' }}>Saídas: R$ {currentMonthExpense.toFixed(2)}</p>
                <p style={{ color: '#8884d8' }}>Saldo: R$ {balance.toFixed(2)}</p>
                <div className="chartContainer">
                  <ResponsiveContainer width="100%" height={400}>
                    <RadialBarChart
                      innerRadius="30%"
                      outerRadius="100%"
                      data={data}
                      startAngle={180}
                      endAngle={0}
                    >
                      <RadialBar
                        minAngle={15}
                        label={{ position: 'insideStart', fill: '#fff' }}
                        background
                        clockWise
                        dataKey='value'
                      />
                      <Legend
                        iconSize={12}
                        layout='vertical'
                        verticalAlign='middle'
                        align="right"
                        wrapperStyle={style}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>
          </Row>        </>
      ),
    },

    {
      key: '2',
      tab: isMobile ? 'Balanço' : 'Balanço Mensal', // Nome da tab ajustado para mobile
      content: (
        <>
          <h2>Balanço Mensal 💰</h2>
          <Row gutter={16}>
            <Col span={24}>
              <Slider
                min={2021} // Ano mínimo, ajuste conforme necessário
                max={new Date().getFullYear()} // Ano máximo
                onChange={handleYearChange}
                value={typeof selectedYear === 'number' ? selectedYear : 0}
                marks={{ [selectedYear]: selectedYear.toString() }}
              />
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={formatChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="receita" fill="#32CD32" name="Receitas" />
                  <Bar dataKey="despesa" fill="#FF6347" name="Despesas" />
                  <Bar dataKey="lucro" fill="#8884d8" name="Lucro Líquido" />
                </BarChart>
              </ResponsiveContainer>
            </Col>
          </Row>        </>
      ),
    },

    {
      key: '3',
      tab: 'Extrato',
      content: (
        <div className="contabilidade_extrato">
          <h2>Selecione a Data Para Ver o Extrato 💲</h2>
          <div className="contabilidade_extrato-controls">
            <DatePicker
              picker="month"
              format="MM/YYYY"
              value={date}
              onChange={handleDateChange}
            />

            <Button onClick={() => exportToCSV(formattedTransactions, 'extrato_transacoes')}>Exportar para Excel</Button>
          </div>
          <Table style={{ marginTop: '30px' }} dataSource={formattedTransactions} columns={columns} />
        </div>
      ),
    },
  ].filter(Boolean);

  return (
    <div className="contabilidade">
      <h1>Contabilidade <CalculatorOutlined /></h1>
      <div className="transaction-buttons">
        <Button type="primary" onClick={() => openModal('income')}>
          <PlusCircleOutlined /> Receita
        </Button>
        <Button type="primary" danger onClick={() => openModal('expense')}>
          <MinusCircleOutlined /> Despesa
        </Button>
      </div>

      <TransactionModal
        type={modalType}
        isVisible={isModalVisible}
        onClose={closeModal}
        onSubmit={handleTransactionSubmit}
      />
      <Tabs defaultActiveKey="1">
        {tabList.map(tab => (
          <Tabs.TabPane tab={tab.tab} key={tab.key}>
            {tab.content}
          </Tabs.TabPane>
        ))}
      </Tabs>

    </div>

  );
};

export default Contabilidade;