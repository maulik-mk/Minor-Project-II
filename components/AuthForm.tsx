"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    })
}

  const AuthForm = ({ type }: { type: FormType }) => {

    const router = useRouter();
    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
        if (type === "sign-up") {
          const { name, email, password } = values;

           const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

         if (!result.success) {
          toast.error(result.message);
          return;
        }

          toast.success("Account Created Successfully Please Sign In");
          router.push("/sign-in");
        }
        else {

           const { email, password } = values;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signIn({
          uid: userCredential.user.uid,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }
          toast.success("Sign In Successfully");
          router.push("/");
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    return (
        <section className="flex-center size-full max-sm:px-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <div className="flex flex-col gap-y-2">
                        <div className="flex items-center justify-center gap-x-2">
                            <Image src="/logo.svg" width={34} height={34} alt="PrepWise" />
                            <h1 className="text-2xl font-bold">PrepWise</h1>
                        </div>
                        <h2 className="text-center text-lg">
                            {type === "sign-in" ? "Welcome back" : "Create an account"}
                        </h2>
                        <p className="text-center text-sm text-gray-500">
                            {type === "sign-in"
                                ? "Enter your credentials to access your account"
                                : "Enter your details to get started"}
                        </p>
                    </div>

                    {type === "sign-up" && (
                        <FormField
                            control={form.control}
                            name="name"
                            label="Name"
                            placeholder="Enter your name"
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                    />

                    <Button type="submit" className="mt-4">
                        {type === "sign-in" ? "Sign In" : "Sign Up"}
                    </Button>
                </form>
            </Form>

            <footer className="mt-4 text-center text-sm">
                {type === "sign-in"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className="text-primary-100 hover:underline ml-1">
                    {type === "sign-in" ? "Sign Up" : "Sign In"}
                </Link>
            </footer>
        </section>
    )
}

export default AuthForm;