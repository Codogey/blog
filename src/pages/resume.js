import React from 'react'

import resumeData from '../resume.yaml'

const A4Page = ({ children }) => {
    return (
        <div style={{
            margin: '0 auto',
            boxSizing: 'border-box',
            padding: '0.3in',
            width: '8.5in',
            height: '12in',
            backgroundColor: 'white',
            boxShadow: '0 3px 8px -3px rgba(0, 0, 0, 0.7)',
            fontSize: '14px',
            fontFamily: 'Cambria'
        }}>
            {children}
        </div>
    )
}

const Section = ({ title, children }) => (
    <div>
        <h2 className='font-bold text-lg uppercase border-b-1 border-solid border-black'>{title}</h2>
        {children}
    </div>

)

const ResumeHeader = () => (
    <div>
        <h1 className="text-center font-bold text-xl">{resumeData.name}</h1>
        <div className="text-center">
            <span>{resumeData.address} | </span>
            <span>{resumeData.tel} | </span>
            <span>{resumeData.email}</span>
        </div>
        <div className="text-center">
            <span>{resumeData.github} | </span>
            <span>{resumeData.linkedin}</span>
        </div>
    </div>
)

const Item = ({ title, location, time, desc }) => (
    <div>
        <div className="flex justify-between">
            <div>
                <h3 className='text-lg font-medium'>{title}</h3>
                <span>{location}</span>
            </div>
            <div>
                <span>{time}</span>
            </div>
        </div>
        <ul className='list-disc pl-8'>
            {
                desc.map((item, index) => (
                    <li key={index}>{item}</li>
                ))
            }
        </ul>
    </div>
)

const EducationSection = () => {
    const data = resumeData.education
    return (
        <Section title='Education'>
            {
                data.map((university, index) => (
                    <Item title={university.name} time={university.time} desc={university.desc} key={index}/>
                ))
            }
        </Section>
    )
}


const WorkExperienceSection = () => {
    const data = resumeData.work_experience
    return (
        <Section title='Work Experience'>
            {
                data.map((job, index) => (
                    <Item title={job.position} time={job.time} location={job.location} desc={job.desc} key={index}/>
                ))
            }
        </Section>

    )
}


const ProjectsSection = () => { 
    const data = resumeData.projects
    return (
        <Section title='Projects'>
            {
                data.map((project, index) => (
                    <Item title={project.name} desc={project.desc} key={index} />
                ))
            }
        </Section>

    )
 }

const Resume = () => {
    return (
        <A4Page>
            <ResumeHeader />
            <EducationSection />
            <WorkExperienceSection />
            <ProjectsSection />
        </A4Page>
    )
}

export default Resume