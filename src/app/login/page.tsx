import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@/hooks/use-form";
import { useToast } from "@/hooks/use-toast";
import { LoginSchema, loginSchema } from "@/schemas/login";
import axios, { isAxiosError } from "axios";

export function HomePage() {
  const { toast } = useToast()
  const { register, handleSubmit } = useForm<LoginSchema>({
    schema: loginSchema,
  })
  const handleLogin = async (data: LoginSchema) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', data)

      console.log(response.data)
    } catch (error) {
      const err = isAxiosError(error)
      if (!err) return
      toast({
        description: error.response?.data.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Faça login</CardTitle>
          <CardDescription>Entre com sua conta para continuar.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={handleSubmit(handleLogin)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="example@mail.com" {...register('email')} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="Digite sua senha..." {...register('password')} />
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