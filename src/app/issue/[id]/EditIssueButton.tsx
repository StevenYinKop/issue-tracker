"use client";
import { Issue } from '@prisma/client'
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'

const EditIssueButton = ({ issue }: { issue: Issue }) => {
    return (
        <Flex direction="column" gap="3">
            <Button>
                <Link href={`/issue/${issue.id}/edit`}>Edit Issue</Link>
                <Pencil2Icon />
            </Button>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red">Revoke access</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content style={{ maxWidth: 450 }}>
                    <AlertDialog.Title>Revoke access</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure? This application will no longer be accessible and any
                        existing sessions will be expired.
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant="solid" color="red">
                                Revoke access
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>

            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="blue">
                        <Text>Remove Issue</Text>
                        <TrashIcon />
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content style={{ maxWidth: 450 }}>
                    <AlertDialog.Title>Are you sure you want to delete this issue?</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        This action cannot be undone. This will permanently delete your account and remove your
                        data from our servers.
                    </AlertDialog.Description>
                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant="soft" color="red">
                                Delete
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </Flex>
    )
}

export default EditIssueButton
