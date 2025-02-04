"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FooterInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">More About TechInsight</h1>

      <div className="mb-8 relative h-64 rounded-lg overflow-hidden">
        <Image
          src="https://source.unsplash.com/1600x900/?technology,team"
          alt="TechInsight Team"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <p className="text-white text-2xl font-bold text-center px-4">
            Empowering Developers with Cutting-Edge Insights
          </p>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
          <CardDescription>Bridging the gap between complex tech concepts and practical applications</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            At TechInsight, we're dedicated to providing cutting-edge information and analysis on the latest trends in
            technology and web development. Our mission is to empower developers and tech enthusiasts with the knowledge
            they need to stay ahead in this rapidly evolving field.
          </p>
          <p>
            We believe in the power of technology to transform lives and businesses. Through our platform, we aim to
            bridge the gap between complex tech concepts and practical applications, making advanced technologies
            accessible to all.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Team</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Our diverse team of experienced developers, tech journalists, and industry experts work tirelessly to
              bring you the most relevant and insightful content.
            </p>
            <p>
              With backgrounds spanning various tech domains, we ensure a well-rounded perspective on the subjects we
              cover, from AI and machine learning to web development and cybersecurity.
            </p>
          </CardContent>
        </Card>
        <div className="relative h-64 rounded-lg overflow-hidden">
          <Image
            src="https://source.unsplash.com/800x600/?diverse,team"
            alt="Our diverse team"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What We Cover</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Web Development", "Artificial Intelligence", "Cybersecurity", "Cloud Computing"].map((topic, index) => (
              <div key={index} className="text-center">
                <div className="relative h-24 mb-2 rounded overflow-hidden">
                  <Image
                    src={`https://source.unsplash.com/400x300/?${topic.toLowerCase().replace(" ", ",")}`}
                    alt={topic}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p className="font-semibold">{topic}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Join Our Community</CardTitle>
          <CardDescription>
            Stay updated with our latest insights and connect with fellow tech enthusiasts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Become a part of our growing community of tech enthusiasts. Share your knowledge, learn from others, and
            stay updated with the latest in technology.
          </p>
          <div className="flex justify-center">
            <Link href="/signup">
              <Button size="lg">Sign Up Now</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

