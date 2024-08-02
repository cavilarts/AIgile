import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollAnchor = () => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibilityRef = useRef<HTMLDivElement>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToBottom = useCallback(() => {
    if (visibilityRef.current) {
      visibilityRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [visibilityRef]);

  const handleVisibilityChange = useCallback(() => {
    if (messagesRef.current) {
      let observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            } else {
              setIsVisible(false);
            }
          });
        },
        {
          rootMargin: "0px 0px -150px 0px",
        }
      );

      observer.observe(messagesRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [messagesRef]);

  useEffect(() => {
    if (isAtBottom) {
      setTimeout(() => {
        // scrollToBottom();
      }, 100);
    }
  }, [isAtBottom, scrollToBottom]);

  useEffect(() => {
    const { current } = scrollRef;

    const handleScroll = (event: Event) => {
      const target = event.target as HTMLDivElement;
      const offset = 25;
      const iab =
        target.scrollTop + target.clientHeight >= target.scrollHeight - offset;

      setIsAtBottom(iab);
    };

    current?.addEventListener("scroll", handleScroll, true);

    return () => {
      current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (visibilityRef.current) {
      handleVisibilityChange();
    }
  }, [handleVisibilityChange]);

  return {
    messagesRef,
    scrollRef,
    visibilityRef,
    scrollToBottom,
    isAtBottom,
    isVisible,
  };
};
