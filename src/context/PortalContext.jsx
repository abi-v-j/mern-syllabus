/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
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

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  const toggleCompleted = useCallback(
    (courseId, topicId) => {
      const topicKey = buildTopicKey(courseId, topicId);

      setCompletedTopics((currentTopics) => ({
        ...currentTopics,
        [topicKey]: !currentTopics[topicKey],
      }));
    },
    [setCompletedTopics],
  );

  const toggleBookmark = useCallback(
    (courseId, topicId) => {
      const topicKey = buildTopicKey(courseId, topicId);

      setBookmarkedTopics((currentBookmarks) =>
        currentBookmarks.includes(topicKey)
          ? currentBookmarks.filter((bookmark) => bookmark !== topicKey)
          : [topicKey, ...currentBookmarks],
      );
    },
    [setBookmarkedTopics],
  );

  const isTopicCompleted = useCallback(
    (courseId, topicId) => Boolean(completedTopics[buildTopicKey(courseId, topicId)]),
    [completedTopics],
  );

  const isTopicBookmarked = useCallback(
    (courseId, topicId) => bookmarkedTopics.includes(buildTopicKey(courseId, topicId)),
    [bookmarkedTopics],
  );

  const topicIndex = useMemo(() => flattenTopics(courses), []);
  const bookmarkedTopicEntries = useMemo(
    () =>
      topicIndex.filter((topic) =>
        bookmarkedTopics.includes(buildTopicKey(topic.courseId, topic.topicId)),
      ),
    [bookmarkedTopics, topicIndex],
  );
  const completedCount = useMemo(
    () => Object.values(completedTopics).filter(Boolean).length,
    [completedTopics],
  );
  const portalValue = useMemo(
    () => ({
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
    }),
    [
      bookmarkedTopicEntries,
      bookmarkedTopics,
      completedCount,
      completedTopics,
      isTopicBookmarked,
      isTopicCompleted,
      theme,
      toggleBookmark,
      toggleCompleted,
      toggleTheme,
    ],
  );

  return <PortalContext.Provider value={portalValue}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const context = useContext(PortalContext);

  if (!context) {
    throw new Error('usePortal must be used within PortalProvider');
  }

  return context;
}
