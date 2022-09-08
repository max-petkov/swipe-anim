function animationSwipe() {
  const hand = document.querySelector(".svg-swipe__hand");
  const playBtn = document.querySelector(".svg-swipe__play-btn.is-visible");
  const playBtnContainer = document.querySelector(".svg-swipe__play-btn-container");
  const playBtnHidden = document.querySelector(
    ".svg-swipe__play-btn.is-hidden"
  );
  const clonePlayBtn = () => {
    const clone = playBtnHidden.cloneNode(true);
    clone.classList.add("is-clone");
    playBtnContainer.appendChild(clone);
  };

  handAnimation();

  function handAnimation() {
    let isAnimationTriggered = false;

    const tl = gsap.timeline({
      repeat: -1,
    });

    tl.set(hand, {
      willChange: "transform",
      transformOrigin: "100% 100%",
      delay: () => {
        if (!isAnimationTriggered) {
          isAnimationTriggered = true;
          return 0.5;
        }

        return 1.5;
      },
    })
      .to(hand, {
        rotate: -65,
        x: -12,
        duration: 0.8,
        ease: "Power1.easeOut",
        onStart: () => clonePlayBtn(),
        onComplete: () => playBtnAnimation(),
      })
      .to(hand, {
        rotate: 0,
        x: 0,
        //   duration: 0.4,
        //   ease: "ease",
        duration: 0.4,
        ease: Back.easeOut.config(0.6),
      })
      .set(hand, { willChange: "auto" });
  }

  function playBtnAnimation() {
    const duration = 0.4;
    const playBtn = document.querySelector(".svg-swipe__play-btn.is-visible");
    const playBtnClone = document.querySelector(
      ".svg-swipe__play-btn.is-clone.is-hidden"
    );
    const tl = gsap.timeline({
      delay: 0.05,
    });

    tl.set(playBtn, { willChange: "transform" })
      .to(playBtn, {
        yPercent: () => {
          if (playBtn.classList.contains("is-clone")) return -400;
          else return -200;
        },
        duration: duration,
        onComplete: () => playBtn.remove(),
      })
      .to(
        playBtnClone,
        {
          yPercent: -190,
          duration: duration,
          ease: Back.easeOut.config(0.4),
          onComplete: () => {
            playBtnClone.classList.remove("is-hidden");
            playBtnClone.classList.add("is-visible");
          },
        },
        "0"
      )
      .set(playBtn, { willChange: "auto" });
  }
}

animationSwipe();
