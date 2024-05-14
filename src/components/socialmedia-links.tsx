interface SocialMediaLink{ 
    name: string,
    icon: React.ReactNode
    url: string
}

interface SocialMediaLinksProps {
    links: SocialMediaLink[]
}


const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({links}) => {
   return ( <div className="flex flex-row gap-3 m-5 h-5">
        {
            links.map(link => (
                <a 
                href={link.url} 
                key={link.name}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
                >
                    <span className="text-xl">
                    {link.icon}
                    </span>
                </a>
            ))
        }
    </div>)
}


export default SocialMediaLinks