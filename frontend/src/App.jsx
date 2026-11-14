
import { useState } from 'react';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdventureMapPage from './pages/AdventureMapPage';
import MaterialPage from './pages/MaterialPage';
import ChallengePage from './pages/ChallengePage';
import EvaluationPage from './pages/EvaluationPage';
import ProfilePage from './pages/ProfilePage';
import VisualizationLabPage from './pages/VisualizationLabPage';

import { useAuth } from './context/AuthContext';
import './App.css';

function App() {
  const [page, setPage] = useState('landing');
  const [selectedLevel, setSelectedLevel] = useState(1);

  const { loginWithCode } = useAuth();

  const navigate = (nextPage) => {
    setPage(nextPage);
  };

  // Login menggunakan akun demo
  const handleDemoLogin = async () => {
    const result = await loginWithCode('SA8A01');

    if (result.success) {
      navigate('dashboard');
    }
  };

  // Membuka materi berdasarkan level yang dipilih
  const handleSelectLevel = (levelNumber) => {
    setSelectedLevel(levelNumber);
    navigate('material');
  };

  // Kembali ke peta petualangan
  const handleBackToMap = () => {
    navigate('map');
  };

  // Setelah materi selesai
  const handleCompleteLevel = () => {
    navigate('map');
  };

  let currentPage;

  switch (page) {
    case 'landing':
      currentPage = (
        <LandingPage
          onStartLogin={() => navigate('login')}
          onExploreDemo={handleDemoLogin}
        />
      );
      break;

    case 'login':
      currentPage = (
        <LoginPage
          onBack={() => navigate('landing')}
          onSuccess={() => navigate('dashboard')}
        />
      );
      break;

    case 'dashboard':
      currentPage = (
        <DashboardPage onNavigate={navigate} />
      );
      break;

    case 'map':
    case 'adventure':
      currentPage = (
        <AdventureMapPage
          onSelectLevel={handleSelectLevel}
        />
      );
      break;

    case 'material':
      currentPage = (
        <MaterialPage
          levelNumber={selectedLevel}
          onBack={handleBackToMap}
          onComplete={handleCompleteLevel}
        />
      );
      break;

    case 'lab':
    case 'visualization':
      currentPage = (
        <VisualizationLabPage navigate={navigate} />
      );
      break;

    case 'challenge':
      currentPage = (
        <ChallengePage navigate={navigate} />
      );
      break;

    case 'evaluation':
      currentPage = (
        <EvaluationPage navigate={navigate} />
      );
      break;

    case 'profile':
      currentPage = (
        <ProfilePage navigate={navigate} />
      );
      break;

    default:
      currentPage = (
        <LandingPage
          onStartLogin={() => navigate('login')}
          onExploreDemo={handleDemoLogin}
        />
      );
  }

  return (
    <div className="app">
      {currentPage}
    </div>
  );
}

export default App;
