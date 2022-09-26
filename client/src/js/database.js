import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// DONE: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
console.log('data saved to database', result);
  // Create a connection to the database database and version we want to use.
  const jateDb  = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .put() method 
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
console.log('Retrieving data from the DB', result);
  // Create a connection to the database database and version we want to use.
  const jateDb  = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to grab all content in DB 
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};
initdb();
