import { Button } from "./Button"

interface ErrorPageProps {
    error?: string
}

export const ErrorPage: React.FC<ErrorPageProps> = ({error}) => {
    return (
        <div className="bg-black h-full w-full text-blue-600 font-bold">
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="flex flex-col justify-center gap-5">
                    <p>{error}</p>
                    <div className="flex justify-center">
                        <Button text="Home" href="/"/>
                    </div>
                </div>
            </div>
        </div>
    )
}