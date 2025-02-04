"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold mb-8 font-serif text-center">About TechInsight</h1>

      <div className="mb-12 relative h-96">
        <Image
          src="https://source.unsplash.com/1600x900/?technology,team"
          alt="TechInsight team"
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-md"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At TechInsight, we're dedicated to providing cutting-edge information and analysis on the latest trends in
            technology and web development. Our mission is to empower developers and tech enthusiasts with the knowledge
            they need to stay ahead in this rapidly evolving field.
          </p>
          <p className="text-gray-700">
            We believe in the power of technology to transform lives and businesses. Through our platform, we aim to
            bridge the gap between complex tech concepts and practical applications.
          </p>
        </div>
        <div className="relative h-64">
          <Image
            src="https://source.unsplash.com/800x600/?mission,technology"
            alt="Our mission"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="relative h-64">
          <Image
            src="https://source.unsplash.com/800x600/?team,diversity"
            alt="Our team"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-700 mb-4">
            Our diverse team of experienced developers, tech journalists, and industry experts work tirelessly to bring
            you the most relevant and insightful content. With backgrounds spanning various tech domains, we ensure a
            well-rounded perspective on the subjects we cover.
          </p>
          <p className="text-gray-700">
            From AI and machine learning to web development and cybersecurity, our team's expertise covers the full
            spectrum of modern technology.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">What We Cover</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Web Development", "Artificial Intelligence", "Cybersecurity", "Cloud Computing"].map((topic, index) => (
            <div key={index} className="relative h-40">
              <Image
                src={`https://source.unsplash.com/400x300/?${topic.toLowerCase().replace(" ", ",")}`}
                alt={topic}
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <h3 className="text-white text-lg font-bold text-center">{topic}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Workspace</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative h-64">
            <Image
              src="https://source.unsplash.com/800x600/?office,modern"
              alt="Our modern office"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="relative h-64">
            <Image
              src="https://source.unsplash.com/800x600/?workspace,technology"
              alt="Tech workspace"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
        <p className="text-gray-700 mb-6">
          Become a part of our growing community of tech enthusiasts. Share your knowledge, learn from others, and stay
          updated with the latest in technology.
        </p>
        <a
          href="/signup"
          className="bg-primary text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-600 transition-colors"
        >
          Sign Up Now
        </a>
      </div>
    </motion.div>
  )
}

