'use client';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(GSAPSplitText, useGSAP);

const SplitText = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  textAlign = 'center',
  tag: Tag = 'p',
  onLetterAnimationComplete
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  textAlign?: 'left' | 'center' | 'right';
  tag?: React.ElementType;
  onLetterAnimationComplete?: () => void;
}) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current || !text) return;
      const el = ref.current;

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
      });
      const targets = splitInstance.chars;

      const animation = gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
          onComplete: () => {
            onLetterAnimationComplete?.();
            if (splitInstance.revert) {
              splitInstance.revert();
            }
            animation.kill(); // Ensure animation is killed
          },
        }
      );
      
      return () => {
        if (splitInstance.revert) {
          try {
            splitInstance.revert();
          } catch(e) {
            // Fails during hot-reload, safe to ignore
          }
        }
        animation.kill();
      }
    },
    {
      dependencies: [text, delay, duration, ease, splitType, JSON.stringify(from), JSON.stringify(to), onLetterAnimationComplete],
      scope: ref,
      revertOnUpdate: true,
    }
  );
  
  const style = {
      textAlign,
  };

  return (
    <Tag ref={ref} style={style} className={className}>
        {text}
    </Tag>
  );
};

export default SplitText;
