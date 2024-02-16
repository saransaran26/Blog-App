import React from 'react'

function About() {
  return (
    <div className='max-w-[400px] h-screen flex flex-col mx-auto'>
        <h1 className='my-6 text-center'>About Project</h1>
        {/* <div className='w-[400px]'>
            <p>* Developed a responsive MERN (MongoDB, Express.js, React.js, Node.js) blog application showcasing strong Full Stack development skills.</p>
        </div> */}
        <ul className=''>
            <li>Developed a responsive MERN (MongoDB, Express.js, React.js, Node.js) blog application showcasing strong Full Stack development skills.</li>
            <li className='mt-4'>Implemented comprehensive CRUD operations, enabling seamless creation, retrieval, updating, and deletion of blog posts.</li>
            <li className='mt-4'>Utilized modern front-end technologies such as React and integrated them with Node.js backend to ensure a smooth and dynamic user experience.</li>
            <li className='mt-4'>Demonstrated proficiency in database management with MongoDB, creating an efficient and scalable structure for storing blog content.</li>
            <li className='mt-4'>Successfully employed responsive design principles, ensuring optimal user experience across various devices in the MERN blog app.</li>
        </ul>
    </div>
  )
}

export default About