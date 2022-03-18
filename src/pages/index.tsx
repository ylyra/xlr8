import { useCallback, useEffect, useState } from "react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import TrackVisibility from "react-on-screen";
import { AnimatePresence } from "framer-motion";

import { ImageProps } from "../@types/image";
import { ImageItem } from "../components/ImageItem";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { api } from "../services/api";

import styles from "../styles/Home.module.scss";
import { Filters } from "../components/Filters";

type HomeProps = {
  images: ImageProps[];
};

const Home: NextPage<HomeProps> = ({ images }) => {
  const [filteredImages, setFilteredImages] = useState(images);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [bookmarkeds, setBookmarkeds] = useLocalStorage<ImageProps[]>(
    "@XLR8:bookmark",
    []
  );

  useEffect(() => {
    if (currentFilter === "bookmark") {
      setFilteredImages(bookmarkeds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarkeds]);

  const handleFilterBy = useCallback(
    (filter_by: string) => {
      setCurrentFilter(filter_by);
      if (filter_by === "all") {
        setFilteredImages(images);
      } else if (filter_by === "bookmark") {
        setFilteredImages(bookmarkeds);
      }
    },
    [bookmarkeds, images]
  );

  const handleBookmark = useCallback(
    (image: ImageProps) => {
      setBookmarkeds((oldBookmarks) => {
        const isBookmarked = oldBookmarks.find(
          (bookmark) => bookmark.image_id === image.image_id
        );
        if (isBookmarked) {
          const newBookmarks = oldBookmarks.filter(
            (bookmark) => bookmark.image_id !== image.image_id
          );

          return newBookmarks;
        }

        return [...oldBookmarks, image];
      });
    },
    [setBookmarkeds]
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page - XLR8</title>
        <meta
          name="description"
          content="Teste com React para a empresa XLR8"
        />
      </Head>

      <main className={styles.main}>
        <TrackVisibility partialVisibility>
          {({ isVisible }) => (
            <Filters
              isVisible={isVisible}
              currentFilter={currentFilter}
              onFilterBy={handleFilterBy}
            />
          )}
        </TrackVisibility>

        <section className={styles.content}>
          <AnimatePresence>
            {filteredImages.map((image) => (
              <ImageItem
                onClick={handleBookmark}
                bookmarkeds={bookmarkeds}
                image={image}
                key={image.image_id}
              />
            ))}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await api.get("/images");

    return {
      props: {
        images: response.data,
      },
      revalidate: 60 * 60 * 8, // will revalidate in 8 hours (in seconds)
    };
  } catch {
    return {
      props: {
        images: [],
      },
      revalidate: 60 * 10, // will revalidate every 10 minutes in case of error (in seconds)
    };
  }
};

export default Home;
