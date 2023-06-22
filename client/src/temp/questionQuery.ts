// interface QuestionAnswer {
//   questionAnswerId: number;
//   questionAnswerContent: string;
//   userId: number;
//   userName: string;
//   createdAt: string;
//   modifiedAt: string;
// }

// interface Question {
//   questionId: number;
//   questionTitle: string;
//   questionContent: string;
//   viewCount: number;
//   createdAt: string;
//   modifiedAt: string;
//   questionAnswers: QuestionAnswer[];
// }

// interface Data {
//   data: Question[];
// }

// export const jsonData: Data = {
export const questionQuery = {
  data: [
    {
      questionId: 1,
      questionTitle: '망고야~',
      questionContent: '사랑해. 밥 좀 잘 먹어',
      userName: '도유',
      viewCount: 140,
      createdAt: '질문 작성 날짜',
      modifiedAt: '질문 수정 날짜',
      questionAnswers: [
        {
          questionAnswerId: 1,
          questionAnswerContent: `I've created this sThe following code works only if the minimum value is  It does not work for minimum values other than  
          If you wanted to get a random integer between 1 (and only 1) and 6, you would calculate:
          mall package, react-use-context-selector, and it just does the job.
          Math.random() does not provide cryptographically secure random numbers. Do not use them for anything related to security. Use the Web Crypto API instead, and more precisely the window.crypto.getRandomValues() method.
          I used the same approach as used in Redux's useSelector. It also comes with type declarations and the return type matches the selector function's return type making it suitable for using in TS project.`,
          userId: 1,
          userName: '망고',
          createdAt: '2023-06-22T12:00:00',
          modifiedAt: '2023-06-12T12:00:00',
          voteCount: 4,
        },
        {
          questionAnswerId: 2,
          questionAnswerContent: `5

          Solution with external store (Redux or Zustand like approach) with new hook useSyncExternalStore comes with React 18.
          
          For React 18: Define createStore and useStore functions:
          
          import React, { useCallback } from "react";
          import { useSyncExternalStore } from "react";
          
          const createStore = (initialState) => {
            let state = initialState;
            const getState = () => state;
            const listeners = new Set();
            const setState = (fn) => {
              state = fn(state);
              listeners.forEach((l) => l());
            };
            const subscribe = (listener) => {
              listeners.add(listener);
              return () => listeners.delete(listener);
            };
            return { getState, setState, subscribe };
          };
          
          const useStore = (store, selector) =>
            useSyncExternalStore(
              store.subscribe,
              useCallback(() => selector(store.getState()), [store, selector])
            );
          
          Now use it :
          
          const store = createStore({ count: 0, text: "hello" });
          
          const Counter = () => {
            const count = useStore(store, (state) => state.count);
            const inc = () => {
              store.setState((prev) => ({ ...prev, count: prev.count + 1 }));
            };
            return (
              <div>
                {count} <button onClick={inc}>+1</button>
              </div>
            );
          };
          For React 17 and any React version that supports hooks:
          
          Option 1: You may use the external library (maintained by React team) use-sync-external-store/shim :
          import { useSyncExternalStore } from "use-sync-external-store/shim";
          Option 2: If you don't want to add new library and don't care about concurency problems:
          const createStore = (initialState) => {
            let state = initialState;
            const getState = () => state;
            const listeners = new Set();
            const setState = (fn) => {
              state = fn(state);
              listeners.forEach((l) => l());
            }
            const subscribe = (listener) => {
              listeners.add(listener);
              return () => listeners.delete(listener);
            }
            return {getState, setState, subscribe}
          }
          
          const useStore = (store, selector) => {
            const [state, setState] = useState(() => selector(store.getState()));
            useEffect(() => {
              const callback = () => setState(selector(store.getState()));
              const unsubscribe = store.subscribe(callback);
              callback();
              return unsubscribe;
            }, [store, selector]);
            return state;
          }
          Sources:
          
          A conference talk from Daishi Kato from React Conf 2021
          A blog post about same conference talk by Chetan Gawai`,
          userId: 1,
          userName: '도유',
          createdAt: '2019-09-12T12:00:00',
          modifiedAt: '2023-06-22T17:00:00',
          voteCount: 1,
        },
      ],
    },
    {
      questionId: 2,
      questionTitle: '질문 제목',
      questionContent: '질문 내용',
      viewCount: 0,
      createdAt: '질문 작성 날짜',
      modifiedAt: '질문 수정 날짜',
      questionAnswers: [
        {
          questionAnswerId: 1,
          questionAnswerContent: '제가 알것 같습니다. 그것은 블라블라네요.',
          userId: 1,
          userName: '하하',
          createdAt: '2023-06-12T14:00:00',
          modifiedAt: '2023-06-12T14:00:00',
          voteCount: 0,
        },
        {
          questionAnswerId: 2,
          questionAnswerContent: '와우',
          userId: 1,
          userName: '잘 몰겟..ㅋ ',
          createdAt: '2023-06-12T14:00:00',
          modifiedAt: '2023-06-12T14:00:00',
          voteCount: 4,
        },
      ],
    },
  ],
};
