import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import confetti, { type CreateTypes, type Options } from "canvas-confetti";
import * as styles from "./Confetti.css.ts";

export type ConfettiHandle = {
  fire: (options?: Options) => void;
};

const ConfettiLayer = forwardRef<ConfettiHandle, {}>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<CreateTypes | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    rendererRef.current = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });
    return () => {
      rendererRef.current = null;
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      fire: (options?: Options) => {
        void rendererRef.current?.({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.2 },
          ticks: 200,
          ...options,
        });
      },
    }),
    [],
  );

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
});

ConfettiLayer.displayName = "ConfettiLayer";

export default ConfettiLayer;
