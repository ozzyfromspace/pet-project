import { useEffect, useState } from "react"

export default function useFirstRender() {
  const [firstRender, setFirstRender] = useState(() => true)

  useEffect(() => {
    if (firstRender) {
      setFirstRender(() => false)
    }
  }, [firstRender])

  return firstRender
}
