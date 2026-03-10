// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

// import our node modules
import express from "express";
import fs from "fs/promises";

// declare app variable - creating a new instance of express for us to use
const app = express();

// define our port number
const port = 3000;

// tell our server what kind of data it will be recieving and responding - JSON
app.use(express.json());

// Turn on our sever so it can listen and respond at port #
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllBooks()
// make a helper function that will get the name and descrition of all books
async function getAllBooks() {
  // read the data from books-data.json
  const data = await fs.readFile("books-data.json", "utf8");
  const parsedBooks = JSON.parse(data);
  return parsedBooks;
}

// 2. getOneBook(index)
async function getOneBook(index) {
  const data = await fs.readFile("books-data.json", "utf8");
  const parsedBooks = JSON.parse(data);
  return parsedBooks[index];
}

// 3. getOneBookTitle(index)
// returns only the title of the book at the given index
async function getOneBookTitle(index) {
  const data = await fs.readFile("books-data.json", "utf8");
  const parsedBooks = JSON.parse(data);
  return parsedBooks[index].title;
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-books
app.get("/get-all-books", async (req, res) => {
  const books = await getAllBooks();
  // res.send() sends text data
  // res.json() sends JSON data
  res.json(books);
});

// 2. GET /get-one-book/:index
app.get("/get-one-book/:index", async (req, res) => {
  // get the value of the dynamic parameter
  const index = req.params.index;
  // call the helper function
  const book = await getOneBook(index);
  // send the book as JSON in the response
  res.json(book);
});

// 3. GET /get-one-book-title/:index — try writing this one yourself!

// GET / get - one - book - title /: index
app.get("/get-one-book-title/:index", async (req, res) => {
  // get the index from the URL
  const index = req.params.index;

  // calls the helper function
  const title = await getOneBookTitle(index);

  // sends the title back to the client
  res.json(title);
});