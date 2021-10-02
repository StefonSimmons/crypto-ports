import React, { useEffect, useState } from 'react'

export default function Home() {

  const [action, setAction] = useState('track')

  useEffect(() => {
    let i = 0
    const actions = ['add', 'edit', 'track']
    setInterval(() => {
      setAction(actions[i])
      i += 1
      if (i > actions.length-1) i = 0
    }, 1500)

  }, [])

  return (
    <section className="home-screen">
      <div className="home-content">
        <p id={action}>{action}</p>
        <p>multiple</p>
        <p>crypto</p>
        <p>portfolios</p>
      </div>
    </section>
  )
}
