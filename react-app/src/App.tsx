import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Governance from './pages/Governance';
import WhatWeDo from './pages/WhatWeDo';
import DivisionPage from './pages/divisions/DivisionPage';
import Programmes from './pages/Programmes';
import Research from './pages/Research';
import GetInvolved from './pages/GetInvolved';
import OpenSource from './pages/OpenSource';
import SupportOurWork from './pages/SupportOurWork';
import News from './pages/News';
import Contact from './pages/Contact';
import Security from './pages/Security';
import Credits from './pages/Credits';
import ThankYou from './pages/ThankYou';
import NotFound from './pages/NotFound';
import HumanRights from './pages/HumanRights';
import CivilSociety from './pages/CivilSociety';
import ChildrenYoungPeople from './pages/ChildrenYoungPeople';
import { Privacy, Cookies, Terms, Safeguarding } from './pages/legal/LegalPages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'governance', element: <Governance /> },
      { path: 'what-we-do', element: <WhatWeDo /> },
      { path: 'divisions/:slug', element: <DivisionPage /> },
      { path: 'programmes', element: <Programmes /> },
      { path: 'research', element: <Research /> },
      { path: 'get-involved', element: <GetInvolved /> },
      { path: 'open-source', element: <OpenSource /> },
      { path: 'support-our-work', element: <SupportOurWork /> },
      { path: 'news', element: <News /> },
      { path: 'contact', element: <Contact /> },
      { path: 'security', element: <Security /> },
      { path: 'credits', element: <Credits /> },
      { path: 'human-rights', element: <HumanRights /> },
      { path: 'civil-society', element: <CivilSociety /> },
      { path: 'children-young-people', element: <ChildrenYoungPeople /> },
      { path: 'thank-you', element: <ThankYou /> },
      { path: 'legal/privacy', element: <Privacy /> },
      { path: 'legal/cookies', element: <Cookies /> },
      { path: 'legal/terms', element: <Terms /> },
      { path: 'legal/safeguarding', element: <Safeguarding /> },
      // Redirect old static HTML extensions that may be linked to
      { path: 'index.html', element: <Home /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
