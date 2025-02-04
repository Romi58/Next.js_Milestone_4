import Image from "next/image"
import { motion } from "framer-motion"

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Frontend Developer",
    content:
      "TechInsight has been an invaluable resource for staying up-to-date with the latest web development trends. The articles are always insightful and practical.",
    image: `https://source.unsplash.com/100x100/?portrait,person&1`,
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Data Scientist",
    content:
      "As someone working in AI and machine learning, I find the content on TechInsight to be both accessible and deeply informative. It's my go-to source for tech news.",
    image: `https://source.unsplash.com/100x100/?portrait,person&2`,
  },
  {
    id: 3,
    name: "Carol Martinez",
    role: "CTO",
    content:
      "TechInsight provides the perfect blend of technical depth and business relevance. It helps me make informed decisions about our company's tech stack.",
    image: `https://source.unsplash.com/100x100/?portrait,person&3`,
  },
]

export default function Testimonials() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 font-serif">What Our Readers Say</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

