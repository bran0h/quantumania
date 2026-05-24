<template>
  <div
    class="hero-quantum relative mx-auto aspect-square w-full max-w-[min(100%,22rem)] sm:max-w-xs lg:max-w-sm"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="size-full overflow-visible"
    >
      <defs>
        <radialGradient
          id="hero-core-glow"
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop
            offset="0%"
            stop-color="var(--color-superposition)"
            stop-opacity="0.45"
          />
          <stop
            offset="100%"
            stop-color="var(--color-superposition)"
            stop-opacity="0"
          />
        </radialGradient>

        <linearGradient
          id="hero-wave-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop
            offset="0%"
            stop-color="var(--color-qubit-zero)"
            stop-opacity="0"
          />
          <stop
            offset="35%"
            stop-color="var(--color-qubit-zero)"
            stop-opacity="0.9"
          />
          <stop
            offset="50%"
            stop-color="var(--color-superposition)"
            stop-opacity="1"
          />
          <stop
            offset="65%"
            stop-color="var(--color-qubit-one)"
            stop-opacity="0.9"
          />
          <stop
            offset="100%"
            stop-color="var(--color-qubit-one)"
            stop-opacity="0"
          />
        </linearGradient>

        <filter
          id="hero-soft-glow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur
            stdDeviation="4"
            result="blur"
          />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Ambient rings -->
      <circle
        cx="210"
        cy="210"
        r="168"
        stroke="var(--ui-border)"
        stroke-width="1"
        stroke-opacity="0.35"
        class="hero-quantum__ring-pulse"
      />
      <circle
        cx="210"
        cy="210"
        r="132"
        stroke="var(--ui-primary)"
        stroke-width="1"
        stroke-opacity="0.12"
        stroke-dasharray="6 10"
        class="hero-quantum__ring-spin-slow"
      />

      <!-- Interference wave -->
      <path
        d="M 52 210 C 110 170, 150 250, 210 210 S 310 170, 368 210"
        stroke="url(#hero-wave-gradient)"
        stroke-width="2.5"
        stroke-linecap="round"
        fill="none"
        class="hero-quantum__wave"
      />
      <path
        d="M 52 210 C 110 250, 150 170, 210 210 S 310 250, 368 210"
        stroke="url(#hero-wave-gradient)"
        stroke-width="1.5"
        stroke-linecap="round"
        fill="none"
        opacity="0.45"
        class="hero-quantum__wave hero-quantum__wave--reverse"
      />

      <!-- Orbital planes -->
      <g
        class="hero-quantum__orbit hero-quantum__orbit--a"
        transform-origin="210px 210px"
      >
        <ellipse
          cx="210"
          cy="210"
          rx="118"
          ry="42"
          stroke="var(--color-qubit-zero)"
          stroke-width="1.75"
          stroke-opacity="0.55"
        />
        <circle
          cx="328"
          cy="210"
          r="7"
          fill="var(--color-qubit-zero)"
          filter="url(#hero-soft-glow)"
        />
      </g>

      <g
        class="hero-quantum__orbit hero-quantum__orbit--b"
        transform-origin="210px 210px"
      >
        <ellipse
          cx="210"
          cy="210"
          rx="118"
          ry="42"
          stroke="var(--color-qubit-one)"
          stroke-width="1.75"
          stroke-opacity="0.55"
          transform="rotate(60 210 210)"
        />
        <circle
          cx="328"
          cy="210"
          r="7"
          fill="var(--color-qubit-one)"
          filter="url(#hero-soft-glow)"
          transform="rotate(60 210 210)"
        />
      </g>

      <g
        class="hero-quantum__orbit hero-quantum__orbit--c"
        transform-origin="210px 210px"
      >
        <ellipse
          cx="210"
          cy="210"
          rx="118"
          ry="42"
          stroke="var(--ui-primary)"
          stroke-width="1.75"
          stroke-opacity="0.65"
          transform="rotate(-60 210 210)"
        />
        <circle
          cx="328"
          cy="210"
          r="6"
          fill="var(--ui-primary)"
          filter="url(#hero-soft-glow)"
          transform="rotate(-60 210 210)"
        />
      </g>

      <!-- Superposition halo -->
      <circle
        cx="210"
        cy="210"
        r="72"
        fill="url(#hero-core-glow)"
        class="hero-quantum__halo"
      />

      <!-- Core qubit -->
      <circle
        cx="210"
        cy="210"
        r="14"
        fill="var(--color-superposition)"
        filter="url(#hero-soft-glow)"
        class="hero-quantum__core"
      />
      <circle
        cx="210"
        cy="210"
        r="5"
        fill="var(--ui-bg)"
        class="hero-quantum__core-inner"
      />

      <!-- Probability bars -->
      <g transform="translate(210 318)">
        <rect
          x="-54"
          y="-8"
          width="108"
          height="8"
          rx="4"
          fill="var(--ui-bg-accented)"
        />
        <rect
          x="-54"
          y="-8"
          width="54"
          height="8"
          rx="4"
          fill="var(--color-qubit-zero)"
          class="hero-quantum__bar-zero"
        />
        <rect
          x="0"
          y="-8"
          width="54"
          height="8"
          rx="4"
          fill="var(--color-qubit-one)"
          class="hero-quantum__bar-one"
        />
      </g>

      <!-- Ket labels -->
      <text
        x="118"
        y="338"
        fill="var(--color-qubit-zero)"
        font-size="13"
        font-family="ui-monospace, monospace"
        font-weight="600"
      >|0⟩</text>
      <text
        x="286"
        y="338"
        fill="var(--color-qubit-one)"
        font-size="13"
        font-family="ui-monospace, monospace"
        font-weight="600"
      >|1⟩</text>
      <text
        x="194"
        y="362"
        fill="var(--color-superposition)"
        font-size="12"
        font-family="ui-monospace, monospace"
        font-weight="600"
        opacity="0.85"
      >|+⟩</text>
    </svg>
  </div>
