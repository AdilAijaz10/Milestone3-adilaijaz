import Image from "next/image";
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface IBlog {
  Title: string;
  content: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  dateTime: string;
  author: string;
}

export default async function page({ params }: any) {
  const data: IBlog[] = await client.fetch('*[_type == "Blog"]');
  const index = params.slug; // Change this to any index you want (e.g., 0, 1, 2, etc.)

  // Ensure the index exists in the data array
  const blog = data[index];

  if (!blog) {
    return <div>Blog not found at index {index}</div>;
  }

  return (


    <div>
      <article className="mt-12 mb-24 px-2 2xl:px-12 flex flex-col gap-y-8">

        {/* Blog Title */}
        <h1 className="text-xl xs:text-3xl lg:text-5xl font-bold text-dark dark:text-light">
          {blog.Title}
        </h1>

        {/* Featured Image */}
        {blog.image && blog.image.asset && (
          <img
            src={urlFor(blog.image.asset._ref).url()}
            width={500}
            height={500}
            alt={blog.Title}
            className="rounded"
          />
        )}

        {/* Main Body of Blog */}
        <p className="text-lg leading-normal text-dark/80 dark:text-light/80">
          {blog.content}
        </p>
        <p className="text-gray-700">
          <strong>Published on:</strong> {new Date(blog.dateTime).toLocaleDateString()}
        </p>
        {/* Author Section (Image & Bio) */}
        <section className=" flex gap-2 xs:gap-4 sm:gap-6 items-start xs:items-center justify-start">
          <img
            src={"/logo.jpeg"}
            width={200}
            height={200}
            alt="author"
            className="object-cover rounded-full h-12 w-12 sm:h-24 sm:w-24"
          />
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-dark dark:text-light">{blog.author}</h3>
            <p className="italic text-xs xs:text-sm sm:text-base text-dark/80 dark:text-light/80">
              The author is a passionate storyteller with a knack for simplifying complex ideas.
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
