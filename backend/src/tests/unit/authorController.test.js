const { expect } = require('chai');
const sinon = require('sinon');
const authorController = require('../../controllers/authorController');
const authorService = require('../../services/authorService');

describe('Author Controller', () => {
  
  afterEach(() => {
    sinon.restore(); // Restaurar mocks después de cada test
  });

  describe('getAllAuthors', () => {
    it('debería devolver todos los autores', async () => {
      const mockAuthors = [{ id: 1, name: 'George Orwell' }];
      sinon.stub(authorService, 'getAllAuthors').resolves(mockAuthors);

      const req = {};
      const res = {
        json: sinon.spy()
      };

      await authorController.getAllAuthors(req, res);

      expect(res.json.calledOnceWithExactly(mockAuthors)).to.be.true;
    });
  });

  describe('getAuthorById', () => {
    it('debería devolver un autor existente', async () => {
      const mockAuthor = { id: 1, name: 'George Orwell' };
      sinon.stub(authorService, 'getAuthorById').resolves(mockAuthor);

      const req = { params: { id: 1 } };
      const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

      await authorController.getAuthorById(req, res);

      expect(res.json.calledOnceWithExactly(mockAuthor)).to.be.true;
    });

    it('debería devolver 404 si no encuentra el autor', async () => {
      sinon.stub(authorService, 'getAuthorById').resolves(undefined);

      const req = { params: { id: 999 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await authorController.getAuthorById(req, res);

      expect(res.status.calledOnceWithExactly(404)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });

  describe('createAuthor', () => {
    it('debería crear un nuevo autor', async () => {
      const newAuthor = { id: 2, name: 'Aldous Huxley' };
      sinon.stub(authorService, 'createAuthor').resolves(newAuthor);

      const req = { body: { name: 'Aldous Huxley' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await authorController.createAuthor(req, res);

      expect(res.status.calledOnceWithExactly(201)).to.be.true;
      expect(res.json.calledOnceWithExactly(newAuthor)).to.be.true;
    });
  });

  describe('updateAuthor', () => {
    it('debería actualizar un autor existente', async () => {
      const updatedAuthor = { id: 1, name: 'George Orwell Updated' };
      sinon.stub(authorService, 'updateAuthor').resolves(updatedAuthor);

      const req = { params: { id: 1 }, body: { name: 'George Orwell Updated' } };
      const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

      await authorController.updateAuthor(req, res);

      expect(res.json.calledOnceWithExactly(updatedAuthor)).to.be.true;
    });

    it('debería devolver 404 si no encuentra el autor para actualizar', async () => {
      sinon.stub(authorService, 'updateAuthor').resolves(null);

      const req = { params: { id: 999 }, body: { name: 'Nonexistent' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await authorController.updateAuthor(req, res);

      expect(res.status.calledOnceWithExactly(404)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });

  describe('deleteAuthor', () => {
    it('debería eliminar un autor existente', async () => {
      sinon.stub(authorService, 'deleteAuthor').resolves(true);

      const req = { params: { id: 1 } };
      const res = { status: sinon.stub().returnsThis(), send: sinon.spy() };

      await authorController.deleteAuthor(req, res);

      expect(res.status.calledOnceWithExactly(204)).to.be.true;
      expect(res.send.calledOnce).to.be.true;
    });

    it('debería devolver 404 si no encuentra el autor para eliminar', async () => {
      sinon.stub(authorService, 'deleteAuthor').resolves(null);

      const req = { params: { id: 999 } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await authorController.deleteAuthor(req, res);

      expect(res.status.calledOnceWithExactly(404)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });

});
