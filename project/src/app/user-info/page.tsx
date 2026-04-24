
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import { ref, set, serverTimestamp, runTransaction } from 'firebase/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, LocateIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { classifyLocation } from '@/services/location-service';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z.coerce.number().min(1, { message: "Please enter a valid age." }),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"], {
    required_error: "Please select your gender.",
  }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  locationType: z.enum(["urban", "rural"], {
    required_error: "Please select your location type.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function UserInfoPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: undefined,
      phoneNumber: "",
    },
  });
  
  useEffect(() => {
    if (!loading && !user) {
        router.push('/login');
    }
  }, [user, loading, router]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in.' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const userData = {
        ...data,
        timestamp: serverTimestamp(),
      };
      
      // The main user data save operation
      await set(ref(db, 'users/' + user.uid), userData);
      
      // Immediately show toast and navigate
      toast({
        title: 'Information Saved',
        description: `Welcome, ${data.name}! Redirecting you to the dashboard.`,
      });

      router.push('/dashboard');

      // Run the secondary, non-critical transactions in the background
      runTransaction(ref(db, `stats/locationCounts/${data.locationType}`), (currentValue) => (currentValue || 0) + 1);
      runTransaction(ref(db, `stats/genderCounts/${data.gender}`), (currentValue) => (currentValue || 0) + 1);

    } catch (error: any) {
      console.error(error);
      setIsSubmitting(false); // Only stop submitting on error
      toast({
        variant: 'destructive',
        title: 'Error Saving Data',
        description: error.message || 'An unexpected error occurred.',
      });
    }
  };
  
  if (loading || !user) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>A Little More About You</CardTitle>
          <CardDescription>
            This information helps us provide better insights. We respect your privacy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Your age" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="male" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Male
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="female" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Female
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="other" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Other
                            </FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="prefer-not-to-say" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Prefer not to say
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="locationType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Where do you live?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="urban" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Urban (City or large town)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="rural" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Rural (Village or small town)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save and Continue to Dashboard
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
