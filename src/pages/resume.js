import React from 'react'

import resumeData from '../resume.yaml'
import "@fontsource/montserrat"
import "@fontsource/roboto-slab/600.css"
import '../css/resume.scss'

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
            fontSize: '14px'
        }}>
            {children}
        </div>
    )
}

const Section = ({ title, children }) => (
    <div>
        <h2 style={{
            fontWeight: 400,
            fontSize: '125%'
        }} className=' uppercase border-b-1 border-solid border-black'>{title}</h2>
        {children}
    </div>

)

const ResumeHeader = () => (
    <div>
        <h1 style={{
            fontSize: '200%',
            fontWeight: 600,
            lineHeight: 1.4
        }} className="text-center">{resumeData.name}</h1>
        <div className="text-center">
            <span>{resumeData.address} | </span>
            <span>{resumeData.tel} | </span>
            <span>{resumeData.email}</span>
        </div>
        <div className="text-center">
            <a href={'http://' + resumeData.github}>{resumeData.github} | </a>
            <a href={'http://' + resumeData.linkedin}>{resumeData.linkedin} | </a>
            <a href={'http://' + resumeData.blog}>{resumeData.blog}</a>
        </div>
    </div>
)

const Item = ({ title, location, time, desc }) => (
    <div>
        <div className="flex justify-between">
            <div>
                <h3 style={{
                    fontWeight: 700,
                    fontSize: '110%'
                }}>{title}</h3>
                <span>{location}</span>
            </div>
            <div style={{
                fontWeight: 700,
                fontSize: '110%'
            }}>
                <span>{time}</span>
            </div>
        </div>
        <ul className='list-disc pl-8'>
            {
                desc.map((item, index) => (
                    <li key={index} dangerouslySetInnerHTML={{__html: item}}></li>
                ))
            }
        </ul>
    </div>
)

const AboutSection = () => {
    const data = resumeData.about
    return (
        <Section title='About me'>
            <p>{data}</p>
        </Section>
    )
}

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

const SkillSection = () => {
    const data = resumeData.skills
    console.log(data)
    return (
        <Section title='Skills'>
            {
                Object.keys(data).map((key, _) => {
                    return (
                        <SkillRow
                            category={key}
                            items={data[key]}
                            key={key}
                        />

                    )
                })
            }

        </Section>
    )
}

const SkillRow = ({category, items}) => {
    return (
        <div className='flex'>
            <span style={{
                fontWeight: 'bold',
                textTransform: 'capitalize',
                marginRight: '6px'
            }}>{ category }: </span>
            <p>{items.join(', ')}</p>
        </div>
    )
}


const WorkExperienceSection = () => {
    const data = resumeData.work_experience
    return (
        <Section title='Work Experience'>
            {
                data.map((job, index) => (
                    <Item title={job.company + ', ' + job.position} time={job.time} location={job.location} desc={job.desc} key={index}/>
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
            {/* <AboutSection/> */}
            <EducationSection />
            <SkillSection />
            <WorkExperienceSection />
            <ProjectsSection />
        </A4Page>
    )
}

export default Resume