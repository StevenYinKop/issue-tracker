import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren } from 'react'

const ErrorMessage = ({ children }: PropsWithChildren) =>
    children && <Text color="orange" as='p'>{children}</Text> || null;

export default ErrorMessage