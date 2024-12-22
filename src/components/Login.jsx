import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'

const Login = () => {
  const { signIn } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-600">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-6">Welcome to Florawise</h1>
        <Button 
          onClick={() => signIn()}
          className="flex items-center gap-2"
        >
          <img 
            src="/google.svg" 
            alt="Google" 
            className="w-5 h-5" 
          />
          Continue with Google
        </Button>
      </div>
    </div>
  )
}

export default Login
