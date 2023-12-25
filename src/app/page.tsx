import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
export default function Home() {
  return (
    <main>
      <Button>
        <PlusIcon width="16" height="16" />
        <Link href={'/issue/new'}>
          New Issue
        </Link>
      </Button>
    </main>
  )
}
