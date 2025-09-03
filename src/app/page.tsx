
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, Logo } from "@/components/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmail, signInWithGoogle, signInAsGuest } from "@/lib/auth";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleAnonymousLogin = async () => {
    const { error } = await signInAsGuest();
    if (error) {
       toast({
        title: "Erro",
        description: "Não foi possível continuar como anônimo. Tente novamente.",
        variant: "destructive",
      });
    } else {
      router.push("/home");
    }
  };
  
  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    const { error } = await signInWithEmail(email, password);

    if (error) {
      toast({
        title: "Erro no Login",
        description: "Email ou senha inválidos. Por favor, tente novamente.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Login bem-sucedido!",
        description: "Você será redirecionado para a página inicial.",
      });
      router.push("/home");
    }
  };
  
  const handleGoogleLogin = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      toast({
        title: "Erro no Login com Google",
        description: "Não foi possível fazer login com o Google. Tente novamente.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Login bem-sucedido!",
        description: "Você será redirecionado para a página inicial.",
      });
      router.push("/home");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 sm:p-6 md:p-8 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo className="h-24 w-24 text-primary" />
        </div>
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl font-headline">
              Harpa Cristã AD Belém Ourinhos
            </CardTitle>
            <CardDescription>
              Faça login para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={form.formState.isSubmitting}>
                   {form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
            </Form>
            <div className="mt-4 relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Ou continue com
                </span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <Button variant="outline" onClick={handleGoogleLogin}>
                <GoogleIcon className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="mt-6 text-center text-sm">
              <Button variant="link" onClick={handleAnonymousLogin} className="text-primary">
                Continuar como anônimo
              </Button>
            </div>
            <div className="mt-2 text-center text-sm">
              Não tem uma conta?{" "}
              <Link href="/register" className="underline text-primary">
                Cadastre-se
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
