'use client';

import { ErrorMessage, Spinner } from '@/app/components';
import { createIssueSchema } from '@/app/schemas/issueSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { CheckIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Button, Callout, Flex, RadioGroup, Text, TextFieldInput } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>
type TextInputFieldsType =
    "title" |
    "company" |
    "companyLink" |
    "jobLink" |
    "phoneNumber" |
    "email" |
    "tags" |
    "location"

const textInputFields: TextInputFieldsType[]
    = [
        "title",
        "company",
        "companyLink",
        "jobLink",
        "phoneNumber",
        "email",
        "tags",
        "location",
    ];

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const isEditingMode = !!issue;

    const { control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const router = useRouter();
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = (data: IssueForm) => {
        const { title, description, company, companyLink, jobLink, phoneNumber, email, tags, location, workModel } = data;
        console.log(data);
        try {
            setLoading(true);
            const func = isEditingMode ?
                () => axios.patch(`/api/issue/${issue.id}`, { title, description,  company, companyLink, jobLink, phoneNumber, email, tags, location, workModel }) :
                () => axios.post('/api/issue', { title, description,  company, companyLink, jobLink, phoneNumber, email, tags, location, workModel })

            func()
                .then(response => {
                    if (response.status === 200 || response.status === 201) {
                        router.push("/issue")
                        router.refresh()
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
                {textInputFields.map(
                    textInputField => (
                        <div key={textInputField}>
                            <Controller
                                name={textInputField}
                                control={control}
                                render={({ field }) => <TextFieldInput
                                    placeholder={`Enter ${textInputField}`}
                                    {...field}
                                />}
                                defaultValue={issue?.[textInputField] || ''} />
                            <ErrorMessage >{errors[textInputField]?.message}</ErrorMessage>
                        </div>
                    )
                )}
                <Controller
                    name="workModel"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup.Root {...field}>
                            <Flex gap="2" direction="row">
                                <Text as="label" size="2">
                                    <Flex gap="2">
                                        <RadioGroup.Item value="ON_SITE" /> On-Site
                                    </Flex>
                                </Text>
                                <Text as="label" size="2">
                                    <Flex gap="2">
                                        <RadioGroup.Item value="HYBRID" /> Hybrid
                                    </Flex>
                                </Text>
                                <Text as="label" size="2">
                                    <Flex gap="2">
                                        <RadioGroup.Item value="REMOTE" /> Remote
                                    </Flex>
                                </Text>
                            </Flex>
                        </RadioGroup.Root>
                    )}
                    defaultValue={issue?.workModel}
                />
                <ErrorMessage >{errors.workModel?.message}</ErrorMessage>

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
