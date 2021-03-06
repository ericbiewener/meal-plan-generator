import {
  FC,
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";

export type FlashNotificationCtxType = {
  showFlashNotification: (content: ReactNode) => void;
};

export const FlashNotificationCtx = createContext<FlashNotificationCtxType>(
  undefined as never
);
export const useFlashNotificationCtx = () =>
  useContext<FlashNotificationCtxType>(FlashNotificationCtx);

const ANIMATION_DURATION = 150;

export const FlashNotificationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<ReactNode[]>([]);

  const showFlashNotification = useCallback((content: ReactNode) => {
    setState((s) => [...s, content]);
    setTimeout(() => {
      setState((s) => {
        const idx = s.indexOf(content);
        return [...s.slice(0, idx), ...s.slice(idx + 1)];
      });
    }, 2000);
  }, []);

  return (
    <FlashNotificationCtx.Provider value={{ showFlashNotification }}>
      {children}
      <TransitionGroup className="fixed bottom-4 right-4">
        {state.map((s, i) => (
          <CSSTransition
            key={i}
            timeout={ANIMATION_DURATION}
            classNames="fade-zoom"
          >
            <div className={`animation-duration-${ANIMATION_DURATION} not-last:mb-2 px-3 py-2 rounded-md shadow-xl w-80 bg-emerald-100 border border-emerald-200`}>
              {s}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </FlashNotificationCtx.Provider>
  );
};
