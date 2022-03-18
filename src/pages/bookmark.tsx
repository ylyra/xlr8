import { useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";

import { ImageProps } from "../@types/image";
import { ImageItem } from "../components/ImageItem";
import { useLocalStorage } from "../hooks/useLocalStorage";

import styles from "../styles/Home.module.scss";

const Bookmark: NextPage = () => {
  const [bookmarkeds, setBookmarkeds] = useLocalStorage<ImageProps[]>(
    "@XLR8:bookmark",
    []
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

          newBookmarks.sort(function (a, b) {
            if (a.image_id > b.image_id) {
              return 1;
            }
            if (a.image_id < b.image_id) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });

          return newBookmarks;
        }

        const newBookmarks = [...oldBookmarks, image];

        newBookmarks.sort(function (a, b) {
          if (a.image_id > b.image_id) {
            return 1;
          }
          if (a.image_id < b.image_id) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });

        return newBookmarks;
      });
    },
    [setBookmarkeds]
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Boorkmark - XLR8</title>
        <meta
          name="description"
          content="Teste com React para a empresa XLR8"
        />
      </Head>

      <main className={styles.main}>
        <section className={styles.content}>
          <AnimatePresence>
            {bookmarkeds.map((image) => (
              <ImageItem
                onClick={handleBookmark}
                bookmarkeds={bookmarkeds}
                image={image}
                key={image.image_id}
              />
            ))}
          </AnimatePresence>

          {bookmarkeds.length === 0 && (
            <h4 className={styles.noBookmarked}>
              Você não tem nenhuma imagem salva
            </h4>
          )}
        </section>
      </main>
    </div>
  );
};

export default Bookmark;
