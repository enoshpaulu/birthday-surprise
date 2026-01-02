import { useEffect, useState } from "react";

/* =====================================================
   🔐 MASTER SWITCH — YOU CONTROL THIS
   ===================================================== */
const TEST_MODE = false; // 🔁 set to false for her final experience

/* 🎂 REAL & TEST DATES */
const REAL_BIRTHDAY = new Date("2026-01-22T00:00:00");
const TEST_BIRTHDAY = new Date("2026-01-02T21:02:00"); // you can change freely
const DOB = new Date("2007-01-22T00:00:00")
const TOGETHER_DATE = new Date("2025-11-05T00:59:35");

const BIRTHDAY = TEST_MODE ? TEST_BIRTHDAY : REAL_BIRTHDAY;

/* =====================================================
   TIME BLOCK COMPONENT
   ===================================================== */
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
            Take your time.  
            This was made with a lot of love.
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


  /* Placeholder for next screens */
  return null;
}
