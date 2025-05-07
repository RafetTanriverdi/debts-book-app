import {
  AbilityBuilder,
  MongoAbility,
  createMongoAbility,
} from "@casl/ability";

export type Actions =
  | "create"
  | "read"
  | "update"
  | "delete";
export type Subjects =
  | "customers"
  | "products"
  | "dashboard"
  | "all";

export type AppAbility = MongoAbility<
  [Actions, Subjects]
>;

interface AuthItem {
  action: Actions;
  subject: Subjects;
}

export function buildAbilityFor(
  authItems: AuthItem[]
): AppAbility {
  const { can, rules } =
    new AbilityBuilder<AppAbility>(
      createMongoAbility
    );

  authItems.forEach((item) => {
    can(item.action, item.subject);
  });

  return createMongoAbility(rules);
}
