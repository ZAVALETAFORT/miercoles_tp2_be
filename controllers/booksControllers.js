function getAllBooks(req, res) {
  try {
    res.status(200).send("Books ok");
  } catch (error) {
    res.status(500).send("Error fetching books");
  }
}

function getBookById(req, res) {
  try {
    const { id } = req.params;
    res.status(200).send(`Book by id ok: ${id}`);
  } catch (error) {
    res.status(500).send("Error fetching book by id");
  }
}

function createBook(req, res) {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      throw new Error("Title and author are required");
    }
    res.status(201).send(`create Book ok:${title} - ${author}`);
  } catch (error) {
    res.status(500).send(`Error creating book:${error.message}`);
  }
}

function updateBook(req, res) {
  try {
    const { id } = req.params;
    const { title, author } = req.body;
    if (!title || !author) {
      throw new Error("Title and author are required");
    }
    res.status(200).send(`update Book ok:${id} - ${title} - ${author}`);
  } catch (error) {
    res.status(500).send(`Error updating book:${error.message}`);
  }
}

function deleteBook(req, res) {
  try {
    const { id } = req.params;
    res.status(200).send(`delete Book ok:${id}`);
  } catch (error) {
    res.status(500).send("Error deleting book");
  }
}

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };
