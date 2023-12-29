# issue-tracker

## Install Extensions
1. `ES7 React/Redux/React Native`
2. `JavaScript and Typescript Nightly`
3. `Tailwind CSS IntelliSence`
4. `Prisma`

## Docker

```shell
docker run --name issue-tracker -p 33060:3306 -v /c/users/steven.yin/AppData/Local/Issue-Tracker:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:8.0 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

## initialize new project
1. npx create-next-app@13.4.19
2. name: issue-tracker
3. rest of the options are all default


## Create new component NavBar.tsx
1. use shortcut "rafce" to generate the template code
2. use shortcut "ul>li*2" to generate <ul><li><li>
3. <li><Link>Dashboard
4. <li><Link>Issues
5. adjust the style
6. use a nice logo by react-icons library
7. add hover effect "text-zinc-500 hover:text-zinc-800" and transition class "transition-colors"

## Create the Issues page
1. highlight the active link.
impot { usePathname } from 'next/navigation';
const currentPath = usePathname();

2. make the component as a clientComponent
'use client'

3. use "npm i classnames@2.3.2"
import classnames from 'classnames'; // this is a function return a object, this object specify that the classes we wanna render and the condition that it should be render

className = {
    classnames({
        'text-zinc-900': link.href === currentPath,
        'text-zinc-500': link.href !== currentPath,
        'hover:text-zinc-800 transition-colors': true
    })
}


## set up MySQL and Prisma.
1. npm i prisma@5.3.1
2. npx prisma init
    1.1 modify "prisma schema" and ".env" file to adjust my own configuration
3. create prisma model
```prisma
model Issue {
    id Int @id @default(autoincrement())
    title String @db.VarChar(255)// varchar(191) - variable character
    description String @db.Text
    status Status @default(OPEN)
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}

enum Status {
    OPEN
    IN_PROGRESS
    CLOSED
}
```
4. npx prisma format
5. npx prisma migrate dev

## create /app/api/issues/route.ts
1. install zod@3.22.2 to validate data

```typescript
import { z } from 'zod';
const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextRequest.json(validation.error.errors, { status: 400 });
    }
    // import single prisma client
    // google how to create prisma client in /prisma/client.ts.
    const newIssue = await prisma.issue.create({
        // ... data
    });
    return NextResponse.json(newIssue, { status: 201 })
}
```

## install Radix UI
References: Radix UI Get Started
Follow the handbook to integrate the Radix UI

## create /app/issues/new/page.tsx
<TextField>
<TextArea>

## Customzing Radix UI Theme
1. declare <ThemePanel> inside <Theme>
2. select one favourite theme -> Copy the code -> replace the <Theme>

## Use Inter font instead of System fonts.
1. References: Radix UI typography

## Adding a Markdown Editor
1. React SimpleMDE Markdown Editor
```
npm install --save react-simplemde-editor easymde
```

## Handling Form Submission
1. npm install react-hook-form@7.46.1
```typescript
import { useForm, Controller } from 'react-hook-form';

interface IssueForm {
    title: string;
    description: string;
}

// ...
const { register, control, handleSubmit } = useForm<IssueForm>();
```

2. install axios@1.5.0

const router = useRouter(); // next/navigation

## Handling Errors
1. use try/catch
2. use "Callout" in Radix UI

## Implementing Client-side Validation
1. npm install @hookform/resolvers@3.3.1
```typescript
useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
})
```
2. reuse type in zod
```typescript
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>
```
3. insert error alert below each form component

## Extracting the ErrorMessage Component
1. create /app/components/ErrorMessage.tsx

## Adding a Spinner
1. google "tailwind elements spinner"
2. create /app/components/Spinner.tsx
3. use <Spinner> while submitting a new issue





## Showing the Issues
1. Use prisma.issue.findMany() to fetch multiple data.
2. Use Radix UI Table to show all data
   1. Issue
   2. Status
   3. Created
3. Adjust the style
4. responsive layout
   1. hide status and created only show these in wide screen
   2. className="hidden md:table-cell"

## Building the Issue Status Badge


## Adding Loading Skeletons
1. npm install delay
2. use delay to check loading effect
```javascript
await delay(2000)
```
3. google "react loading skeleton"
4. Follow Skeleton documentation.
5. Extract New Issue Button to a new component(/app/issues/IssueActions.tsx)

## SHowing Issue Details
1. /app/issues/[id]/IssueDetailPage.tsx
2. Use prisma.issue.findUnique({ where: { id: parseInt(params.id) }})
3. Handle the situation when can not find anything. // notFound()
4. Add <Link> to wrap Issue block on /issues
5. Add /app/issues/[id]/loading.tsx for IssueDetailPage
6. Add /app/issues/new/loading.tsx for NewIssuePage

## Styling the Issue Detail Page 

```html
<Flex my="2" >
    ...
</Flex>
```


## Adding Markdown Preview
1. ```shell
npm install react-markdown@8.0.7
```
1. google tailwindcss typography ( Beautiful typographic defaults for HTML you don't control )

*## Building Linked Component*?
1. use 'next/link'
2. import { Link as RadixLink } from '@radix-ui/themes'
3. combine both of them together.
4. google "nextjs link component" - passHref lagacyBehavior

## Additional Loading Skeletons
1. Use react-loading-skeleton for all pages. (details, new)
```jsx
<Box>
    <Skeleton />
    ...
    <Skeleton />
