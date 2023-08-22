import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { AppContextProvider } from '@/contexts/AppContext';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <main className={`${inter.className}`}>
        <Component {...pageProps} />
      </main>
    </AppContextProvider>
  );
}