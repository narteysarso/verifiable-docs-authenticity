import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const description =
    "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account"

export default function LoginForm() {
    return (
        <div className='w-full h-svh flex justify-center align-center'>
            <Card className="mx-auto max-w-lg my-auto">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Get a magic in your email
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                            size={200}
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                     
                        <Button type="submit" className="w-full">
                            Send link
                        </Button>
                       
                    </div>
                   
                </CardContent>
            </Card>
        </div>
    )
}
