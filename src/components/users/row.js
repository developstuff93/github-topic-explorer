import styles from "./users.module.scss";

export default function Row({ user }) {
  if (!user?.login) {
    return null;
  }

  const { id, login: username, url, avatarUrl, name, email } = user;

  return (
    <tr className={styles.user} key={id}>
      <td>
        <a href={url} target="_blank" rel="noreferrer">
          {username}
        </a>
      </td>
      <td className={styles.avatar}>
        <a href={avatarUrl} target="_blank" rel="noreferrer">
          <img src={avatarUrl} alt={name} />
        </a>
      </td>
      <td>{name}</td>
      <td>{email ? <a href={`mailto:${email}`}>{email}</a> : null}</td>
    </tr>
  );
}
