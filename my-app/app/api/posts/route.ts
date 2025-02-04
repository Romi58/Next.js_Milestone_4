import { NextResponse } from "next/server"

interface Reaction {
  like: number
  love: number
  laugh: number
}

interface Comment {
  id: number
  author: string
  content: string
  date: string
}

interface Post {
  id: number
  title: string
  content: string
  excerpt: string
  image: string
  author: string
  date: string
  reactions: Reaction
  comments: Comment[]
}

const generateRandomReactions = (): Reaction => ({
  like: Math.floor(Math.random() * 100),
  love: Math.floor(Math.random() * 50),
  laugh: Math.floor(Math.random() * 30),
})

const generateRandomComments = (count: number): Comment[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    author: `User${Math.floor(Math.random() * 1000)}`,
    content: `This is a sample comment ${i + 1}. Great post!`,
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  }))
}

const posts: Post[] = [
  {
    id: 1,
    title: "The Future of Web Development: What to Expect in 2024",
    content: `
      <p>As we approach 2024, the world of web development continues to evolve at a rapid pace. Here are some key trends to watch out for:</p>
      <h3>1. AI-Driven Development</h3>
      <p>Artificial Intelligence is set to play a bigger role in web development. From AI-assisted coding to intelligent debugging tools, developers can expect to see more AI integration in their workflows.</p>
      <h3>2. WebAssembly Goes Mainstream</h3>
      <p>WebAssembly (Wasm) is gaining traction, allowing developers to run high-performance applications in web browsers. Expect to see more complex, desktop-like applications running directly in browsers.</p>
      <h3>3. Progressive Web Apps (PWAs) Dominate</h3>
      <p>PWAs will continue to blur the line between web and native apps, offering offline functionality, push notifications, and app-like interfaces.</p>
      <h3>4. Serverless Architecture Expands</h3>
      <p>Serverless computing will become more prevalent, allowing developers to focus on writing code without worrying about server management.</p>
      <p>As we embrace these changes, it's an exciting time to be a web developer. Stay curious, keep learning, and get ready for a transformative year ahead!</p>
    `,
    excerpt:
      "Explore the cutting-edge trends shaping web development in 2024, from AI-driven tools to the rise of WebAssembly and Progressive Web Apps.",
    image: "https://source.unsplash.com/1600x900/?coding,future,technology",
    author: "Alex Johnson",
    date: new Date(2023, 11, 15).toISOString(),
    reactions: generateRandomReactions(),
    comments: generateRandomComments(5),
  },
  {
    id: 2,
    title: "Mastering React Hooks: A Comprehensive Guide",
    content: `
      <p>React Hooks have revolutionized the way we write React components. This guide will help you master the most important hooks:</p>
      <h3>1. useState</h3>
      <p>The useState hook allows you to add state to functional components. It's perfect for managing local component state.</p>
      <pre><code>const [count, setCount] = useState(0);</code></pre>
      <h3>2. useEffect</h3>
      <p>useEffect is used for side effects in functional components. It's ideal for data fetching, subscriptions, or manually changing the DOM.</p>
      <pre><code>useEffect(() => {
  document.title = \`You clicked \${count} times\`;
}, [count]);</code></pre>
      <h3>3. useContext</h3>
      <p>useContext provides a way to pass data through the component tree without having to pass props down manually at every level.</p>
      <h3>4. useReducer</h3>
      <p>useReducer is a powerful hook for managing more complex state logic in React applications.</p>
      <p>By mastering these hooks, you'll be able to write more efficient and maintainable React code. Happy coding!</p>
    `,
    excerpt:
      "Dive deep into React Hooks with this comprehensive guide. Learn how to effectively use useState, useEffect, useContext, and useReducer in your projects.",
    image: "https://source.unsplash.com/1600x900/?react,javascript,coding",
    author: "Emily Chen",
    date: new Date(2023, 10, 28).toISOString(),
    reactions: generateRandomReactions(),
    comments: generateRandomComments(3),
  },
  {
    id: 3,
    title: "Building Scalable Node.js Applications: Best Practices",
    content: `
      <p>Node.js has become a go-to technology for building scalable, high-performance applications. Here are some best practices to ensure your Node.js applications can handle growth:</p>
      <h3>1. Use Asynchronous Programming</h3>
      <p>Leverage Node.js's non-blocking I/O model by using async/await or Promises to handle asynchronous operations efficiently.</p>
      <h3>2. Implement Caching</h3>
      <p>Use caching mechanisms like Redis to store frequently accessed data and reduce database load.</p>
      <h3>3. Optimize Database Queries</h3>
      <p>Write efficient database queries and use indexing to improve query performance.</p>
      <h3>4. Implement Microservices Architecture</h3>
      <p>Break down your application into smaller, independent services that can be scaled individually.</p>
      <h3>5. Use a Load Balancer</h3>
      <p>Distribute incoming traffic across multiple servers to ensure high availability and better performance.</p>
      <p>By following these practices, you can build Node.js applications that are not only fast but also capable of handling increased load as your user base grows.</p>
    `,
    excerpt:
      "Learn the best practices for building scalable Node.js applications, from asynchronous programming to implementing microservices architecture.",
    image: "https://source.unsplash.com/1600x900/?nodejs,server,coding",
    author: "Michael Wong",
    date: new Date(2023, 9, 10).toISOString(),
    reactions: generateRandomReactions(),
    comments: generateRandomComments(4),
  },
  {
    id: 4,
    title: "The Rise of JAMstack: Revolutionizing Web Development",
    content: `
      <p>JAMstack (JavaScript, APIs, and Markup) is changing the way we approach web development. Here's why it's gaining popularity:</p>
      <h3>1. Enhanced Performance</h3>
      <p>JAMstack sites are pre-built and served directly from a CDN, resulting in lightning-fast load times.</p>
      <h3>2. Improved Security</h3>
      <p>With fewer moving parts and no direct connection to a database, JAMstack sites are inherently more secure.</p>
      <h3>3. Better Developer Experience</h3>
      <p>JAMstack allows developers to use their preferred tools and frameworks, leading to a more enjoyable development process.</p>
      <h3>4. Scalability</h3>
      <p>JAMstack sites can handle traffic spikes with ease, as they're served from CDNs designed for high traffic.</p>
      <h3>5. Lower Costs</h3>
      <p>With reduced server-side operations, hosting costs can be significantly lower for JAMstack sites.</p>
      <p>As more developers and businesses recognize these benefits, we can expect to see continued growth in JAMstack adoption.</p>
    `,
    excerpt:
      "Discover how JAMstack is revolutionizing web development with its focus on performance, security, and developer experience.",
    image: "https://source.unsplash.com/1600x900/?jamstack,webdev,coding",
    author: "Sarah Lee",
    date: new Date(2023, 8, 5).toISOString(),
    reactions: generateRandomReactions(),
    comments: generateRandomComments(6),
  },
  {
    id: 5,
    title: "Mastering CSS Grid: Creating Complex Layouts with Ease",
    content: `
      <p>CSS Grid has transformed the way we create layouts in web design. Here's a guide to mastering this powerful tool:</p>
      <h3>1. Understanding Grid Container and Grid Items</h3>
      <p>Learn how to set up a grid container and work with grid items to create your desired layout.</p>
      <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}</code></pre>
      <h3>2. Using Grid Areas for Complex Layouts</h3>
      <p>Grid areas allow you to create named grid areas, making it easier to create complex layouts.</p>
      <pre><code>.container {
  grid-template-areas: 
    "header header header"
    "sidebar main main"
    "footer footer footer";
}</code></pre>
      <h3>3. Responsive Design with Grid</h3>
      <p>Use media queries and CSS Grid together to create responsive layouts that adapt to different screen sizes.</p>
      <h3>4. Alignment and Justification</h3>
      <p>Master the alignment properties to precisely control the positioning of grid items within their cells.</p>
      <p>With these techniques, you'll be able to create complex, responsive layouts with less code and more flexibility.</p>
    `,
    excerpt:
      "Learn how to create complex, responsive layouts with ease using CSS Grid. Master grid containers, grid areas, and alignment techniques.",
    image: "https://source.unsplash.com/1600x900/?css,webdesign,coding",
    author: "David Brown",
    date: new Date(2023, 7, 20).toISOString(),
    reactions: generateRandomReactions(),
    comments: generateRandomComments(4),
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const author = searchParams.get("author")

  if (id) {
    const post = posts.find((p) => p.id === Number.parseInt(id))
    return post ? NextResponse.json(post) : NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  if (author) {
    const authorPosts = posts.filter((p) => p.author === author)
    return NextResponse.json(authorPosts)
  }

  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const post: Post = await request.json()
  post.id = Math.max(...posts.map((p) => p.id)) + 1
  post.reactions = { like: 0, love: 0, laugh: 0 }
  post.comments = []
  posts.unshift(post)
  return NextResponse.json(post)
}

export async function PUT(request: Request) {
  const updatedPost: Post = await request.json()
  const index = posts.findIndex((p) => p.id === updatedPost.id)
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updatedPost }
    return NextResponse.json(posts[index])
  }
  return NextResponse.json({ error: "Post not found" }, { status: 404 })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (id) {
    const index = posts.findIndex((p) => p.id === Number.parseInt(id))
    if (index !== -1) {
      posts.splice(index, 1)
      return NextResponse.json({ message: "Post deleted successfully" })
    }
  }

  return NextResponse.json({ error: "Post not found" }, { status: 404 })
}

