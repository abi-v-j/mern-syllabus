/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from 'react';
import courses from '../data/courses.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { buildTopicKey, flattenTopics } from '../utils/navigation.js';

const PortalContext = createContext(null);

export function PortalProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('mern-portal-theme', 'light');
  const [completedTopics, setCompletedTopics] = useLocalStorage('mern-portal-completed', {});
  const [bookmarkedTopics, setBookmarkedTopics] = useLocalStorage('mern-portal-bookmarks', []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  const toggleCompleted = (courseId, topicId) => {
    const topicKey = buildTopicKey(courseId, topicId);

    setCompletedTopics((currentTopics) => ({
      ...currentTopics,
      [topicKey]: !currentTopics[topicKey],
    }));
  };

  const toggleBookmark = (courseId, topicId) => {
    const topicKey = buildTopicKey(courseId, topicId);

    setBookmarkedTopics((currentBookmarks) =>
      currentBookmarks.includes(topicKey)
        ? currentBookmarks.filter((bookmark) => bookmark !== topicKey)
        : [topicKey, ...currentBookmarks],
    );
  };

  const isTopicCompleted = (courseId, topicId) =>
    Boolean(completedTopics[buildTopicKey(courseId, topicId)]);

  const isTopicBookmarked = (courseId, topicId) =>
    bookmarkedTopics.includes(buildTopicKey(courseId, topicId));

  const topicIndex = flattenTopics(courses);
  const bookmarkedTopicEntries = topicIndex.filter((topic) =>
    bookmarkedTopics.includes(buildTopicKey(topic.courseId, topic.topicId)),
  );
  const completedCount = Object.values(completedTopics).filter(Boolean).length;

  return (
    <PortalContext.Provider
      value={{
        courses,
        theme,
        toggleTheme,
        completedTopics,
        bookmarkedTopics,
        bookmarkedTopicEntries,
        completedCount,
        toggleCompleted,
        toggleBookmark,
        isTopicCompleted,
        isTopicBookmarked,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const context = useContext(PortalContext);

  if (!context) {
    throw new Error('usePortal must be used within PortalProvider');
  }

  return context;
}
