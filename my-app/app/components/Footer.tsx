"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 transition-opacity duration-500 ease-in-out">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">TechInsight</h3>
            <p className="mb-4">Empowering developers with cutting-edge insights and knowledge.</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-primary transition-colors">
                <Facebook size={24} />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Twitter size={24} />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Instagram size={24} />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Linkedin size={24} />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Github size={24} />
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/footer-info" className="hover:text-primary transition-colors">
                  More Info
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-xl font-bold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  JavaScript
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  React
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Node.js
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-xl font-bold mb-4">Newsletter</h4>
            <p className="mb-4">Stay updated with our latest insights.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="mb-4">
            <Link href="/footer-info" className="text-primary hover:underline">
              Learn More About TechInsight
            </Link>
          </p>
          <p>&copy; 2023 TechInsight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

