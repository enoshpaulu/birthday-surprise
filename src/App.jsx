import { useEffect, useState } from "react";

function TimeBlock({ label, value }) {
  return (
    <div
      style={{
        backgroundColor: "#fde7f0",
        padding: "14px 18px",
        borderRadius: "14px",
        textAlign: "center",
        minWidth: "90px",
      }}
    >
      <div
        style={{
          fontSize: "26px",
          fontWeight: "600",
          fontFamily: "Poppins",
          color: "#9d174d",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "12px",
          opacity: 0.75,
          marginTop: "4px",
          fontFamily: "Poppins",
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ---------------- MAIN APP ---------------- */
export default function App() {
  /* 🔴 CHANGE THIS TO HER REAL BIRTHDAY */
  const birthday = new Date("2026-01-22T00:00:00");

  const [timeLeft, setTimeLeft] = useState({});
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  /* 🔹 Handle screen resize */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* 🔹 Countdown logic */
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = birthday - now;

      if (diff <= 0) {
        setIsUnlocked(true);
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#fde7f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}
    >
      {!isUnlocked ? (
        <div
          style={{
            backgroundColor: "#fff0f6",
            padding: "24px",
            borderRadius: "22px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            maxWidth: isMobile ? "360px" : "700px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "Playfair Display",
              fontSize: isMobile ? "26px" : "32px",
              lineHeight: "1.3",
              color: "#9d174d",
              marginBottom: "24px",
            }}
          >
            Something special is waiting for you ❤️
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(2, 1fr)" // 📱 mobile
                : "repeat(4, 1fr)", // 🖥 desktop
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
        <h1
          style={{
            fontFamily: "Playfair Display",
            fontSize: "36px",
            color: "#9d174d",
            textAlign: "center",
          }}
        >
          Happy Birthday 🎂💖
        </h1>
      )}
    </div>
  );
}
