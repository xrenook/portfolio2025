import { useEffect, useState, useRef } from "react";
import MagneticButton from "./ui/MagneticButton";
import "./Contact.scss";

const Contact = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<{
    temp: number;
    condition: string;
  } | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Fetch Melbourne weather
    const fetchWeather = async () => {
      try {
        // Using Open-Meteo API (free, no API key required)
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-37.8136&longitude=144.9631&current=temperature_2m,weather_code&timezone=Australia/Melbourne"
        );
        const data = await response.json();

        const weatherCodes: { [key: number]: string } = {
          0: "Clear",
          1: "Mainly Clear",
          2: "Partly Cloudy",
          3: "Overcast",
          45: "Foggy",
          48: "Foggy",
          51: "Drizzle",
          61: "Rain",
          80: "Rain Showers",
          95: "Thunderstorm",
        };

        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: weatherCodes[data.current.weather_code] || "Unknown",
        });
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      }
    };

    fetchWeather();
    // Refresh weather every 10 minutes
    const weatherTimer = setInterval(fetchWeather, 600000);

    // IntersectionObserver for pie chart animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      const charts = statsRef.current.querySelectorAll(".pie-chart");
      charts.forEach((chart) => observer.observe(chart));
    }

    return () => {
      clearInterval(timer);
      clearInterval(weatherTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-number">05</span>
          <h2>CONNECT</h2>
        </div>

        <div className="contact-content">
          <h3>LET'S BUILD SOMETHING AMAZING</h3>

          <div className="email-container">
            <MagneticButton strength={50}>
              <a href="mailto:sendtoxren@gmail.com" className="email-link">
                SENDTOXREN@GMAIL.COM
              </a>
            </MagneticButton>
          </div>

          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/xiang-ren-538737108/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <span className="bracket">[</span>
              LinkedIn
              <span className="bracket">]</span>
            </a>
            <a
              href="https://github.com/xrenook"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <span className="bracket">[</span>
              GitHub
              <span className="bracket">]</span>
            </a>
          </div>

          <div className="footer-status">
            <div className="status-dot"></div>
            <span>
              XIANG REN // 2025 // INSPIRED BY OVERWATCH // POWERED BY GENIMI
            </span>
          </div>
          {/* Build Stats Section */}
          <div className="build-stats" ref={statsRef}>
            <h4>HOW THIS PORTFOLIO WAS BUILT</h4>
            <div className="stats-container">
              {/* Code Breakdown Chart */}
              <div className="chart-group">
                <h5 className="chart-title">CODE BREAKDOWN</h5>
                <div className="pie-chart-container">
                  <svg viewBox="0 0 200 200" className="pie-chart">
                    {/* Background circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="rgba(0, 0, 0, 0.1)"
                      strokeWidth="40"
                    />
                    {/* AI Segment - 70% */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="var(--accent-orange)"
                      strokeWidth="40"
                      strokeDasharray="502.65 502.65"
                      strokeDashoffset="0"
                      transform="rotate(-90 100 100)"
                      className="pie-segment ai-segment"
                    />
                    {/* Hand-coded Segment - 30% */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#4a90e2"
                      strokeWidth="40"
                      strokeDasharray="150.79 502.65"
                      strokeDashoffset="-351.86"
                      transform="rotate(-90 100 100)"
                      className="pie-segment code-segment"
                    />
                    {/* Center circle */}
                    <circle cx="100" cy="100" r="60" fill="var(--bg-color)" />
                    <text
                      x="100"
                      y="100"
                      textAnchor="middle"
                      className="chart-label-main"
                      fill="var(--text-color)"
                    >
                      CODE
                    </text>
                  </svg>
                </div>
                <div className="stats-legend">
                  <div className="legend-item">
                    <div className="legend-color ai-color"></div>
                    <div className="legend-text">
                      <span className="legend-percentage">70%</span>
                      <span className="legend-label">Vibe-Coding</span>
                    </div>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color code-color"></div>
                    <div className="legend-text">
                      <span className="legend-percentage">30%</span>
                      <span className="legend-label">Hand-Coded</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Cost Chart */}
              <div className="chart-group">
                <h5 className="chart-title">TIME COST</h5>
                <div className="pie-chart-container">
                  <svg viewBox="0 0 200 200" className="pie-chart">
                    {/* Background circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="rgba(0, 0, 0, 0.1)"
                      strokeWidth="40"
                    />
                    {/* AI Time - 50% */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="var(--accent-orange)"
                      strokeWidth="40"
                      strokeDasharray="502.65 502.65"
                      strokeDashoffset="0"
                      transform="rotate(-90 100 100)"
                      className="pie-segment ai-segment"
                    />
                    {/* Hand-coded Time - 50% */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#4a90e2"
                      strokeWidth="40"
                      strokeDasharray="251.33 502.65"
                      strokeDashoffset="-251.33"
                      transform="rotate(-90 100 100)"
                      className="pie-segment code-segment"
                    />
                    {/* Center circle */}
                    <circle cx="100" cy="100" r="60" fill="var(--bg-color)" />
                    <text
                      x="100"
                      y="95"
                      textAnchor="middle"
                      className="chart-label-main"
                      fill="var(--text-color)"
                    >
                      4 HRS
                    </text>
                    <text
                      x="100"
                      y="110"
                      textAnchor="middle"
                      className="chart-label-sub"
                      fill="rgba(0, 0, 0, 0.5)"
                    >
                      TOTAL
                    </text>
                  </svg>
                </div>
                <div className="stats-legend">
                  <div className="legend-item">
                    <div className="legend-color ai-color"></div>
                    <div className="legend-text">
                      <span className="legend-percentage">50%</span>
                      <span className="legend-label">AI Time</span>
                    </div>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color code-color"></div>
                    <div className="legend-text">
                      <span className="legend-percentage">50%</span>
                      <span className="legend-label">Manual Time</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box - Bottom Left */}
      <div className="info-box">
        <div className="info-item">
          <span className="info-label">LOCAL TIME</span>
          <span className="info-value">
            {time.toLocaleTimeString("en-AU", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
          </span>
        </div>
        <div className="info-divider"></div>
        <div className="info-item">
          <span className="info-label">MELBOURNE</span>
          <span className="info-value">
            {weather
              ? `${weather.temp}°C • ${weather.condition}`
              : "Loading..."}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
