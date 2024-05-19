interface ButtonProps {
    text: string;
    href?: string;
    className?: string
}
export const Button: React.FC<ButtonProps> = ({text, href, className}) => {
    return (
        <button className={` text-white font-boldrounded ${className}`}>
            <a className=" bg-blue-500 inline-block py-2 px-2 hover:bg-blue-700font-boldrounded" href={href}>
                {text}
            </a>
        </button>
    )
    
}