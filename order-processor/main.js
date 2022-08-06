const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 6012;

const randomString = () => {
    return (Math.random() + 1).toString(36).substring(2);
}

const randomNumber = () => {
    return Math.floor(Math.random() * 10);
}
app.post('/process', (req, res) => {
    console.log(req.body);
    const order = req.body;
    res.json({
        ...order,
        orderId: randomString(),
        isSuccess: randomNumber() > 2
    })

});

app.get('/', (req, res) => {
    res.send('hello');
})

app.listen(PORT, () => {
    console.log(`Application running with port: ${PORT} `);
});