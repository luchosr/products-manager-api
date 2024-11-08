import express from 'express';

const server = express();

//routing

server.get('/', (req, res) => {
  const datos = [
    {
      id: 1,
      name: 'Fernando',
    },
    {
      id: 2,
      name: 'Luciano',
    },
  ];
  res.send(datos);
});

export default server;
