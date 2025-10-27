import "../stylesheets/About.css";
import ComponentSvg from "../assets/Component.svg";
import OneSvg from "../assets/1.svg";
import Member1 from "../assets/Member1.webp";
import Member2 from "../assets/Member2.webp";
import Member3 from "../assets/Member3.webp";
import Member4 from "../assets/Member4.webp";
import Member5 from "../assets/Member5.webp";
import Danya from "../assets/Danya.webp";
import Tygo from "../assets/Tygo.jpg";
import Obaid from "../assets/Obaid.jpg";
import BlackTeamLead from "../assets/Ian.jpg";
import { useEffect, memo } from "react";

// TeamMember component for better performance
const TeamMember = memo(
  ({ member, isTeamLead }: { member: any; isTeamLead: boolean }) => {
    return (
      <div
        className={`member-card ${isTeamLead ? "cv-lead" : ""}`}
        key={member.id}
      >
        <div className="member-image">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              decoding="async"
              width="150"
              height="150"
            />
          ) : (
            <div className="placeholder-image" aria-label={member.name}>
              {member.placeholderInitials || member.name.charAt(0)}
            </div>
          )}
        </div>
        <h3 className="name">{member.name}</h3>
        {!isTeamLead && member.role && <p className="role">{member.role}</p>}
      </div>
    );
  }
);

TeamMember.displayName = "TeamMember";

function About() {
  // Define leadership levels used for the executive rows
  const LEADERSHIP_LEVELS = {
    PRESIDENT: "president",
    CO_FOUNDER: "co-founder",
    VP: "vp",
  };

  // Executives (President / Co-founders / VPs)
  const execs = [
    {
      id: "exec-1",
      name: "Ali Elgalad",
      role: "President (Co-Founder)",
      image: Member1,
      level: LEADERSHIP_LEVELS.PRESIDENT,
    },
    {
      id: "exec-2",
      name: "Aly Ashour",
      role: "Co-Founder",
      image: Member3,
      level: LEADERSHIP_LEVELS.CO_FOUNDER,
    },
    {
      id: "exec-3",
      name: "Hamza Elkababji",
      role: "Co-Founder",
      image: Member4,
      level: LEADERSHIP_LEVELS.CO_FOUNDER,
    },
    {
      id: "exec-4",
      name: "Ethan Greene",
      role: "VP Finance",
      image: Member2,
      level: LEADERSHIP_LEVELS.VP,
    },
    {
      id: "exec-5",
      name: "Danya Abbas",
      role: "VP Comms",
      image: Danya,
      level: LEADERSHIP_LEVELS.VP,
    },
    {
      id: "exec-6",
      name: "Dev",
      role: "VP Education",
      // no image provided yet
      placeholderInitials: "D",
      level: LEADERSHIP_LEVELS.VP,
    },
  ];

  // Teams and their leads (supports multiple leads per team)
  const teams = [
    {
      id: "perception",
      title: "Perception",
      leads: [
        {
          id: "lead-tygo",
          name: "Tygo Crawley",
          role: "Perception Lead",
          image: Tygo,
        },
        {
          id: "lead-ian",
          name: "Ian Patrick Tan",
          role: "Perception Lead",
          image: BlackTeamLead,
        },
      ],
    },
    {
      id: "mapping",
      title: "Mapping & Localization",
      leads: [
        {
          id: "lead-zain",
          name: "Zain Syed",
          role: "Mapping & Localization Lead",
          image: Member5,
        },
        {
          id: "lead-ben",
          name: "Benjamin Namayandeh",
          role: "Mapping & Localization Lead",
          // no image provided yet
          placeholderInitials: "B",
        },
      ],
    },
    {
      id: "planning",
      title: "Planning & Control",
      leads: [
        {
          id: "lead-aly",
          name: "Aly Ashour",
          role: "Planning & Control Lead",
          image: Member3,
        },
        {
          id: "lead-obaid",
          name: "Obaid Mohiuddin",
          role: "Planning & Control Lead",
          image: Obaid,
        },
      ],
    },
    {
      id: "web",
      title: "Web",
      leads: [
        {
          id: "lead-kierstin",
          name: "Kierstin Griffith",
          role: "Web Lead",
          // no image provided yet
          placeholderInitials: "K",
        },
      ],
    },
  ];

  // teamSection is managed by intersection observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const memberCards = document.querySelectorAll(".member-card");
    memberCards.forEach((card) => {
      observer.observe(card);
    });
    return () => {
      memberCards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  return (
    <div className="about-container">
      <div className="background-decoration">
        <img src={ComponentSvg} alt="" className="bg-svg component-svg" />
        <img src={OneSvg} alt="" className="bg-svg one-svg" />
      </div>

      <div className="about-content">
        <div className="cards-container">{/* reserved for future cards */}</div>

        <div className="Members-container">
          <div className="about-title">
            <h1>Meet Our Team</h1>
          </div>

          <div className="team-tree">
            {/* Top level - President */}
            <div className="tree-level level-1">
              {execs
                .filter((m) => m.level === LEADERSHIP_LEVELS.PRESIDENT)
                .map((member) => (
                  <TeamMember
                    key={member.id}
                    member={member}
                    isTeamLead={false}
                  />
                ))}
            </div>

            {/* Second level - Co-Founders */}
            <div className="tree-level level-2">
              {execs
                .filter((m) => m.level === LEADERSHIP_LEVELS.CO_FOUNDER)
                .map((member) => (
                  <TeamMember
                    key={member.id}
                    member={member}
                    isTeamLead={false}
                  />
                ))}
            </div>

            {/* Third level - VPs */}
            <div className="tree-level level-3">
              {execs
                .filter((m) => m.level === LEADERSHIP_LEVELS.VP)
                .map((member) => (
                  <TeamMember
                    key={member.id}
                    member={member}
                    isTeamLead={false}
                  />
                ))}
            </div>

            {/* Team leads grouped by team (supports multiple leads per team) */}
            <div className="team-leads">
              {teams.map((team) => (
                <div key={team.id} className="team-section">
                  <h2
                    style={{
                      textAlign: "center",
                      marginBottom: "1rem",
                      color: "#e1e1e1",
                    }}
                  >
                    {`${team.title} leads`}
                  </h2>
                  <div
                    className="tree-level level-4"
                    aria-label={`${team.title} Leads`}
                  >
                    {team.leads.map((lead: any) => (
                      <TeamMember
                        key={lead.id}
                        member={lead}
                        isTeamLead={true}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export as memoized component for performance
export default memo(About);
