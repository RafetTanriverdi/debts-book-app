import { Actions, Subjects } from '@rt/authorization/ability';

export const setPermissions = (permissions: string[] = []) => {
  const splitPermissions = permissions.map((permission) => {
    const splited = permission.split(':');
    return {
      subject: splited[0] as Subjects,
      action: splited[1] as Actions,
    };
  });

  return splitPermissions;
};
