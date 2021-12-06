/* eslint-disable no-undef */
require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();

chai.use(chaiHttp);

const baseUrl = process.env.BASE_URL;

describe('Investments', () => {
  const userID = 'VzVb2tnpOOhfstxA2h2wveasctz1';

  describe('/POST Investments - Renda Variavel', () => {
    it('Cadastrando renda variavel', (done) => {

      const body = {
        typeInvestment: 'Renda Variável',
        value: 21.30,
        amount: 12,
        code: 'ITSA4F',
        date: "2021-06-20",
        userID
      }

      chai.request(baseUrl)
        .post('/api/investments')
        .send(body)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').eql('Criado com sucesso');
          res.body.should.have.property('investment').property('typeInvestment').eql('Renda Variável');
          done();
        });
    });

    it('Cadastrando renda variavel sem usuario', (done) => {
      const body = {
        typeInvestment: 'Renda Variável',
        value: 21.30,
        amount: 12,
        code: 'ITSA4F',
        date: "2021-06-20"
      }

      chai.request(baseUrl)
        .post('/api/investments')
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/POST Investments - Renda Fixa', () => {
    it('Cadastrando renda fixa', (done) => {

      const body = {
        typeInvestment: 'Renda Fixa',
        value: 21.30,
        amount: 12,
        code: 'SELIC',
        date: "2021-03-20",
        userID
      }

      chai.request(baseUrl)
        .post('/api/investments')
        .send(body)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').eql('Criado com sucesso');
          res.body.should.have.property('investment').property('typeInvestment').eql('Renda Fixa');
          done();
        });
    });

    it('Cadastrando renda fixa sem usuario', (done) => {
      const body = {
        typeInvestment: 'Renda Fixa',
        value: 21.30,
        amount: 12,
        code: 'SELIC',
        date: "2021-03-20"
      }

      chai.request(baseUrl)
        .post('/api/investments')
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/GET Investments', () => {
    it('Listando todos os investimentos do usuario', (done) => {
      chai.request(baseUrl)
        .get('/api/investments')
        .query({
          userID
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('investments').be.a('array');
          done();
        });
    });
  });

  describe('/GET/:id Investment', () => {
    it('Listando o investimento por ID', (done) => {
      const id = '61070f2161955d2cc1405429';
      chai.request(baseUrl)
        .get(`/api/investments/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('investments').property('_id').eql(id);
          res.body.should.have.property('investments').property('typeInvestment');
          res.body.should.have.property('investments').property('value');
          res.body.should.have.property('investments').property('amount');
          res.body.should.have.property('investments').property('code');
          res.body.should.have.property('investments').property('date');
          res.body.should.have.property('investments').property('userID');
          res.body.should.have.property('investments').property('total');
          done();
        });
    });
  
    it('Listando investimentos do usuario com ID inválido', (done) => {
      const id = '1';
      chai.request(baseUrl)
        .get(`/api/investments/${id}`)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('/PUT/:id Investment', () => {
    it('Atualizando o investimento por ID', (done) => {
      const id = '61070f2161955d2cc1405429';

      const body = {
        typeInvestment: 'Renda Variável',
        value: 21.30,
        amount: 12,
        code: 'ITSA4F',
        date: "2021-06-20",
        userID
      }

      chai.request(baseUrl)
        .put(`/api/investments/${id}`)
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('investment').property('_id').eql(id);
          done();
        });
    });
  
    it('Atualizando o investimento por ID invalido', (done) => {
      const id = 'A39';
      const body = {
        typeInvestment: 'Renda Variável',
        value: 21.30,
        amount: 12,
        code: 'ITSA4F',
        date: "2021-06-20",
        userID
      }
  
      chai.request(baseUrl)
        .put(`/api/investments/${id}`)
        .send(body)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
