const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Mock database
const users = [
    { username: 'userTest1', password: 'passTest1' },
    { username: 'User@test', password: 'TestPass_' },
    { username: 'user123&', password: '123456' }
];

// Sample data for endpoints
const accounts = [
    { id: 1, accountName: 'Cuenta soles', accountNumber: '00-000244-004121', balance: 1000.80, symbol: "S/" },
    { id: 2, accountName: 'Cuenta dólares', accountNumber: '00-478512-1232143', balance: 1800.20, symbol: "US$"  },
    { id: 3, accountName: 'Cuenta soles', accountNumber: '00-43565-24435343', balance: 0.00, symbol: "S/"  }
];


// Sample data for endpoints
const detailAccount = [
    { id: 1, dateTime: "25 Nov 2023", description: 'Transferencia', amount: +6.10 },
    { id: 1, dateTime: "25 Nov 2023", description: 'Plin', amount: -10.00 },
    { id: 2, dateTime: "25 Ene 2024", description: 'Transferencia', amount: +640.10 },
];

// Middleware
app.use(bodyParser.json());

// Login route
app.post('/iniciarSesion', (req, res) => {
    const { username, password } = req.body;
    // Find user in the mock database
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.json({ error: 'Usuario y/o contraseña incorrectos' }); 
    }
    res.json({ message: 'Login successful' });
});

// Get Accounts
app.get('/obtenerCuentas', (req, res) => {
    const firstTwoItems = accounts.slice(0, 2); // Obtenemos solo los dos primeros registros
    res.json({ accounts: firstTwoItems });
});

// Update Accounts
app.get('/actualizarCuentas', (req, res) => {
    const lastItem = accounts[accounts.length - 1]; // Obtenemos el último registro
    res.json({ accounts: [lastItem] });
});

// Endpoint 3
app.get('/obtenerMovimientos/:id', (req, res) => {
    const { id } = req.params;
    const filteredData = detailAccount.filter(item => item.id === parseInt(id));
    const simplifiedData = filteredData.map(item => ({ dateTime: item.dateTime, description: item.description, amount: item.amount }));
    res.json({ movements: simplifiedData });
});

app.set('port', process.env.PORT || 7557);

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});

