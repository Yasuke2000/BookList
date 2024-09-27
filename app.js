// Firestore setup (after Firebase initialization)
const db = firebase.firestore();
const bookForm = document.getElementById('book-form');
const booksContainer = document.getElementById('books-container');

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form data
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const genre = document.getElementById('book-genre').value;
  const status = document.getElementById('book-status').value;

  // Add book to Firestore
  db.collection('books').add({
    title,
    author,
    genre,
    status,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    bookForm.reset(); // Reset form
    fetchBooks(); // Refresh book list
  })
  .catch((error) => console.error('Error adding book:', error));
});

// Fetch all books from Firestore
function fetchBooks() {
  booksContainer.innerHTML = ''; // Clear previous content
  db.collection('books').orderBy('createdAt', 'desc').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const book = doc.data();
      const bookElement = document.createElement('div');
      bookElement.classList.add('book-item');
      bookElement.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p><strong>Status:</strong> ${book.status}</p>
      `;
      booksContainer.appendChild(bookElement);
    });
  });
}

// Initial fetch
fetchBooks();
