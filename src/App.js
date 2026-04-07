import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';

// Pages
import DashboardPage from './pages/DashboardPage';
import SchedulePage from './pages/SchedulePage';
import HotelPage from './pages/HotelPage';
import GigsPage from './pages/GigsPage';
import MarketPage from './pages/MarketPage';
import ClientsPage from './pages/ClientsPage';
import SosPage from './pages/SosPage';
import FinancePage from './pages/FinancePage';
import B2BRegistrationPage from './pages/B2BRegistrationPage';
import ProSubscriptionPage from './pages/ProSubscriptionPage';

// Новые презентационные страницы (Вне лейаута B2B)
import HubLandingPage from './pages/HubLandingPage';
import B2CMockupPage from './pages/B2CMockupPage';

function App() {
  return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/partner/dashboard" replace />} />

          {/* Презентационные лендинги */}
          <Route path="/hub-franchise" element={<HubLandingPage />} />
          <Route path="/b2c-mockup" element={<B2CMockupPage />} />

          {/* Основная B2B Платформа */}
          <Route path="/partner" element={<AppLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="hotel" element={<HotelPage />} />
            <Route path="gigs" element={<GigsPage />} />
            <Route path="market" element={<MarketPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="sos" element={<SosPage />} />
            <Route path="finance" element={<FinancePage />} />
            <Route path="registration" element={<B2BRegistrationPage />} />
            <Route path="pro" element={<ProSubscriptionPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/partner/dashboard" replace />} />
        </Routes>
      </HashRouter>
  );
}

export default App;