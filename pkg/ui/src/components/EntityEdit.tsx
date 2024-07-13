import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tag, TagInput } from "emblor";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  name: z.string().min(3),
  login: z.string().min(3),
  password: z.string().min(3),
  website: z.string(),
  note: z.string(),
  // categories: z.array(
  //   z.object({
  //     id: z.string(),
  //     text: z.string(),
  //   })
  // ),
});

export default function EntityEdit({ entry, setShowEditForm }) {
  const entityID = entry.id;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: entry.name,
      login: entry.login,
      password: entry.password,
      website: entry.website,
      note: entry.note,
      categories: entry.categories,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("onSubmit: ", data);
    const entity = {
      name: data.name,
      login: data.login,
      password: data.password,
      website: data.website,
      note: data.note,
      categories: data.categories,
    };
    axios
      .put("http://vault.localhost:8081/api/v0/entry/" + entityID, entity)
      .then((response) => {
        console.log(response);
        setShowEditForm(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  return (
    <div className="bg-white justify-center flex">
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <div className="">
        <h1>Edit</h1>
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
              onClick={() => setShowEditForm(false)}
            >
              Cancel
            </Button>
            <Button className="mt-6" type="submit">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
