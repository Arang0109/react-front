import './App.css';
import { Routes, Route } from 'react-router-dom'

import TestPage from 'pages/home/TestPage';
import MainPage from 'pages/home/MainPage';
import { 
  Company, CompanyDetail,
  Workplace, WorkplaceDetail,
  Stack, StackDetail,
  Pollutant } from 'pages/management';
import { ScheduledWorkplace, ScheduledStack, ScheduleDetail, ScheduleRegister } from 'pages/schedule';

import { Header, Footer }  from 'shared/ui/sementics';

import { AppProvider } from './providers/AppProvider';

function App() {
  return (
    <>
      <AppProvider>
        <Header />
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/companies" element={<Company />} />
            <Route path="/companies/:companyId" element={<CompanyDetail />} />
            <Route path="/workplaces" element={<Workplace />} />
            <Route path="/workplaces/:workplaceId" element={<WorkplaceDetail />} />
            <Route path="/stacks" element={<Stack />} />
            <Route path="/stacks/:stackId" element={<StackDetail />} />
            <Route path="/pollutants" element={<Pollutant />} />

            <Route path="/schedules/atmosphere" element={<ScheduledWorkplace />} />
            <Route path="/schedules/atmosphere/:scheduledWorkplaceId" element={<ScheduledStack />} />
            <Route path="/schedules/atmosphere/:scheduledWorkplaceId/:scheduledStackId" element={<ScheduleDetail />} />
            <Route path="/schedules/register" element={<ScheduleRegister />} />

            <Route path="/testPage" element={<TestPage />} />
          </Routes>
        </main>
        <Footer />
      </AppProvider>
    </>
  );
}

export default App;
