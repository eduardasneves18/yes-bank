export async function createTransactionAPI(transaction: { amount: number; type: string; description: string }) {
    try {
      const response = await fetch('http://localhost:3000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log('Transaction created:', result);
    } catch (error) {
      console.error('Failed to create transaction:', error);
    }
  }
  export async function getTransactionsAPI(id?: number) {
    try {
        const url = id ? `http://localhost:3000/api/transactions?id=${id}` : 'http://localhost:3000/api/transactions';
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(id ? 'Transaction retrieved:' : 'Transactions retrieved:', result);
        return result;
    } catch (error) {
        console.error('Failed to retrieve transactions:', error);
    }
}

export async function updateTransactionsAPI(id: number, updatedData: object) {
    try {
        const response = await fetch(`http://localhost:3000/api/transactions?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Transaction updated:', result);
        return result;
    } catch (error) {
        console.error('Failed to update transaction:', error);
    }
}

export async function deleteTransactionsAPI(id: number) {
    try {
        const response = await fetch(`http://localhost:3000/api/transactions?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Transaction deleted:', result);
        return result;
    } catch (error) {
        console.error('Failed to delete transaction:', error);
    }
}