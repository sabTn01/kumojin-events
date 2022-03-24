import { autoserialize, autoserializeAs, deserialize } from "cerialize";

export class KumojinEvent {
  @deserialize public guid = '';

  @autoserialize public displayName = '';
  @autoserialize public description = '';
  @autoserialize public countryAt = '';

  @autoserializeAs(Date) public startAt?: Date;
  @autoserializeAs(Date) endAt?: Date;
}
