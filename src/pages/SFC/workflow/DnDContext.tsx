import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DnDContext = createContext<[string | null, (_: string) => void]>([null, (_) => {}]);

export const DnDProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<string|null>(null);
  return <DnDContext.Provider value={[type, setType]}>{children}</DnDContext.Provider>;
};

export default DnDContext;

export const useDnD = () => {
  return useContext(DnDContext);
};
