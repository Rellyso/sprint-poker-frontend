import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useReducer } from "react";

export function HomePage() {

  const [state, dispatch] = useReducer((state: any, action: { type: any; payload: any; }) => {
    switch (action.type) {
      case 'SET_EMAIL':
        return { ...state, email: action.payload };
      case 'SET_PASSWORD':
        return { ...state, password: action.payload };
      default:
        return state;
    }
  }, { email: '', password: '' });

  const { email, password } = state;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(email, password)
    
  }
  
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Faça login</CardTitle>
        <CardDescription>Entre com sua conta para continuar.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={handleLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="example@mail.com" value={email} onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="Digite sua senha..." value={password} onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button type="submit" form="login-form">Entrar</Button>
      </CardFooter>
    </Card>
    </div>
  )
}