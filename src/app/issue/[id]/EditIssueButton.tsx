"use client";
import { Spinner } from '@/app/components';
import { Issue } from '@prisma/client';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Dialog, Flex, Text } from '@radix-ui/themes';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AssigneeSelect from '../_components/AssigneeSelect';

const EditIssueButton = ({ issue }: { issue: Issue }) => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const deleteIssue = async () => {
        try {
            setLoading(true);
            const response = await axios.delete(`/api/issue/${issue.id}`);
            if (response.status === 200) {
                setOpen(false);
                router.push("/");
            } else {
                // response.data
            }
        } catch (error: any) {
            setOpen(true)
            setError(error?.response?.data);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Flex direction="column" gap="3">
            <AssigneeSelect issue={issue} />
            <Button disabled={loading}>
                <Link href={`/issue/${issue.id}/edit`}>Edit Issue</Link>
                <Pencil2Icon />
            </Button>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button className='cursor-pointer' color="red" disabled={loading}>
                        <Text>Remove Issue</Text>
                        {loading ? <Spinner /> : <TrashIcon />}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content style={{ maxWidth: 450 }}>
                    <AlertDialog.Title>Are you sure you want to delete this issue?</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        This action cannot be undone. This will permanently delete this issue from our servers.
                    </AlertDialog.Description>
                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant="soft" color="red" onClick={deleteIssue}>
                                Delete
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Content>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Description>
                        {error}
                    </Dialog.Description>

                    <Flex gap="3" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Close
                            </Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>

        </Flex>
    )
}

export default EditIssueButton

