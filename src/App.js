import { ApolloProvider } from "@apollo/client";
import AppStateProvider from "./hooks/AppStateProvider";
import Users from "./components/users";
import Header from "./components/header";
import { createApolloClient } from "./utils/create-apollo-client";
import styles from "./App.module.scss";
import Topics from "./components/topics";

function App() {
  const { apolloClient } = createApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <AppStateProvider>
        <div className={styles.root}>
          <Header />
          <div className={styles.main}>
            <div className={styles.navbar}>
              <Topics />
            </div>
            <div className={styles.content}>
              <Users />
            </div>
          </div>
        </div>
      </AppStateProvider>
    </ApolloProvider>
  );
}

export default App;
