import { ReactNode } from 'react'

export const Section = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        marginBottom: '2rem',
      }}
    >
      {children}
    </div>
  )
}
