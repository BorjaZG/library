const { expect } = require('chai');
const sinon = require('sinon');
const bookController = require('../../controllers/bookController');
const bookService = require('../../services/bookService');

describe('Book Controller', () => {

  afterEach(() => {
    sinon.restore();
  });

  describe('getAllBooks', () => {
    it('debería devolver todos los libros', async () => {
      const mockBooks = [{ id: 1, title: '1984', author_id: 1 }];
      sinon.stub(bookService, 'getAllBooks').resolves(mockBooks);

      const req = {};
      const res = {
        json: sinon.spy()
      };

      await bookController.getAllBooks(req, res);

      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal(mockBooks);
    });
  });

  describe('getBookById', () => {
    it('debería devolver un libro existente', async () => {
      const mockBook = { id: 1, title: '1984', author_id: 1 };
      sinon.stub(bookService, 'getBookById').resolves(mockBook);

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      await bookController.getBookById(req, res);

      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal(mockBook);
    });

    it('debería devolver 404 si no encuentra el libro', async () => {
      sinon.stub(bookService, 'getBookById').resolves(undefined);

      const req = { params: { id: 99 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await bookController.getBookById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });

  describe('createBook', () => {
    it('debería crear un nuevo libro', async () => {
      const newBook = { id: 1, title: 'Nuevo', author_id: 1 };
      sinon.stub(bookService, 'createBook').resolves(newBook);

      const req = { body: { title: 'Nuevo', author_id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await bookController.createBook(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal(newBook);
    });
  });

  describe('updateBook', () => {
    it('debería actualizar un libro existente', async () => {
      const updatedBook = { id: 1, title: 'Actualizado', author_id: 2 };
      sinon.stub(bookService, 'updateBook').resolves(updatedBook);

      const req = { params: { id: 1 }, body: { title: 'Actualizado', author_id: 2 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      await bookController.updateBook(req, res);

      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal(updatedBook);
    });

    it('debería devolver 404 si no encuentra el libro para actualizar', async () => {
      sinon.stub(bookService, 'updateBook').resolves(null);

      const req = { params: { id: 99 }, body: { title: 'X', author_id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await bookController.updateBook(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });

  describe('deleteBook', () => {
    it('debería eliminar un libro existente', async () => {
      sinon.stub(bookService, 'deleteBook').resolves(true);

      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await bookController.deleteBook(req, res);

      expect(res.status.calledWith(204)).to.be.true;
      expect(res.send.calledOnce).to.be.true;
    });

    it('debería devolver 404 si no encuentra el libro para eliminar', async () => {
      sinon.stub(bookService, 'deleteBook').resolves(null);

      const req = { params: { id: 99 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await bookController.deleteBook(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });

});