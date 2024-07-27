"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Dodecahedron } from '@react-three/drei';
import { useRef } from 'react';

// Component to rotate the Dodecahedron
const RotatingDodecahedron = () => {
  const dodecahedronRef = useRef();

  // Rotate the Dodecahedron on every frame
  useFrame(() => {
    if (dodecahedronRef.current) {
      dodecahedronRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Dodecahedron
      ref={dodecahedronRef}
      args={[2, 0]}
      position={[0, 0, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshStandardMaterial
        attach="material"
        color="skyblue"
        metalness={0.8}
        roughness={0.1}
      />
    </Dodecahedron>
  );
};

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white overflow-hidden">
      {/* Full-page Stars Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars radius={30} depth={20} count={3000} factor={4} saturation={0.9} fade />
        </Canvas>
      </div>

      <header className="w-full py-6 bg-opacity-70 bg-gray-900 z-10">
        <nav className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl font-extrabold tracking-wide text-white flex items-center">
              <div className="w-12 h-12 ml-4">
                <iframe
                  src="https://giphy.com/embed/zbzuZgxt23h8ywu7Bm"
                  width="100%"
                  height="100%"
                  style={{ border: "none", borderRadius: "10px" }}
                  frameBorder="0"
                  className="giphy-embed"
                  allowFullScreen
                ></iframe>
              </div>
              <span className="ml-2">AI Interview Mocker</span>
            </h1>
          </div>
          <div>
            <Link href="/sign-in">
              <Button className="hidden">Login</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="hidden">Register</Button>
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex flex-col items-center justify-center flex-grow container mx-auto px-4 text-center z-10">
        <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-500 transition-transform transform hover:scale-110 hover:text-white cursor-pointer active:animate-bounce mt-20">
          Hey, Are you Ready?
        </h2>
        <p className="text-2xl mb-8">
          Welcome to the AI Interview Mocker. Practice your interviews with the power of AI.
        </p>
        <Link href="/dashboard">
          <Button className="bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out mt-8 mb-4">
            Give Interview
          </Button>
        </Link>
        <div className="mt-10 flex items-center space-x-8">
          {/* Image */}
          <video src="https://videos.pexels.com/video-files/5439078/5439078-sd_640_360_25fps.mp4" 
          autoplay
          muted
          alt="Interview Mockup"
          className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out w-1/3 ml-20"/>
         
          {/* 3D Canvas */}
          <div className="w-2/3 h-80 relative">
            <Canvas>
              <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
              <ambientLight intensity={0.8} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
              <hemisphereLight skyColor={0xffffbb} groundColor={0x080820} intensity={1} />
              <RotatingDodecahedron />
            </Canvas>
          </div>
        </div>
        {/* New UI Elements */}
        <section className="mt-20 text-center">
          <h3 className="text-3xl font-semibold mb-6 text-white">Features & Benefits</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white text-black p-6 rounded-lg shadow-md w-80">
              <h4 className="text-xl font-bold mb-2">Realistic Simulations</h4>
              <p>Experience real interview scenarios with our AI-powered simulations.</p>
            </div>
            <div className="bg-white text-black p-6 rounded-lg shadow-md w-80">
              <h4 className="text-xl font-bold mb-2">Comprehensive Feedback</h4>
              <p>Get detailed feedback and tips to improve your performance.</p>
            </div>
            <div className="bg-white text-black p-6 rounded-lg shadow-md w-80">
              <h4 className="text-xl font-bold mb-2">Track Your Progress</h4>
              <p>Monitor your improvement and track your success over time.</p>
            </div>
          </div>
        </section>
        <section className="mt-20 text-center mb-20">
          <h3 className="text-3xl font-semibold mb-6 text-white">What Our Users Say</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white text-black p-6 rounded-lg shadow-md w-80">
              <p className="text-lg mb-2">"This tool transformed my interview preparation! The feedback was incredibly detailed."</p>
              <p className="font-semibold">- Alex J.</p>
            </div>
            <div className="bg-white text-black p-6 rounded-lg shadow-md w-80">
              <p className="text-lg mb-2">"I felt like I was in a real interview. The AI is so advanced and helpful."</p>
              <p className="font-semibold">- Jamie L.</p>
            </div>
          </div>
        </section>
        
      </main>
      <footer className="w-full py-6 bg-opacity-70 bg-gray-900 text-center z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="mb-4 md:mb-0 text-left">
              <h3 className="text-xl font-semibold mb-2">Why Choose Us?</h3>
              <ul className="list-disc list-inside text-sm">
                <li>Realistic AI-driven interview simulations</li>
                <li>Comprehensive feedback and improvement tips</li>
                <li>Track your progress over time</li>
              </ul>
            </div>
            <div className="mb-4 md:mb-0 text-left">
              <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
              <p className="text-sm">Email: samvasishat670@gmail.com</p>
              <p className="text-sm">Phone: +91 9041668247</p>
            </div>
          </div>
          <p className="text-sm mt-4">&copy; 2024 AI Interview Mocker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
