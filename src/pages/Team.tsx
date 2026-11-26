import { useSearchParams } from "react-router-dom";
import { groups, type GroupId } from "../content/team";
import { teamPage } from "../content/pages";
import { DetectionLabel, FilterPills, Note, PhotoFrame, SectionHeading } from "../components/design-system";
import { PersonCard } from "../components/PersonCard";
import { peopleByGroupOrder, peopleInGroup } from "../lib/team";
import { usePageMeta } from "../hooks/usePageMeta";
import "./Team.css";

type Filter = "all" | GroupId;

export function Team() {
  usePageMeta(teamPage.title, teamPage.lead);
  const [params, setParams] = useSearchParams();
  const requested = params.get("group");
  const filter: Filter = groups.some((g) => g.id === requested) ? (requested as GroupId) : "all";

  const options = [
    { id: "all" as Filter, label: teamPage.allTab, count: peopleByGroupOrder().length },
    ...groups.map((g) => ({ id: g.id as Filter, label: g.label, count: peopleInGroup(g.id).length })),
  ];

  const shown = filter === "all" ? peopleByGroupOrder() : peopleInGroup(filter);

  const setFilter = (id: Filter) => {
    const next = new URLSearchParams(params);
    if (id === "all") next.delete("group");
    else next.set("group", id);
    setParams(next, { replace: true });
  };

  return (
    <div className="page container team-page">
      <div className="team-page__intro">
        <SectionHeading level="h1" title={teamPage.title} lead={teamPage.lead} />
        <figure className="team-page__photo">
          <DetectionLabel label={teamPage.photoLabel}>
            <PhotoFrame src={teamPage.photo.src} alt={teamPage.photo.alt} eager sizes="(min-width: 960px) 55vw, 100vw" />
          </DetectionLabel>
          <figcaption>
            <Note arrow="up-left">{teamPage.photoNote}</Note>
          </figcaption>
        </figure>
      </div>

      <section aria-labelledby="people-title">
        <h2 id="people-title" className="visually-hidden">
          {teamPage.filterLabel}
        </h2>
        <div className="team-page__filters">
          <FilterPills label={teamPage.filterLabel} options={options} value={filter} onChange={setFilter} />
          <Note arrow="down">{teamPage.cardsNote}</Note>
        </div>
        <ul className="person-grid">
          {shown.map((person) => (
            <li key={person.id}>
              <PersonCard person={person} group={filter === "all" ? undefined : filter} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Team;
