import { ReactNode } from 'react'

export const SectionH3 = ({ children }: { children: ReactNode }) => {
  return (
    <h3
      style={{
        fontWeight: 'normal',
        margin: 0,
      }}
    >
      {children}
    </h3>
  )
}
