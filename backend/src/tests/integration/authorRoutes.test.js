const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const pool = require('../../config/database');

chai.use(chaiHttp);

const { expect } = chai;

describe('Author Routes', () => {

  let createdAuthorId;

  before(async () => {
    await pool.query('DELETE FROM authors');
  });

  describe('POST /api/authors', () => {
    it('debería crear un nuevo autor', async () => {
      const res = await chai.request(app)
        .post('/api/authors')
        .send({ name: 'George Orwell' });

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('id');
      expect(res.body.name).to.equal('George Orwell');

      createdAuthorId = res.body.id;
    });
  });

  describe('GET /api/authors', () => {
    it('debería devolver todos los autores', async () => {
      const res = await chai.request(app).get('/api/authors');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
    });
  });

  describe('GET /api/authors/:id', () => {
    it('debería devolver un autor específico', async () => {
      const res = await chai.request(app).get(`/api/authors/${createdAuthorId}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('id', createdAuthorId);
      expect(res.body).to.have.property('name', 'George Orwell');
    });
  });

  describe('PUT /api/authors/:id', () => {
    it('debería actualizar un autor existente', async () => {
      const res = await chai.request(app)
        .put(`/api/authors/${createdAuthorId}`)
        .send({ name: 'Orwell Actualizado' });

      expect(res).to.have.status(200);
      expect(res.body.name).to.equal('Orwell Actualizado');
    });
  });

  describe('DELETE /api/authors/:id', () => {
    it('debería eliminar un autor', async () => {
      const res = await chai.request(app)
        .delete(`/api/authors/${createdAuthorId}`);

      expect(res).to.have.status(204);
    });
  });

});