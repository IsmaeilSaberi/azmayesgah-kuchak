import BlogPageComp from "../../components/blog-page";

const BlogPage = async ({ searchParams }) => {
  return (
    <div className="container mx-auto">
      <>
        <title>وبلاگ آزمایشگاه کوچک من</title>
        <meta name="description" content="وبلاگ آزمایشگاه کوچک من" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="http://azekuchak.ir/blog" />
      </>
      <BlogPageComp url={searchParams} />
    </div>
  );
};

export default BlogPage;
