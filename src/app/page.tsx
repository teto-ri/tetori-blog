import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import NotionPage from '@/components/notion-page';
import RelatedPosts from '@/components/posts/related-posts';
import { getRecordMap } from '@/libs/notion';
import { getIntroductionPostFromNotion } from '@/services/posts';
import { Post } from '@/types/post';

export const metadata = {
  title: 'Welcome | Siwon Kim',
};

export default async function HomePage() {
  const allPosts = await getIntroductionPostFromNotion();
  const post = allPosts.find((p) => p.slug === 'introduction');

  if (!post) {
    console.log('post가 없네요');
    return notFound();
  }

  if (!post.published) {
    return (
      <article
        data-revalidated-at={new Date().getTime()}
        className="mx-auto mt-40 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold">Post Not Found</h2>
        <Link href="/blog">
          <span className="mr-2">&larr;</span>
          <span>Go to list page</span>
        </Link>
      </article>
    );
  }

  const recordMap = await getRecordMap(post.id);

  return (
    <>
      {/* <h1 className="mt-12 text-center text-3xl font-bold">Home</h1> */}
      <article
        data-revalidated-at={new Date().getTime()}
        className="mt-0 flex flex-col items-center md:mt-20"
      >
        <div className="relative aspect-[3/2] w-[50vw] max-w-[900px]">
          <Image
            src={post.cover}
            alt="cover"
            fill
            style={{ objectFit: 'contain' }}
            placeholder="blur"
            blurDataURL={post.blurUrl}
          />
        </div>
        <NotionPage post={post} recordMap={recordMap} />
      </article>
    </>
  );
}
