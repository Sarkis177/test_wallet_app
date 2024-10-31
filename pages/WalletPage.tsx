'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Wallet } from '@tonconnect/sdk';
import { getTonConnect } from '../utils/tonconnect';
import { TonConnectButton } from '@tonconnect/ui-react';

interface WalletPageProps {
  goToTransactionPage: () => void;
  setBalance: (balance: number) => void;
}

const WalletPage: React.FC<WalletPageProps> = ({ goToTransactionPage, setBalance }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setLocalBalance] = useState(0);
  const [tonConnect, setTonConnect] = useState(null);
  const [isTonConnectReady, setIsTonConnectReady] = useState(false);

  useEffect(() => {
    const tonConnectInstance = getTonConnect();
    if (!tonConnectInstance) return;

    setTonConnect(tonConnectInstance);
    setIsTonConnectReady(true);

    const handleStatusChange = async (walletInfo: Wallet | null) => {
      if (walletInfo) {
        const address = walletInfo.account.address;
        setWalletAddress(address);
        await fetchBalance(address);
      } else {
        setWalletAddress('');
        setLocalBalance(0);
        setBalance(0);
      }
    };

    tonConnectInstance.onStatusChange(handleStatusChange);
    if (tonConnectInstance.wallet) {
      handleStatusChange(tonConnectInstance.wallet);
    }

    return () => {
      tonConnectInstance.onStatusChange(handleStatusChange);
    };
  }, []);

  const fetchBalance = async (address: string) => {
    try {
      const response = await axios.get(
        `https://testnet.toncenter.com/api/v2/getAddressBalance`,
        {
          params: {
            address: address,
            api_key: 'YOUR_TONCENTER_API_KEY',
          },
        }
      );
      const balanceTon = parseInt(response.data.result, 10) / 1e9;
      setLocalBalance(balanceTon);
      setBalance(balanceTon);
    } catch (error) {
      console.error('Ошибка при получении баланса:', error);
      toast.error('Не удалось получить баланс');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <header className="w-full max-w-md bg-white rounded-lg shadow-md p-4 flex justify-between items-center mb-4">
        {isTonConnectReady ? <TonConnectButton /> : <div>Загрузка...</div>}
        <div className="text-lg font-semibold text-gray-700">
          Баланс: {balance ? `${balance} TON` : 'Загрузка...'}
        </div>
      </header>
      <main className="w-full max-w-md bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
        <div className="text-lg font-semibold text-gray-700 mb-2">Адрес кошелька:</div>
        <div className="break-all text-center font-mono text-gray-700 mb-4">
          {walletAddress || 'Кошелёк не подключен'}
        </div>
        <button
          onClick={goToTransactionPage}
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-semibold"
        >
          Перевести
        </button>
      </main>
    </div>
  );
};

export default WalletPage;