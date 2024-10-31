'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

interface TransactionPageProps {
  goBack: () => void;
  balance: number;
}

const TransactionPage: React.FC<TransactionPageProps> = ({ goBack, balance }) => {
  const [amount, setAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const handleTransaction = async () => {
    if (!amount || !recipientAddress) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }
    if (parseFloat(amount) > balance) {
      toast.error('Недостаточно средств на балансе');
      return;
    }
    toast.success('Транзакция успешно обработана');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
  <header className="w-full max-w-md bg-white rounded-lg shadow-md p-4 flex justify-between items-center mb-4">
    <button onClick={goBack} className="text-blue-500">
      Назад
    </button>
    <div className="text-lg font-semibold text-gray-700">
     Транзакция
    </div>
  </header>
  <main className="w-full max-w-md bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
    <label className="flex flex-col text-gray-700">
      Количество TON
      <input
        type="number"
        placeholder="Введите количество TON"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="px-3 py-2 border rounded-md mt-1"
        required
      />
    </label>
    <label className="flex flex-col text-gray-700">
      Адрес получателя
      <input
        type="text"
        placeholder="Введите адрес получателя"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        className="px-3 py-2 border rounded-md mt-1"
        required
      />
    </label>
    <button
      onClick={handleTransaction}
      className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition mt-4"
    >
      Отправить
    </button>
  </main>
</div>
  );
};

export default TransactionPage;
