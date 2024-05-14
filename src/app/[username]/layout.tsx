

export default async function DashboardLayout({
    children, 
    params
} : {
    children: React.ReactNode,
    params: {userId: string}
}) {

 
    return (
        <>
         {children}
        </>
    )
}