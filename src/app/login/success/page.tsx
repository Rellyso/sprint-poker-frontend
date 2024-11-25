import { useAuth } from "@/hooks/use-auth"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export function LoginSuccessPage() {
  const { validateSession } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const token = params.get('token')

  async function handleSession() {
    await validateSession(token!)
    navigate('/rooms/enter')
  }

  useEffect(() => {
    handleSession()
  }, [])

  return (
    <div className="flex h-screen items-center justify-center">Login Success</div>
  )
}