import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Menu, 
    Rocket, 
    Video, 
    Star, 
    CheckCircle, 
    Zap, 
    Layers 
} from 'lucide-react';

const NeonParticle = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const generateParticles = () => {
            const particleCount = 20;
            const newParticles = Array.from({ length: particleCount }).map(() => ({
                id: Math.random(),
                left: Math.random() * 100,
                animationDuration: Math.random() * 10 + 5,
                size: Math.random() * 20 + 10
            }));
            setParticles(newParticles);
        };

        generateParticles();
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((particle) => (
                <div 
                    key={particle.id}
                    className="absolute bg-blue-500 opacity-20 rounded-full blur-xl"
                    style={{
                        left: `${particle.left}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animation: `particle-float ${particle.animationDuration}s linear infinite`,
                        animationDelay: `${Math.random() * 5}s`
                    }}
                />
            ))}
        </div>
    );
};

const NeuroTaskLanding = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/form");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#040405] via-[#0f1633] to-[#1a2656] text-white relative">
            <NeonParticle />
            <nav className="relative z-50 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-3xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(0,179,255,0.5)]">
                        NeuroTask
                    </div>
                    <div className="hidden md:flex space-x-6 items-center">
                        <a href="#" className="hover:text-blue-300 transition">Features</a>
                        <a href="#" className="hover:text-blue-300 transition">Pricing</a>
                        <a href="#" className="hover:text-blue-300 transition">About</a>
                        <button onClick={handleClick} className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full transition transform hover:scale-105">
                            Get Started
                        </button>
                    </div>
                    <div className="md:hidden">
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-white"
                        >
                            <Menu />
                        </button>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-[#0f1633] shadow-lg">
                        <div className="flex flex-col space-y-4 p-4">
                            <a href="#" className="hover:text-blue-300">Features</a>
                            <a href="#" className="hover:text-blue-300">Pricing</a>
                            <a href="#" className="hover:text-blue-300">About</a>
                            <button onClick={handleClick} className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full">
                                Get Started
                            </button>
                        </div>
                    </div>
                )}
            </nav>
            <div className="container mx-auto px-4 py-16 relative z-10 grid md:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                    <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-[0_0_10px_rgba(0,179,255,0.5)]">
                        Supercharge Your Productivity
                    </h1>
                    <p className="text-xl text-gray-300">
                        NeuroTask leverages advanced neural optimization to transform how you manage tasks and achieve goals.
                    </p>
                    <div className="flex space-x-4">
                        <button onClick={handleClick} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition transform hover:scale-105">
                            <Rocket />
                            <span >Get Started</span>
                        </button>
                        <button className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-6 py-3 rounded-full flex items-center space-x-2 transition transform hover:scale-105">
                            <Video />
                            <span>Watch Demo</span>
                        </button>
                    </div>
                </div>
                <div className="hidden md:flex justify-center items-center">
                    <div className="w-96 h-96 bg-blue-500/20 rounded-full animate-pulse"></div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-16 relative z-10">
                <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    Key Features
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <CheckCircle className="w-12 h-12 text-blue-400"/>, title: "Smart Tracking", description: "Intelligent task management with neural insights" },
                        { icon: <Zap className="w-12 h-12 text-green-400"/>, title: "Quick Optimization", description: "Boost productivity with AI-powered suggestions" },
                        { icon: <Layers className="w-12 h-12 text-purple-400"/>, title: "Seamless Integration", description: "Connect with your favorite productivity tools" }
                    ].map((feature, index) => (
                        <div key={index} className="bg-[#0f1633] p-6 rounded-xl border border-blue-500/30 hover:border-blue-500 transition">
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NeuroTaskLanding;