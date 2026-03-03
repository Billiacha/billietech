"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";

type Project = {
  _id: string;
  title: string;
  description: string;
  tech: string;
  link?: string;
  image?: any;
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const query = `*[_type == "project"]{
        _id,
        title,
        description,
        tech,
        link,
        image
      }`;
      const data = await client.fetch(query);
      setProjects(data);
    }
    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white scroll-smooth">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold text-blue-500">Billiacha Tech</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
          <a
            href="https://wa.me/2547XXXXXXXX"
            target="_blank"
            className="hover:text-blue-400 transition"
          >
            Contact
          </a>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <a
            href="https://wa.me/2547XXXXXXXX"
            target="_blank"
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition"
          >
            WhatsApp
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center h-screen px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Hi, I'm <span className="text-blue-500">Kiptoo Towett</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">
          Full-Stack Developer & Graphic Designer
        </h2>
        <p className="text-gray-400 mb-2">
          Freelancer | Web Developer | Data Entry & Data Analysis
        </p>
        <p className="text-gray-500 mb-8">
          Founder of <span className="text-blue-400 font-semibold">Billiacha Tech</span>
        </p>
        <div className="flex gap-4">
          <a
            href="#projects"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition"
          >
            View My Work
          </a>
          <a
            href="https://wa.me/2547XXXXXXXX"
            target="_blank"
            className="border border-gray-500 hover:border-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <motion.section
        id="projects"
        className="py-24 px-6 bg-gray-950"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">My Projects</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.length === 0 && (
              <p className="text-center col-span-full text-gray-400">Loading projects...</p>
            )}

            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-black border border-gray-800 rounded-xl p-6 hover:scale-105 transition duration-300"
              >
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    View Project
                  </a>
                ) : (
                  <p className="text-gray-500 mb-2">Coming Soon</p>
                )}

                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <p className="text-sm text-blue-400 mb-4">Tech: {project.tech}</p>

                {project.image && (
                  <img
                    src={urlFor(project.image).width(400).url()}
                    alt={project.title}
                    className="rounded-md"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CONTACT SECTION */}
      <motion.section
        id="contact"
        className="py-24 px-6 bg-black"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Contact Me</h2>

          <form
            action="https://formspree.io/f/xnjbkyag"
            method="POST"
            className="space-y-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              required
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg"
            />

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-semibold transition"
            >
              Send Message
            </button>
          </form>

          {/* WhatsApp Direct Button */}
          <div className="mt-8">
            <a
              href="https://wa.me/254784260728"
              target="_blank"
              className="inline-block bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-semibold transition"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="py-6 text-center bg-gray-950 border-t border-gray-800">
        <p className="text-gray-500">
          © {new Date().getFullYear()} Billiacha Tech. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
