import { Team } from './team.model';
export class teamWrapper{
_embedded!: { teams: Team[]};
}