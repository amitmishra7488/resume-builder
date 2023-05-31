import React, { useState } from 'react';
import { Form, Button, Badge } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { saveFormData } from '../Redux/action';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiFillCloseSquare } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../Style/ResumeForm.css';

const ResumeForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [education, setEducation] = useState([
        {
            level: '',
            yearFrom: null,
            yearTo: null,
            degree: '',
            specialization: ''
        }
    ]);

    const [experience, setExperience] = useState([
        { company: '', yearFrom: null, yearTo: null, designation: '' }
    ]);
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState('');
    const dispatch = useDispatch();

    const handleEducationChange = (index, field, value) => {
        const updatedEducation = [...education];
        if (field === 'yearFrom' || field === 'yearTo') {
            updatedEducation[index][field] = value;
        } else {
            updatedEducation[index][field] = value;
        }
        setEducation(updatedEducation);
    };

    const handleExperienceChange = (index, field, value) => {
        const updatedExperience = [...experience];
        if (field === 'yearFrom' || field === 'yearTo') {
            updatedExperience[index][field] = value;
        } else {
            updatedExperience[index][field] = value;
        }
        setExperience(updatedExperience);
    };


    const handleSkillChange = (event) => {
        setSkillInput(event.target.value);
    };

    const handleSkillKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addSkill();
        }
    };

    const addSkill = () => {
        if (skillInput.trim() !== '') {
            setSkills([...skills, skillInput.trim()]);
            setSkillInput('');
        }
    };

    const removeSkill = (skill) => {
        setSkills(skills.filter((s) => s !== skill));
    };

    const addEducationField = () => {
        setEducation([
            ...education,
            {
                level: '',
                yearFrom: null,
                yearTo: null,
                degree: '',
                specialization: ''
            }
        ]);
    };

    const addExperienceField = () => {
        setExperience([...experience, { company: '', year: null, designation: '' }]);
    };
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name,
            email,
            address,
            phone,
            education,
            experience,
            skills
        };

        dispatch(saveFormData(formData));
        console.log(formData);

        toast.success('Resume created successfully!', {
            onClose: () => {
              navigate('/preview');
            }
          });
    };

    return (
        <div className='resumeform-container'>
            <div className="resume-form">
                <h3 className='heading'>Resume Form</h3>
                <Form onSubmit={handleSubmit} className='form'>
                    <div className='first-section'>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </div>


                    <Form.Group className='field-container'>
                        <Form.Label>Education</Form.Label>
                        {education.map((edu, index) => (
                            <div key={index} className="education-item">
                                <Form.Control
                                    as="select"
                                    value={edu.level}
                                    onChange={(e) =>
                                        handleEducationChange(index, 'level', e.target.value)
                                    }
                                    required

                                >
                                    <option value="">Select Level</option>
                                    <option value="SSC">SSC (X)</option>
                                    <option value="HSC">HSC (XII)</option>
                                    <option value="Graduation">Graduation (UG)</option>
                                    <option value="Post Graduation">Post Graduation (PG)</option>
                                </Form.Control>
                                <div className='datePicker'>
                                    <DatePicker
                                        selected={edu.yearFrom}
                                        onChange={(date) =>
                                            handleEducationChange(index, 'yearFrom', date)
                                        }
                                        dateFormat="yyyy"
                                        showYearPicker
                                        placeholderText="Year From"
                                        required
                                    />

                                    <DatePicker
                                        selected={edu.yearTo}
                                        onChange={(date) => handleEducationChange(index, 'yearTo', date)}
                                        dateFormat="yyyy"
                                        showYearPicker
                                        placeholderText="Year To"
                                        required
                                    />
                                </div>
                                <Form.Control
                                    type="text"
                                    value={edu.degree}
                                    placeholder="Add Degree"
                                    onChange={(e) =>
                                        handleEducationChange(index, 'degree', e.target.value)
                                    }
                                    required
                                />

                                <Form.Control
                                    type="text"
                                    value={edu.specialization}
                                    placeholder="Add Specialization"
                                    onChange={(e) =>
                                        handleEducationChange(index, 'specialization', e.target.value)
                                    }
                                    required
                                />
                            </div>
                        ))}
                        <Button variant="secondary" onClick={addEducationField}>
                            Add More Education
                        </Button>
                    </Form.Group>


                    <Form.Group className='field-container'>
                        <Form.Label>Experience</Form.Label>
                        {experience.map((exp, index) => (
                            <div key={index} className="experience-item">
                                <Form.Control
                                    type="text"
                                    value={exp.company}
                                    placeholder="Company name"
                                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                    required
                                />

                                <Form.Control
                                    type="text"
                                    value={exp.designation}
                                    placeholder="Designation"
                                    onChange={(e) => handleExperienceChange(index, 'designation', e.target.value)}
                                    required
                                />

                                <div className="datePicker">
                                    <DatePicker
                                        selected={exp.yearFrom}
                                        onChange={(date) => handleExperienceChange(index, 'yearFrom', date)}
                                        dateFormat="yyyy"
                                        showYearPicker
                                        placeholderText="Year From"
                                        required
                                    />

                                    <DatePicker
                                        selected={exp.yearTo}
                                        onChange={(date) => handleExperienceChange(index, 'yearTo', date)}
                                        dateFormat="yyyy"
                                        showYearPicker
                                        placeholderText="Year To"
                                        required
                                    />
                                </div>
                            </div>
                        ))}

                        <Button variant="secondary" onClick={addExperienceField}>
                            Add More Experience
                        </Button>
                    </Form.Group>

                    <Form.Group className='field-container'>
                        <Form.Label>Skills</Form.Label>
                        <div className="skills-container">
                            {skills.map((skill) => (
                                <Badge
                                    key={skill}
                                    pill
                                    bg="secondary"
                                    className="skill-badge"
                                    onClick={() => removeSkill(skill)}
                                >
                                    {skill.toUpperCase()}
                                    <span className="badge-close" onClick={() => removeSkill(skill)}>
                                        <AiFillCloseSquare className="close-icon" />
                                    </span>
                                </Badge>
                            ))}
                        </div>
                        <Form.Control
                            type="text"
                            placeholder="Add skills"
                            value={skillInput}
                            onChange={handleSkillChange}
                            onKeyDown={handleSkillKeyDown}
                        />
                        <Button variant='secondary' onClick={addSkill}>
                            Add Skill
                        </Button>
                    </Form.Group>

                    <Button type="submit" className="submit-button">
                        Submit
                    </Button>

                    <ToastContainer position="top-right" autoClose={1500} />

                </Form>
            </div>
        </div>
    );
};

export default ResumeForm;

