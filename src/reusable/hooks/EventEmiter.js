import React, { useRef, useCallback } from "react";

const EventEmiter = () => {
  const events = useRef({});
  console.log(events);

  const _getEventListByName = useCallback((eventName) => {
    if (typeof events[eventName] === "undefined") {
      events[eventName] = new Set();
    }
    return events[eventName];
  }, []);

  const on = useCallback(
    (eventName, fn) => _getEventListByName(eventName).add(fn),
    [_getEventListByName]
  );

  const removeListener = useCallback(
    (eventName, fn) => _getEventListByName(eventName).delete(fn),
    [_getEventListByName]
  );

  const once = useCallback(
    (eventName, fn) => {
      const onceFn = (...args) => {
        removeListener(eventName, onceFn);
        fn(args);
      };
      on(eventName, onceFn);
    },
    [on, removeListener]
  );

  const emit = useCallback(
    (eventName, ...args) => {
      _getEventListByName(eventName).forEach((fn) => fn(args));
    },
    [_getEventListByName]
  );

  return { on, emit, once, removeListener };
};

export default EventEmiter;
