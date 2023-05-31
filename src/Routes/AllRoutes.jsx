import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import ResumeEdit from '../components/ResumeEdit';


export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ResumeForm />} />
      <Route path="/preview" element={<ResumePreview />} />
      <Route path="/edit" element={<ResumeEdit />} />
      <Route path="*" element={<ResumeForm />} />
    </Routes>
  );
}
