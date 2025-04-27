const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const pool = require('../../config/database');

chai.use(chaiHttp);
const { expect } = chai;

describe('Book Routes', () => {

  let createdAuthorId;
  let createdBookId;

  before(async () => {
    await pool.query('DELETE FROM books');
    await pool.query('DELETE FROM authors');

    // Creamos un autor antes de los tests de libros
    const [result] = await pool.query('INSERT INTO authors (name) VALUES (?)', ['Autor Prueba']);
    createdAuthorId = result.insertId;
  });

  describe('POST /api/books', () => {
    it('debería crear un nuevo libro', async () => {
      const res = await chai.request(app)
        .post('/api/books')
        .send({ title: '1984', author_id: createdAuthorId });

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('id');
      expect(res.body.title).to.equal('1984');

      createdBookId = res.body.id;
    });
  });

  describe('GET /api/books', () => {
    it('debería devolver todos los libros', async () => {
      const res = await chai.request(app).get('/api/books');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
    });
  });

  describe('GET /api/books/:id', () => {
    it('debería devolver un libro específico', async () => {
      const res = await chai.request(app).get(`/api/books/${createdBookId}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('id', createdBookId);
      expect(res.body.title).to.equal('1984');
    });
  });

  describe('PUT /api/books/:id', () => {
    it('debería actualizar un libro existente', async () => {
      const res = await chai.request(app)
        .put(`/api/books/${createdBookId}`)
        .send({ title: '1984 actualizado', author_id: createdAuthorId });

      expect(res).to.have.status(200);
      expect(res.body.title).to.equal('1984 actualizado');
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('debería eliminar un libro', async () => {
      const res = await chai.request(app)
        .delete(`/api/books/${createdBookId}`);

      expect(res).to.have.status(204);
    });
  });

});