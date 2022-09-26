import { useState } from "react";
import { useAppState } from "../../hooks/AppStateProvider";
import { MIN_TERM_LENGTH } from "../../utils/constant";
import styles from "./search-bar.module.scss";

export default function SearchBar() {
  const { searchTopics } = useAppState();
  const [topic, setTopic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    searchTopics(topic);
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <input
        className={styles.search}
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder={`Please input topic (Min ${MIN_TERM_LENGTH})`}
      />
      <button
        className={styles.submit}
        type="submit"
        disabled={topic.length < MIN_TERM_LENGTH}
      >
        Find
      </button>
    </form>
  );
}