</Box>
```
2. use Await delay to check the skeleton.

## Disabling Server-side Rendering on New page
1. 'navigator is not defined'
Because all codes are generated on server side, 
import dynamic from 'next/dynamic';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

## Refactoring-Organizing imports
1. Managing all components in index.ts
2. extracting Skeleton as a custom components with import ts and css together

## Adding the Edit Button
1. Use <Grid> to split the Detail Page into 2.
2. Use Breakpoints to identity the responsive layout.
3. Add Edit Button in the second column, redirect to `/issue/${id}/edit`

## Applying the Single Responsibility Principle
1. Extracting Edit Issue logic to /app/issue/[id]/EditIssueButton.tsx
2. Extracting Details logic to /app/issue/[id]/IssueDetails.tsx

## Building the Edit Issue Page
1. create '/app/issue/[id]/edit/page.tsx'
2. create '/app/issue/_components/IssueForm.tsx'
3. Refactor New Issue by <IssueForm />

```typescript
interface Props {
    params: {id: string}
}
```

## Building an API for Editing Issue
1. new file: '/app/api/issue/[id]/route.ts'
2. Rename createIssueSchema
3. validate the input
4. Check whether the issue is exist
5. update the issue by id
```typescript
export async function PATH(request: NextRequest, { params }: { params: {id: string }}) {
    const body = await request.json();

}
```
## Caching
Reference: google "Nextjs Route Segment Config"
1. Data Caching
   1. When we fetch data using fetch()
   2. Stored in the file system
   3. Permanent until we redeploy
2. Full Route Cache (Cache on the Server)
   1. Used to store the output of statically rendered routes
3. Router Cache (Client-side Cache)
   1. To store the payload of pages in broswer
   2. Lasts for a session
   3. Get a refresh when we reload

```typescript
export const dynamic = 'force-dynamic';
export const revalidate = 0;
```

## Improving the Loading Experience
1. Let Text and MDE appear together
```tsx
dynamic(() => import('xx'), { ssr: false, loading: () => <>Loading...</> })
```
1. Add Skeleton for Edit Issue page and New Issue page


## Adding a Delete Button as a separate Component: /issue/[id]/DeleteIssueButton.tsx
1. Button are inline element of HTML -> set flex to put two buttons vertically
```typescript
<Flex gap="2" direction="column">
```
2. Adjust Button layout in different resolutions(Mobile/Tablet/PC).
3. Use <Container />

## Adding a Confirmation Dialog Box
1. Reference: AlertDialog in Radix UI.

## Building an API for deleting an issue.

## Adding another AlertDialog to handle the issue if there is an error.
## Adding Spinner and disable the deleteButton while deleting is underway.
  
## Setting Up NextAuth
1. npm i next-auth
2. Follow offical guide:
   1. create /api/auth/[...nextauth]/route.ts
```typescript
const handler = NextAuth()
```
3. .env:
NEXTAUTH_URL="http://localhost:3000
NEXTAUTH_SECRET="xxxxx"

4. generate a random string: `openssl rand -base64 32``

## Configuring Google Provider: https://console.cloud.google.com
1. Follow the documentation in website: "Google | NextAuth.js"

## Adding the Prisma Adapter 
1. Follow the documentation: @auth/prisma-adapter
2. grap all models in the schema.prisma
3. npx prisma migrate dev
4. `npm install @next-auth/prisma-adapter@1.0.7`
5. add {session: 'jwt'} in NextAuth({});

## Adding the Login and Logout Links
1. const { status, data } = useSession();
{status === "authenticated" && <Link href="/api/auth/signout">Log out</Link>}
{status === "unauthenticated" && <Link href="/api/auth/signin">Login</Link>}
2. create file "/app/auth/Provider.tsx"
```jsx
const AuthProvider = () => {
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}
```
3. wrap our website into the AuthProvider

## Change the Layout of the NavBar. 
1. `justify-content: space-between`.
2. Wrap everything inside a <Container>

## Adding a Drop-down Menu
1. Using DropdownMenu from Radix UI

## fix CORS issue: 
1. referrerPolicy='no-referrer'
2. Add configuration in `next.config.ts`
```typescript
const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'referrer-policy', value: 'no-referrer' }
                ]
            }
        ]
    }
}
```

## Refactoring the Navigation Bar code
1. Extract each part into components
2. control + shift + command + 'right arrow': select Expand
3. 
```css
@layer utilities {
    .nav-link {
        @apply text-zinc-500 hover:text-zinc-800 transition-colors
    }
}
```
```jsx
<Link className="nav-link">
```

## Adding loading Skeleton for Login Icon
## Securing the Application
1. Adding middleware function `/middleware.ts`
```typescript
export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        '/issue/new',
        '/issue/edit/:id+'
    ]
}
```
2. Hiding Edit & Delete Buttons if there isn't a session available;
3. const session = getServerSession(authOptions) to check if there is a session available;