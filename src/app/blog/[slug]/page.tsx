import React from 'react'
import BlogInfo from '~/components/blog-info';
import Footer from '~/components/common/footer';
import Navbar from '~/components/navbar';

export default function Page() {
  return (
    <>
      <div className="h-screen w-screen overflow-x-hidden bg-background">
        <Navbar />
<BlogInfo/>
        <Footer />
      </div>
    </>
  );
}

