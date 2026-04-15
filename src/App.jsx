import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import { LazyMotion, domAnimation } from "framer-motion"
import Layout from './components/Layout';
import Home from './pages/Home';
import { Helmet } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
// CSS inlined in index.html for performance

// Lazy load heavy components
const CompilerPage = lazy(() => import('./pages/CompilerPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Simple loading component
const PageLoader = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#0f0a19',
        color: '#a8c0ff'
    }}>
        <div className="loader">Loading...</div>
    </div>
);

function App() {
    // const { t } = useTranslation();
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Helmet>
                <title>OG Compiler - Free Online Code Compiler</title>
                <meta name="description" content="Run Java, Python, C++, C, and JavaScript code online. Fast, secure, and free online IDE." />
            </Helmet>
            <LazyMotion features={domAnimation}>
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />

                            {/* About Page */}
                            <Route path="about" element={<AboutPage />} />
                            {/* Projects Page */}
                            <Route path="projects" element={<ProjectsPage />} />
                            {/* Contact Page */}
                            <Route path="contact" element={<ContactPage />} />
                        </Route>
                        <Route path=":language/Compiler" element={<CompilerPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </LazyMotion>
        </BrowserRouter>
    );
}

export default App;
