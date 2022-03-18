import { CSSProperties, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { encode } from "base-64";
import { motion } from "framer-motion";
import { BiArrowFromLeft } from "react-icons/bi";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { animated, useSpring } from "react-spring";

import { blur } from "../../utils/blurEffect";

import styles from "./styles.module.scss";
import { ImageProps } from "../../@types/image";

type ImageItemProps = {
  image: ImageProps;
  onClick(image: ImageProps): void;
  bookmarkeds: ImageProps[];
};

export function ImageItem({ bookmarkeds, image, onClick }: ImageItemProps) {
  const [isHovering, setIsHovering] = useState(false);
  const isSelected = bookmarkeds.find(
    (bookmarked) => bookmarked.image_id === image.image_id
  );
  const springStyles = useSpring({
    to: { opacity: isHovering ? 1 : 0, top: isHovering ? 10 : -10 },
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
      onClick={() => onClick(image)}
      className={clsx(styles.imageWrapper, {
        [styles.isSelected]: isSelected,
      })}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <animated.div className={styles.marker} style={springStyles}>
        {isSelected ? (
          <FaBookmark size={20} color="#6f4bd8" />
        ) : (
          <FaRegBookmark size={20} color="#6f4bd8" />
        )}
      </animated.div>
      <Image
        src={image.url}
        alt={image.title}
        width={300}
        height={272}
        objectFit="cover"
        objectPosition="center"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${encode(blur(300, 272))}`}
      />

      <div className={styles.imageContentContainer}>
        <span>
          <BiArrowFromLeft size={24} />
        </span>

        <p>{image.title}</p>
      </div>
    </motion.section>
  );
}
