// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb+srv://msitestcsgo:alangg123@rideshare.qjzb5cy.mongodb.net/'; // Substitua pelo URI do seu MongoDB

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const motoristaSchema = new mongoose.Schema({
  nome: String,
  destino: String,
  veiculo: String,
  placa: String,
  horario: String,
  whatsapp: String,
  latitude: Number,
  longitude: Number
});

const Motorista = mongoose.model('Motorista', motoristaSchema);

app.get('/motoristas', async (req, res) => {
  try {
    const motoristas = await Motorista.find();
    res.json(motoristas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/motoristas', async (req, res) => {
  const motorista = new Motorista(req.body);
  try {
    const newMotorista = await motorista.save();
    res.status(201).json(newMotorista);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
