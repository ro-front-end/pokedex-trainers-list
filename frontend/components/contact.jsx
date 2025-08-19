"use client";

import { FaEnvelope, FaLinkedin, FaGlobe, FaGithub } from "react-icons/fa";

export default function Contact() {
  return (
    <main className="min-h-screen px-4 py-12  text-blue-900 flex flex-col items-center">
      <section className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-yellow-300">Get in Touch</h1>
        <p className="text-lg text-blue-50">
          Feel free to reach out if you have questions, want to collaborate, or
          just want to connect.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-6 text-left">
          <a
            href="mailto:newmearound@outlook.com"
            className="flex items-center gap-4 bg-blue-700 hover:bg-blue-600 transition p-4 rounded-xl border border-blue-800 shadow-md"
          >
            <FaEnvelope className="text-yellow-300 text-2xl" />
            <span className="text-yellow-100">newmearound@outlook.com</span>
          </a>

          <a
            href="https://www.linkedin.com/in/rodrigo-arellano-ganem/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-blue-700 hover:bg-blue-600 transition p-4 rounded-xl border border-blue-800 shadow-md"
          >
            <FaLinkedin className="text-yellow-300 text-2xl" />
            <span className="text-yellow-100">LinkedIn Profile</span>
          </a>

          <a
            href="https://portfolio-front-end-rodrigo.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-blue-700 hover:bg-blue-600 transition p-4 rounded-xl border border-blue-800 shadow-md"
          >
            <FaGlobe className="text-yellow-300 text-2xl" />
            <span className="text-yellow-100">My Portfolio</span>
          </a>

          <a
            href="https://github.com/ro-front-end"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-blue-700 hover:bg-blue-600 transition p-4 rounded-xl border border-blue-800 shadow-md"
          >
            <FaGithub className="text-yellow-300 text-2xl" />
            <span className="text-yellow-100">GitHub</span>
          </a>
        </div>
      </section>
    </main>
  );
}
