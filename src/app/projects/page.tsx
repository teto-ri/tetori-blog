import CategoryFilter from '@/components/filter/category-filter';
import SearchBar from '@/components/filter/search-bar';
import PostsGrid from '@/components/posts/posts-grid';
import { getProjectPostFromNotion } from '@/services/posts';
import { toUniqueArray } from '@/utils/to-unique-array';

export const metadata = {
  title: 'Projects',
  description: 'by teto-ri',
};

export default async function ProjectsPage() {
  const allPosts = await getProjectPostFromNotion();
  const allCategories = toUniqueArray(
    allPosts
      .filter((post) => post.published)
      .map((post) => post.categories)
      .flat()
  ).sort();

  return (
    <>
      <section className="mb-16 mt-0 space-y-8 md:mt-20">
        <SearchBar />
        <CategoryFilter allCategories={allCategories} />
      </section>
      <PostsGrid allPosts={allPosts} />
    </>
  );
}
