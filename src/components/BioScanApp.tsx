import React, { useState } from 'react';
import BioScanBackground from './BioScanBackground';
import BioScanNavigation from './BioScanNavigation';
import SplashScreen from './screens/SplashScreen';
import UserInputScreen from './screens/UserInputScreen';
import VoiceScanScreen from './screens/VoiceScanScreen';
import DisabilityTestScreen from './screens/DisabilityTestScreen';
import ResultsScreen from './screens/ResultsScreen';

const BioScanApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('splash');

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onNavigate={handleNavigate} />;
      case 'input':
        return <UserInputScreen onNavigate={handleNavigate} />;
      case 'voice':
        return <VoiceScanScreen onNavigate={handleNavigate} />;
      case 'disability':
        return <DisabilityTestScreen onNavigate={handleNavigate} />;
      case 'results':
        return <ResultsScreen onNavigate={handleNavigate} />;
      default:
        return <SplashScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-inter">
      {/* Animated Background */}
      <BioScanBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        {renderCurrentScreen()}
      </div>
      
      {/* Navigation */}
      <BioScanNavigation currentScreen={currentScreen} onNavigate={handleNavigate} />
    </div>
  );
};

export default BioScanApp;