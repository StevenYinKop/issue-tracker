'use client';

import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from '@/app/schemas/issueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { CheckIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Button, Callout, TextFieldInput } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueForm = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const isEditingMode = !!issue;

    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(issueSchema)
    });
    const router = useRouter();
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = (data: IssueForm) => {
        const { title, description } = data;
        try {
            setLoading(true);
            const func = isEditingMode ?
                () => axios.patch(`/api/issue/${issue.id}`, { title, description }) :
                () => axios.post('/api/issue', { title, description })

            func()
                .then(response => {
                    if (response.status === 200 || response.status === 201) {
                        router.push("/")
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
            <div>{isEditingMode ? 'Edit Issue' : 'New Issue'}</div>
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
                    defaultValue={issue?.title}
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
                    defaultValue={issue?.description}
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

export default IssueForm
