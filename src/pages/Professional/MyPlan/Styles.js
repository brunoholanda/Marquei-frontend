const cardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', 
    margin: '10px 0', 
    padding: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: '0.3s',
    borderRadius: '5px',
    border: '1px solid #e8e8e8',
};

const titleSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    flex: '1',
};

const cardColumStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr 1fr',
    gridTemplateRows: 'auto',
    gap: '5px',
    alignItems: 'center',
};

const titleStyle = {
    fontWeight: 'bold',
    fontSize: '20px',
    marginLeft: '10px', 
};

const benefitsStyle = {
    flex: '3', 
    padding: '0 20px',
    fontSize: '17px', 
};

const priceStyle = {
    flex: '1',
    fontSize: '18px',
    textAlign: 'right',
};

const indicatorStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30px',
    height: '30px',
    backgroundColor: '#1890ff',
    borderRadius: '50%',
};

export { cardStyle, titleSectionStyle, cardColumStyle, titleStyle, benefitsStyle, priceStyle, indicatorStyle };
