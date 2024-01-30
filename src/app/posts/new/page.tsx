"use client";

import { kebabCase } from "case-anything";
import { Form, FormLayout, Field, SubmitButton, useSnackbar, useFormContext } from "@saas-ui/react";
import { useUser } from "@clerk/nextjs";

import { trpc } from "@/trpc";

export default function NewPost() {
  const { user } = useUser();
  const createPost = trpc.createPost.useMutation();
  const snackbar = useSnackbar();
  const form = useFormContext();

  const onSubmit = (fields: any) => {
    fields.slug = kebabCase(fields.title);
    fields.author = user?.id;
    const newPost = createPost.mutate(fields);
    snackbar.success(`${fields.slug} created!`);
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormLayout>
        <Field name="title" label="Post Title" type="text" rules={{ required: true }} />
        <Field name="subtitle" label="Post Subtitle" type="text" />
        <Field
          name="content"
          label="Post Content"
          type="textarea"
          rules={{ required: true }}
          height={500}
        />
        <SubmitButton>Publish</SubmitButton>
      </FormLayout>
    </Form>
  );
}
