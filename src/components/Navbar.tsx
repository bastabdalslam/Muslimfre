import  { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Book, BookMarked, Menu, X, Settings } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Navbar = ({ darkMode, setDarkMode }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`sticky top-0 z-50 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 space-x-reverse" onClick={closeMenu}>
            <Book className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">حصن المسلم</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <Link 
              to="/" 
              className={`py-2 px-3 rounded-md ${location.pathname === '/' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}`}
              onClick={closeMenu}
            >
              الرئيسية
            </Link>
            <Link 
              to="/favorites" 
              className={`py-2 px-3 rounded-md ${location.pathname === '/favorites' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}`}
              onClick={closeMenu}
            >
              المفضلة
              <BookMarked className="inline-block mr-1 h-4 w-4" />
            </Link>
            <Link 
              to="/settings" 
              className={`py-2 px-3 rounded-md ${location.pathname === '/settings' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}`}
              onClick={closeMenu}
            >
              الإعدادات
              <Settings className="inline-block mr-1 h-4 w-4" />
            </Link>
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                localStorage.setItem('dark-mode', JSON.stringify(!darkMode));
              }}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          <button className="md:hidden p-2" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Link 
              to="/" 
              className={`block py-2 px-4 rounded-md ${location.pathname === '/' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}`}
              onClick={closeMenu}
            >
              الرئيسية
            </Link>
            <Link 
              to="/favorites" 
              className={`block py-2 px-4 rounded-md ${location.pathname === '/favorites' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}`}
              onClick={closeMenu}
            >
              المفضلة
              <BookMarked className="inline-block mr-1 h-4 w-4" />
            </Link>
            <Link 
              to="/settings" 
              className={`block py-2 px-4 rounded-md ${location.pathname === '/settings' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'}`}
              onClick={closeMenu}
            >
              الإعدادات
              <Settings className="inline-block mr-1 h-4 w-4" />
            </Link>
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                localStorage.setItem('dark-mode', JSON.stringify(!darkMode));
              }}
              className="w-full text-right py-2 px-4 rounded-md hover:bg-gray-100"
            >
              {darkMode ? (
                <span className="flex items-center">
                  <Sun className="h-5 w-5 ml-2" />
                  الوضع النهاري
                </span>
              ) : (
                <span className="flex items-center">
                  <Moon className="h-5 w-5 ml-2" />
                  الوضع الليلي
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
 