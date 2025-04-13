import  { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import DhikrPage from './pages/DhikrPage';
import FavoritesPage from './pages/FavoritesPage';
import SettingsPage from './pages/SettingsPage';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { CounterProvider } from './contexts/CounterContext';
import { FontSizeProvider } from './contexts/FontSizeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { SoundProvider } from './contexts/SoundContext';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('dark-mode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <SoundProvider>
        <FontSizeProvider>
          <NotificationProvider>
            <FavoritesProvider>
              <CounterProvider>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                <main className="container mx-auto px-4 py-6 mb-16">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:id" element={<CategoryPage />} />
                    <Route path="/dhikr/:id" element={<DhikrPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Routes>
                </main>
                <Footer />
                <ToastContainer 
                  position="bottom-center"
                  autoClose={3000}
                  hideProgressBar
                  newestOnTop
                  closeOnClick
                  rtl
                  theme={darkMode ? "dark" : "light"}
                />
              </CounterProvider>
            </FavoritesProvider>
          </NotificationProvider>
        </FontSizeProvider>
      </SoundProvider>
    </div>
  );
}

export default App;
 