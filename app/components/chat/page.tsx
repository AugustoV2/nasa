'use client'
import React, { useEffect } from 'react';
import { CiImageOn } from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";
import { useChat } from 'ai/react';
import { Send } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

const Public = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/genai'
    });

    useEffect(() => {
        console.log('Public component mounted');
        console.log(messages);
    }, [messages]);

    return (
        <main className="bg-black h-screen overflow-auto">
            {RenderForm()}
        </main>
    );

    function RenderForm() {
        return (
            <form onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(event, {
                    data: {
                        prompt: input
                    }
                });
            }} className="flex flex-col h-full">
                <div className='flex flex-col mx-auto py-24 px-8 max-w-4xl text-center'>
                    {/* Intro Section */}
                    <div className='flex flex-col mx-auto py-24 px-8 max-w-4xl text-center'>
                        <h1 className='mb-4 mt-10 lg:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-red-600 inline-block text-transparent bg-clip-text'>
                            Hello,
                        </h1>
                        <h2 className='mb-8 text-gray-400 text-2xl'>
                            <TypeAnimation
                                sequence={['How can I help you?', 3000]}
                                wrapper="span"
                                speed={50}
                                style={{ fontSize: '1.2em', display: 'inline-block' }}
                                repeat={Infinity}
                            />
                        </h2>
                    </div>

                    {/* Chat Display */}
                    <div className='flex flex-col items-center space-y-4 mx-auto max-w-4xl px-8 flex-grow overflow-auto'>
                        {messages.map((m, index) => (
                            <div 
                                key={index} 
                                className={`p-4 shadow-lg rounded-lg w-full max-w-md ${m.role === 'user' ? 'bg-indigo-700 text-white' : 'bg-gray-800 text-gray-200'} transition duration-300 ease-in-out`}
                            >
                                {m.content}
                            </div>
                        ))}
                    </div>

                    {/* Input Section */}
                    <div className="relative flex justify-center items-center mt-8 w-full">
                        <div className="fixed bottom-4 left-0 right-0 flex justify-center items-center">
                            <div className="flex items-center bg-gray-800 shadow-lg rounded-full w-full max-w-2xl px-4 py-2">
                                <input
                                    type="text"
                                    className="flex-1 bg-transparent text-gray-200 focus:outline-none placeholder-gray-500 text-sm"
                                    placeholder="Enter a prompt here"
                                    value={input}
                                    onChange={handleInputChange}
                                />
                                <button type='submit' className='text-indigo-400 hover:text-indigo-600 transition'>
                                    <Send className='w-6 h-6' />
                                </button>
                                <div className='flex items-center ml-4 space-x-3'>
                                    <CiImageOn className='text-2xl text-gray-400 hover:text-indigo-400 transition' />
                                    <FaMicrophone className='text-2xl text-gray-400 hover:text-indigo-400 transition' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default Public;