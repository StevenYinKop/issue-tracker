'use client';
import { Button, Callout, TextFieldInput } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { CheckIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/api/issue/route';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>
// interface IssueForm {
//   title: string;
//   description: string;
// }

const NewIssue = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (data: IssueForm) => {
    const { title, description } = data;
    try {
      setLoading(true);
      axios.post('/api/issue', { title, description })
        .then(response => {
          if (response.status === 201) {
            router.replace("/")
          } else {
            setError(response.statusText);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (e) {
      setError("Unexpected Error occurred!")
    }
  }

  return (
    <section className='space-y-3'>
      <div>NewIssue</div>
      {error &&
        <Callout.Root color="red" role="alert">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      }
      <form className='max-w-xl space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <TextFieldInput
          placeholder="Enter your title"
          {...register('title')}
        />
        <ErrorMessage >{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMDE
            {...field}
          />}
        />
        <ErrorMessage >{errors.description?.message}</ErrorMessage>
        <Button disabled={loading}>
          {loading ? <Spinner /> : <CheckIcon />}
          Submit
        </Button>
      </form>
    </section>
  )
}

export default NewIssue