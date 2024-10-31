'use client';

import { useState } from 'react';
import WalletPage from '../../pages/WalletPage';
import TransactionPage from '../../pages/TransactionPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [showTransactionPage, setShowTransactionPage] = useState(false);
  const [balance, setBalance] = useState(0);
  const goToTransactionPage = () => {
    setShowTransactionPage(true);
  };
  const goBack = () => {
    setShowTransactionPage(false);
  };

  return (
    <div>
      {showTransactionPage ? (
        <TransactionPage goBack={goBack} balance={balance} />
      ) : (
        <WalletPage
          goToTransactionPage={goToTransactionPage}
          setBalance={setBalance}
        />
      )}
      <ToastContainer />
    </div>
  );
}
