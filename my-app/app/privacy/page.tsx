"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

      <div className="mb-8 relative h-64 rounded-lg overflow-hidden">
        <Image
          src="https://source.unsplash.com/1600x900/?privacy,technology"
          alt="Privacy and Technology"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <p className="text-white text-2xl font-bold text-center px-4">Protecting Your Privacy in the Digital Age</p>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Our Commitment to Privacy</CardTitle>
          <CardDescription>
            At TechInsight, we take your privacy seriously. This policy outlines how we collect, use, and protect your
            personal information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            We are committed to maintaining the trust and confidence of our visitors to our web site. In particular, we
            want you to know that TechInsight is not in the business of selling, renting or trading email lists with
            other companies and businesses for marketing purposes.
          </p>
          <p>
            In this Privacy Policy, we've provided detailed information on when and why we collect your personal
            information, how we use it, the limited conditions under which we may disclose it to others, and how we keep
            it secure.
          </p>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="mb-8">
        <AccordionItem value="item-1">
          <AccordionTrigger>Information Collection</AccordionTrigger>
          <AccordionContent>
            We collect information from you when you register on our site, subscribe to our newsletter, respond to a
            survey, or fill out a form. The information we collect includes your name, email address, and any other
            details you provide voluntarily.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Use of Information</AccordionTrigger>
          <AccordionContent>
            We use the information we collect from you to personalize your experience, improve our website, send
            periodic emails, and provide customer service. We do not sell, trade, or otherwise transfer your personally
            identifiable information to outside parties.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Data Protection</AccordionTrigger>
          <AccordionContent>
            We implement a variety of security measures to maintain the safety of your personal information. Your
            personal information is contained behind secured networks and is only accessible by a limited number of
            persons who have special access rights to such systems.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Cookies</AccordionTrigger>
          <AccordionContent>
            We use cookies to understand and save your preferences for future visits and compile aggregate data about
            site traffic and site interaction so that we can offer better site experiences and tools in the future.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p>If you have any questions regarding this privacy policy, you may contact us at:</p>
          <p className="mt-2 font-semibold">
            Email: privacy@techinsight.com
            <br />
            Address: 123 Tech Street, Silicon Valley, CA 94000
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

