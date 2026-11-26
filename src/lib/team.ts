import { blogTeams, groups, people, type GroupId, type Person } from "../content/team";
import { subteams } from "../content/subteams";
import { posts } from "virtual:blog";

export const groupById = new Map(groups.map((g) => [g.id, g]));
export const personById = new Map(people.map((p) => [p.id, p]));
export const subteamBySlug = new Map(subteams.map((s) => [s.slug, s]));

/** People with a role in `group`, in team.ts order. */
export function peopleInGroup(group: GroupId): Person[] {
  return people.filter((p) => p.roles.some((r) => r.group === group));
}

/** Titles to show for a person: one group's title, or all of them joined. */
export function roleTitles(person: Person, group?: GroupId): string {
  const roles = group ? person.roles.filter((r) => r.group === group) : person.roles;
  return roles.map((r) => r.title).join(" · ");
}

/** People sorted by the group order on the Team page (first role decides). */
export function peopleByGroupOrder(): Person[] {
  const order = new Map(groups.map((g, i) => [g.id, i]));
  return [...people].sort(
    (a, b) => (order.get(a.roles[0]!.group) ?? 99) - (order.get(b.roles[0]!.group) ?? 99),
  );
}

export function blogTeamLabel(id: string): string {
  return blogTeams.find((t) => t.id === id)?.label ?? id;
}

export function postsBy(personId: string) {
  return posts.filter((p) => p.author.id === personId);
}

export function postsForTeam(teamId: string) {
  return posts.filter((p) => (p.teams as string[]).includes(teamId));
}
