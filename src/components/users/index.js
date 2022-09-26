import { useAppState } from "../../hooks/AppStateProvider";
import Row from "./row";
import styles from "./users.module.scss";

export default function Users() {
  const { stargazers, loadingStargazers, currentTopic } = useAppState();

  const renderBody = () => {
    let error;

    if (loadingStargazers) {
      error = "Loading...";
    } else if (!currentTopic) {
      error = "Please select topic from left.";
    } else if (!stargazers?.nodes?.length) {
      error = "No stargazers to display";
    }

    if (error) {
      return (
        <tr>
          <td colSpan={4}>{error}</td>
        </tr>
      );
    }

    return stargazers.nodes.map((user) => <Row key={user.id} user={user} />);
  };

  return (
    <table className={styles.stargazers}>
      <thead>
        <tr>
          <th>Username</th>
          <th>Avatar</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>{renderBody()}</tbody>
    </table>
  );
}
