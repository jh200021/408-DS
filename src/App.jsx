import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import './App.css';

// Route-level code splitting: the complexity guide and details pages are only
// fetched when navigated to, so they stay out of the initial bundle.
const VisualizerPage = lazy(() => import('./pages/VisualizerPage'));
const ComplexityGuide = lazy(() => import('./pages/ComplexityGuide'));
const DetailsPage = lazy(() => import('./pages/DetailsPage'));

export default function App() {
  return (
    <Suspense fallback={<div className="route-loading">Loading…</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<VisualizerPage />} />
          <Route path="complexity" element={<ComplexityGuide />} />
          <Route path="details/:id" element={<DetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
