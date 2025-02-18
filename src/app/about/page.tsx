import React from "react";
import Navbar from "~/components/navbar";
import Image from "next/image";
import Footer from "~/components/common/footer";

function page() {
  return (
    <div>
      <Navbar />
      <h1 className="mt-2 text-center text-2xl font-black">
        Blog Nest - A cozy space for bloggers to create and share.
      </h1>
      <div className="mt-8 flex w-screen flex-col lg:flex-row items-center justify-around p-8 bg-gradient-to-b from-foreground to-card-foreground text-white overflow-x-hidden">
        <div className="flex w-full lg:w-1/3 flex-col gap-4">
          <p className="font-mono">
            BlogSphere is a dynamic and user-friendly blogging platform designed
            to give users complete control over their blogging experience.
            Whether you're a casual reader or an active blogger, our platform
            offers an engaging space for content creation, discovery, and
            interaction.{" "}
          </p>

          <h1>Key Features:</h1>
          <h3>✅ Secure Authentication:</h3>
          <ul>
            <li>
              Sign in seamlessly using Google Authentication or Credentials
              Login.
            </li>
            <li>
              Enjoy a personalized experience with separate user dashboards.
            </li>
          </ul>

          <h3>✅ User Dashboard & Blog Management:</h3>
          <ul>
            <li>Registered users can create blogs with a title, description,category, and an image.</li>
            <li>Save blogs for later reading.</li>
            <li>Edit and manage personal blogs from their dashboard.</li>
          </ul>

          <h3>✅ Guest User Experience:</h3>
          <ul>
            <li>Browse all blogs on the Home Page without an account. </li>
            <li>Search for blogs by title.</li>
            <li>Filter blogs by categories to find relevant content. </li>
          </ul>

          <h3>✅ Social Engagement:</h3>
          <ul>
            <li>
              Users can comment on each other's blogs, fostering discussions and
              community engagement.{" "}
            </li>
            <li>
              Saved Blogs: Logged-in users can save blogs they like for easy
              access later.{" "}
            </li>
          </ul>
        </div>

        <h1 className="text-2xl font-black block lg:hidden mt-8">TECH STACK</h1>

        <div className="flex flex-row flex-wrap lg:flex-col justify-center gap-8 p-4 items-center mt-8 lg:mt-0">
          <h1 className="text-2xl font-black hidden lg:block">TECH STACK</h1>
          <Image
            src="https://trpc.io/img/logo.svg"
            alt="Image"
            width="120"
            height="120"
          />
          <Image
            src="https://static-00.iconduck.com/assets.00/postgresql-plain-wordmark-icon-1024x1021-3tzxcisn.png"
            alt="Image"
            width="120"
            height="120"
          />

          <Image
            src="https://static-00.iconduck.com/assets.00/nextjs-icon-512x512-y563b8iq.png"
            alt="Image"
            width="120"
            height="120"
          />

          <Image
            src="https://www.svgrepo.com/show/374144/typescript.svg"
            alt="TypeScript Logo"
            width={120}
            height={120}
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default page;
