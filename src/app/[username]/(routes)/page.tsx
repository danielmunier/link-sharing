
interface ProfilePageProps {
    params: {userId: string}
}

const DashboardPage: React.FC<ProfilePageProps>  = async ({
    params
}) => {

    const socialMedia = {
       
    }
    
    const username = "xssrae"
    const profileOrigin = "ayo.so/xssrae"
    const description = "Something cool here"

    return (
        <div className="py-4 bg-slate-400 h-full w-full">
            <div className="flex items-center justify-center h-screen">
                    <div className="bg-black w-11/12 max-w-lg px-2 border-2 border-white rounded-lg">
                        // profile
                        <div className="flex flex-row items-center">
                                    <img src="https://cdn.ayo.so/final/89f0052d-82a8-48f6-8006-6bc0ac7aaae3.webp" alt="" className="object-cover rounded-full border-black w-24 h-24 " />
                                      <div className="flex flex-col ml-4">
                                        <span className="text-white text-xl text-2xl text-bold">{username}</span>
                                        <p className="text-sm text-gray-400 dark:text-gray-500">{profileOrigin}</p>
                                      </div>
                                   
                                    </div>
                        <p className="text-gray-500 m-5"> {description}</p>


                    </div>
            </div>
        </div>
    )
}

export default DashboardPage