import { useLazyQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  GET_RELATED_TOPICS,
  GET_TOPIC_STARGAZERS,
} from "../graphql/fetch-topics";
import { MIN_TERM_LENGTH, STARGAZERS_LIMIT } from "../utils/constant";

const AppContext = createContext({});

export const useAppState = () => {
  const context = useContext(AppContext);
  return context;
};

export default function AppStateProvider({ children }) {
  const [term, setTerm] = useState("react");
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [stargazers, setStargazers] = useState(null);

  const [fetchTopics, { loading: loadingTopics }] = useLazyQuery(
    GET_RELATED_TOPICS,
    {
      onCompleted: ({ topic }) => {
        const mainTopic = {
          id: topic.id,
          name: topic.name,
          count: topic.stargazerCount,
        };
        const newTopics = [
          // main term information
          mainTopic,
          // related topics
          ...topic.relatedTopics.map((topic) => ({
            id: topic.id,
            name: topic.name,
            count: topic.stargazerCount,
          })),
        ];
        setTopics(newTopics);
      },
      onError: () => {
        setTopics([]);
      },
    }
  );

  const [fetchStarGazers, { loading: loadingStargazers }] = useLazyQuery(
    GET_TOPIC_STARGAZERS,
    {
      onCompleted: (data) => {
        setStargazers(data.topic.stargazers);
      },
      onError: () => {
        setStargazers(null);
      },
    }
  );

  const searchTopics = async (name) => {
    if (name.length < MIN_TERM_LENGTH) {
      return;
    }

    setTerm(name);
    setCurrentTopic(null);
    setStargazers(null);
    fetchTopics({
      variables: {
        name,
      },
    });
  };

  const selectTopic = (newTopic) => {
    setCurrentTopic(newTopic);
    fetchStarGazers({
      variables: {
        topic: newTopic.name,
        limit: STARGAZERS_LIMIT,
      },
    });
  };

  useEffect(() => {
    searchTopics(term);
  }, []);

  const value = {
    loadingTopics,
    loadingStargazers,
    topics,
    currentTopic,
    stargazers,
    searchTopics,
    selectTopic,
    term,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
