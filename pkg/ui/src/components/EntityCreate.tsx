import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const FormSchema = z.object({
  name: z.string().min(3),
  login: z.string().min(3),
  password: z.string().min(3),
  website: z.string(),
  note: z.string(),
  categories: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
});

export default function EntityCreate({ setShowCreateForm }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      login: "",
      password: "",
      website: "https://",
      note: "",
      categories: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("onSubmit: ", data);
    const entry: Entry = {
      name: data.name,
      login: data.login,
      password: data.password,
      website: data.website,
      note: data.note,
      categories: data.categories,
    };
    axios
      .post("http://vault.localhost:8081/api/v0/entry", entry)
      .then((response) => {
        console.log(response);
        setShowCreateForm(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  return (
    <div className="bg-white justify-center flex">
      <div className="mt-6">
        <h1>Create</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter here your notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mt-6 mr-4"
              onClick={() => setShowCreateForm(false)}
            >
              Cancel
            </Button>
            <Button className="mt-6" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