</template>

<style scoped>
.hero-quantum__orbit--a {
  animation: hero-orbit 14s linear infinite;
}

.hero-quantum__orbit--b {
  animation: hero-orbit 18s linear infinite reverse;
}

.hero-quantum__orbit--c {
  animation: hero-orbit 22s linear infinite;
}

.hero-quantum__ring-spin-slow {
  transform-origin: 210px 210px;
  animation: hero-orbit 48s linear infinite;
}

.hero-quantum__ring-pulse {
  animation: hero-ring-pulse 4s ease-in-out infinite;
}

.hero-quantum__wave {
  stroke-dasharray: 12 18;
  animation: hero-wave 5s linear infinite;
}

.hero-quantum__wave--reverse {
  animation-direction: reverse;
  animation-duration: 7s;
}

.hero-quantum__halo {
  transform-box: fill-box;
  transform-origin: center;
  animation: hero-halo 3.5s ease-in-out infinite;
}

.hero-quantum__core {
  transform-box: fill-box;
  transform-origin: center;
  animation: hero-core 2.8s ease-in-out infinite;
}

.hero-quantum__core-inner {
  animation: hero-core-inner 2.8s ease-in-out infinite;
}

.hero-quantum__bar-zero {
  transform-origin: -54px 0;
  animation: hero-bar-zero 4s ease-in-out infinite;
}

.hero-quantum__bar-one {
  transform-origin: 54px 0;
  animation: hero-bar-one 4s ease-in-out infinite;
}

@keyframes hero-orbit {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes hero-ring-pulse {
  0%,
  100% {
    opacity: 0.25;
  }

  50% {
    opacity: 0.55;
  }
}

@keyframes hero-wave {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: -120;
  }
}

@keyframes hero-halo {
  0%,
  100% {
    opacity: 0.55;
    transform: scale(0.92);
  }

  50% {
    opacity: 1;
    transform: scale(1.08);
  }
}

@keyframes hero-core {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.9;
  }

  50% {
    transform: scale(1.12);
    opacity: 1;
  }
}

@keyframes hero-core-inner {
  0%,
  100% {
    opacity: 0.85;
  }

  50% {
    opacity: 0.35;
  }
}

@keyframes hero-bar-zero {
  0%,
  100% {
    transform: scaleX(0.5);
    opacity: 0.75;
  }

  50% {
    transform: scaleX(1);
    opacity: 1;
  }
}

@keyframes hero-bar-one {
  0%,
  100% {
    transform: scaleX(1);
    opacity: 1;
  }

  50% {
    transform: scaleX(0.5);
    opacity: 0.75;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-quantum__orbit--a,
  .hero-quantum__orbit--b,
  .hero-quantum__orbit--c,
  .hero-quantum__ring-spin-slow,
  .hero-quantum__ring-pulse,
  .hero-quantum__wave,
  .hero-quantum__halo,
  .hero-quantum__core,
  .hero-quantum__core-inner,
  .hero-quantum__bar-zero,
  .hero-quantum__bar-one {
    animation: none;
  }
}
</style>
