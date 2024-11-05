import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import _ from 'lodash'

// Abrindo conexão com o banco de dados
const dbPromise = open({
  filename: './database.db', // Nome do arquivo do banco de dados
  driver: sqlite3.Database,
});

// Funções para trabalhar com transações

export const revalidate = 60;

// Função para inicializar o banco de dados
async function initializeDatabase() {
const db = await dbPromise;
await db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    type TEXT NOT NULL,
    description TEXT
    )
`);
}

// Criar uma nova transação
export async function createTransaction(transaction: { amount: number; type: string; description: string }) {
  const db = await dbPromise;
  const { amount, type, description } = transaction;
  await db.run('INSERT INTO transactions (amount, type, description) VALUES (?, ?, ?)', [amount, type, description]);
}

// Ler todas as transações
export async function getTransactions() {
  const db = await dbPromise;
  return await db.all('SELECT * FROM transactions');
}

// Atualizar uma transação
export async function updateTransaction(id: string, updatedTransaction: { amount: number; type: string; description: string }) {
  const db = await dbPromise;
  const { amount, type, description } = updatedTransaction;
  await db.run('UPDATE transactions SET amount = ?, type = ?, description = ? WHERE id = ?', [amount, type, description, id]);
}

// Remover uma transação
export async function deleteTransaction(id: number | string) {
  const db = await dbPromise;
  await db.run('DELETE FROM transactions WHERE id = ?', [id]);
}

// API para trabalhar com transações
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

// Exemplo de como poderia ser um endpoint para criar uma transação
export async function POST(req: Request) {
  const transaction = await req.json();
  await createTransaction(transaction);
  return new Response(JSON.stringify('Transaction created'), { status: 201 });
}

// Exemplo de como poderia ser um endpoint para atualizar uma transação
export async function PUT(req: Request) {
   // Parse the request body
   const transaction = await req.json();
  
   // Create a URL object to easily access query parameters
   const url = new URL(req.url);
   
   // Get query parameters
   const id = url.searchParams.get('id'); // Replace 'id' with the actual query parameter name if needed

   if (!_.isEmpty(id)) {
     updateTransaction(id!, transaction);
   }
 
  return new Response(JSON.stringify('Transaction updated'), { status: 200 });
}

// Exemplo de como poderia ser um endpoint para remover uma transação
export async function DELETE(req: Request) {
  
   // Create a URL object to easily access query parameters
   const url = new URL(req.url);
   
   // Get query parameters
   const id = url.searchParams.get('id'); // Replace 'id' with the actual query parameter name if needed

   if (!_.isEmpty(id)) {
    await deleteTransaction(id!);

   }

  return new Response(JSON.stringify('Transaction deleted'), { status: 200 });
}
