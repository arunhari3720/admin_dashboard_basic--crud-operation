import { useState } from "react";
import { motion } from "framer-motion";

const blogs = [
  {
    id: 1,
    title: "React Performance Tips",
    desc: "Optimize your React apps for speed and scalability.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    content: `React performance is a crucial aspect of building modern web applications, especially as your app grows in size and complexity. A slow or unresponsive UI can significantly impact user experience and engagement. One of the first things to focus on is minimizing unnecessary re-renders. React re-renders components whenever state or props change, but sometimes these updates are not needed. Using techniques like React.memo, useMemo, and useCallback helps prevent redundant rendering and improves efficiency.

Another important optimization strategy is code splitting and lazy loading. Instead of loading the entire application at once, you can split your code into smaller chunks and load them only when required. React provides built-in support for this using React.lazy() and Suspense. This significantly reduces the initial load time of your application, making it faster and more responsive, especially for users on slower networks.

Efficient state management also plays a key role in performance. Keeping state as minimal and localized as possible reduces unnecessary updates across components. Avoid lifting state higher than needed, and consider using context wisely. For larger applications, state management libraries like Redux or Zustand can help structure data flow efficiently.

Optimizing list rendering is another common area where performance can degrade. Rendering large lists without optimization can slow down the UI. Techniques like virtualization (using libraries such as react-window or react-virtualized) allow only visible items to be rendered, greatly improving performance.

Finally, always measure and monitor performance rather than guessing. Tools like React DevTools Profiler help identify which components are re-rendering unnecessarily and where optimizations are needed. By combining these strategies, you can build fast, scalable, and high-performing React applications.`
      
  },
  {
    id: 2,
    title: "MERN Stack Guide",
    desc: "Build full stack apps with MongoDB, Express, React.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
   content: `The MERN stack is one of the most popular technologies used for building full-stack web applications. It consists of MongoDB, Express.js, React.js, and Node.js, all of which are JavaScript-based. This allows developers to use a single language across both frontend and backend, making development faster and more efficient. The seamless integration between these technologies makes MERN a powerful choice for scalable and modern web applications.

MongoDB is a NoSQL database that stores data in a flexible, JSON-like format. Unlike traditional relational databases, MongoDB allows developers to work with dynamic schemas, which is especially useful for rapidly evolving applications. It provides high performance, scalability, and easy integration with Node.js, making it a perfect fit for MERN-based projects.

Express.js is a lightweight backend framework that runs on Node.js. It simplifies the process of building APIs and handling HTTP requests. With Express, you can easily define routes, middleware, and controllers, making backend development structured and efficient. It acts as the bridge between the frontend and the database, ensuring smooth data flow across the application.

React.js is the frontend library responsible for building user interfaces. It uses a component-based architecture, allowing developers to create reusable UI elements. React’s virtual DOM ensures efficient updates and rendering, resulting in high performance. Combined with modern tools like hooks and context API, React enables the development of dynamic and interactive user experiences.

Node.js is the runtime environment that allows JavaScript to run on the server. It is built on a non-blocking, event-driven architecture, making it highly efficient for handling multiple requests simultaneously. Node.js works seamlessly with Express and MongoDB, forming a strong backend foundation for MERN applications.

One of the biggest advantages of the MERN stack is its end-to-end JavaScript development. This reduces context switching for developers and improves productivity. Additionally, MERN applications are highly scalable, making them suitable for both small projects and large enterprise applications.

To build a complete MERN application, developers typically create a REST API using Node.js and Express, connect it to MongoDB for data storage, and use React on the frontend to consume the API. With proper folder structure, authentication, and deployment strategies, MERN can power robust and production-ready applications.

Overall, the MERN stack provides a modern, efficient, and flexible approach to web development. By mastering its components and understanding how they work together, developers can build high-performance applications that meet real-world business needs.`
  },
  {
    id: 3,
    title: "UI/UX Best Practices",
    desc: "Design clean, modern and user-friendly interfaces.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
    content:
      "Learn spacing, typography, color theory, and real-world UI/UX design principles..."
  }
];

function BlogPage() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-8">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-10"
      >
        ✨ Insights & Blogs
      </motion.h1>

      {/* BLOG GRID */}
      {!selectedBlog && (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="grid md:grid-cols-3 gap-8"
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition"
            >

              {/* IMAGE */}
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h2 className="text-xl font-semibold">
                  {blog.title}
                </h2>

                <p className="text-gray-500 mt-2 text-sm">
                  {blog.desc}
                </p>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedBlog(blog)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                >
                  Read More →
                </motion.button>
              </div>

            </motion.div>
          ))}
        </motion.div>
      )}

      {/* SINGLE BLOG VIEW */}
      {selectedBlog && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden"
        >

          {/* IMAGE */}
          <div className="h-64 overflow-hidden">
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="p-8">
            <h2 className="text-3xl font-bold">
              {selectedBlog.title}
            </h2>

            <p className="text-gray-600 mt-4 leading-relaxed">
              {selectedBlog.content}
            </p>

            <button
              onClick={() => setSelectedBlog(null)}
              className="mt-6 bg-gray-200 px-5 py-2 rounded-xl hover:bg-gray-300 transition"
            >
              ← Back to Blogs
            </button>
          </div>

        </motion.div>
      )}

    </div>
  );
}

export default BlogPage;