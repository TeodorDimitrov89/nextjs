import Link from "next/link";
import { DUMMY_NEWS } from "@/dummy-news";
import Image from "next/image";

const NewsPage = () => {
  return (
    <section>
      <h1>News Page</h1>

      <ul className="news-list">
        {DUMMY_NEWS.map((newsItem) => (
          <li key={newsItem.id}>
            <Link href={`/news/${newsItem.slug}`}>
              <img
                src={`/images/news/${newsItem.image}`}
                alt={newsItem.title}
              />
              <span>{newsItem.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NewsPage;
