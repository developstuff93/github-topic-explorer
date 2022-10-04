import cx from "classnames";
import { useAppState } from "../../hooks/AppStateProvider";
import SearchBar from "../search-bar";
import styles from "./topics.module.scss";

export default function Topics() {
  const { topics, currentTopic, selectTopic, loadingTopics, term } =
    useAppState();

  const renderBody = () => {
    if (loadingTopics) {
      return <li className={styles.topic}>Loading topics...</li>;
    }

    if (!topics?.length) {
      return <li className={styles.topic}>No topics found</li>;
    }

    return (
      <>
        {topics.map((topic) => (
          <li
            key={topic.id}
            className={cx(styles.topic, {
              [styles.selected]: topic.id === currentTopic?.id,
            })}
            onClick={() => selectTopic(topic)}
          >{`${topic.name} (${topic.count})`}</li>
        ))}
      </>
    );
  };

  return (
    <>
      <h2>GitHub Topic ({term})</h2>
      <SearchBar />
      <ul className={styles.topics}>{renderBody()}</ul>
    </>
  );
}
