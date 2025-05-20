'use client';

import React, { useEffect, useMemo } from 'react';
import { AbilityContext } from '@rt/authorization/Can';
import { buildAbilityFor } from '@rt/authorization/ability';
import { setPermissions as formatPermissions } from '@rt/utils/permission';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@rt/data/store';
import { fetchPermissions } from '@rt/data/store/slices/permissionSlice';

function AbilityProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const { permissions } = useSelector((state: RootState) => state.permission);

  useEffect(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  const ability = useMemo(
    () => buildAbilityFor(formatPermissions(permissions)),
    [permissions]
  );

  return (
    <AbilityContext.Provider value={ability || buildAbilityFor([])}>
      {children}
    </AbilityContext.Provider>
  );
}

export default AbilityProvider;
