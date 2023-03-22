const http = require('http');

const PORT = 3001;

const products = [
    {
        title: 'pineapple',
        price: '400',
        amount: 5,
    },
    {
        title: 'banana',
        price: '250',
        amount: 2,
    },
    {
        title: 'mango',
        price: '300',
        amount: 10,
    },
]


const server = http.createServer((req,res) => {
    const { method } = req;

    if(method === 'PUT') {
        let body = [];
        req.on('data', chunk => {
            body += chunk; 
        });
        req.on('end', () => {
            const { title, price, amount } = JSON.parse(body);
            const productToUpdateIndex = products.findIndex(product => product.title === title);
            if(productToUpdateIndex !== -1) {
                products[productToUpdateIndex] = {
                    title,
                    price,
                    amount
                };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ message: 'Product updated successfully' }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ message: 'Product not found' }));
            }
            res.end();
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ message: 'Method not allowed' }));
        res.end();
    }
    res.end();
});

server.listen(PORT, () => {
console.log(`server is listening to port ${PORT}`)
})