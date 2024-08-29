import React from 'react';
import { FaPen, FaCalendarAlt } from 'react-icons/fa';

const BlogPage: React.FC = () => {
    return (
        // <div className='min-h-screen'>
        <div>
            <div className='max-w-7xl mx-auto p-6 rounded-lg shadow-lg'>
                <div className='flex items-center mb-4'>
                    <FaPen className='text-blue-500 w-6 h-6 mr-2' />
                    <h1 className='text-3xl font-bold'>Welcome to My Blog</h1>
                </div>
                <p className='text-gray-600 mb-6'>
                    This is my first blog post. Stay tuned for more exciting content!
                </p>
                <div className='flex items-center text-gray-500'>
                    <FaCalendarAlt className='w-5 h-5 mr-2' />
                    <span>August 29, 2024</span>
                </div>
                <div className='mt-6'>
                    <a
                        href='/blog'
                        className='text-blue-500 hover:underline'
                    >
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
