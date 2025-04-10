import { ReactNode } from 'react'

export const SectionH2 = ({ children }: { children: ReactNode }) => {
  return (
    <h2
      style={{
        fontWeight: 'normal',
      }}
    >
      {children}
    </h2>
  )
}
