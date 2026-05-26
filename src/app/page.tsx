import Image from "next/image";

import styles from "./page.module.css";

/**
 * Homepage 1:1 with legacy lovehope.org.tw/index.html:
 *
 *   header (title + nav)   ← layout.tsx / Header.tsx
 *   carousel (1000×400, 8 images)
 *     + title.png overlay  at top:394 left:381
 *     + 多多logo overlay  at top:102 left:687
 *   80px spacer
 *   bottom2.png decoration
 *   footer (contact info) ← layout.tsx / Footer.tsx
 *
 * Carousel rotates with CSS @keyframes (5 s per slide, 40 s cycle),
 * matching the legacy jQuery behaviour without shipping JS.
 */

interface Slide {
  src: string;
  alt: string;
  href?: string;
  external?: boolean;
}

const SLIDES: ReadonlyArray<Slide> = [
  { src: "/legacy/index/11月陪伴力量大.jpg", alt: "11 月陪伴力量大" },
  { src: "/legacy/index/七月陪伴力量大.jpg", alt: "7 月陪伴力量大" },
  { src: "/legacy/index/三月陪伴力量大.jpg", alt: "3 月陪伴力量大" },
  { src: "/legacy/index/二月陪伴力量大.jpg", alt: "2 月陪伴力量大" },
  {
    src: "/legacy/index/威宏紅包袋.jpg",
    alt: "奇蹟新家園擴建計畫 — 威宏紅包袋",
    href: "/news",
  },
  {
    src: "/legacy/index/美濃文創中心.jpg",
    alt: "美濃文創中心",
    href: "https://www.facebook.com/LoveHopeYLC/",
    external: true,
  },
  {
    src: "/legacy/index/首頁_伯利恆完成.jpg",
    alt: "伯利恆早療暨融合教育中心完工實景",
    href: "/news",
  },
  {
    src: "/legacy/index/首頁_傳愛.jpg",
    alt: "伯利恆落成 — 傳愛",
    href: "/news",
  },
];

function SlideCell({ slide }: { slide: Slide }) {
  const img = (
    <Image
      className={styles.cellImg}
      src={slide.src}
      alt={slide.alt}
      width={1000}
      height={400}
      priority
    />
  );
  if (!slide.href) {
    return <div className={styles.cell}>{img}</div>;
  }
  if (slide.external) {
    return (
      <a
        href={slide.href}
        target="_blank"
        rel="noreferrer noopener"
        className={styles.cell}
      >
        {img}
      </a>
    );
  }
  return (
    <a href={slide.href} className={styles.cell}>
      {img}
    </a>
  );
}

export default function HomePage() {
  return (
    <>
      <section className={styles.hero} aria-label="主視覺輪播">
        <div className={styles.carousel}>
          <div className={styles.strip}>
            {SLIDES.map((slide) => (
              <SlideCell key={slide.src} slide={slide} />
            ))}
          </div>
        </div>
        <Image
          className={`${styles.overlay} ${styles.overlayTitle}`}
          src="/legacy/index/title.png"
          alt=""
          width={277}
          height={120}
          priority
        />
        <Image
          className={`${styles.overlay} ${styles.overlayLogo}`}
          src="/legacy/index/多多logo_single.png"
          alt=""
          width={275}
          height={275}
          priority
        />
      </section>
    </>
  );
}
