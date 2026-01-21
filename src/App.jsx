import { useEffect, useState } from "react";
import { motion } from "framer-motion";


const TEST_MODE = false; // 🔁 set to false for her final experience
const REAL_BIRTHDAY = new Date("2026-01-21T18:00:00");
const TEST_BIRTHDAY = new Date("2026-01-21T16:11:00"); // you can change freely
const DOB = new Date("2007-01-22T22:58:05")
const TOGETHER_DATE = new Date("2025-11-05T00:59:35");

const BIRTHDAY = TEST_MODE ? TEST_BIRTHDAY : REAL_BIRTHDAY;



function TimeBlock({ label, value }) {
  return (
    <div
      style={{
        backgroundColor: "#fde7f0",
        padding: "10px",
        borderRadius: "12px",
        textAlign: "center",
        minWidth: "70px",
      }}
    >
      <div
        style={{
          fontSize: "20px",
          fontWeight: "600",
          fontFamily: "Poppins",
          color: "#9d174d",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "11px",
          opacity: 0.75,
          marginTop: "2px",
          fontFamily: "Poppins",
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* =====================================================
   MAIN APP
   ===================================================== */
export default function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [screen, setScreen] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [together, setTogether] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })


  const motifs = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: Math.random() * 14 + 6, // 6px – 20px
    left: Math.random() * 100, // %
    top: Math.random() * 2200, // %
    delay: Math.random() * 8,
  }));

  const letterText = `
    Happy Birthday Mummy 🎂💖,

      I love you so much, Blessy ❤️
      I can’t even find words to express how deeply I love you, ani. You mean the world to me 🌍✨

      I wish you all the happiness, peace, and blessings always 🌸
      You are not alone, babe — I am there for you, sarey na 🤍
      Try to depend on me. Let’s stick together and overcome all the madness and chaos, hand in hand 🤝✨

      The way we think may be different, but never opposite.
      This year, I want you to come out of your shell, walk with confidence, and smile freely 😊✨
      Have the courage to fight all your insecurities, guilt, and regrets.
      Don’t let chaos enter you, sarey na 💫

      Let’s get married 💍
      Let’s have kids 👶
      Let’s explore the world together 🌍✈️
      And let’s grow together in God as well 🙏❤️

      Loving you has never been a pressure for me.
      It was my choice — and I would choose you over and over again 💞
      Each moment, every laugh, every kiss, every hug…
      Everything somehow made sense because it was with you 🤍

      This isn’t just a birthday message.
      This is me choosing you — today, tomorrow, and in all the little moments in between 💕

      I love you, Blessy ❤️
      Have a blessed and beautiful year ahead 🌼✨

      Always yours,
      Enosh ❤️
    `;

  const [openLetter, setOpenLetter] = useState(false);



  /* Handle resize */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Countdown logic */
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = BIRTHDAY - now;

      if (diff <= 0) {
        setIsUnlocked(true);
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
          hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
          minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
          seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      let years = now.getFullYear() - DOB.getFullYear();
      let months = now.getMonth() - DOB.getMonth();
      let days = now.getDate() - DOB.getDate();
      let hours = now.getHours() - DOB.getHours();
      let minutes = now.getMinutes() - DOB.getMinutes();
      let seconds = now.getSeconds() - DOB.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }

      if (minutes < 0) {
        minutes += 60;
        hours--;
      }

      if (hours < 0) {
        hours += 24;
        days--;
      }

      if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += prevMonth;
        months--;
      }

      if (months < 0) {
        months += 12;
        years--;
      }

      setAge({ years, months, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      let years = now.getFullYear() - TOGETHER_DATE.getFullYear();
      let months = now.getMonth() - TOGETHER_DATE.getMonth();
      let days = now.getDate() - TOGETHER_DATE.getDate();
      let hours = now.getHours() - TOGETHER_DATE.getHours();
      let minutes = now.getMinutes() - TOGETHER_DATE.getMinutes();
      let seconds = now.getSeconds() - TOGETHER_DATE.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }

      if (minutes < 0) {
        minutes += 60;
        hours--;
      }

      if (hours < 0) {
        hours += 24;
        days--;
      }

      if (days < 0) {
        const prevMonthDays = new Date(
          now.getFullYear(),
          now.getMonth(),
          0
        ).getDate();
        days += prevMonthDays;
        months--;
      }

      if (months < 0) {
        months += 12;
        years--;
      }

      setTogether({ years, months, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  /* =====================================================
     SCREEN 1 — COUNTDOWN
     ===================================================== */
  if (screen === 1) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#fde7f0",
          display: "flex",
          justifyContent: "center",
          alignItems: isMobile ? "flex-start" : "center",
          paddingTop: isMobile ? "80px" : "0",
          paddingLeft: "12px",
          paddingRight: "12px",
        }}
      >
        {!isUnlocked ? (
          <div
            style={{
              backgroundColor: "#fff0f6",
              padding: "16px",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              maxWidth: isMobile ? "320px" : "700px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontFamily: "Playfair Display",
                fontSize: isMobile ? "22px" : "32px",
                lineHeight: "1.3",
                color: "#9d174d",
                marginBottom: "16px",
              }}
            >
              Something special is waiting for you ❤️
            </h1>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2, 1fr)"
                  : "repeat(4, 1fr)",
                gap: isMobile ? "10px" : "18px",
                justifyItems: "center",
              }}
            >
              <TimeBlock label="Days" value={timeLeft.days} />
              <TimeBlock label="Hours" value={timeLeft.hours} />
              <TimeBlock label="Minutes" value={timeLeft.minutes} />
              <TimeBlock label="Seconds" value={timeLeft.seconds} />
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontFamily: "Playfair Display",
                fontSize: "32px",
                color: "#9d174d",
                marginBottom: "24px",
              }}
            >
              Happy Birthday, my Love 🎂💖
            </h1>

            <button
              onClick={() => setScreen(2)}
              style={{
                fontFamily: "Poppins",
                padding: "12px 28px",
                borderRadius: "999px",
                border: "none",
                backgroundColor: "#ec4899",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    );
  }

  /* =====================================================
     SCREEN 2 — GENTLE SURPRISE
     ===================================================== */
  if (screen === 2) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#fde7f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "360px" }}>
          <h1
            style={{
              fontFamily: "Playfair Display",
              fontSize: "28px",
              color: "#9d174d",
              marginBottom: "16px",
            }}
          >
            I made something just for you, out of Love. ❤
          </h1>

          <p
            style={{
              fontFamily: "Poppins",
              fontSize: "16px",
              color: "#6b213e",
              marginBottom: "28px",
            }}
          >
            I can't imagine, what I would have been without you, Darling.
          </p>

          <button
            onClick={() => setScreen(3)}
            style={{
              fontFamily: "Poppins",
              padding: "12px 30px",
              borderRadius: "999px",
              border: "none",
              backgroundColor: "#ec4899",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  /* =====================================================
   SCREEN 3 — HER AGE IN TIME
   ===================================================== */
  if (screen === 3) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#fde7f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff0f6",
            padding: "20px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            maxWidth: "420px",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontFamily: "Playfair Display",
              fontSize: "28px",
              color: "#9d174d",
              marginBottom: "18px",
            }}
          >
            Today, you are…
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(2, 1fr)"
                : "repeat(3, 1fr)",
              gap: "14px",
              marginBottom: "28px",
              justifyItems: "center",
            }}
          >
            <TimeBlock label="Years" value={age.years} />
            <TimeBlock label="Months" value={age.months} />
            <TimeBlock label="Days" value={age.days} />
            <TimeBlock label="Hours" value={age.hours} />
            <TimeBlock label="Minutes" value={age.minutes} />
            <TimeBlock label="Seconds" value={age.seconds} />
          </div>


          <button
            onClick={() => setScreen(4)}
            style={{
              fontFamily: "Poppins",
              padding: "12px 30px",
              borderRadius: "999px",
              border: "none",
              backgroundColor: "#ec4899",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Next →
          </button>
        </div>
      </div>
    );
  }

  /* =====================================================
   SCREEN 4 — WE'VE BEEN TOGETHER
   ===================================================== */
  if (screen === 4) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#fde7f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff0f6",
            padding: "20px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            maxWidth: "420px",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontFamily: "Playfair Display",
              fontSize: "28px",
              color: "#9d174d",
              marginBottom: "20px",
            }}
          >
            We’ve been together for…
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(2, 1fr)"
                : "repeat(3, 1fr)",
              gap: "14px",
              marginBottom: "22px",
              justifyItems: "center",
            }}
          >
            <TimeBlock label="Years" value={together.years} />
            <TimeBlock label="Months" value={together.months} />
            <TimeBlock label="Days" value={together.days} />
            <TimeBlock label="Hours" value={together.hours} />
            <TimeBlock label="Minutes" value={together.minutes} />
            <TimeBlock label="Seconds" value={together.seconds} />
          </div>


          <div
            style={{
              fontFamily: "Playfair Display",
              fontSize: "24px",
              color: "#9d174d",
              marginTop: "24px",
            }}
          >
            ∞ Forever
          </div>

          <button
            onClick={() => setScreen(5)}
            style={{
              marginTop: "28px",
              fontFamily: "Poppins",
              padding: "12px 30px",
              borderRadius: "999px",
              border: "none",
              backgroundColor: "#ec4899",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Next →
          </button>
        </div>
      </div>
    );
  }


  /* =====================================================
   SCREEN 5 — OUR JOURNEY (FINAL CINEMATIC)
   ===================================================== */
  if (screen === 5) {
    const memories = [
      { image: "/photos/1.jpeg", caption: "Some moments just stayed", align: "center" },
      { image: "/photos/2.jpeg", caption: "Smiles came naturally", align: "left" },
      { image: "/photos/3.jpeg", caption: "This felt like home", align: "right" },
      { image: "/photos/4.jpeg", caption: "A quiet kind of happiness", align: "center" },
      { image: "/photos/5.jpeg", caption: "Unplanned but perfect", align: "left" },
      { image: "/photos/6.jpg", caption: "Time slowed down here", align: "right" },
      { image: "/photos/1.jpeg", caption: "Some moments just stayed", align: "center" },
      { image: "/photos/2.jpeg", caption: "Smiles came naturally", align: "left" },
      { image: "/photos/3.jpeg", caption: "This felt like home", align: "right" },
      { image: "/photos/4.jpeg", caption: "A quiet kind of happiness", align: "center" },
      { image: "/photos/5.jpeg", caption: "Unplanned but perfect", align: "left" },
      { image: "/photos/6.jpg", caption: "Time slowed down here", align: "right" },
      { image: "/photos/1.jpeg", caption: "Some moments just stayed", align: "center" },
      { image: "/photos/2.jpeg", caption: "Smiles came naturally", align: "left" },
      { image: "/photos/3.jpeg", caption: "This felt like home", align: "right" },
      { image: "/photos/4.jpeg", caption: "A quiet kind of happiness", align: "center" },
      { image: "/photos/5.jpeg", caption: "Unplanned but perfect", align: "left" },
      { image: "/photos/6.jpg", caption: "Time slowed down here", align: "right" },
      // continue till 18 if you want
    ];


    const alignmentStyle = (align) => {
      if (align === "left") return { marginLeft: "0", marginRight: "auto" };
      if (align === "right") return { marginLeft: "auto", marginRight: "0" };
      return { margin: "0 auto" };
    };

    const imageWidth = (align) =>
      align === "center" ? "40%" : "40%";

    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#fde7f0",
          padding: "60px 20px 100px",
        }}
      >
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            fontFamily: "Playfair Display",
            fontSize: "30px",
            color: "#9d174d",
            textAlign: "center",
            marginBottom: "90px",
          }}
        >
          Our Journey 💕
        </motion.h1>

        {/* MEMORIES */}
        {memories.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            style={{
              ...alignmentStyle(item.align),
              maxWidth: imageWidth(item.align),
              marginBottom: "140px",
            }}
          >
            {/* FRAME */}
            <div
              style={{
                backgroundColor: "#fff0f6",
                padding: "16px",
                borderRadius: "26px",
                boxShadow: "0 14px 35px rgba(0,0,0,0.12)",
              }}
            >
              <img
                src={item.image}
                alt=""
                loading="lazy"
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  borderRadius: "20px",
                  display: "block",
                }}
              />
            </div>

            {/* CAPTION */}
            <p
              style={{
                fontFamily: "Playfair Display",
                fontSize: "24px",
                color: "#6b213e",
                textAlign: "center",
                marginTop: "22px",
                opacity: 0.9,
                padding: "0 0px",
              }}
            >
              {item.caption}
            </p>
          </motion.div>
        ))}


        {/* FLOATING LOVE MOTIFS */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "1800%",
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          {motifs.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0.2, y: 20 }}
              animate={{ opacity: 0.8, y: -40 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: m.delay,
              }}
              style={{
                position: "absolute",
                left: `${m.left}%`,
                top: `${m.top}%`,
                width: m.size,
                height: m.size,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(236,72,153,0.6), rgba(236,72,153,0.1))",
                filter: "blur(1px)",
              }}
            />
          ))}
        </div>



        {/* NEXT BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setScreen(6)}
          style={{
            display: "block",
            margin: "0 auto",
            fontFamily: "Poppins",
            padding: "14px 40px",
            borderRadius: "999px",
            border: "none",
            backgroundColor: "#ec4899",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Next →
        </motion.button>
      </div>
    );
  }


  /* =====================================================
   SCREEN 6 — MY CONFESSION (VIDEO)
   ===================================================== */
  if (screen === 6) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #2a0f1f, #000)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            width: "100%",
            maxWidth: "900px",
            textAlign: "center",
          }}
        >
          {/* TEXT */}
          <p
            style={{
              fontFamily: "Playfair Display",
              fontSize: "22px",
              color: "#f8c7da",
              marginBottom: "24px",
              opacity: 0.9,
            }}
          >
            This is me, speaking from my heart.
          </p>

          {/* VIDEO FRAME */}
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%", // 16:9
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(236,72,153,0.35)",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/BgBPhSJwt1k?rel=0&modestbranding=1&controls=1"
              title="My Confession"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>

          {/* NEXT BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setScreen(7)}
            style={{
              marginTop: "36px",
              fontFamily: "Poppins",
              padding: "14px 40px",
              borderRadius: "999px",
              border: "none",
              backgroundColor: "#ec4899",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Next →
          </motion.button>
        </motion.div>
      </div>
    );
  }


  /* =====================================================
   SCREEN 7 — THE LETTER
   ===================================================== */
  if (screen === 7) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #fde7f0, #fff)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px",
        }}
      >
        {!openLetter ? (
          /* CLOSED LETTER */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setOpenLetter(true)}
            style={{
              width: "260px",
              height: "180px",
              backgroundColor: "#fff0f6",
              borderRadius: "16px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            {/* Wiggle */}
            <motion.div
              animate={{ rotate: [0, -1, 1, -1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                inset: 0,
              }}
            />

            <p
              style={{
                fontFamily: "Playfair Display",
                fontSize: "18px",
                color: "#9d174d",
                zIndex: 1,
              }}
            >
              Tap to open 💌
            </p>
          </motion.div>
        ) : (
          /* OPEN LETTER */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              backgroundColor: "#fff",
              maxWidth: "700px",
              width: "100%",
              padding: "40px 32px",
              borderRadius: "20px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
              textAlign: "center"
            }}
          >
            <p
              style={{
                fontFamily: "Playfair Display",
                fontSize: "20px",
                lineHeight: "1.8",
                color: "#4a1c2f",
                whiteSpace: "pre-line",
              }}
            >
              {letterText}
            </p>
          </motion.div>
        )}
      </div>
    );
  }



  /* Placeholder for next screens */
  return null;
}
