import { useEffect, useState } from 'react'
import close from '../assets/imgs/close.svg'

import { getAllSymbols } from '../services/symbols'

export default function AddAsset() {
  const [symbols, setSymbols] = useState([])

  useEffect(() => {
    const fetchSymbols = async () => {
      const data = await getAllSymbols()
      setSymbols(data.map((asset) => asset.symbol))
    }
    fetchSymbols()
  },[])

  return (
    <div className="modal-bg">
      <section className="add-asset-modal">
        <header>
          <h1>Asset</h1>
          <img src={close} alt="close" />
        </header>
        <form>
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          input
        </form>
      </section>
    </div>
  )
}
