"use client";

import { Children, type HTMLAttributes, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ScrollRevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  delay?: number;
  stagger?: boolean;
  amount?: number;
  innerClassName?: string;
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  stagger = false,
  amount = 0.18,
  innerClassName = "",
  ...props
}: ScrollRevealProps) {
  const reducedMotion = useReducedMotion();
  const hidden = reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 };
  const visible = reducedMotion
    ? { opacity: 1, y: 0, transition: { duration: 0 } }
    : {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.55,
          delay,
          ease: [0.22, 1, 0.36, 1] as const,
          staggerChildren: stagger ? 0.1 : 0,
        },
      };
  const childVariants = reducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <div className={className} {...props}>
      <motion.div
        className={innerClassName}
        initial={reducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount }}
        variants={{ hidden, visible }}
      >
        {stagger
          ? Children.map(children, (child, index) => (
              <motion.div key={index} variants={childVariants}>
                {child}
              </motion.div>
            ))
          : children}
      </motion.div>
    </div>
  );
}
