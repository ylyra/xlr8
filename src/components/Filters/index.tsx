import clsx from "clsx";
import { animated, useSpring } from "react-spring";

import styles from "./styles.module.scss";

type FiltersProps = {
  isVisible: boolean;
  currentFilter: string;
  onFilterBy: (filter_by: string) => void;
};

export function Filters({
  isVisible,
  currentFilter,
  onFilterBy,
}: FiltersProps) {
  const springStyles = useSpring({
    to: { bottom: !isVisible ? 0 : -100 },
  });

  return isVisible ? (
    <section className={styles.filtersWrapper}>
      <button
        className={clsx("", {
          [styles.isSelected]: currentFilter === "all",
        })}
        onClick={() => onFilterBy("all")}
      >
        Todos
      </button>
      <button
        className={clsx("", {
          [styles.isSelected]: currentFilter === "bookmark",
        })}
        onClick={() => onFilterBy("bookmark")}
      >
        Favoritos
      </button>
    </section>
  ) : (
    <animated.section
      className={styles.bottomFiltersWrapper}
      style={springStyles}
    >
      <button
        className={clsx("", {
          [styles.isSelected]: currentFilter === "all",
        })}
        onClick={() => onFilterBy("all")}
      >
        Todos
      </button>
      <button
        className={clsx("", {
          [styles.isSelected]: currentFilter === "bookmark",
        })}
        onClick={() => onFilterBy("bookmark")}
      >
        Favoritos
      </button>
    </animated.section>
  );
}
