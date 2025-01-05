import Image from "next/image";
import Link from "next/link";
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
export default async function BlogCard() {
  const data: IBlog[] = await client.fetch('*[_type == "Blog"]');
  // console.log(JSON.stringify(data, null, 2)); 

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {data.map((Blog, index) => {
        return (

          <div key={Blog.Title}>
            <section className="w-[400px] h-[480px]  rounded bg-light/90 dark:bg-dark/40 shadow-md shadow-gray-300 dark:shadow-black/80 group hover:scale-105 transition-transform ease-out duration-700">
              {/* Image Section*/}
              <div className="relative max-h-76 flex-1">
                {Blog.image && Blog.image.asset && (
                  <img
                    src={urlFor(Blog.image.asset._ref).url()} // Remove quotes and use curly braces
                    alt={Blog.Title}
                    width={400}
                    height={200}
                    className="object-cover rounded-t"
                  />
                )}
              </div>
              {/* Title and Summary */}
              <div className="flex flex-col justify-between gapx-y-4  p-4">
                <h2 className="text-lg font-semibold line-clamp-2 text-dark dark:text-light leading-tight mb-2">
                  {Blog.Title}
                </h2>
                <p className="text-dark/70 dark:text-light/70 line-clamp-3">
                  {Blog.content}
                </p>
                {/* Read More dynamic Link */}
                <Link
                  href={`/blog/${index}`}
                  className="block px-4 py-1 text-center bg-accentDarkSecondary  rounded text-dark font-semibold mt-4"
                >
                  Read More
                </Link>
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
}

