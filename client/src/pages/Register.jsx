import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

import { validateEmail, validatePassword, getAuthErrorMessage } from '../utils/authValidation';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password should be at least 6 characters.');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            console.error("Register Error:", err.code, err.message);
            setError(getAuthErrorMessage(err.code));
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 relative overflow-hidden transition-colors duration-200">
            {/* Left Side - Hero/Decorative */}
            <div className="w-full md:w-1/2 text-center md:text-left space-y-4 relative mb-12 md:mb-0 md:mr-12">
                <div className="absolute top-0 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="relative z-10">
                    <div className="inline-block px-6 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm text-sm text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-200">
                        Join us today!
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-blue-600 dark:text-blue-500 tracking-tight leading-none mb-4 transition-colors duration-200">
                        Start Managing <br />
                        Your Tasks
                    </h1>
                    <p className="text-gray-400 dark:text-gray-500 text-lg transition-colors duration-200">
                        Create an account to get started with your productivity journey.
                    </p>
                </div>

                {/* Decorative Single Sphere */}
                <div className="relative w-full h-40 mt-12 flex justify-center md:justify-center">
                    <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-blue-500 rounded-full shadow-2xl animate-bounce duration-[3000ms]"></div>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="w-full md:w-[400px] bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] dark:shadow-none border border-blue-50 dark:border-gray-700 relative z-10 transition-colors duration-200">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-500 mb-2 transition-colors duration-200">Create Account</h2>
                    <p className="text-gray-400 dark:text-gray-500 text-sm transition-colors duration-200">Get started for free!</p>
                </div>
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 shadow-sm flex items-center animate-shake">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{error}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="your@example.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm transition-colors duration-200">
                    Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Login</Link>
                </p>
            </div>
        </div>
    );
}
