import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../Style/preview.css';
import { AiOutlineEdit } from 'react-icons/ai'
import {MdEmail,MdPhone,MdHome} from 'react-icons/md'

const ResumePreview = () => {
  const formData = useSelector((state) => state.formData);
  const userName = formData && formData.name ? formData.name : '';

  return (
    <div className="resume-container">
      {userName && (
        <div className="welcome-container">
          <div>Welcome! {userName}</div>
          <Button variant="primary" as={Link} to="/edit">
            <AiOutlineEdit /> Edit
          </Button>
        </div>
      )}
      {formData && formData.name ? (
        <div className="resume-card">
          <Card>
            <Card.Body>
              <div className="resume-header">
                <h3 className="resume-header-name">{formData.name}</h3>
                <div className="resume-header-contact">
                  {formData.email && <p><MdEmail/>&nbsp;{ formData.email}</p>}
                  {formData.phone && <p><MdPhone/>&nbsp;{formData.phone}</p>}
                  {formData.address && <p className="resume-header-address"><MdHome/>&nbsp;{formData.address}</p>}
                </div>
                
              </div>

              <div className="resume-education">
              <h4>Education</h4>
                {formData.education.map((educationItem, index) => (
                  <Card key={index} className="education-card">
                    <Card.Body>
                      <p className='title'>{educationItem.level.toUpperCase()}</p>
                      <p>{educationItem.yearFrom.getFullYear()} - {educationItem.yearTo.getFullYear()}</p>
                      <p>SPECIALIZATION - {educationItem.specialization.toUpperCase()}</p>
                      <p>COURSE - {educationItem.degree.toUpperCase()}</p>
                    </Card.Body>
                  </Card>
                ))}
              </div>


              <div className="resume-experience">
              <h4>Experience</h4>
                {formData.experience.map((experienceItem, index) => (
                  <Card key={index} className="experience-card">
                    <Card.Body>
                      <p className='title'>{experienceItem.company.toUpperCase()}</p>
                      <p>{experienceItem.yearFrom.getFullYear()} - {experienceItem.yearTo.getFullYear()}</p>
                      <p>DESIGNATION - {experienceItem.designation.toUpperCase()}</p>
                    </Card.Body>
                  </Card>
                ))}
              </div>


              <div className="resume-skills">
              <h4>Skills</h4>
                <div className="badge-container">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} pill bg="secondary" className="skill-badge">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div>No resume available. Create one.</div>
      )}
    </div>
  );
};

export default ResumePreview;
