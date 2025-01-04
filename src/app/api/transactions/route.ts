import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import _ from 'lodash'

const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database,
});

export const revalidate = 60;

export async function initializeDatabase() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      type TEXT NOT NULL,
      description TEXT,
      dateTranscription TEXT NOT NULL,
      file TEXT
    )
`);
}

export async function createTransaction(transaction: {  amount: number; 
                                                        type: string; 
                                                        description: string; 
                                                        dateTransaction?: string;
                                                        file?: string; 
                                                      }) {
  
  const db = await dbPromise;
  const { amount, type, description, dateTransaction, file } = transaction;
  const transactionDate = dateTransaction || new Date().toISOString(); 

  await db.run(
      'INSERT INTO transactions (amount, type, description, dateTransaction, file) VALUES (?, ?, ?, ?, ?)', 
      [amount, type, description, transactionDate, file || null]
  );
}

export async function getTransactions() {
  const db = await dbPromise;
  return await db.all('SELECT * FROM transactions');
}

export async function updateTransaction(id: string, updatedTransaction: { amount: number; type: string; description: string }) {
  const db = await dbPromise;
  const { amount, type, description } = updatedTransaction;
  await db.run('UPDATE transactions SET amount = ?, type = ?, description = ? WHERE id = ?', [amount, type, description, id]);
}

export async function deleteTransaction(id: number | string) {
  const db = await dbPromise;
  await db.run('DELETE FROM transactions WHERE id = ?', [id]);
}

export async function GET(req: Request) {

  try {
      const { searchParams } = new URL(req.url);
      const transactions = await getTransactions();
      console.log(searchParams)
      return new Response(JSON.stringify(transactions), { status: 200, headers: { 'Content-Type': 'application/json' } });


  } catch (error) {
    console.error('Error handling request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}


export async function POST(req: Request) {
  const transaction = await req.json();
  await createTransaction(transaction);
  return new Response(JSON.stringify('Transaction created'), { status: 201 });
}


export async function PUT(req: Request) {
  const transaction = await req.json();
  const url = new URL(req.url);
  const id = url.searchParams.get('id'); 

  if (!_.isEmpty(id)) {
    updateTransaction(id!, transaction);
  }
 
  return new Response(JSON.stringify('Transaction updated'), { status: 200 });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id'); 

  if (!_.isEmpty(id)) {
    await deleteTransaction(id!);
  }

  return new Response(JSON.stringify('Transaction deleted'), { status: 200 });
}

