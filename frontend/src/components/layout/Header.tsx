import React from 'react';
import { Leaf, LogOut, Award, BarChart2, BadgeCheck } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onOpenAuthModal?: () => void;
  activePage: 'dashboard' | 'marketplace' | 'projects' | 'news' | 'calculator' | 'impact' | 'green-score';
  onPageChange: (page: 'dashboard' | 'marketplace' | 'projects' | 'news' | 'calculator' | 'impact' | 'green-score') => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onOpenAuthModal, 
  activePage, 
  onPageChange 
}) => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm py-4 px-6 transition-colors">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Leaf className="h-7 w-7 text-emerald-600 dark:text-emerald-500" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">GreenLedger</h1>
        </div>

        {/* Navigation (only shown when logged in) */}
        {isLoggedIn && (
          <nav className="hidden md:flex space-x-4">
            {[
              { key: 'dashboard', label: 'Dashboard' },
              { key: 'marketplace', label: 'Marketplace' },
              { key: 'projects', label: 'Carbon Projects' },
              { key: 'news', label: 'Market News' },
              { key: 'calculator', label: 'Carbon Calculator' },
              { key: 'impact', label: 'Impact Dashboard', icon: <BarChart2 className="h-4 w-4 mr-1" /> },
              { key: 'green-score', label: 'Green Score', icon: <BadgeCheck className="h-4 w-4 mr-1" /> }
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                  activePage === key
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => onPageChange(key as HeaderProps['activePage'])}
              >
                {icon && <span className="mr-1">{icon}</span>}
                {label}
              </button>
            ))}
          </nav>
        )}

        {/* Action buttons */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {isLoggedIn ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
              className="flex items-center"
            >
              <LogOut className="h-4 w-4 mr-1" />
              <span>Logout</span>
            </Button>
          ) : (
            <Button 
              variant="primary" 
              size="sm" 
              onClick={onOpenAuthModal}
            >
              Login / Register
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;